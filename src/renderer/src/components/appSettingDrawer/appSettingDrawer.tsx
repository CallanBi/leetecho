import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Badge, Button, Drawer, Tooltip, Typography } from 'antd';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { AppStoreContext } from '@/store/appStore/appStore';
import { UseQueryResult } from 'react-query';
import { ReleaseTag } from 'src/main/idl/user';
import { useCheckUpdate } from '@/rendererApi/user';
import { checkNeedUpdate } from 'src/main/tools';

const { useRef, useState, useEffect, useMemo } = React;

interface AppSettingDrawerProps {
  visible: boolean;
  onClose: (e: React.KeyboardEvent<HTMLDivElement> | React.MouseEvent<HTMLDivElement | HTMLButtonElement>) => void;
}

const AppSettingDrawerContent = styled.section`
  padding: 12;
`;

const AppSettingDrawer: React.FC<AppSettingDrawerProps> = (props: AppSettingDrawerProps) => {
  const { visible, onClose } = props;

  const { state: appState, dispatch: appDispatch } = React.useContext(AppStoreContext);

  const { appVersion } = appState;

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

  const {
    isSuccess: isCheckUpdateSuccess,
    data: releaseData,
    isLoading: isCheckUpdateLoading,
    isFetching: isCheckUpdateFetching,
  } = useCheckUpdate(
    checkUpdateRequestParams?.enableRequest,
    checkUpdateRequestParams?.onSuccess,
    checkUpdateRequestParams?.onError,
  ) as UseQueryResult<SuccessResp<ReleaseTag>['data'], Error>;

  const hasUpdate = useMemo(() => {
    const latest = releaseData?.name || '';

    return checkNeedUpdate(appVersion, latest);
  }, [appVersion, releaseData, releaseData?.name]);

  const getDrawerContainer = () => {
    return document.getElementById('appSettingDrawer') || document.body;
  };

  return (
    <section
      css={css`
        .ant-drawer-close {
          position: absolute;
          right: 0;
        }
      `}
      id={'app-setting-drawer'}
    >
      <Drawer
        placement="bottom"
        closable={true}
        visible={visible}
        onClose={onClose}
        height="100%"
        getContainer={getDrawerContainer}
      >
        <AppSettingDrawerContent>
          <Typography.Title level={4}>版本</Typography.Title>
          <Typography.Paragraph>
            {appState?.appVersion || ''}
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
                placement="right"
              >
                <Button type="link">
                  <Badge
                    status="processing"
                    size="default"
                    style={{
                      bottom: 4,
                      left: -12,
                    }}
                  />
                </Button>
              </Tooltip>
            )}
          </Typography.Paragraph>
          <Typography.Link
            href={'https://github.com/CallanBi/Leetecho'}
            target="_blank"
            style={{ color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE }}
          >
            @Leetecho
          </Typography.Link>
        </AppSettingDrawerContent>
        <section
          css={css`
            padding: 12;
            display: flex;
            align-items: bottom;
          `}
        >
          <Button
            type="primary"
            style={{
              marginTop: '12px',
            }}
            onClick={() => {
              setCheckUpdateRequestParams({
                ...checkUpdateRequestParams,
                enableRequest: true,
              });
            }}
            loading={isCheckUpdateFetching || (isCheckUpdateLoading && !isCheckUpdateSuccess)}
          >
            检查更新
          </Button>
          {isCheckUpdateSuccess && !hasUpdate && (
            <Typography.Paragraph
              style={{
                position: 'relative',
                left: 24,
                top: 18,
              }}
            >
              当前已是最新版本
            </Typography.Paragraph>
          )}
          {hasUpdate && (
            <Typography.Paragraph
              style={{
                position: 'relative',
                left: 24,
                top: 18,
              }}
            >
              发现新版本
            </Typography.Paragraph>
          )}
        </section>
      </Drawer>
    </section>
  );
};

export default AppSettingDrawer;
