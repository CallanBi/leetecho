import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Loading from './loading';

const { useRef, useState, useEffect, useMemo } = React;

interface WrappedLoadingProps {
  style?: React.CSSProperties;
}

const WrappedLoading: React.FC<WrappedLoadingProps> = (props: WrappedLoadingProps) => {
  const { style = {} } = props;

  return (
    <section style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...style }}>
      <section style={{ display: 'flex' }}>
        <Loading style={{ width: 45, height: 45 }}></Loading>
      </section>
    </section>
  );
};

export default WrappedLoading;
