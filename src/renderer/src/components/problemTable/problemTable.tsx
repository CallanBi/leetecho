import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SpinProps, Table, Tag, Tooltip } from 'antd';
import { ColumnsType, ColumnType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { IconMinus, IconPulse, IconTick } from '@douyinfe/semi-icons';
import { getI18nWord } from '@/const/i18n';
import { withSemiIconStyle } from '@/style';
import { random } from 'lodash';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { LeetCodeProblemListType, LEETCODE_PROBLEM_LIST } from '@/const/problemConst';

const { useRef, useState, useEffect, useMemo } = React;

interface ProblemTableProps<RecordType extends UnArray<GetProblemsResp['data']['questions']>> {
  tableConst: {
    dataSource?: RecordType[];
    columns?: ColumnType<RecordType>[];
  };
  tableStatus: {
    isLoading?: boolean | SpinProps;
    pagination?: TablePaginationConfig;
  };
  onChange: TableProps<RecordType>['onChange'];
  isError?: boolean;
  listId?: LeetCodeProblemListType['CN'] | LeetCodeProblemListType['EN'] | '';
  hasRouterQuery?: boolean;
}

function ProblemTable<RecordType extends UnArray<GetProblemsResp['data']['questions']>>(
  props: React.PropsWithChildren<ProblemTableProps<RecordType>>,
) {
  const { listId = '' } = props;

  const defaultColumns: ColumnType<UnArray<GetProblemsResp['data']['questions']>>[] = [
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: Status) => {
        const statusIconColorMap: { [key in Status]: string } = {
          NOT_STARTED: `${COLOR_PALETTE.LEETECHO_LIGHT_BLACK}`,
          AC: `${COLOR_PALETTE.LEETECHO_GREEN}`,
          TRIED: `${COLOR_PALETTE.LEETECHO_YELLOW}`,
        };
        const statusIconMap: { [key in Status]: React.ReactNode } = {
          NOT_STARTED: (
            <Tooltip title={getI18nWord('NOT_STARTED', 'ZH')} placement="bottomLeft">
              <IconMinus style={withSemiIconStyle({ color: statusIconColorMap.NOT_STARTED })} />
            </Tooltip>
          ),
          AC: (
            <Tooltip title={getI18nWord('AC', 'ZH')} placement="bottomLeft">
              <IconTick style={withSemiIconStyle({ color: statusIconColorMap.AC })} />
            </Tooltip>
          ),
          TRIED: (
            <Tooltip title={getI18nWord('TRIED', 'ZH')} placement="bottomLeft">
              <IconPulse style={withSemiIconStyle({ color: statusIconColorMap.TRIED })} />
            </Tooltip>
          ),
        };
        return statusIconMap[status];
      },
    },
    {
      title: '题目',
      dataIndex: 'title',
      key: 'title',
      sorter: true,
      render: (_, record) => (
        <>
          <section>{`${record?.frontendQuestionId || ''}. ${record?.titleCn || ''}`}</section>
          {listId !== LEETCODE_PROBLEM_LIST.CN.CODING_INTERVIEW_2.listId &&
            listId !== LEETCODE_PROBLEM_LIST.CN.CODING_INTERVIEW_SPECIAL.listId && (
            <section>{record?.title || ''}</section>
          )}
        </>
      ),
    },
    {
      title: '通过率',
      dataIndex: 'acRate',
      key: 'acRate',
      sorter: true,
      render: (acRate: number) => <>{`${(acRate * 100).toFixed(2)}%`}</>,
    },
    {
      title: '难度',
      dataIndex: 'difficulty',
      key: 'difficulty',
      sorter: true,
      render: (difficulty: Difficulty) => {
        const difficultyColorMap: { [key in Difficulty]: string } = {
          EASY: COLOR_PALETTE.LEETECHO_GREEN,
          MEDIUM: COLOR_PALETTE.LEETECHO_YELLOW,
          HARD: COLOR_PALETTE.LEETECHO_RED,
        };
        const difficultyTextMap: { [key in Difficulty]: string } = {
          EASY: getI18nWord('EASY', 'ZH'),
          MEDIUM: getI18nWord('MEDIUM', 'ZH'),
          HARD: getI18nWord('HARD', 'ZH'),
        };
        return <span style={{ color: difficultyColorMap[difficulty] }}>{difficultyTextMap[difficulty]}</span>;
      },
    },
    {
      title: '标签',
      dataIndex: 'topicTags',
      key: 'topicTags',
      render: (topicTags: UnArray<GetProblemsResp['data']['questions']>['topicTags']) => (
        <>
          {topicTags?.map((e) => (
            <Tag key={e?.id || e?.slug || e?.name || random()}>{e.nameTranslated || e.name}</Tag>
          ))}
        </>
      ),
    },
  ];

  const {
    tableStatus: { isLoading, pagination: problemsPagination = {} },
    tableConst: { dataSource = [], columns = defaultColumns },
    isError = false,
    onChange,
  } = props;

  return (
    <>
      {/* TODO: Add Error Components */}
      {isError && <div>Something goes wrong</div>}
      <Table
        dataSource={dataSource || []}
        rowKey={(record) => record?.titleSlug || ''}
        loading={isLoading}
        columns={columns as ColumnsType<RecordType>}
        pagination={problemsPagination}
        onChange={onChange}
      />
    </>
  );
}

export default ProblemTable;
