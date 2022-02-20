import * as React from 'react';
import withStoreProvider from '../withStoreProvider';

export type AppState = {
  uiStatus: {
    /** 侧边导航条是否折叠，目前禁用折叠，默认展开 */
    isNavCollapsed?: boolean;
    /** 窗口状况 */
    windowStatus?: 'maximized' | 'minimized' | 'closed' | 'windowed';
  };
};

export const initState: AppState = {
  uiStatus: {
    isNavCollapsed: false,
    windowStatus: 'windowed',
  },
};

export type AppActionType = 'change-ui-status';

export type AppAction = {
  appActionType: 'change-ui-status';
  payload: Partial<AppState['uiStatus']>;
  isReplacement?: boolean;
}

export const AppStoreContext = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initState, dispatch: _ => { /** noop */ } });


export const reducer: React.Reducer<AppState, AppAction> = (state, appAction) => {
  const { appActionType } = appAction;

  switch (appActionType) {
    case 'change-ui-status':
      if (appAction.isReplacement) {
        return { ...state, uiStatus: appAction.payload };
      } else {
        return { ...state, uiStatus: { ...state.uiStatus, ...appAction.payload } };
      }
    default:
      return state;
  }
};

const AppStoreProvider = withStoreProvider<AppState, AppAction>({ reducer, initState, StoreContext: AppStoreContext });
export default AppStoreProvider;