import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Button } from 'antd';
import Icon, {
  BorderOutlined,
  CloseOutlined,
  CloudSyncOutlined,
  DownloadOutlined,
  MinusOutlined,
} from '@ant-design/icons';
import { MEASUREMENT } from 'src/const/theme/measurement';
import { ReactComponent as RestoreIcon } from '@/assets/trafficLightIcons/restore.svg';

const { useRef, useState, useEffect, useMemo } = React;

const isWinPlatform = window.bridge.platform === 'win32';

const {
  bridge: { ipcRenderer },
} = window;

const winStatus = ipcRenderer.sendSync('get-win-status') as GetWinStatusResp;

interface TrafficLightProps {}

const TrafficLightBtnSection = styled.section`
  -webkit-app-region: no-drag;
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  &:hover {
    background-color: ${COLOR_PALETTE.LEETECHO_HEADER_SEARCH_BG_HOVER};
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  }

  .ant-btn {
    cursor: default;
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  }
`;

const TrafficLightSection = styled.section`
  -webkit-app-region: no-drag;
  display: flex;
`;

const CloseWindowTrafficLightSection = styled(TrafficLightBtnSection)`
  .ant-btn {
    transition: none;
  }
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_WHITE};
    background-color: ${COLOR_PALETTE.LEETECHO_RED};

    .ant-btn {
      color: ${COLOR_PALETTE.LEETECHO_WHITE};
    }
  }
`;

const TrafficLight: React.FC<TrafficLightProps> = (props: TrafficLightProps) => {
  const {} = props;

  const initMaximizedVal = winStatus === 'maximized';
  const [isMaximized, setIsMaximized] = useState<boolean>(initMaximizedVal);

  useEffect(() => {
    ipcRenderer.on('set-win-status', (_, params: SetWinStatusResp) => {
      const { isSuccessful, winStatus = '' } = params;
      if (!isSuccessful) {
        return;
      }
      if (winStatus !== 'maximized') {
        setIsMaximized(false);
        return;
      }
      if (!isMaximized) {
        setIsMaximized(true);
      }
    });

    ipcRenderer.on('maximized', () => {
      if (!isMaximized) {
        setIsMaximized(true);
      }
    });

    ipcRenderer.on('windowed', () => {
      if (isMaximized) {
        setIsMaximized(false);
      }
    });
    return () => {
      ipcRenderer.removeAllListeners('set-win-status');
      ipcRenderer.removeAllListeners('maximized');
      ipcRenderer.removeAllListeners('windowed');
    };
  }, []);

  const maximizeWin = () => {
    ipcRenderer.send('set-win-status', 'maximized' as SetWinStatusReq);
  };

  const minimizeWin = () => {
    ipcRenderer.send('set-win-status', 'minimized' as SetWinStatusReq);
  };

  const unmaximizeWin = () => {
    ipcRenderer.send('set-win-status', 'windowed' as SetWinStatusReq);
  };

  const closeWin = () => {
    ipcRenderer.send('set-win-status', 'closed' as SetWinStatusReq);
  };

  return (
    <>
      {isWinPlatform && (
        <TrafficLightSection>
          {/* <DivideLine>|</DivideLine> */}
          <TrafficLightBtnSection>
            <Button
              type="link"
              shape="round"
              onClick={() => {
                minimizeWin();
              }}
              icon={<MinusOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}
            />
          </TrafficLightBtnSection>
          {!isMaximized && (
            <TrafficLightBtnSection
              onClick={() => {
                maximizeWin();
              }}
            >
              <Button
                type="link"
                shape="round"
                icon={<BorderOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}
              />
            </TrafficLightBtnSection>
          )}
          {isMaximized && (
            <TrafficLightBtnSection
              onClick={() => {
                unmaximizeWin();
              }}
            >
              <Button type="link" shape="round" icon={<Icon component={RestoreIcon} />} />
            </TrafficLightBtnSection>
          )}
          <CloseWindowTrafficLightSection
            onClick={() => {
              closeWin();
            }}
          >
            <Button
              type="link"
              shape="round"
              icon={<CloseOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}
            />
          </CloseWindowTrafficLightSection>
        </TrafficLightSection>
      )}
    </>
  );
};

export default TrafficLight;
