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
import { AppStoreContext } from '@/store/appStore/appStore';

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

  const { state: appState, dispatch: appDispatch } = React.useContext(AppStoreContext);

  const router = useRouter();

  const { query } = router;

  const { search: routerSearchString } = query as { search?: string };

  if (routerSearchString === undefined) {
    /** noop */
  }

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

  const {
    problemFilterState: { filterStatus = {}, sorterStatus = {}, pageStatus = {} },
  } = appState;

  useEffect(() => {
    const isFilterStateEqual = () => {
      const { list = '', difficulty = '', status = '', search = '', tags = [] } = requestParams?.filterStatus || {};
      const isFilterStatusEqual =
        list === filterStatus?.list &&
        difficulty === filterStatus?.difficulty &&
        status === filterStatus?.status &&
        search === filterStatus?.search;
      const { order = '', columnKey = '' } = requestParams?.sorterStatus || {};

      const isSortStatusEqual = sorterStatus?.columnKey === columnKey && sorterStatus?.order === order;

      const { current = 1, pageSize = 10 } = requestParams?.pageStatus || {};

      const isPageStatusEqual = pageStatus?.current === current && pageStatus?.pageSize === pageSize;

      return isFilterStatusEqual && isSortStatusEqual && isPageStatusEqual;
    };

    if (!isFilterStateEqual()) {
      setRequestParams({
        ...requestParams,
        filterStatus: {
          ...requestParams.filterStatus,
          ...filterStatus,
        },
        sorterStatus: {
          ...requestParams.sorterStatus,
          ...sorterStatus,
        },
        pageStatus: {
          ...requestParams.pageStatus,
          ...pageStatus,
        },
        enableRequest: true,
      });
      appDispatch({
        appActionType: 'change-problem-filter-status',
        payload: {
          ...appState.problemFilterState,
          pageStatus: {
            ...appState.problemFilterState?.pageStatus,
            ...pageStatus,
          },
          sorterStatus: {
            ...appState.problemFilterState?.sorterStatus,
            ...sorterStatus,
          },
          filterStatus: {
            ...appState.problemFilterState?.filterStatus,
            ...filterStatus,
          },
        },
      });
    }
  }, []);

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
    appDispatch({
      appActionType: 'change-problem-filter-status',
      payload: {
        ...appState.problemFilterState,
        filterStatus: {
          ...appState.problemFilterState?.filterStatus,
          list,
          difficulty,
          status,
          search,
        },
        pageStatus: {
          ...appState.problemFilterState?.pageStatus,
          current: 1,
        },
      },
    });
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
    const { problemFilterState } = appState;
    appDispatch({
      appActionType: 'change-problem-filter-status',
      payload: {
        ...appState.problemFilterState,
        pageStatus: {
          ...appState.problemFilterState?.pageStatus,
          current:
            problemFilterState?.pageStatus?.pageSize !== pageSize ||
            (problemFilterState?.sorterStatus?.order !== (sorter?.order || '') && sorter?.order !== undefined)
              ? 1
              : current,
          pageSize,
        },
        sorterStatus: {
          ...appState.problemFilterState?.sorterStatus,
          ...sorter,
        },
      },
    });
    setRequestParams({
      ...requestParams,
      pageStatus: {
        ...requestParams.pageStatus,
        current:
          pageSize !== requestParams.pageStatus.pageSize ||
          (requestParams.sorterStatus.order !== (sorter.order || '') && sorter?.order !== undefined)
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
        <ProblemFilter onChange={onFilterChange} paramsSyncToStore={true}></ProblemFilter>
      )}
      {hasRouterSearchQuery && routerSearchString !== '' && (
        <PageHeader
          style={{ paddingTop: 0, paddingBottom: 0, paddingLeft: 8 }}
          className="site-page-header"
          onBack={() => {
            router.history.goBack();
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
              appDispatch({
                appActionType: 'change-problem-filter-status',
                payload: {
                  ...appState.problemFilterState,
                  pageStatus: {
                    ...appState.problemFilterState?.pageStatus,
                    ...requestParams.pageStatus,
                  },
                  sorterStatus: {
                    ...appState.problemFilterState?.sorterStatus,
                    ...requestParams.sorterStatus,
                  },
                  filterStatus: {
                    ...appState.problemFilterState?.filterStatus,
                    ...requestParams.filterStatus,
                  },
                },
              });
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

export default React.memo(AllProblems);
