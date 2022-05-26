import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './storage/electronStore';
import './index.less';
import 'material-design-icons-iconfont/dist/material-design-icons.css';

import { HashRouter } from 'react-router-dom';
import { Global } from '@emotion/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import globalStyles from './style';
import AppStoreProvider from './store/appStore';
import App from './app';
import { defaultOptions } from './const/reactQuery/reactQuerySettings';
import { ConfigProvider, message } from 'antd';

import Empty from './components/illustration/empty';
import { globalMessageConfig } from './const/layout';

message.config(globalMessageConfig);

const {
  bridge: { removeLoading },
} = window;

const queryClient = new QueryClient({
  defaultOptions,
});

ReactDOM.render(
  <QueryClientProvider client={queryClient}>
    <AppStoreProvider>
      <Global styles={globalStyles} />
      <HashRouter>
        <ConfigProvider renderEmpty={() => <Empty />}>
          <App />
        </ConfigProvider>
      </HashRouter>
    </AppStoreProvider>
    ,
  </QueryClientProvider>,
  document.getElementById('root'),
  () => {
    removeLoading();
  },
);
