import * as React from 'react';
import styled from '@emotion/styled';
import { Badge, Button, message, Modal, Progress, Tooltip, Typography } from 'antd';
import { IconGithubLogo, IconLanguage, IconSetting, IconSignal, IconUpload } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { AppStoreContext } from '@/store/appStore/appStore';
import to from 'await-to-js';
import { useQuery, useQueryClient, UseQueryResult } from 'react-query';
import store, { User, UserConfig } from '@/storage/electronStore';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { useCheckRepoConnection, useCheckUpdate } from '@/rendererApi/user';
import { css } from '@emotion/react';
import AppSettingDrawer from '@/components/appSettingDrawer';
import { ReleaseTag } from 'src/main/idl/user';
import { checkNeedUpdate } from 'src/main/tools';
import { useRouter } from '@/hooks/router/useRouter';

const { useState, useEffect, useMemo } = React;

const {
  bridge: { ipcRenderer, openExternal },
} = window;

const Footer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  vertical-align: middle; /** 指定行内元素（inline）或表格单元格（table-cell）元素的垂直对齐方式 */
`;

const PublishButtonSection = styled.section`
  flex: 1;
  margin: 16px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
`;

const FooterToolSection = styled.section`
  flex: 1;
  margin: 18px;
  display: flex;
  justify-content: center;
  vertical-align: middle;
  align-items: center;
