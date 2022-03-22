import { Button, PageHeader, Spin, Table, TablePaginationConfig, TableProps } from 'antd';
import * as React from 'react';
import Loading from '@/components/illustration/loading';
import { useGetProblems } from '@/rendererApi/problems';
import { UseQueryOptions } from 'react-query';

import ProblemTable from '../../components/problemTable';
import ProblemFilter from '@/components/problemFilter';
import { ProblemsFilterObj } from '@/components/problemFilter/problemFilter';
import { FilterValue, SorterResult, TableCurrentDataSource } from 'antd/lib/table/interface';
import { ProblemItemFromGraphQL } from 'src/main/services/leetcodeServices/utils/interfaces';
import { COLUMN_KEY_SORTER_KEY_MAP, TABLE_SORTER_ORDER_MAP } from './const';
import { useRouter } from '@/hooks/router/useRouter';
import WrappedLoading from '@/components/illustration/loading/wrappedLoading';

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

  const router = useRouter();

  const { query } = router;

  const { search: routerSearchString = '' } = query as { search?: string };

  const hasRouterSearchQuery = Boolean(routerSearchString) || routerSearchString === '';

  if (hasRouterSearchQuery && routerSearchString !== '') {
    if (requestParams.filterStatus.search !== routerSearchString) {
      setRequestParams({
        pageStatus: {
          pageSize: 10,
          current: 1,
        },
        filterStatus: { list: '', difficulty: '', status: '', search: routerSearchString },
        sorterStatus: {},
        enableRequest: true,
      });
    }
  }

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
      difficulty: requestParams?.filterStatus?.difficulty || '',
      status: requestParams?.filterStatus?.status || '',
      /** searchKeywords: problem title, frontend id or content */
      searchKeywords: requestParams?.filterStatus?.search || '',
      /** tags: tags that a problem belongs to, defined as tagSlug */
      tags: requestParams?.filterStatus?.tags || [],
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

  const {
    isLoading: isGetProblemsLoading,
    isSuccess: isGetProblemsSuccess,
    isError: isGetProblemsError,
    data: getProblemsData,
    error: getProblemsError,
  } = useGetProblems(queryArgs, queryOptions);

  const onFilterChange = (val: ProblemsFilterObj) => {
    const { list = '', difficulty = '', status = '', search = '', tags = [] } = val;
    setRequestParams({
      ...requestParams,
      filterStatus: {
        ...requestParams.filterStatus,
        list,
        difficulty,
        status,
        search,
        tags,
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
    const { current, pageSize } = pagination;
    setRequestParams({
      ...requestParams,
      pageStatus: {
        ...requestParams.pageStatus,
        current:
          pageSize !== requestParams.pageStatus.pageSize || requestParams.sorterStatus.order !== sorter.order
            ? 1
            : current,
        pageSize,
      },
      sorterStatus: {
        ...requestParams.sorterStatus,
        ...sorter,
      },
      enableRequest: true,
    });
  };

  return (
    <>
      {(!hasRouterSearchQuery || routerSearchString === '') && (
        <ProblemFilter onChange={onFilterChange}></ProblemFilter>
      )}
      {hasRouterSearchQuery && routerSearchString !== '' && (
        // <Button
        //   type="link"
        //   style={{ color: COLOR_PALETTE.LEETECHO_LIGHT_BLUE }}
        //   onClick={() => {
        //     router.push('/allProblems');
        //     setRequestParams({
        //       pageStatus: {
        //         pageSize: 10,
        //         current: 1,
        //       },
        //       filterStatus: {
        //         list: '',
        //         difficulty: '',
        //         status: '',
        //         search: '',
        //       },
        //       sorterStatus: {},
        //       enableRequest: true,
        //     });
        //   }}
        // >
        //   {'< 返回'}
        // </Button>
        <PageHeader
          style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 8 }}
          className="site-page-header"
          onBack={() => {
            router.push('/allProblems');
            setRequestParams({
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
          }}
          title="所有习题"
          subTitle={
            getProblemsData?.total && getProblemsData.total > 0
              ? `「${routerSearchString}」的搜索结果：${getProblemsData.total} 条`
              : ''
          }
        />
      )}
      <ProblemTable
        tableConst={{
          dataSource: getProblemsData?.questions || [],
        }}
        tableStatus={{
          isLoading: {
            indicator: <WrappedLoading></WrappedLoading>,
            spinning: isGetProblemsLoading,
          },
          pagination: {
            pageSize: requestParams?.pageStatus?.pageSize || 10,
            total: getProblemsData?.total || 0,
            current: requestParams?.pageStatus?.current || 1,
          },
        }}
        onChange={onTableSorterAndPageChange}
        onRow={(record, index) => {
          return {
            onClick: (_) => {
              router.push(`/problemDetail?titleSlug=${record.titleSlug || ''}`);
            },
          };
        }}
        isError={isGetProblemsError}
        listId={requestParams?.filterStatus?.list || ''}
      />
    </>
  );
};

export default AllProblems;
