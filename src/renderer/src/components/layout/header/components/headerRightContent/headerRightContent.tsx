import * as React from 'react';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';
// import { ReactComponent as RestoreIcon } from '@/assets/trafficLightIcons/restore.svg';
import TrafficLight from '@/components/trafficLight';
import { useGetUserStatus } from '@/rendererApi/user';
import { UserStatus } from 'src/main/services/leetcodeServices/utils/interfaces';
import { AppStoreContext } from '@/store/appStore/appStore';
import to from 'await-to-js';
import { Avatar, Dropdown, Menu, message } from 'antd';
import { UseQueryResult } from 'react-query';
import { IconUser } from '@douyinfe/semi-icons';

const { useRef, useState, useEffect, useMemo } = React;

const isWinPlatform = window.bridge.platform === 'win32';

const {
  bridge: { ipcRenderer },
} = window;

// const winStatus = ipcRenderer.sendSync('get-win-status') as GetWinStatusResp;

const HeaderToolsSection = styled.section`
  -webkit-app-region: no-drag;
  display: flex;
  align-items: center;
  height: ${MEASUREMENT.LEETECHO_HEADER_HEIGHT};
  margin-right: ${isWinPlatform ? '0px' : '12px'};
`;

const HeaderToolBtnSection = styled.section`
  -webkit-app-region: no-drag;
  cursor: default;
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
  }
`;

// const TrafficLightBtnSection = styled.section`
//   -webkit-app-region: no-drag;
//   color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
//   &:hover {
//     background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER};
//     color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
//   }

//   .ant-btn {
//     cursor: default;
//     color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
//   }
// `;

interface HeaderLeftContentProps {}

const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const {} = props;

  const { state: appState, dispatch: appDispatch } = React.useContext(AppStoreContext);

  const logout = async () => {
    await to(ipcRenderer.invoke('logout'));
    appDispatch({
      appActionType: 'change-user-status',
      payload: {
        ...appState.userState,
        isLogin: false,
        usrName: '',
        endPoint: 'CN',
      },
    });
  };

  const onGetUserStatusSuccess: (data: UserStatus) => Promise<void> = async (data) => {
    if (!data?.isSignedIn) {
      message.info('登录状态过期，请重新登录');
      await to(logout());
    } else {
      if (!appState.userState.isLogin || appState.userState.username !== data?.username) {
        appDispatch({
          appActionType: 'change-user-status',
          payload: {
            ...appState.userState,
            isLogin: true,
            username: data?.username || '',
            endPoint: 'CN',
            avatar: data?.avatar,
            usrSlug: data?.userSlug || '',
          },
        });
      } else {
        if (!appState?.userState?.avatar || !appState?.userState?.usrSlug) {
          appDispatch({
            appActionType: 'change-user-status',
            payload: {
              ...appState.userState,
              avatar: data?.avatar,
              usrSlug: data?.userSlug || '',
              endPoint: 'CN',
            },
          });
        }
      }
    }
  };

  const onGetUserStatusError = (error: Error) => {
    /** noop */
  };

  const { data: useStatusData } = useGetUserStatus({
    onSuccess: onGetUserStatusSuccess,
    onError: onGetUserStatusError,
    refetchInterval: 1000 * 60 * 10, // 10 minutes' cron job
    refetchIntervalInBackground: true,
  }) as UseQueryResult<UserStatus, Error>;

  const userMenu = useMemo(
    () => (
      <Menu>
        <Menu.Item
          style={{
            width: '100px',
          }}
          danger
          onClick={() => {
            logout();
          }}
        >
          登出
        </Menu.Item>
      </Menu>
    ),
    [logout],
  );

  return (
    <HeaderToolsSection>
      {/* Product function changed, thus these entries are disabled */}
      {/* <HeaderToolBtnSection>
        <Button
          type="link"
          shape="round"
          style={{ cursor: 'default' }}
          icon={<CloudSyncOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}
        />
      </HeaderToolBtnSection>
      <HeaderToolBtnSection>
        <Button
          type="link"
          shape="round"
          style={{ cursor: 'default' }}
          icon={<DownloadOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}
        />
      </HeaderToolBtnSection> */}
      <HeaderToolBtnSection
        style={{
          marginRight: 12,
        }}
      >
        {useStatusData && (
          <Dropdown overlay={userMenu} placement="bottomRight">
            <Avatar src={useStatusData?.avatar} icon={<IconUser />}></Avatar>
          </Dropdown>
        )}
      </HeaderToolBtnSection>
      <TrafficLight />
    </HeaderToolsSection>
  );
};

export default HeaderLeftContent;
