import { FormattedTagItem } from '@/components/tagSelector/tagSelector';
import { SorterResult } from 'antd/lib/table/interface';
import * as React from 'react';
import { ProblemsFilterObj } from 'src/main/router';
import { ProblemItemFromGraphQL } from 'src/main/services/leetcodeServices/utils/interfaces';
import withStoreProvider from '../withStoreProvider';

export type AppState = {
  appVersion: string;
  queryStatus: {
    checkRepoConnectionQuery: {
      enableRequest: boolean;
    };
  };
  uiStatus: {
    /** Now isNavCollapsed is unused  */
    isNavCollapsed?: boolean;
    isNavShown: boolean;
  };
  userState: {
    isLogin: boolean;
    /** user nick name fetched from LeetCode remote server */
    username: string;
    /** the user name used in log in section, could be user's email or user's nick name */
    usrName?: string;
    /** the string identifier for a unique user, fetched from LeetCode remote server */
    usrSlug?: string;
    endPoint?: 'CN' | 'US';
    /** user avatar link */
    avatar?: string;
  };
  problemFilterState?: {
    pageStatus?: {
      pageSize?: number;
      current?: number;
    };
    sorterStatus?: SorterResult<ProblemItemFromGraphQL>;
    filterStatus?: Omit<ProblemsFilterObj, 'tags'> & {
      tags: FormattedTagItem[];
    };
  };
};

export const initState: AppState = {
  appVersion: '0.0.2',
  uiStatus: {
    isNavCollapsed: false,
    isNavShown: true,
  },
  userState: {
    isLogin: false,
    username: '',
    usrName: '',
    usrSlug: '',
    endPoint: 'CN',
    avatar: '',
  },
  problemFilterState: {
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
    sorterStatus: {
      columnKey: '',
      order: '' as 'ascend' | 'descend',
      field: '',
    },
  },
  queryStatus: {
    checkRepoConnectionQuery: {
      enableRequest: false,
    },
  },
};

export type AppActionType = 'change-ui-status';

export type AppAction =
  | {
    appActionType: 'change-ui-status';
    payload: Partial<AppState['uiStatus']>;
    /** isReplacement: decide whether to replace or merge original data, false as default */
    isReplacement?: boolean;
  }
  | {
    appActionType: 'change-user-status';
    payload: Partial<AppState['userState']>;
    /** isReplacement: decide whether to replace or merge original data, false as default */
    isReplacement?: boolean;
  }
  | {
    appActionType: 'change-problem-filter-status';
    payload: Partial<AppState['problemFilterState']>;
    /** isReplacement: decide whether to replace or merge original data, false as default */
    isReplacement?: boolean;
  }
  | {
    appActionType: 'change-query-status';
    payload: Partial<AppState['queryStatus']>;
    /** isReplacement: decide whether to replace or merge original data, false as default */
    isReplacement?: boolean;
  };

export const AppStoreContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({
  state: initState,
  dispatch: (_) => {
    /** noop */
  },
});

export const reducer: React.Reducer<AppState, AppAction> = (state, appAction) => {
  const { appActionType } = appAction;

  switch (appActionType) {
    case 'change-ui-status':
      if (appAction.isReplacement) {
        return { ...state, uiStatus: appAction.payload };
      }
      return { ...state, uiStatus: { ...state.uiStatus, ...appAction.payload } };

    case 'change-user-status':
      if (appAction.isReplacement) {
        return { ...state, uiStatus: appAction.payload };
      }
      return { ...state, userState: { ...state.userState, ...appAction.payload } };

    case 'change-problem-filter-status':
      if (appAction.isReplacement) {
        return { ...state, problemFilterState: appAction.payload };
      }
      return { ...state, problemFilterState: { ...state.problemFilterState, ...appAction.payload } };

    case 'change-query-status':
      if (appAction.isReplacement) {
        return { ...state, queryStatus: appAction.payload };
      }
      return { ...state, queryStatus: { ...state.queryStatus, ...appAction.payload } };

    default:
      return state;
  }
};

const AppStoreProvider = withStoreProvider<AppState, AppAction>({ reducer, initState, StoreContext: AppStoreContext });
export default AppStoreProvider;
