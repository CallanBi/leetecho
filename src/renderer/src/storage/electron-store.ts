/* eslint-disable @typescript-eslint/no-explicit-any */
import to from 'await-to-js';
import { parseJsonRecursively } from 'src/main/tools';

/* eslint-disable no-unsafe-finally */
export type EndPoint = 'CN' | 'US';

export type User = {
  usrName: string;
  pwd: string;
  endPoint: EndPoint;
  localFileFolderPath?: string;
  appSettings: Partial<{
    repoName: string;
    repoBranch: string;
    repoUserName: string;
    repoEmail: string;
    token: string; // 令牌
  }>;
};

export type UserGroup = {
  CN: User[];
  EN: User[];
};

export type UserConfig = {
  users: UserGroup;
  lastLoginUser: {
    // 最后一次登录的用户
    usrName: string;
    endPoint: EndPoint;
  } | null;
  isUserRemembered: boolean; // 是否勾选'记住我'
};

// Use 'electron-store'
const store = {
  async get(key: string): Promise<CascadeSelectProps<UserConfig>> {
    const { invoke } = window.bridge.ipcRenderer;
    let [err, value] = await to(invoke('electron-store', 'get', key));
    if (err) {
      throw err;
    }
    try {
      if (typeof value === 'string') {
        value = parseJsonRecursively(value) as CascadeSelectProps<UserConfig>;
      } else if (typeof value === 'object' && !Array.isArray(value)) {
        value = Object.entries(value).reduce((acc, [k, v]) => {
          if (typeof v === 'string') {
            return { ...acc, [k]: parseJsonRecursively(v) };
          } else if (typeof v === 'object' && !Array.isArray(v)) {
            return { ...acc, [k]: parseJsonRecursively(v as Record<string, unknown>) };
          } else if (typeof v === 'object' && Array.isArray(v)) {
            return { ...acc, [k]: v.map((e) => parseJsonRecursively(e)) };
          }
          return { ...acc, [k]: v };
        }, {});
      } else if (Array.isArray(value)) {
        value = value.map((e) => {
          if (typeof e === 'string') {
            return parseJsonRecursively(e);
          }
          return e;
        });
      } else {
        return value as CascadeSelectProps<UserConfig>;
      }
    } catch (e) {
      /** noop */
    } finally {
      return value as CascadeSelectProps<UserConfig>;
    }
  },
  async set(key: string, value: CascadeSelectProps<UserConfig>) {
    const { invoke } = window.bridge.ipcRenderer;
    let val: string | CascadeSelectProps<UserConfig> = value;
    try {
      if (value && typeof value === 'object') {
        val = JSON.stringify(value);
      }
    } finally {
      const [err, _] = await to(invoke('electron-store', 'set', key, val));
      if (err) {
        throw err;
      }
    }
  },

  async reset() {
    const { invoke } = window.bridge.ipcRenderer;
    const [err, _] = await to(
      invoke('electron-store', 'set', 'userConfig', {
        users: {
          CN: [],
          EN: [],
        },
        lastLoginUser: null,
        isUserRemembered: false,
      }),
    );
    if (err) {
      throw err;
    }
  },
};

// (async () => {
//   await store.set('Date.now', Date.now());
//   console.log('electron-store ->', 'Date.now:', await store.get('Date.now'));
//   console.log('electron-store ->', 'path:', await window.bridge.ipcRenderer.invoke('electron-store', 'path'));
// })();

export default store;
