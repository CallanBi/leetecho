import { Spin, Table, TablePaginationConfig, TableProps } from 'antd';
import * as React from 'react';
import Loading from '@/components/loading';
import { useGetProblems } from '@/rendererApi/problems';
import { useGetAllTags } from '@/rendererApi/tags';
import { UseQueryOptions } from 'react-query';

import ProblemTable from '../../components/problemTable';
import ProblemFilter from '@/components/problemFilter';
import { ProblemsFilterObj } from '@/components/problemFilter/problemFilter';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { ProblemItemFromGraphQL } from 'src/main/api/leetcodeApi/utils/interfaces';
import { COLUMN_KEY_SORTER_KEY_MAP, TABLE_SORTER_ORDER_MAP } from './const';

const { useRef, useState, useEffect, useMemo } = React;

interface AllProblemsProp {}

const defaultProps: AllProblemsProp = {};

const AllProblems: React.FC<AllProblemsProp> = (props: AllProblemsProp = defaultProps) => {
  const [requestParams, setRequestParams] = useState<{
    pageStatus: {
      pageSize?: number;
      current?: number;
    };
    sorterStatus: SorterResult<ProblemItemFromGraphQL>;
    filterStatus: ProblemsFilterObj;
    enableRequest: boolean;
  }>({
    pageStatus: {
      pageSize: 10,
      current: 1,
    },
    filterStatus: {
      list: '',
      difficulty: '',
      status: '',
      search: '',
    },
    sorterStatus: {},
    enableRequest: true,
  });

  const onRequestSuccess = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const onRequestError = () => {
    if (requestParams.enableRequest) {
      setRequestParams({ ...requestParams, enableRequest: false });
    }
  };

  const queryArgs: GetProblemsReq = {
    categorySlug: '',
    /** skip: for pagination, the number of problems to skip. Calculated by pageSize * pageNum. Default value is 0 */
    skip: ((requestParams?.pageStatus?.current || 1) - 1) * (requestParams?.pageStatus?.pageSize || 10),
    /** limit: for pagination, default value is 10 */
    limit: requestParams?.pageStatus?.pageSize || 10,
    filters: {
      difficulty: requestParams.filterStatus.difficulty,
      status: requestParams.filterStatus.status,
      /** searchKeywords: problem title, frontend id or content */
      searchKeywords: requestParams.filterStatus.search,
      /** tags: tags that a problem belongs to, defined as tagSlug */
      tags: [],
      /** listId: problem list that a problem belongs to */
      listId: requestParams?.filterStatus?.list || '',
      orderBy: COLUMN_KEY_SORTER_KEY_MAP[
        (requestParams?.sorterStatus?.columnKey as keyof typeof COLUMN_KEY_SORTER_KEY_MAP) || ''
      ] as '' | 'FRONTEND_ID' | 'AC_RATE' | 'DIFFICULTY',
      sortOrder: TABLE_SORTER_ORDER_MAP[
        (requestParams?.sorterStatus?.order as keyof typeof TABLE_SORTER_ORDER_MAP) || ''
      ] as 'DESCENDING' | 'ASCENDING' | '',
    },
  };

  const queryOptions: Omit<UseQueryOptions<GetProblemsResp['data'], Error>, 'queryKey' | 'queryFn'> = {
    enabled: requestParams.enableRequest,
    onSuccess: onRequestSuccess,
    onError: onRequestError,
  };

  console.log('%c  queryArgs>>>', 'background: yellow; color: blue', queryArgs);
  console.log('%c  queryOptions>>>', 'background: yellow; color: blue', queryOptions);

  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems(queryArgs, queryOptions);

  console.log('%c getProblemsData >>>', 'background: yellow; color: blue', getProblemsData);

  const onFilterChange = (val: ProblemsFilterObj) => {
    console.log('%c FormVal >>>', 'background: yellow; color: blue', val);
    const { list, difficulty, status, search } = val;
    setRequestParams({
      ...requestParams,
      filterStatus: {
        ...requestParams.filterStatus,
        list,
        difficulty,
        status,
        search,
      },
      pageStatus: {
        ...requestParams.pageStatus,
        current: 1,
      },
      enableRequest: true,
    });
  };

  const onTableSorterAndPageChange: TableProps<UnArray<GetProblemsResp['data']['questions']>>['onChange'] = (
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
    const { current, pageSize } = pagination;
    setRequestParams({
      ...requestParams,
      pageStatus: {
        ...requestParams.pageStatus,
        current: pageSize !== requestParams.pageStatus.pageSize ? 1 : current,
        pageSize,
      },
      sorterStatus: {
        ...requestParams.sorterStatus,
        ...sorter,
      },
      enableRequest: true,
    });
  };

  console.log('%c requestParams >>>', 'background: yellow; color: blue', requestParams);

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
            pageSize: requestParams?.pageStatus?.pageSize || 10,
            total: getProblemsData?.total || 0,
            current: requestParams?.pageStatus?.current || 1,
          },
        }}
        onChange={onTableSorterAndPageChange}
        isError={isGetProblemsError}
        listId={requestParams?.filterStatus?.list || ''}
      />
    </>
  );
};

export default AllProblems;
