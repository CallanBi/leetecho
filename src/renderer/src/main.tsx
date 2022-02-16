import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './samples/electron-store';
import './index.less';
import App from './app';
import { HashRouter } from 'react-router-dom';
import WithAppStoreProvider from './store/appStore/withAppStoreProvider';

const { bridge: { removeLoading, ipcRenderer } } = window;


ReactDOM.render(
  <WithAppStoreProvider>
    <HashRouter>
      <App />
    </HashRouter>,
  </WithAppStoreProvider>,
  document.getElementById('root'),
  () => {
    removeLoading();
  },
);


// -----------------------------------------------------------

// console.log('contextBridge ->', window.bridge);

// Use ipcRenderer.on
ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});



const home = ipcRenderer.sendSync('get-path', 'home');

console.log('%c get-path home >>>', 'background: yellow; color: blue', home ?? undefined);