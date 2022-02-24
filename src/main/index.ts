import os from 'os';
import { join } from 'path';
import to from 'await-to-js';
import { app, BrowserWindow, ipcMain } from 'electron';
import './electronStore/electronStore';
import { DEFAULT_WINDOW_OPTIONS } from './const/electronOptions/window';

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = await import('electron-devtools-installer');
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

import Leetcode from './api/leetcodeApi';
import { EndPoint } from './api/leetcodeApi/utils/interfaces';
import Problem from './api/leetcodeApi/lib/problem';

process.setMaxListeners(0);

const isDev = process.env.NODE_ENV === 'development';

/* devTools 安装*/
const installDevTools = async () => {
  const [err, name] = await to(installExtension(REACT_DEVELOPER_TOOLS.id));
  if (err) {
    console.log('An error occurred: ', err);
    return;
  }
  console.log(`Added Extension:  ${name}`);
};


const isWin7 = os.release().startsWith('6.1');
if (isWin7) app.disableHardwareAcceleration();

if (!app.requestSingleInstanceLock()) {
  app.quit();
  process.exit(0);
}

let win: BrowserWindow | null = null;

async function createWindow() {
  win = new BrowserWindow({ ...DEFAULT_WINDOW_OPTIONS });

  win.setTitle('Leetecho');

  /** 去除菜单栏，保持跨平台风格统一 */
  win.removeMenu();

  if (app.isPackaged || process.env['DEBUG']) {
    win.loadFile(join(__dirname, '../renderer/index.html'));
  } else {
    const pkg = await import('../../package.json');
    const url = `http://${pkg.env.HOST || '127.0.0.1'}:${pkg.env.PORT}`;

    win.loadURL(url);
    win.webContents.openDevTools();
  }

  // Test active push message to Renderer-process.
  // win.webContents.on('did-finish-load', () => {
  //   win?.webContents.send('main-process-message', (new Date).toLocaleString());
  // });

  /** renderer 事件监听 */
  /** 注意：需要通过句点表示法访问 win 实例里的方法，不能解构，否则win 实例的 this 得不到保留，会报错*/

  // ipcMain.on('get-path', (event, args: Parameters<typeof app.getPath>[0]) => {
  //   event.returnValue = app.getPath(args);
  // });

  const getWinStatus = () => {
    if (!win) {
      return '';
    }

    const isMaximized = win.isMaximized();
    const isMinimized = win.isMinimized();

    const allWindows = BrowserWindow.getAllWindows();
    return isMaximized ? 'maximized' : (isMinimized ? 'minimized' : (allWindows.length === 0 ? 'closed' : 'windowed')) as WindowStatus;
  };

  ipcMain.on('get-win-status', (event) => {
    if (!win) {
      return;
    }
    event.returnValue = getWinStatus();
  });

  ipcMain.on('set-win-status', (event, params: SetWinStatusReq) => {
    if (!win) {
      return;
    }
    switch (params) {
      case 'maximized':
        win.maximize();
        break;
      case 'minimized':
        win.minimize();
        break;
      case 'closed':
        win.close();
        break;
      case 'windowed':
        win.unmaximize();
        break;
      default:
        event.sender.send('set-win-status', { isSuccessful: false, winStatus: getWinStatus() } as SetWinStatusResp);
        return;
    }
    event.sender.send('set-win-status', { isSuccessful: true, winStatus: params } as SetWinStatusResp);
  });

  /** win 状态监听 */
  win?.on('maximize', () => {
    win?.webContents.send('maximized', { isSuccessful: true, winStatus: 'maximized' } as MaximizedResp);
  });

  win?.on('unmaximize', () => {
    win?.webContents.send('windowed', { isSuccessful: true, winStatus: 'windowed' } as WindowedResp);
  });
}

/** 监听 IO */
app.whenReady().then(() => {
  if (isDev) {
    installDevTools();
  }
  createWindow();
});

app.on('window-all-closed', () => {
  win = null;
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('second-instance', () => {
  if (win) {
    // Someone tried to run a second instance, we should focus our window.
    if (win.isMinimized()) {
      win.restore();
    }
    win.focus();
  }
});

app.on('activate', () => {
  const allWindows = BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});


(async (): Promise<void> => {

  // Login
  const leetcode: Leetcode = await Leetcode.build(
    "your_account",
    "your_pass",
    EndPoint.CN
  );


  const problem: Problem = new Problem("two-sum");

  // Fetch more properties of this problem
  await problem.detail();

  // console.log('%c problem >>>', 'background: yellow; color: blue', problem);


  const problems: Array<Problem> = await leetcode.getAllProblems();

  if (problem) {
    console.log('%c problems >>>', 'background: yellow; color: blue', problems);
  }


})();