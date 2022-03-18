import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

interface FooterProps {
  style?: React.CSSProperties;
}

const FooterWrapperSection = styled.section`
  border: none;
  padding: 0;
  padding-left: 12;
  padding-right: 12;
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  position: absolute;
  bottom: 0;
  height: 48px;
  border-top: 4px solid ${COLOR_PALETTE.LEETECHO_GREY};
  z-index: 100;
  background-color: ${COLOR_PALETTE.LEETECHO_WHITE};
`;

const Footer: React.FC<FooterProps> = (props: React.PropsWithChildren<FooterProps>) => {
  const { children, style = {}, ...args } = props;

  return (
    <FooterWrapperSection {...args} style={style}>
      {children}
    </FooterWrapperSection>
  );
};

export default Footer;
