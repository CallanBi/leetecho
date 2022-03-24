import path, { join } from 'path';
import { app } from 'electron';

export const APP_PATH: string = app.getAppPath();

export const APP_DATA_PATH: string = app.getPath('appData');

export const USER_DATA_PATH: string = app.getPath('userData');

export const LOGS_PATH: string =
  process.platform === 'darwin'
    ? path.resolve(app.getPath('logs'), `../${app.name}`)
    : path.resolve(USER_DATA_PATH, 'logs');

export const ASSETS_PATH: string =
  process.env.NODE_ENV === 'development'
    ? join(__dirname, '../renderer/assets')
    : path.join(APP_PATH, '../renderer/assets');

export function asAssetsPath(pathStr: string): string {
  return path.join(ASSETS_PATH, pathStr);
}

export function asAbsolutePath(pathStr: string): string {
  return path.resolve(APP_PATH, pathStr);
}
