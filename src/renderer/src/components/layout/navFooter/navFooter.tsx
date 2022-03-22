import * as React from 'react';
import styled from '@emotion/styled';
import { Button, message, Modal, Progress } from 'antd';
import { IconGithubLogo, IconGlobeStroke, IconLanguage, IconLink, IconSetting, IconUpload } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { AppStoreContext } from '@/store/appStore/appStore';
import to from 'await-to-js';
import { getErrorCodeMessage } from 'src/main/router/errorCode';
import { useQuery } from 'react-query';
import store, { User, UserConfig } from '@/storage/electronStore';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { useCheckRepoConnection } from '@/rendererApi/user';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

const {
  bridge: { ipcRenderer },
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

  const {
    userState: { usrSlug = '', usrName = '', endPoint = 'CN' },
  } = appState;

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

  const onCheckSuccess = () => {
    message.success('🎉 连接成功，去发布吧~');
    setCheckRepoConnectionQuery({
      ...checkRepoConnectionQuery,
      enableRequest: false,
    });
  };

  const onCheckError = (error: Error) => {
    message.error(error.message ? `仓库链接检测失败, 错误信息：${error.message}` : '仓库链接检测失败');
    setCheckRepoConnectionQuery({
      ...checkRepoConnectionQuery,
      enableRequest: false,
    });
  };

  const [checkRepoConnectionQuery, setCheckRepoConnectionQuery] = useState<{
    enableRequest: boolean;
    onSuccess: (value: SuccessResp<Record<string, never>>) => void;
    onError: (error: Error) => void;
  }>({
        enableRequest: false,
        onSuccess: onCheckSuccess,
        onError: onCheckError,
      });

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

  const { enableRequest, onSuccess, onError } = checkRepoConnectionQuery;

  const { isLoading: isCheckRepoConnectionLoading, isFetching: isCheckRepoConnectionFetching } = useCheckRepoConnection(
    {
      repoName: thisUser?.appSettings?.repoName || '',
      branch: thisUser?.appSettings?.branch || '',
      userName: thisUser?.appSettings?.userName || '',
      email: thisUser?.appSettings?.email || '',
      token: thisUser?.appSettings?.token || '',
    },
    {
      enabled: enableRequest,
      onSuccess: onSuccess,
      onError: onError,
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
      console.log('%c progressInfo >>>', 'background: yellow; color: blue', progressInfo);
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

  return (
    <Footer>
      <PublishButtonSection>
        <Button
          shape="round"
          style={{ ...publishButtonStyle, background: COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG }}
          icon={<IconLink style={withSemiIconStyle(publishButtonIconStyle)} />}
          loading={isCheckRepoConnectionLoading || isCheckRepoConnectionFetching}
          onClick={() => {
            setCheckRepoConnectionQuery({
              ...checkRepoConnectionQuery,
              enableRequest: true,
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
              message.error(
                err?.message ? `发布失败, 错误信息: ${err?.message ?? getErrorCodeMessage()}` : '发布失败, 未知错误',
              );
              return;
            }
            message.success('🥰 发布成功～');
          }}
        >
          发布
        </Button>
      </PublishButtonSection>
      <Modal
        style={{ borderRadius: 12, top: 60, minWidth: 660, height: 48 }}
        title={null}
        visible={modalVisible}
        footer={null}
        mask={false}
        maskClosable={false}
        closable={publishProgressInfo.isSuccess || publishProgressInfo.isError}
        onCancel={() => {
          setModalVisible(false);
        }}
        zIndex={9999}
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
              // strokeColor={{
              //   from: COLOR_PALETTE.LEETECHO_LIGHT_BLUE,
              //   to: COLOR_PALETTE.LEETECHO_BLUE,
              // }}
              // trailColor={COLOR_PALETTE.LEETECHO_GREY}
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
      {/* <>
        <section>{publishProgressInfo?.message ?? '正在发布...'}</section>
        <Progress
          type="circle"
          strokeColor={{
            '0%': COLOR_PALETTE.LEETECHO_LIGHT_BLUE,
            '100%': COLOR_PALETTE.LEETECHO_BLUE,
          }}
          percent={publishProgressInfo.percent}
          status={publishProgressInfo.isError ? 'exception' : publishProgressInfo.isSuccess ? 'success' : 'active'}
        />
      </> */}
      <FooterToolSection>
        <Button type="link" icon={<IconSetting />} />
        <Button type="link" icon={<IconGlobeStroke />} />
        <Button type="link" icon={<IconGithubLogo />} />
        <Button type="link" icon={<IconLanguage />} />
      </FooterToolSection>
    </Footer>
  );
};

export default NavFooter;
