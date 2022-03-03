import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './storage/electron-store';
import './index.less';
import { HashRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import globalStyles from './style';
import AppStoreProvider from './store/appStore';
import App from './app';
import { defaultOptions } from './const/reactQuery/reactQuerySettings';

const { bridge: { removeLoading, ipcRenderer } } = window;

const queryClient = new QueryClient({
  defaultOptions,
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <Global styles={globalStyles} />
      <HashRouter>
        <App />
      </HashRouter>
      ,
    </AppStoreProvider>
    ,
  </QueryClientProvider>,
  document.getElementById('root'),
  () => {
    removeLoading();
  },
);
