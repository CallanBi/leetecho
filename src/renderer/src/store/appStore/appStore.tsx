import * as React from 'react';
import withStoreProvider from '../withStoreProvider';

export type AppState = {
  uiStatus: {
    /** 侧边导航条是否折叠，目前禁用折叠，默认展开 */
    isNavCollapsed?: boolean;
    isNavShown: boolean;
  };
  userState: {
    isLogin: boolean;
    usrName?: string;
    endPoint?: 'CN' | 'US';
    avatar?: string;
  };
};

export const initState: AppState = {
  uiStatus: {
    isNavCollapsed: false,
    isNavShown: true,
  },
  userState: {
    isLogin: false,
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

    default:
      return state;
  }
};

const AppStoreProvider = withStoreProvider<AppState, AppAction>({ reducer, initState, StoreContext: AppStoreContext });
export default AppStoreProvider;
