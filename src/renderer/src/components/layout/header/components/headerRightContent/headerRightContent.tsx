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

const isWin = window.bridge.platform === 'win32';

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


const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const { } = props;

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
        <TrafficLightBtnSection>
          <Button type="link" shape="round" icon={<BorderOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
          </Button>
        </TrafficLightBtnSection>
        {/* <TrafficLightBtnSection>
          <Button type="link" shape="round" icon={<Icon component={RestoreIcon} />}>
          </Button>
        </TrafficLightBtnSection> */}
        <CloseWindowTrafficLightSection>
          <Button type="link" shape="round" icon={<CloseOutlined size={MEASUREMENT.LEETECHO_TRAFFIC_LIGHT_ICO_SIZE as number} />}>
          </Button>
        </CloseWindowTrafficLightSection>
      </TrafficLightSection>}
    </HeaderToolsSection>
  );
};

export default HeaderLeftContent;