`;

const publishButtonStyle: React.CSSProperties = {
  width: 150,
};

const publishButtonIconStyle: React.CSSProperties = {
  marginRight: 10,
  top: 4,
};

type ProgressInfo = { percent: number; message: string; isSuccess: boolean; isError: boolean };

const progressInfo: ProgressInfo = {
  percent: 0,
  message: '',
  isSuccess: false,
  isError: false,
};

interface NavFooterProps {}

const NavFooter: React.FC<NavFooterProps> = (props: NavFooterProps) => {
  const { state: appState, dispatch: appDispatch } = React.useContext(AppStoreContext);

  const router = useRouter();

  const {
    userState: { usrSlug = '', usrName = '', endPoint = 'CN' },
    queryStatus: {
      checkRepoConnectionQuery: { enableRequest: checkRepoConnectionEnableRequest = false },
    },
  } = appState;

  const { appVersion = '' } = appState;

  const [checkUpdateRequestParams, setCheckUpdateRequestParams] = useState({
    enableRequest: true,
    onSuccess: () => {
      setCheckUpdateRequestParams({
        ...checkUpdateRequestParams,
        enableRequest: false,
      });
    },
    onError: () => {
      /** noop */
    },
  });

  const { isSuccess: isCheckUpdateSuccess, data: releaseData } = useCheckUpdate(
    checkUpdateRequestParams?.enableRequest,
    checkUpdateRequestParams?.onSuccess,
    checkUpdateRequestParams?.onError,
  ) as UseQueryResult<SuccessResp<ReleaseTag>['data'], Error>;

  const hasUpdate = useMemo(() => {
    const latest = releaseData?.name || '';

    return checkNeedUpdate(appVersion, latest);
  }, [appVersion, releaseData, releaseData?.name]);

  const [fetchStoreUsersQuery, setFetchStoreUsersQuery] = useState<{
    enableRequest: boolean;
    onSuccess: (value: User[]) => void;
    onError: (error: Error) => void;
  }>({
        enableRequest: true,
        onSuccess: () => {
          // do nothing
          setFetchStoreUsersQuery({
            ...fetchStoreUsersQuery,
            enableRequest: false,
          });
        },
        onError: () => {
          message.error('获取用户信息失败');
          setFetchStoreUsersQuery({
            ...fetchStoreUsersQuery,
            enableRequest: false,
          });
        },
      });

  const onCheckRepoSuccess = () => {
    if (router.pathname !== '/remoteSettings') {
      message.success('🎉 连接成功，去发布吧~');
    }
    /** close repo connection request */
    appDispatch({
      appActionType: 'change-query-status',
      payload: {
        checkRepoConnectionQuery: {
          enableRequest: false,
        },
      },
    });
  };

  const onCheckRepoError = (error: Error) => {
    if (router.pathname !== '/remoteSettings') {
      message.error(error.message ? `仓库链接检测失败, 错误信息：${error.message}` : '仓库链接检测失败');
    }
    /** close repo connection request */
    appDispatch({
      appActionType: 'change-query-status',
      payload: {
        checkRepoConnectionQuery: {
          enableRequest: false,
        },
      },
    });
  };

  const { data: userConfig } = useQuery(
    ['fetchStoreUserConfig', 'userConfig'],
    async () => {
      const [err, userConfig] = (await to(store.get('userConfig'))) as [Error, undefined] | [UserConfig];
      if (err) {
        throw new Error('未找到用户信息，请重新登录后再尝试');
      }
      return userConfig as any as UserConfig;
    },
    {
      enabled: fetchStoreUsersQuery?.enableRequest || true,
      onSuccess: fetchStoreUsersQuery?.onSuccess,
      onError: fetchStoreUsersQuery?.onError,
      cacheTime: 0,
    },
  ) as any as { data: UserConfig };

  const thisUser: User = useMemo(
    () => userConfig?.users?.[endPoint || 'CN']?.find((user) => user?.usrName === appState.userState.usrName) || {},
    [userConfig, endPoint, appState.userState.usrName],
  ) as User;

  const { isLoading: isCheckRepoConnectionLoading, isFetching: isCheckRepoConnectionFetching } = useCheckRepoConnection(
    {
      repoName: thisUser?.appSettings?.repoName || '',
      branch: thisUser?.appSettings?.branch || '',
      userName: thisUser?.appSettings?.userName || '',
      email: thisUser?.appSettings?.email || '',
      token: thisUser?.appSettings?.token || '',
    },
    {
      enabled: checkRepoConnectionEnableRequest,
      onSuccess: onCheckRepoSuccess,
      onError: onCheckRepoError,
      cacheTime: 0,
    },
  );

  const [publishLoading, setPublishLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const [publishProgressInfo, setPublishProgressInfo] = useState<{
    percent: number;
    message: string;
    isError?: boolean;
    isSuccess?: boolean;
  }>({
    percent: progressInfo.percent,
    message: progressInfo.message || '正在发布...',
    isError: progressInfo.isError,
    isSuccess: progressInfo.isSuccess,
  });

  useEffect(() => {
    const progressListener = (event, params: ProgressInfo) => {
      if (
        publishProgressInfo.isError !== params.isError ||
        publishProgressInfo.isSuccess !== params.isSuccess ||
        publishProgressInfo.percent !== params.percent ||
        publishProgressInfo.message !== params.message
      ) {
        setPublishProgressInfo({
          ...params,
        });
      }
    };

    ipcRenderer.on('publish-progress-info', progressListener);
    return () => {
      ipcRenderer.removeListener('publish-progress-info', progressListener);
    };
  }, []);

  const getModalContainer = () => {
    const modalContainer = document.getElementById('footerModalContainer');
    return modalContainer || document.body;
  };

  const [settingDrawerVisible, setSettingDrawerVisible] = useState(false);

  const onCloseSettingDrawer = (_) => {
    setSettingDrawerVisible(false);
  };

  const queryClient = useQueryClient();

  return (
    <Footer>
      {(isCheckRepoConnectionFetching || isCheckRepoConnectionLoading) && (
        <PublishButtonSection>
          <Button
            shape="round"
            style={{ ...publishButtonStyle, background: COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG }}
            onClick={() => {
              queryClient.cancelQueries([
                'checkRepoConnection',
                {
                  repoName: thisUser?.appSettings?.repoName || '',
                  branch: thisUser?.appSettings?.branch || '',
                  userName: thisUser?.appSettings?.userName || '',
                  email: thisUser?.appSettings?.email || '',
                  token: thisUser?.appSettings?.token || '',
                },
              ]);
              appDispatch({
                appActionType: 'change-query-status',
                payload: {
                  checkRepoConnectionQuery: {
                    enableRequest: false,
                  },
                },
              });
            }}
          >
            取消检查连接
          </Button>
        </PublishButtonSection>
      )}
      <PublishButtonSection>
        <Button
          shape="round"
          style={{ ...publishButtonStyle, background: COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG }}
          icon={<IconSignal style={withSemiIconStyle(publishButtonIconStyle)} />}
          loading={isCheckRepoConnectionLoading || isCheckRepoConnectionFetching}
          onClick={() => {
            /** check repo connection */
            appDispatch({
              appActionType: 'change-query-status',
              payload: {
                checkRepoConnectionQuery: {
                  enableRequest: true,
                },
              },
            });
          }}
        >
          检查仓库连接
        </Button>
      </PublishButtonSection>
      <PublishButtonSection>
        <Button
          type="primary"
          shape="round"
          style={publishButtonStyle}
          icon={<IconUpload style={withSemiIconStyle(publishButtonIconStyle)} />}
          loading={publishLoading}
          onClick={async () => {
            setPublishProgressInfo({
              percent: 0,
              message: '正在发布...',
              isError: false,
              isSuccess: false,
            });
            if (!usrSlug) {
              message.error('未找到用户名，请稍后再试');
              return;
            }
            setModalVisible(true);
            setPublishLoading(true);
            const [err, res] = await to(
              ipcRenderer.invoke('publish', {
                userSlug: usrSlug,
                userName: usrName,
                endPoint,
              } as {
                userSlug: string;
                userName: string;
                endPoint: 'CN' | 'US';
              }),
            );
            setPublishLoading(false);
            if (err) {
              /** noop */
            }
          }}
        >
          发布
        </Button>
      </PublishButtonSection>
      <Modal
        style={{ borderRadius: 12, top: 12, minWidth: 660, height: 48 }}
        title={null}
        visible={modalVisible}
        footer={null}
        mask={false}
        maskClosable={false}
        closable={true}
        onCancel={() => {
          setModalVisible(false);
        }}
        maskTransitionName=""
        /** transitionName: https://github.com/ant-design/ant-design/issues/16435 */
        transitionName="ant-move-up"
        zIndex={9999}
        getContainer={getModalContainer}
      >
        <>
          <section
            css={css`
              display: flex;
              justify-content: center;
            `}
          >
            {publishProgressInfo?.message ?? '正在发布...'}
          </section>
          <section
            css={css`
              margin-left: 12px;
              margin-right: 12px;
              padding-left: 12px;
              padding-right: 12px;
            `}
          >
            <Progress
              trailColor={COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND}
              success={{
                strokeColor: COLOR_PALETTE.LEETECHO_GREEN,
              }}
              percent={publishProgressInfo.isSuccess ? 100 : publishProgressInfo.percent}
              status={publishProgressInfo.isError ? 'exception' : publishProgressInfo.isSuccess ? 'success' : 'active'}
              format={(percent) => `${percent?.toFixed(2)}%`}
            />
          </section>
        </>
      </Modal>
      <FooterToolSection>
        <Button
          type="link"
          icon={<IconSetting />}
          onClick={() => {
            setSettingDrawerVisible(true);
          }}
        />
        <Button
          type="link"
          icon={<IconGithubLogo />}
          onClick={() => {
            openExternal?.('https://github.com/CallanBi/Leetecho');
          }}
        />
        <Tooltip
          title={
            <section
              css={css`
                padding-left: 16px;
              `}
            >
              <section>I18n is under construction, stay tuned!</section> <section>I18n 建设中，敬请期待！</section>
            </section>
          }
          placement="top"
        >
          <Button type="link" icon={<IconLanguage />} />
        </Tooltip>
        {hasUpdate && isCheckUpdateSuccess && (
          <Tooltip
            title={
              <section
                css={css`
                  padding-left: 16px;
                `}
              >
                <section>
                  发现新版本 {releaseData?.name} ，推荐前往{' '}
                  <Typography.Link
                    href="https://callanbi.top/Leetecho/"
                    target="_blank"
                    style={{
                      color: COLOR_PALETTE.LEETECHO_BLUE,
                    }}
                  >
                    官网
                  </Typography.Link>{' '}
                  下载
                </section>
              </section>
            }
            placement="top"
          >
            <Button type="link">
              <Badge
                status="processing"
                size="default"
                style={{
                  bottom: 3,
                }}
              />
            </Button>
          </Tooltip>
        )}
      </FooterToolSection>
      <AppSettingDrawer visible={settingDrawerVisible} onClose={onCloseSettingDrawer}></AppSettingDrawer>
    </Footer>
  );
};

export default NavFooter;
