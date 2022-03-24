import os from 'os';
import { join } from 'path';
import to from 'await-to-js';
import { app, BrowserWindow, ipcMain, shell } from 'electron';
import './electronStore/electronStore';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';
import { DEFAULT_WINDOW_OPTIONS } from './const/electronOptions/window';

// const { default: installExtension, REACT_DEVELOPER_TOOLS } = await import('electron-devtools-installer');

import './router/index';

import events from 'events';

events.EventEmitter.defaultMaxListeners = 100;

events.EventEmitter.setMaxListeners(100);

const isDev = process.env.NODE_ENV === 'development';

/* devTools installation */
const installDevTools = async () => {
  const [err, name] = await to(installExtension(REACT_DEVELOPER_TOOLS.id));
  if (err) {
    console.log('An error occurred in react dev tool initiation: ', err);
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

  /** remove menu bar to keep a unified style in all platforms */
  win.removeMenu();

  if (Boolean(app.isPackaged) && !process.env.DEBUG) {
    // isProductionEnv
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

  /** renderer event listener */
  /** NOTES:
   * Must visit functions in win instance by full stop.
   * Cannot use destructuring assignment, otherwise the this in the win instance will not be retained,
   * and will throw a error.
   * */

  const getWinStatus = () => {
    if (!win) {
      return;
    }

    const isMaximized = win.isMaximized();
    const isMinimized = win.isMinimized();

    const allWindows = BrowserWindow.getAllWindows();
    return isMaximized
      ? 'maximized'
      : ((isMinimized ? 'minimized' : allWindows.length === 0 ? 'closed' : 'windowed') as WindowStatus);
  };

  // ipcMain.on('get-path', (event, args: Parameters<typeof app.getPath>[0]) => {
  //   event.returnValue = app.getPath(args);
  // });

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

  /** win status listen */
  win?.on('maximize', () => {
    win?.webContents.send('maximized', { isSuccessful: true, winStatus: 'maximized' } as MaximizedResp);
  });

  win?.on('unmaximize', () => {
    win?.webContents.send('windowed', { isSuccessful: true, winStatus: 'windowed' } as WindowedResp);
  });
}

/** listen for IO */
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
    // if running a second instance is attempted, should restore the main window.
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

// use this to open links externally
app.on('web-contents-created', (e, webContents) => {
  webContents.on('new-window', (event, url) => {
    event.preventDefault();
    shell.openExternal(url);
  });
});

app.on('quit', () => {
  win = null;
  ipcMain.removeAllListeners();
});

export { win };
