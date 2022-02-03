import * as React from 'react';
import ReactDOM from 'react-dom';
import 'antd/dist/antd.css';
import './samples/electron-store';
import './index.less';
import App from './app';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
  () => {
    window.bridge.removeLoading();
  },
);

// -----------------------------------------------------------

// console.log('contextBridge ->', window.bridge);

// Use ipcRenderer.on
window.bridge.ipcRenderer.on('main-process-message', (_event, ...args) => {
  console.log('[Receive Main-process message]:', ...args);
});
