import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { LightFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { DIFFICULTY_WORD, LEETCODE_PROBLEM_LIST, STATUS_WORD, LeetCodeProblemListType } from '@/const/problemConst';
import { IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';

const { useRef, useState, useEffect, useMemo } = React;

export type ProblemsFilterObj = {
  list: LeetCodeProblemListType['CN'] | LeetCodeProblemListType['EN'] | '';
  difficulty: Difficulty | '';
  status: Status | '';
  search: string | '';
};

interface ProblemFilterProps {
  onFilterChange: (val: ProblemsFilterObj) => unknown;
  hasRouterQuery?: boolean;
}

const ProblemFilterSection = styled.section`
  padding-bottom: 8px;
  padding-left: 8px;
  .ant-pro-core-field-label {
    background-color: ${COLOR_PALETTE.LEETECHO_INPUT_BACKGROUND};
    padding-left: 12px;
    padding-right: 12px;
    :hover {
      background-color: ${COLOR_PALETTE.LEETECHO_INPUT_HOVER_BG};
    }
  }
`;

const ProblemFilter: React.FC<ProblemFilterProps> = (props: ProblemFilterProps) => {
  const { onFilterChange, hasRouterQuery = false } = props;

  return (
    <ProblemFilterSection>
      <LightFilter
        initialValues={{}}
        size={'middle'}
        onFinish={async (val: ProblemsFilterObj) => {
          onFilterChange?.(val);
        }}
      >
        <ProFormSelect
          name="list"
          label="题单"
          allowClear={true}
          fieldProps={{}}
          valueEnum={Object.values(LEETCODE_PROBLEM_LIST.CN).reduce((acc, v) => {
            return { ...acc, [v.listId]: v.name };
          }, {})}
        />
        <ProFormSelect name="difficulty" label="难度" allowClear={true} fieldProps={{}} valueEnum={DIFFICULTY_WORD} />
        <ProFormSelect name="status" label="状态" fieldProps={{}} allowClear={true} valueEnum={STATUS_WORD} />
        {!hasRouterQuery && (
          <ProFormText
            name="search"
            label="搜索题目，编号或内容"
            width="lg"
            fieldProps={{
              prefix: <IconSearch style={withSemiIconStyle({ top: 0 })}></IconSearch>,
              placeholder: '搜索',
            }}
          />
        )}
      </LightFilter>
    </ProblemFilterSection>
  );
};

export default ProblemFilter;
