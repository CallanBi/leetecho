import * as React from 'react';
import { AppStoreContext, reducer, initState } from '.';

const { useReducer } = React;

const WithAppStoreProvider: React.FC<Record<string, unknown>> = (props: React.PropsWithChildren<Record<string, unknown>>) => {
  // 将 state 作为根节点的状态注入到子组件中
  const [state, dispatch] = useReducer(reducer, initState);
  const { children } = props;

  return <AppStoreContext.Provider value={{ state, dispatch }}>{children}</AppStoreContext.Provider>;
};

export default WithAppStoreProvider;