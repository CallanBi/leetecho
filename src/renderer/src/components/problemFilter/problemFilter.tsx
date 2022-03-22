import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { LightFilter, ProFormText, ProFormSelect } from '@ant-design/pro-form';
import { DIFFICULTY_WORD, LEETCODE_PROBLEM_LIST, STATUS_WORD, LeetCodeProblemListType } from '@/const/problemConst';
import { IconSearch } from '@douyinfe/semi-icons';
import { withSemiIconStyle } from '@/style';
import { COLOR_PALETTE } from 'src/const/theme/color';
import TagSelector from '../tagSelector';
import { Tag } from 'antd';
import { FormattedTagItem } from '../tagSelector/tagSelector';

const { useRef, useState, useEffect, useMemo } = React;

export type ProblemsFilterObj = {
  list: LeetCodeProblemListType['CN'] | LeetCodeProblemListType['EN'] | '';
  difficulty: Difficulty | '';
  status: Status | '';
  search: string | '';
  tags?: string[];
};

interface ProblemFilterProps {
  onChange: (val: ProblemsFilterObj) => unknown;
  hasRouterQuery?: boolean;
  style?: React.CSSProperties;
  invisibleItem?: (keyof ProblemsFilterObj)[];
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

const ProblemFilter: React.FC<ProblemFilterProps> = (props: React.PropsWithChildren<ProblemFilterProps>) => {
  const { onChange, hasRouterQuery = false, style = {}, invisibleItem = [], children } = props;

  const [selectedTagsValue, setSelectedTagsValue] = useState<FormattedTagItem[]>([]);
  const [filterVal, setFilterVal] = useState<ProblemsFilterObj>({
    list: '',
    difficulty: '',
    status: '',
    search: '',
  });

  const onTagsValueChange = (val: FormattedTagItem[] | string[]) => {
    setSelectedTagsValue(val as FormattedTagItem[]);
    // const paramsString = location.search;
    // const searchParams = new URLSearchParams(paramsString);
    // if (searchParams.has('labels')) {
    //   searchParams.set
    // }
  };

  useEffect(() => {
    onChange?.({ ...filterVal, tags: selectedTagsValue.map?.((t) => t.value || '') || [] });
    return () => {
      /** noop */
    };
  }, [selectedTagsValue]);

  return (
    <ProblemFilterSection style={style}>
      <LightFilter
        initialValues={{}}
        size={'middle'}
        onFinish={async (val: ProblemsFilterObj) => {
          setFilterVal(val);
          onChange?.({ ...val, tags: selectedTagsValue.map?.((t) => t.value || '') || [] });
        }}
      >
        {!invisibleItem.includes('list') && (
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
        )}
        {!invisibleItem.includes('difficulty') && (
          <ProFormSelect name="difficulty" label="难度" allowClear={true} valueEnum={DIFFICULTY_WORD} />
        )}
        {!invisibleItem.includes('status') && (
          <ProFormSelect name="status" label="状态" allowClear={true} valueEnum={STATUS_WORD} />
        )}
        {!invisibleItem.includes('tags') && (
          <TagSelector labelInValue value={selectedTagsValue} onChange={onTagsValueChange}></TagSelector>
        )}
        {!invisibleItem.includes('search') && !hasRouterQuery && (
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
        {children}
      </LightFilter>
      {!invisibleItem.includes('tags') && (
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
      )}
    </ProblemFilterSection>
  );
};

export default ProblemFilter;
