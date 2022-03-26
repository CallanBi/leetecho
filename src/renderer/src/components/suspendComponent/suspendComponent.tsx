import { WithConditionalCSSProp } from '@emotion/react/types/jsx-namespace';
import * as React from 'react';
import WrappedLoading from '../illustration/loading/wrappedLoading';

const { Suspense } = React;

function withSuspend<T>(Component: React.LazyExoticComponent<React.FC<T>>) {
  const SuspendComponent = (
    props: JSX.IntrinsicAttributes &
    WithConditionalCSSProp<React.PropsWithRef<T & { children?: React.ReactNode }>> &
    React.PropsWithRef<T & { children?: React.ReactNode }>,
  ) => {
    const { children } = props;
    return (
      <Suspense fallback={<WrappedLoading style={{ height: '120px' }}></WrappedLoading>}>
        <Component {...props}>{children}</Component>
      </Suspense>
    );
  };

  return SuspendComponent as React.FC<T>;
}

export default withSuspend;
