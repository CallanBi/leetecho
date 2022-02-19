import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Button } from 'antd';
import { IconDownload, IconSync } from '@douyinfe/semi-icons';
import { HeaderRightContent } from '.';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

const HeaderSection = styled.section`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 56px;
`;

const HeaderToolsSection = styled.section`
  flex: 2;
  display: flex;
  margin-right: auto;
  align-items: center;
  height: 56px;
`;

const HeaderToolBtnSection = styled.section`
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
  }
`;



interface HeaderProps {

}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { } = props;

  return (
    <HeaderSection>
      <HeaderToolsSection>
        <HeaderToolBtnSection style={{ marginLeft: 8 }}>
          <Button type="link" shape="round" icon={<IconSync size='large' style={withSemiIconStyle()} />}>
          </Button>
        </HeaderToolBtnSection>
        <HeaderToolBtnSection>
          <Button type="link" shape="round" icon={<IconDownload size='large' style={withSemiIconStyle()} />}>
          </Button>
        </HeaderToolBtnSection>
      </HeaderToolsSection>
      <HeaderRightContent></HeaderRightContent>
    </HeaderSection>
  );
};

export default Header;
