import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { Button } from 'antd';
import { IconDownload, IconSync } from '@douyinfe/semi-icons';


const { useRef, useState, useEffect, useMemo } = React;

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

const HeaderLeftContent: React.FC<HeaderLeftContentProps> = (props: HeaderLeftContentProps) => {
  const { } = props;

  return (
    <HeaderToolsSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" icon={<IconSync size='large' style={withSemiIconStyle()} />}>
        </Button>
      </HeaderToolBtnSection>
      <HeaderToolBtnSection>
        <Button type="link" shape="round" icon={<IconDownload size='large' style={withSemiIconStyle()} />}>
        </Button>
      </HeaderToolBtnSection>
    </HeaderToolsSection>
  );
};

export default HeaderLeftContent;
