import * as React from 'react';

const { useReducer } = React;

type WithProviderProps<State, Action> = {
  reducer: React.Reducer<State, Action>;
  initState: State;
  StoreContext: React.Context<{
    state: State;
    dispatch: React.Dispatch<Action>;
  }>;
  [key: string]: unknown;
};

/**
 * produces HOC that wrap child components who need the store
 * @param props {
 *    reducer: React.Reducer<State, Action>;
 *    initState: State;
 *    StoreContext: React.Context<{
 *      state: State;
 *      dispatch: React.Dispatch<Action>;
 *    }>;
 *    [key: string]: unknown;
 * };
 * @returns React.ReactNode
 */
function withStoreProvider<State, Action>(props: React.PropsWithChildren<WithProviderProps<State, Action>>) {
  const { reducer, initState, StoreContext } = props;

  const StoreProvider: React.FC<React.PropsWithChildren<WithProviderProps<State, Action>>> = (
    props: React.PropsWithChildren<Record<string, unknown>>,
  ) => {
    const [state, dispatch] = useReducer(reducer, initState);
    const { children } = props;
    return <StoreContext.Provider value={{ state, dispatch }}>{children}</StoreContext.Provider>;
  };

  return StoreProvider as React.FC<Record<string, unknown>>;
}

export default withStoreProvider;
