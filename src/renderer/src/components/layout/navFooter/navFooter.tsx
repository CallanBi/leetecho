import * as React from 'react';
import styled from '@emotion/styled';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { css } from '@emotion/react';

const { useRef, useState, useEffect, useMemo } = React;

const Button = styled.button`
  padding: 32px;
  background-color: ${COLOR_PALETTE.LEETECHO_BLUE};
  font-size: 24px;
  border-radius: 4px;
  color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLACK};
  font-weight: bold;
  cursor: pointer;
  &:hover {
    color: ${COLOR_PALETTE.LEETECHO_BLACK};
  }
`;



interface NavFooterProps {

}

const defaultProps: NavFooterProps = {};

const NavFooter: React.FC<NavFooterProps> = (props: React.PropsWithChildren<NavFooterProps> = defaultProps) => {
  return (<div css={css`
  background-color: ${COLOR_PALETTE.LEETECHO_LIGHT_BLUE};
`}> NavFooter <Button>my button</Button></div>);
};

export default NavFooter;
