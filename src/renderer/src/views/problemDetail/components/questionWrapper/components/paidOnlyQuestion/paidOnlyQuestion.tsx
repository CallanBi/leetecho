import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import Locked from '@/components/illustration/locked';

const { useRef, useState, useEffect, useMemo } = React;

interface PaidOnlyQuestionProps {}

const PaidOnlyQuestionWrapper = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80%;
`;

const PaidOnlyQuestion: React.FC<PaidOnlyQuestionProps> = (props: PaidOnlyQuestionProps) => {
  const {} = props;

  return (
    <PaidOnlyQuestionWrapper>
      <Locked></Locked>
    </PaidOnlyQuestionWrapper>
  );
};

export default PaidOnlyQuestion;
