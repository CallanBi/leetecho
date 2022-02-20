import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Button } from 'antd';
import { IconCrossStroked, IconDownloadStroked, IconMinusStroked, IconServerStroked } from '@douyinfe/semi-icons';
import { BorderOutlined, CloseOutlined, CloudSyncOutlined, DownloadOutlined, MinusOutlined } from '@ant-design/icons';
import { MEASUREMENT } from 'src/const/theme/measurement';
import Icon from '@ant-design/icons';
import { ReactComponent as RestoreIcon } from '@/assets/trafficLightIcons/restore.svg';


const { useRef, useState, useEffect, useMemo } = React;

const isWinPlatform = window.bridge.platform === 'win32';

const { bridge: { ipcRenderer } } = window;

const winStatus = ipcRenderer.sendSync('get-win-status') as WindowStatus;


interface HeaderLeftContentProps {

}


const HeaderToolsSection = styled.section`
  display: flex;
  align-items: center;
  height: ${MEASUREMENT.LEETECHO_HEADER_HEIGHT};
`;

const HeaderToolBtnSection = styled.section`
  cursor: default;
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
  }
`;

const TrafficLightBtnSection = styled.section`
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

// const DivideLine = styled.div`
//   font-size: ${MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE}px;
//   color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
//   margin-left: 12px;
//   margin-right: 12px;

// `;

const TrafficLightSection = styled.section`
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

console.log('%c winStatus >>>', 'background: yellow; color: blue', winStatus);



const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const { } = props;

  const initMaximizedVal = winStatus === 'maximized';
  const [isMaximized, setIsMaximized] = useState<boolean>(initMaximizedVal);

  console.log('%c  isMaximized>>>', 'background: yellow; color: blue', isMaximized);

  const maximizeWin = () => {
    ipcRenderer.sendSync('set-win-status', 'maximized' as WindowStatus);
    setIsMaximized(true);
  };

  const minimizeWin = () => {
    ipcRenderer.sendSync('set-win-status', 'minimized' as WindowStatus);
    setIsMaximized(false);
  };

  const restoreWin = () => {
    ipcRenderer.sendSync('set-win-status', 'windowed' as WindowStatus);
    setIsMaximized(false);
  };

  console.log('%c 111 >>>', 'background: yellow; color: blue', 111);



  return (
    <HeaderToolsSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" style={{ cursor: 'default' }} icon={<CloudSyncOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
        </Button>
      </HeaderToolBtnSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" style={{ cursor: 'default' }} icon={<DownloadOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
        </Button>
      </HeaderToolBtnSection>
      {<TrafficLightSection>
        {/* <DivideLine>|</DivideLine> */}
        <TrafficLightBtnSection>
          <Button type="link" shape="round" icon={<MinusOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
          </Button>
        </TrafficLightBtnSection>
        {!isMaximized && < TrafficLightBtnSection onClick={() => {
          maximizeWin();
        }}>
          <Button type="link" shape="round" icon={<BorderOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
          </Button>
        </TrafficLightBtnSection>}
        {isMaximized && <TrafficLightBtnSection onClick={() => {
          minimizeWin();
        }}>
          <Button type="link" shape="round" icon={<Icon component={RestoreIcon} />}>
          </Button>
        </TrafficLightBtnSection>}
        <CloseWindowTrafficLightSection onClick={() => {
          minimizeWin();
        }}>
          <Button type="link" shape="round" icon={<CloseOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
          </Button>
        </CloseWindowTrafficLightSection>
      </TrafficLightSection>}
    </HeaderToolsSection >
  );
};

export default HeaderLeftContent;
