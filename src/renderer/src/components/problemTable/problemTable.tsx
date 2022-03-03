import * as React from 'react';
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { SpinProps, Table, Tag } from 'antd';
import { ColumnsType, ColumnType, TablePaginationConfig } from 'antd/lib/table';
import { COLOR_PALETTE } from 'src/const/theme/color';
import { IconMinus, IconPulse, IconTick } from '@douyinfe/semi-icons';
import { getI18nWord } from '@/const/i18n';
import { withSemiIconStyle } from '@/style';
import { random } from 'lodash';

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
}

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
        NOT_STARTED: <IconMinus style={withSemiIconStyle({ color: statusIconColorMap.NOT_STARTED })} />,
        AC: <IconTick style={withSemiIconStyle({ color: statusIconColorMap.AC })} />,
        TRIED: <IconPulse style={withSemiIconStyle({ color: statusIconColorMap.TRIED })} />,
      };
      return statusIconMap[status];
    },
  },
  {
    title: '题目',
    dataIndex: 'title',
    key: 'title',
    render: (_, record) => (
      <>
        <section>{`${record.titleCn}`}</section>
        <section>{record.title}</section>
      </>
    ),
  },
  {
    title: '通过率',
    dataIndex: 'acRate',
    key: 'acRate',
    render: (acRate: number) => <>{`${(acRate * 100).toFixed(2)}%`}</>,
  },
  {
    title: '难度',
    dataIndex: 'difficulty',
    key: 'difficulty',
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
    render: (topicTags: UnArray<GetProblemsResp['data']['questions']>['topicTags'], record) => (
      <>
        {topicTags?.map((e) => (
          <Tag key={e?.id || e?.slug || e?.name || random()}>{e.nameTranslated || e.name}</Tag>
        ))}
      </>
    ),
  },
];

function ProblemTable<RecordType extends UnArray<GetProblemsResp['data']['questions']>>(
  props: React.PropsWithChildren<ProblemTableProps<RecordType>>,
) {
  const {
    tableStatus: { isLoading, pagination = {} },
    tableConst: { dataSource = [], columns = defaultColumns },
  } = props;

  console.log('%c dataSource >>>', 'background: yellow; color: blue', dataSource);

  return (
    <Table
      dataSource={dataSource || []}
      loading={isLoading}
      columns={columns as ColumnsType<RecordType>}
      pagination={pagination}
    />
  );
}

export default ProblemTable;
