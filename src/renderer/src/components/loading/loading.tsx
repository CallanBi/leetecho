import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { MEASUREMENT } from 'src/const/theme/measurement';

const { useRef, useState, useEffect, useMemo } = React;

const LoadingSection = styled.section`
  @keyframes square-spin {
    25% {
      transform: perspective(100px) rotateX(180deg) rotateY(0);
    }
    50% {
      transform: perspective(100px) rotateX(180deg) rotateY(180deg);
    }
    75% {
      transform: perspective(100px) rotateX(0) rotateY(180deg);
    }
    100% {
      transform: perspective(100px) rotateX(0) rotateY(0);
    }
  }
  animation-fill-mode: both;
  width: 40px;
  height: 40px;
  border-radius: ${MEASUREMENT.LEETECHO_BORDER_RADIUS_BASE};
  background: ${COLOR_PALETTE.LEETECHO_BLUE};
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
`;

const Loading = (props: { style?: React.CSSProperties }) => <LoadingSection style={props.style || {}} />;

export default Loading;
