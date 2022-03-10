import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SpinProps, Table, Tag, Tooltip } from 'antd';
import { ColumnsType, ColumnType, TablePaginationConfig, TableProps } from 'antd/lib/table';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { IconMinus, IconPulse, IconTick } from '@douyinfe/semi-icons';
import { getI18nWord } from '@/const/i18n';
import { withSemiIconStyle } from '@/style';
import { noop, random } from 'lodash';
import { LeetCodeProblemListType, LEETCODE_PROBLEM_LIST, statusIconMap } from '@/const/problemConst';
import ErrorIllustrator from '../illustration/errorIllustrator';
// import ProTable, { TableDropdown } from '@ant-design/pro-table';

const { useRef, useState, useEffect, useMemo } = React;

const TableSection = styled.section`
  tbody {
    tr {
      cursor: pointer !important;
    }
  }
`;

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
  onRow: TableProps<RecordType>['onRow'];
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
    onChange = noop,
    onRow = (record, index) => {
      /** noop */
      return {
        onClick: (event) => {
          /** noop */
        },
        onDoubleClick: (event) => {
          /** noop */
        },
        onContextMenu: (event) => {
          /** noop */
        },
        onMouseEnter: (event) => {
          /** noop */
        },
        onMouseLeave: (event) => {
          /** noop */
        },
      };
    },
  } = props;

  return (
    <TableSection>
      {isError && <ErrorIllustrator></ErrorIllustrator>}
      <Table
        dataSource={dataSource || []}
        rowKey={(record) => record?.titleSlug || ''}
        loading={isLoading}
        columns={columns as ColumnsType<RecordType>}
        pagination={problemsPagination}
        onChange={onChange}
        onRow={onRow}
      />
    </TableSection>
  );
}

export default ProblemTable;
