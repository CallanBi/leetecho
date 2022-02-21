import { app, BrowserWindowConstructorOptions } from 'electron';

/** 应用名称 */
export const APP_NAME = app.name;
import { join } from 'path';

/** 应用版本 */
export const APP_VERSION = app.getVersion();

/** 应用标题 */
export const APP_TITLE = process.env.PROJECT_TITLE;

/** 应用主图标 (桌面) */
// export const APP_ICON_PATH = asAssetsPath('favicon.svg');

/** 亮色风格托盘图标 标准尺寸 16*16, 系统会自动载入 @2x 和 @3x */
// export const TRAY_ICON_LIGHT = asAssetsPath('');

/** 暗色风格托盘图标 (仅 macOS) */
// export const TRAY_ICON_DARK = asAssetsPath('logo-icon-transparent.svg');

/** 创建新窗口时默认加载的选项 */
export const DEFAULT_WINDOW_OPTIONS: BrowserWindowConstructorOptions = {
  title: APP_NAME,
  width: 1300,
  height: 850,
  minHeight: 642,
  minWidth: 1000,
  frame: process.platform === 'win32' ? false : true, // 无边框窗口
  titleBarStyle: 'hiddenInset',
  trafficLightPosition: { x: 7, y: 7 },
  webPreferences: {
    preload: join(__dirname, '../preload/index.cjs'),
    scrollBounce: false, // OSX 滑动至尽头的反馈效果
  },
  hasShadow: true,
  vibrancy: 'fullscreen-ui', // OSX 毛玻璃效果
};


