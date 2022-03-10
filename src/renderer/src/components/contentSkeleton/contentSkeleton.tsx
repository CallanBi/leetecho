import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { Skeleton } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

interface ContentSkeletonProps {
  maxWidth?: number;
}

const ContentSkeleton: React.FC<ContentSkeletonProps> = (props: ContentSkeletonProps) => {
  const { maxWidth = 800 } = props;

  return (
    <section style={{ maxWidth }}>
      <Skeleton active round paragraph={{ rows: 3 }} title></Skeleton>
      <Skeleton.Input active style={{ width: 250, height: 200 }} />
      <Skeleton.Input active style={{ width: maxWidth, height: 64, marginTop: 12 }} />
      <Skeleton active round paragraph={{ rows: 2 }} title></Skeleton>
      <Skeleton.Input active style={{ width: maxWidth, height: 80, marginTop: 12 }} />
      <Skeleton active round paragraph={{ rows: 5 }} title></Skeleton>
    </section>
  );
};

export default ContentSkeleton;
