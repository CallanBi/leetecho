import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { LightFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { DIFFICULTY_WORD, LEETCODE_PROBLEM_LIST, STATUS_WORD, LeetCodeProblemListType } from '@/const/problemConst';
import { IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';
import TagSelector from '../tagSelector';
import { Form, Select, Tag } from 'antd';
import { FormattedTagItem, labelsTypeIsFormattedTags, labelTypeIsFormattedTag } from '../tagSelector/tagSelector';

const { useRef, useState, useEffect, useMemo } = React;

export type ProblemsFilterObj = {
  list: LeetCodeProblemListType['CN'] | LeetCodeProblemListType['EN'] | '';
  difficulty: Difficulty | '';
  status: Status | '';
  search: string | '';
  tags?: string[];
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

const SelectedTagsDisplaySection = styled.section`
  padding-top: 12px;
`;

const ProblemFilter: React.FC<ProblemFilterProps> = (props: ProblemFilterProps) => {
  const { onFilterChange, hasRouterQuery = false } = props;

  const [selectedTagsValue, setSelectedTagsValue] = useState<FormattedTagItem[]>([]);
  const [filterVal, setFilterVal] = useState<ProblemsFilterObj>({
    list: '',
    difficulty: '',
    status: '',
    search: '',
  });

  const onTagsValueChange = (val: FormattedTagItem[] | string[]) => {
    setSelectedTagsValue(val as FormattedTagItem[]);
  };

  useEffect(() => {
    onFilterChange?.({ ...filterVal, tags: selectedTagsValue.map?.((t) => t.value || '') || [] });
    return () => {
      /** noop */
    };
  }, [selectedTagsValue]);

  return (
    <ProblemFilterSection>
      <LightFilter
        initialValues={{}}
        size={'middle'}
        onFinish={async (val: ProblemsFilterObj) => {
          setFilterVal(val);
          onFilterChange?.({ ...val, tags: selectedTagsValue.map?.((t) => t.value || '') || [] });
        }}
      >
        <ProFormSelect
          name="list"
          label="题单"
          allowClear={true}
          valueEnum={Object.values(LEETCODE_PROBLEM_LIST.CN).reduce((acc, v) => {
            return { ...acc, [v.listId]: v.name };
          }, {})}
          fieldProps={{
            dropdownMatchSelectWidth: 198,
          }}
        />
        <ProFormSelect name="difficulty" label="难度" allowClear={true} valueEnum={DIFFICULTY_WORD} />
        <ProFormSelect name="status" label="状态" allowClear={true} valueEnum={STATUS_WORD} />
        <TagSelector labelInValue value={selectedTagsValue} onChange={onTagsValueChange}></TagSelector>
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
      <SelectedTagsDisplaySection>
        {selectedTagsValue?.map((tag) => (
          <Tag
            key={tag.value}
            closable={true}
            onClose={(e) => {
              e.preventDefault(); // disable default closing tag movement
              const filteredTags = selectedTagsValue.filter((t) => t.value !== tag.value);
              setSelectedTagsValue(filteredTags);
            }}
          >
            {tag.label}
          </Tag>
        ))}
      </SelectedTagsDisplaySection>
    </ProblemFilterSection>
  );
};

export default ProblemFilter;