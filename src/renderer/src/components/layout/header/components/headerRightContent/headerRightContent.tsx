import * as React from 'react';
import styled from '@emotion/styled';
// import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';
// import { ReactComponent as RestoreIcon } from '@/assets/trafficLightIcons/restore.svg';
import TrafficLight from '@/components/trafficLight';

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

// const HeaderToolBtnSection = styled.section`
//   -webkit-app-region: no-drag;
//   cursor: default;
//   color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
//   &:hover {
//     color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
//   }
// `;

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
      <TrafficLight />
    </HeaderToolsSection>
  );
};

export default HeaderLeftContent;
