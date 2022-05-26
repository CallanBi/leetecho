import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ReactComponent as LockedIllustration } from '@/assets/illustration/locked.svg';
import { Typography } from 'antd';

const { useRef, useState, useEffect, useMemo } = React;

const { Title } = Typography;

interface LockedProps {
  title?: string;
  desc?: string;
}

const IllustrationWrapperSection = styled.section`
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

const IllustrationSection = styled.section`
  display: flex;
  justify-content: center;
`;

const TitleSection = styled.section`
  display: flex;
  justify-content: center;
`;

const DescSection = styled.section`
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
`;

const Locked: React.FC<LockedProps> = (props: LockedProps) => {
  const { title = '该题目是 Plus 会员专享题', desc = '' } = props;

  return (
    <IllustrationWrapperSection>
      <IllustrationSection>
        <LockedIllustration width={380} height={380} />
      </IllustrationSection>
      {title && (
        <TitleSection>
          <Title level={5}>{title}</Title>
        </TitleSection>
      )}
      {desc && <DescSection>{desc}</DescSection>}
    </IllustrationWrapperSection>
  );
};

export default Locked;
