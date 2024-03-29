import fs from 'fs';
import path from 'path';
import { contextBridge, ipcRenderer } from 'electron';
import { domReady, openExternal } from './utils';
import { useLoading } from './loading';

const isDev = process.env.NODE_ENV === 'development';
const isDebug = process.env.NODE_ENV === 'debug';
const isNotProduction = isDev || isDebug;

const { platform } = process;

const { appendLoading, removeLoading } = useLoading();

(async () => {
  await domReady();

  appendLoading();
})();

// ---------------------------------------------------

contextBridge.exposeInMainWorld('bridge', {
  __dirname,
  __filename,
  fs,
  path,
  ipcRenderer: withPrototype(ipcRenderer),
  removeLoading,
  isDev,
  isDebug,
  isNotProduction,
  platform,
  openExternal,
});

// `exposeInMainWorld` can not detect `prototype` attribute and methods, manually patch it.
function withPrototype(obj: Record<string, any>) {
  const protos = Object.getPrototypeOf(obj);

  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) continue;

    if (typeof value === 'function') {
      // Some native API not work in Renderer-process, like `NodeJS.EventEmitter['on']`. Wrap a function patch it.
      obj[key] = function (...args: any) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
