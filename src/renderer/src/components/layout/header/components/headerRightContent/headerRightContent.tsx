import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Button } from 'antd';
import { IconDownloadStroked, IconServerStroked } from '@douyinfe/semi-icons';


const { useRef, useState, useEffect, useMemo } = React;

const isWin = window.bridge.platform === 'win32';

interface HeaderLeftContentProps {

}


const HeaderToolsSection = styled.section`
  display: flex;
  align-items: center;
  height: 56px;
  margin-right: 8px;
`;

const HeaderToolBtnSection = styled.section`
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
  }
`;

const TrafficLightSection = styled.section`
  display: flex;
`;

const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const { } = props;

  return (
    <HeaderToolsSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" icon={<IconServerStroked size='large' style={withSemiIconStyle()} />}>
        </Button>
      </HeaderToolBtnSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" icon={<IconDownloadStroked size='large' style={withSemiIconStyle()} />}>
        </Button>
      </HeaderToolBtnSection>
      {isWin && <TrafficLightSection>traffic light</TrafficLightSection>}
    </HeaderToolsSection>
  );
};

export default HeaderLeftContent;
