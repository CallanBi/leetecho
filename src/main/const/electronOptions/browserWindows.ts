import { join } from 'path';

const browserWindowOptions: Electron.BrowserWindowConstructorOptions = {
  title: 'Leetecho',
  frame: false,
  width: 1300,
  height: 850,
  titleBarStyle: 'hiddenInset',
  trafficLightPosition: { x: 5, y: 6 },
  webPreferences: {
    preload: join(__dirname, '../preload/index.cjs'),
  },
};

export default browserWindowOptions;