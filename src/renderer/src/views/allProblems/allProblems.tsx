import { Spin, Table, TablePaginationConfig, TableProps } from 'antd';
import * as React from 'react';
import Loading from '@/components/loading';
import { useGetProblems } from '@/rendererApi/problems';
import { useGetAllTags } from '@/rendererApi/tags';
import {} from 'react-query';

import ProblemTable from '../../components/problemTable';
import ProblemFilter from '@/components/problemFilter';
import { ProblemsFilterObj } from '@/components/problemFilter/problemFilter';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';

const { useRef, useState, useEffect, useMemo } = React;

interface AllProblemsProp {}

const defaultProps: AllProblemsProp = {};

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {
  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems({});

  const [requestParams, setRequestParams] = useState<{
    pageStatus: {
      page?: number;
      pageSize?: number;
      current?: number;
      size?: number;
    };
    filterStatus: ProblemsFilterObj;
    enableRequest: boolean;
  }>({
    pageStatus: {
      page: 0,
      pageSize: 0,
      current: 0,
      size: 0,
    },
    filterStatus: {
      list: '',
      difficulty: '',
      status: '',
      search: '',
    },
    enableRequest: false,
  });

  console.log('%c getProblemsData.questions >>>', 'background: yellow; color: blue', getProblemsData?.questions);

  const onPageChange = (page: number, pageSize: number) => {
    console.log('%c page, pageSize >>>', 'background: yellow; color: blue', { page, pageSize });
  };

  const onPageShowSizeChange = (current: number, size: number) => {
    console.log('%c current, size >>>', 'background: yellow; color: blue', { current, size });
  };

  const onFilterChange = (val: ProblemsFilterObj) => {
    console.log('%c FormVal >>>', 'background: yellow; color: blue', val);
  };

  const onTableSorterChange: TableProps<UnArray<GetProblemsResp['data']['questions']>>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    console.log('%c  onTableSorterChange>>>', 'background: yellow; color: blue', {
      pagination,
      filters,
      sorter,
      extra,
    });
  };

  return (
    <>
      <ProblemFilter onFilterChange={onFilterChange}></ProblemFilter>
      <ProblemTable
        tableConst={{
          dataSource: getProblemsData?.questions || [],
        }}
        tableStatus={{
          isLoading: { indicator: Loading, spinning: isGetProblemsLoading },
          pagination: {
            pageSize: 50,
            total: getProblemsData?.total || 0,
            onChange: onPageChange,
            onShowSizeChange: onPageShowSizeChange,
          },
        }}
        onChange={onTableSorterChange}
        isError={isGetProblemsError}
      />
    </>
  );
};

export default AllProblems;
