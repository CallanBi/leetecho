/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';

export type AppState = {
  uiStatus: {
    /** 侧边导航条是否折叠，目前禁用折叠，默认展开 */
    isNavCollapsed: boolean;
  };
};

export const initState: AppState = {
  uiStatus: {
    isNavCollapsed: false,
  },
};

export type AppActionType = 'change-ui-status';


export type AppAction = {
  appActionType: 'change-ui-status';
  payload: {
    isNavCollapsed: boolean;
  };
  isReplacement?: boolean;
};

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
        console.log('%c 111 >>>', 'background: yellow; color: blue', appAction);

        return { ...state, uiStatus: { ...state.uiStatus, ...appAction.payload } };
      }
    default:
      return state;
  }
};