"use strict";
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var require$$1 = require("os");
var require$$0$1 = require("path");
var require$$0$2 = require("electron");
var require$$1$1 = require("util");
var require$$0 = require("fs");
var require$$3$1 = require("crypto");
var require$$4 = require("assert");
var require$$5 = require("events");
var require$$3$2 = require("https");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var require$$1__default = /* @__PURE__ */ _interopDefaultLegacy(require$$1);
var require$$0__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$1);
var require$$0__default$2 = /* @__PURE__ */ _interopDefaultLegacy(require$$0$2);
var require$$1__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$1$1);
var require$$0__default = /* @__PURE__ */ _interopDefaultLegacy(require$$0);
var require$$3__default = /* @__PURE__ */ _interopDefaultLegacy(require$$3$1);
var require$$4__default = /* @__PURE__ */ _interopDefaultLegacy(require$$4);
var require$$5__default = /* @__PURE__ */ _interopDefaultLegacy(require$$5);
var require$$3__default$1 = /* @__PURE__ */ _interopDefaultLegacy(require$$3$2);
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function commonjsRequire(path2) {
  throw new Error('Could not dynamically require "' + path2 + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}
var source = { exports: {} };
var isObj$1 = (value) => {
  const type2 = typeof value;
  return value !== null && (type2 === "object" || type2 === "function");
};
const isObj = isObj$1;
const disallowedKeys = new Set([
  "__proto__",
  "prototype",
  "constructor"
]);
const isValidPath = (pathSegments) => !pathSegments.some((segment) => disallowedKeys.has(segment));
function getPathSegments(path2) {
  const pathArray = path2.split(".");
  const parts = [];
  for (let i = 0; i < pathArray.length; i++) {
    let p = pathArray[i];
    while (p[p.length - 1] === "\\" && pathArray[i + 1] !== void 0) {
      p = p.slice(0, -1) + ".";
      p += pathArray[++i];
    }
    parts.push(p);
  }
  if (!isValidPath(parts)) {
    return [];
  }
  return parts;
}
var dotProp = {
  get(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return value === void 0 ? object : value;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return;
    }
    for (let i = 0; i < pathArray.length; i++) {
      object = object[pathArray[i]];
      if (object === void 0 || object === null) {
        if (i !== pathArray.length - 1) {
          return value;
        }
        break;
      }
    }
    return object === void 0 ? value : object;
  },
  set(object, path2, value) {
    if (!isObj(object) || typeof path2 !== "string") {
      return object;
    }
    const root = object;
    const pathArray = getPathSegments(path2);
    for (let i = 0; i < pathArray.length; i++) {
      const p = pathArray[i];
      if (!isObj(object[p])) {
        object[p] = {};
      }
      if (i === pathArray.length - 1) {
        object[p] = value;
      }
      object = object[p];
    }
    return root;
  },
  delete(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    for (let i = 0; i < pathArray.length; i++) {
      const p = pathArray[i];
      if (i === pathArray.length - 1) {
        delete object[p];
        return true;
      }
      object = object[p];
      if (!isObj(object)) {
        return false;
      }
    }
  },
  has(object, path2) {
    if (!isObj(object) || typeof path2 !== "string") {
      return false;
    }
    const pathArray = getPathSegments(path2);
    if (pathArray.length === 0) {
      return false;
    }
    for (let i = 0; i < pathArray.length; i++) {
      if (isObj(object)) {
        if (!(pathArray[i] in object)) {
          return false;
        }
        object = object[pathArray[i]];
      } else {
        return false;
      }
    }
    return true;
  }
};
var pkgUp = { exports: {} };
var findUp$1 = { exports: {} };
var locatePath$1 = { exports: {} };
var pathExists$1 = { exports: {} };
const fs$7 = require$$0__default["default"];
pathExists$1.exports = (fp) => new Promise((resolve2) => {
  fs$7.access(fp, (err) => {
    resolve2(!err);
  });
});
pathExists$1.exports.sync = (fp) => {
  try {
    fs$7.accessSync(fp);
    return true;
  } catch (err) {
    return false;
  }
};
var pLimit$2 = { exports: {} };
var pTry$2 = { exports: {} };
const pTry$1 = (fn, ...arguments_) => new Promise((resolve2) => {
  resolve2(fn(...arguments_));
});
pTry$2.exports = pTry$1;
pTry$2.exports.default = pTry$1;
const pTry = pTry$2.exports;
const pLimit$1 = (concurrency) => {
  if (!((Number.isInteger(concurrency) || concurrency === Infinity) && concurrency > 0)) {
    return Promise.reject(new TypeError("Expected `concurrency` to be a number from 1 and up"));
  }
  const queue = [];
  let activeCount = 0;
  const next = () => {
    activeCount--;
    if (queue.length > 0) {
      queue.shift()();
    }
  };
  const run = (fn, resolve2, ...args) => {
    activeCount++;
    const result = pTry(fn, ...args);
    resolve2(result);
    result.then(next, next);
  };
  const enqueue = (fn, resolve2, ...args) => {
    if (activeCount < concurrency) {
      run(fn, resolve2, ...args);
    } else {
      queue.push(run.bind(null, fn, resolve2, ...args));
    }
  };
  const generator = (fn, ...args) => new Promise((resolve2) => enqueue(fn, resolve2, ...args));
  Object.defineProperties(generator, {
    activeCount: {
      get: () => activeCount
    },
    pendingCount: {
      get: () => queue.length
    },
    clearQueue: {
      value: () => {
        queue.length = 0;
      }
    }
  });
  return generator;
};
pLimit$2.exports = pLimit$1;
pLimit$2.exports.default = pLimit$1;
const pLimit = pLimit$2.exports;
class EndError extends Error {
  constructor(value) {
    super();
    this.value = value;
  }
}
const testElement = (el, tester) => Promise.resolve(el).then(tester);
const finder = (el) => Promise.all(el).then((val) => val[1] === true && Promise.reject(new EndError(val[0])));
var pLocate$1 = (iterable, tester, opts2) => {
  opts2 = Object.assign({
    concurrency: Infinity,
    preserveOrder: true
  }, opts2);
  const limit2 = pLimit(opts2.concurrency);
  const items2 = [...iterable].map((el) => [el, limit2(testElement, el, tester)]);
  const checkLimit = pLimit(opts2.preserveOrder ? 1 : Infinity);
  return Promise.all(items2.map((el) => checkLimit(finder, el))).then(() => {
  }).catch((err) => err instanceof EndError ? err.value : Promise.reject(err));
};
const path$a = require$$0__default$1["default"];
const pathExists = pathExists$1.exports;
const pLocate = pLocate$1;
locatePath$1.exports = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  return pLocate(iterable, (el) => pathExists(path$a.resolve(options.cwd, el)), options);
};
locatePath$1.exports.sync = (iterable, options) => {
  options = Object.assign({
    cwd: process.cwd()
  }, options);
  for (const el of iterable) {
    if (pathExists.sync(path$a.resolve(options.cwd, el))) {
      return el;
    }
  }
};
const path$9 = require$$0__default$1["default"];
const locatePath = locatePath$1.exports;
findUp$1.exports = (filename, opts2 = {}) => {
  const startDir = path$9.resolve(opts2.cwd || "");
  const { root } = path$9.parse(startDir);
  const filenames = [].concat(filename);
  return new Promise((resolve2) => {
    (function find(dir) {
      locatePath(filenames, { cwd: dir }).then((file) => {
        if (file) {
          resolve2(path$9.join(dir, file));
        } else if (dir === root) {
          resolve2(null);
        } else {
          find(path$9.dirname(dir));
        }
      });
    })(startDir);
  });
};
findUp$1.exports.sync = (filename, opts2 = {}) => {
  let dir = path$9.resolve(opts2.cwd || "");
  const { root } = path$9.parse(dir);
  const filenames = [].concat(filename);
  while (true) {
    const file = locatePath.sync(filenames, { cwd: dir });
    if (file) {
      return path$9.join(dir, file);
    }
    if (dir === root) {
      return null;
    }
    dir = path$9.dirname(dir);
  }
};
const findUp = findUp$1.exports;
pkgUp.exports = async ({ cwd } = {}) => findUp("package.json", { cwd });
pkgUp.exports.sync = ({ cwd } = {}) => findUp.sync("package.json", { cwd });
var envPaths$1 = { exports: {} };
const path$8 = require$$0__default$1["default"];
const os = require$$1__default["default"];
const homedir = os.homedir();
const tmpdir = os.tmpdir();
const { env } = process;
const macos = (name) => {
  const library = path$8.join(homedir, "Library");
  return {
    data: path$8.join(library, "Application Support", name),
    config: path$8.join(library, "Preferences", name),
    cache: path$8.join(library, "Caches", name),
    log: path$8.join(library, "Logs", name),
    temp: path$8.join(tmpdir, name)
  };
};
const windows = (name) => {
  const appData = env.APPDATA || path$8.join(homedir, "AppData", "Roaming");
  const localAppData = env.LOCALAPPDATA || path$8.join(homedir, "AppData", "Local");
  return {
    data: path$8.join(localAppData, name, "Data"),
    config: path$8.join(appData, name, "Config"),
    cache: path$8.join(localAppData, name, "Cache"),
    log: path$8.join(localAppData, name, "Log"),
    temp: path$8.join(tmpdir, name)
  };
};
const linux = (name) => {
  const username = path$8.basename(homedir);
  return {
    data: path$8.join(env.XDG_DATA_HOME || path$8.join(homedir, ".local", "share"), name),
    config: path$8.join(env.XDG_CONFIG_HOME || path$8.join(homedir, ".config"), name),
    cache: path$8.join(env.XDG_CACHE_HOME || path$8.join(homedir, ".cache"), name),
    log: path$8.join(env.XDG_STATE_HOME || path$8.join(homedir, ".local", "state"), name),
    temp: path$8.join(tmpdir, username, name)
  };
};
const envPaths = (name, options) => {
  if (typeof name !== "string") {
    throw new TypeError(`Expected string, got ${typeof name}`);
  }
  options = Object.assign({ suffix: "nodejs" }, options);
  if (options.suffix) {
    name += `-${options.suffix}`;
  }
  if (process.platform === "darwin") {
    return macos(name);
  }
  if (process.platform === "win32") {
    return windows(name);
  }
  return linux(name);
};
envPaths$1.exports = envPaths;
envPaths$1.exports.default = envPaths;
var dist$3 = {};
var consts = {};
Object.defineProperty(consts, "__esModule", { value: true });
consts.NOOP = consts.LIMIT_FILES_DESCRIPTORS = consts.LIMIT_BASENAME_LENGTH = consts.IS_USER_ROOT = consts.IS_POSIX = consts.DEFAULT_TIMEOUT_SYNC = consts.DEFAULT_TIMEOUT_ASYNC = consts.DEFAULT_WRITE_OPTIONS = consts.DEFAULT_READ_OPTIONS = consts.DEFAULT_FOLDER_MODE = consts.DEFAULT_FILE_MODE = consts.DEFAULT_ENCODING = void 0;
const DEFAULT_ENCODING = "utf8";
consts.DEFAULT_ENCODING = DEFAULT_ENCODING;
const DEFAULT_FILE_MODE = 438;
consts.DEFAULT_FILE_MODE = DEFAULT_FILE_MODE;
const DEFAULT_FOLDER_MODE = 511;
consts.DEFAULT_FOLDER_MODE = DEFAULT_FOLDER_MODE;
const DEFAULT_READ_OPTIONS = {};
consts.DEFAULT_READ_OPTIONS = DEFAULT_READ_OPTIONS;
const DEFAULT_WRITE_OPTIONS = {};
consts.DEFAULT_WRITE_OPTIONS = DEFAULT_WRITE_OPTIONS;
const DEFAULT_TIMEOUT_ASYNC = 5e3;
consts.DEFAULT_TIMEOUT_ASYNC = DEFAULT_TIMEOUT_ASYNC;
const DEFAULT_TIMEOUT_SYNC = 100;
consts.DEFAULT_TIMEOUT_SYNC = DEFAULT_TIMEOUT_SYNC;
const IS_POSIX = !!process.getuid;
consts.IS_POSIX = IS_POSIX;
const IS_USER_ROOT = process.getuid ? !process.getuid() : false;
consts.IS_USER_ROOT = IS_USER_ROOT;
const LIMIT_BASENAME_LENGTH = 128;
consts.LIMIT_BASENAME_LENGTH = LIMIT_BASENAME_LENGTH;
const LIMIT_FILES_DESCRIPTORS = 1e4;
consts.LIMIT_FILES_DESCRIPTORS = LIMIT_FILES_DESCRIPTORS;
const NOOP = () => {
};
consts.NOOP = NOOP;
var fs$6 = {};
var attemptify = {};
Object.defineProperty(attemptify, "__esModule", { value: true });
attemptify.attemptifySync = attemptify.attemptifyAsync = void 0;
const consts_1$4 = consts;
const attemptifyAsync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    return fn.apply(void 0, arguments).catch(onError);
  };
};
attemptify.attemptifyAsync = attemptifyAsync;
const attemptifySync = (fn, onError = consts_1$4.NOOP) => {
  return function() {
    try {
      return fn.apply(void 0, arguments);
    } catch (error2) {
      return onError(error2);
    }
  };
};
attemptify.attemptifySync = attemptifySync;
var fs_handlers = {};
Object.defineProperty(fs_handlers, "__esModule", { value: true });
const consts_1$3 = consts;
const Handlers = {
  isChangeErrorOk: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "ENOSYS")
      return true;
    if (!consts_1$3.IS_USER_ROOT && (code2 === "EINVAL" || code2 === "EPERM"))
      return true;
    return false;
  },
  isRetriableError: (error2) => {
    const { code: code2 } = error2;
    if (code2 === "EMFILE" || code2 === "ENFILE" || code2 === "EAGAIN" || code2 === "EBUSY" || code2 === "EACCESS" || code2 === "EACCS" || code2 === "EPERM")
      return true;
    return false;
  },
  onChangeError: (error2) => {
    if (Handlers.isChangeErrorOk(error2))
      return;
    throw error2;
  }
};
fs_handlers.default = Handlers;
var retryify = {};
var retryify_queue = {};
Object.defineProperty(retryify_queue, "__esModule", { value: true });
const consts_1$2 = consts;
const RetryfyQueue = {
  interval: 25,
  intervalId: void 0,
  limit: consts_1$2.LIMIT_FILES_DESCRIPTORS,
  queueActive: new Set(),
  queueWaiting: new Set(),
  init: () => {
    if (RetryfyQueue.intervalId)
      return;
    RetryfyQueue.intervalId = setInterval(RetryfyQueue.tick, RetryfyQueue.interval);
  },
  reset: () => {
    if (!RetryfyQueue.intervalId)
      return;
    clearInterval(RetryfyQueue.intervalId);
    delete RetryfyQueue.intervalId;
  },
  add: (fn) => {
    RetryfyQueue.queueWaiting.add(fn);
    if (RetryfyQueue.queueActive.size < RetryfyQueue.limit / 2) {
      RetryfyQueue.tick();
    } else {
      RetryfyQueue.init();
    }
  },
  remove: (fn) => {
    RetryfyQueue.queueWaiting.delete(fn);
    RetryfyQueue.queueActive.delete(fn);
  },
  schedule: () => {
    return new Promise((resolve2) => {
      const cleanup = () => RetryfyQueue.remove(resolver);
      const resolver = () => resolve2(cleanup);
      RetryfyQueue.add(resolver);
    });
  },
  tick: () => {
    if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
      return;
    if (!RetryfyQueue.queueWaiting.size)
      return RetryfyQueue.reset();
    for (const fn of RetryfyQueue.queueWaiting) {
      if (RetryfyQueue.queueActive.size >= RetryfyQueue.limit)
        break;
      RetryfyQueue.queueWaiting.delete(fn);
      RetryfyQueue.queueActive.add(fn);
      fn();
    }
  }
};
retryify_queue.default = RetryfyQueue;
Object.defineProperty(retryify, "__esModule", { value: true });
retryify.retryifySync = retryify.retryifyAsync = void 0;
const retryify_queue_1 = retryify_queue;
const retryifyAsync = (fn, isRetriableError) => {
  return function(timestamp) {
    return function attempt() {
      return retryify_queue_1.default.schedule().then((cleanup) => {
        return fn.apply(void 0, arguments).then((result) => {
          cleanup();
          return result;
        }, (error2) => {
          cleanup();
          if (Date.now() >= timestamp)
            throw error2;
          if (isRetriableError(error2)) {
            const delay = Math.round(100 + 400 * Math.random()), delayPromise = new Promise((resolve2) => setTimeout(resolve2, delay));
            return delayPromise.then(() => attempt.apply(void 0, arguments));
          }
          throw error2;
        });
      });
    };
  };
};
retryify.retryifyAsync = retryifyAsync;
const retryifySync = (fn, isRetriableError) => {
  return function(timestamp) {
    return function attempt() {
      try {
        return fn.apply(void 0, arguments);
      } catch (error2) {
        if (Date.now() > timestamp)
          throw error2;
        if (isRetriableError(error2))
          return attempt.apply(void 0, arguments);
        throw error2;
      }
    };
  };
};
retryify.retryifySync = retryifySync;
Object.defineProperty(fs$6, "__esModule", { value: true });
const fs$5 = require$$0__default["default"];
const util_1$q = require$$1__default$1["default"];
const attemptify_1 = attemptify;
const fs_handlers_1 = fs_handlers;
const retryify_1 = retryify;
const FS = {
  chmodAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.chmod), fs_handlers_1.default.onChangeError),
  chownAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.chown), fs_handlers_1.default.onChangeError),
  closeAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.close)),
  fsyncAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.fsync)),
  mkdirAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.mkdir)),
  realpathAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.realpath)),
  statAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.stat)),
  unlinkAttempt: attemptify_1.attemptifyAsync(util_1$q.promisify(fs$5.unlink)),
  closeRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.close), fs_handlers_1.default.isRetriableError),
  fsyncRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.fsync), fs_handlers_1.default.isRetriableError),
  openRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.open), fs_handlers_1.default.isRetriableError),
  readFileRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.readFile), fs_handlers_1.default.isRetriableError),
  renameRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.rename), fs_handlers_1.default.isRetriableError),
  statRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.stat), fs_handlers_1.default.isRetriableError),
  writeRetry: retryify_1.retryifyAsync(util_1$q.promisify(fs$5.write), fs_handlers_1.default.isRetriableError),
  chmodSyncAttempt: attemptify_1.attemptifySync(fs$5.chmodSync, fs_handlers_1.default.onChangeError),
  chownSyncAttempt: attemptify_1.attemptifySync(fs$5.chownSync, fs_handlers_1.default.onChangeError),
  closeSyncAttempt: attemptify_1.attemptifySync(fs$5.closeSync),
  mkdirSyncAttempt: attemptify_1.attemptifySync(fs$5.mkdirSync),
  realpathSyncAttempt: attemptify_1.attemptifySync(fs$5.realpathSync),
  statSyncAttempt: attemptify_1.attemptifySync(fs$5.statSync),
  unlinkSyncAttempt: attemptify_1.attemptifySync(fs$5.unlinkSync),
  closeSyncRetry: retryify_1.retryifySync(fs$5.closeSync, fs_handlers_1.default.isRetriableError),
  fsyncSyncRetry: retryify_1.retryifySync(fs$5.fsyncSync, fs_handlers_1.default.isRetriableError),
  openSyncRetry: retryify_1.retryifySync(fs$5.openSync, fs_handlers_1.default.isRetriableError),
  readFileSyncRetry: retryify_1.retryifySync(fs$5.readFileSync, fs_handlers_1.default.isRetriableError),
  renameSyncRetry: retryify_1.retryifySync(fs$5.renameSync, fs_handlers_1.default.isRetriableError),
  statSyncRetry: retryify_1.retryifySync(fs$5.statSync, fs_handlers_1.default.isRetriableError),
  writeSyncRetry: retryify_1.retryifySync(fs$5.writeSync, fs_handlers_1.default.isRetriableError)
};
fs$6.default = FS;
var lang = {};
Object.defineProperty(lang, "__esModule", { value: true });
const Lang = {
  isFunction: (x) => {
    return typeof x === "function";
  },
  isString: (x) => {
    return typeof x === "string";
  },
  isUndefined: (x) => {
    return typeof x === "undefined";
  }
};
lang.default = Lang;
var scheduler = {};
Object.defineProperty(scheduler, "__esModule", { value: true });
const Queues = {};
const Scheduler = {
  next: (id2) => {
    const queue = Queues[id2];
    if (!queue)
      return;
    queue.shift();
    const job = queue[0];
    if (job) {
      job(() => Scheduler.next(id2));
    } else {
      delete Queues[id2];
    }
  },
  schedule: (id2) => {
    return new Promise((resolve2) => {
      let queue = Queues[id2];
      if (!queue)
        queue = Queues[id2] = [];
      queue.push(resolve2);
      if (queue.length > 1)
        return;
      resolve2(() => Scheduler.next(id2));
    });
  }
};
scheduler.default = Scheduler;
var temp = {};
Object.defineProperty(temp, "__esModule", { value: true });
const path$7 = require$$0__default$1["default"];
const consts_1$1 = consts;
const fs_1$1 = fs$6;
const Temp = {
  store: {},
  create: (filePath) => {
    const randomness = `000000${Math.floor(Math.random() * 16777215).toString(16)}`.slice(-6), timestamp = Date.now().toString().slice(-10), prefix = "tmp-", suffix = `.${prefix}${timestamp}${randomness}`, tempPath = `${filePath}${suffix}`;
    return tempPath;
  },
  get: (filePath, creator, purge = true) => {
    const tempPath = Temp.truncate(creator(filePath));
    if (tempPath in Temp.store)
      return Temp.get(filePath, creator, purge);
    Temp.store[tempPath] = purge;
    const disposer = () => delete Temp.store[tempPath];
    return [tempPath, disposer];
  },
  purge: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkAttempt(filePath);
  },
  purgeSync: (filePath) => {
    if (!Temp.store[filePath])
      return;
    delete Temp.store[filePath];
    fs_1$1.default.unlinkSyncAttempt(filePath);
  },
  purgeSyncAll: () => {
    for (const filePath in Temp.store) {
      Temp.purgeSync(filePath);
    }
  },
  truncate: (filePath) => {
    const basename = path$7.basename(filePath);
    if (basename.length <= consts_1$1.LIMIT_BASENAME_LENGTH)
      return filePath;
    const truncable = /^(\.?)(.*?)((?:\.[^.]+)?(?:\.tmp-\d{10}[a-f0-9]{6})?)$/.exec(basename);
    if (!truncable)
      return filePath;
    const truncationLength = basename.length - consts_1$1.LIMIT_BASENAME_LENGTH;
    return `${filePath.slice(0, -basename.length)}${truncable[1]}${truncable[2].slice(0, -truncationLength)}${truncable[3]}`;
  }
};
process.on("exit", Temp.purgeSyncAll);
temp.default = Temp;
Object.defineProperty(dist$3, "__esModule", { value: true });
dist$3.writeFileSync = dist$3.writeFile = dist$3.readFileSync = dist$3.readFile = void 0;
const path$6 = require$$0__default$1["default"];
const consts_1 = consts;
const fs_1 = fs$6;
const lang_1 = lang;
const scheduler_1 = scheduler;
const temp_1 = temp;
function readFile$1(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFile$1(filePath, { encoding: options });
  const timeout2 = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  return fs_1.default.readFileRetry(timeout2)(filePath, options);
}
dist$3.readFile = readFile$1;
function readFileSync(filePath, options = consts_1.DEFAULT_READ_OPTIONS) {
  var _a;
  if (lang_1.default.isString(options))
    return readFileSync(filePath, { encoding: options });
  const timeout2 = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  return fs_1.default.readFileSyncRetry(timeout2)(filePath, options);
}
dist$3.readFileSync = readFileSync;
const writeFile$1 = (filePath, data, options, callback) => {
  if (lang_1.default.isFunction(options))
    return writeFile$1(filePath, data, consts_1.DEFAULT_WRITE_OPTIONS, options);
  const promise = writeFileAsync(filePath, data, options);
  if (callback)
    promise.then(callback, callback);
  return promise;
};
dist$3.writeFile = writeFile$1;
const writeFileAsync = async (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileAsync(filePath, data, { encoding: options });
  const timeout2 = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_ASYNC);
  let schedulerCustomDisposer = null, schedulerDisposer = null, tempDisposer = null, tempPath = null, fd = null;
  try {
    if (options.schedule)
      schedulerCustomDisposer = await options.schedule(filePath);
    schedulerDisposer = await scheduler_1.default.schedule(filePath);
    filePath = await fs_1.default.realpathAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat = await fs_1.default.statAttempt(filePath);
      if (stat) {
        options = __spreadValues({}, options);
        if (useStatChown)
          options.chown = { uid: stat.uid, gid: stat.gid };
        if (useStatMode)
          options.mode = stat.mode;
      }
    }
    const parentPath = path$6.dirname(filePath);
    await fs_1.default.mkdirAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = await fs_1.default.openRetry(timeout2)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      await fs_1.default.writeRetry(timeout2)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      await fs_1.default.writeRetry(timeout2)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        await fs_1.default.fsyncRetry(timeout2)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    await fs_1.default.closeRetry(timeout2)(fd);
    fd = null;
    if (options.chown)
      await fs_1.default.chownAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      await fs_1.default.chmodAttempt(tempPath, options.mode);
    try {
      await fs_1.default.renameRetry(timeout2)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      await fs_1.default.renameRetry(timeout2)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      await fs_1.default.closeAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
    if (schedulerCustomDisposer)
      schedulerCustomDisposer();
    if (schedulerDisposer)
      schedulerDisposer();
  }
};
const writeFileSync = (filePath, data, options = consts_1.DEFAULT_WRITE_OPTIONS) => {
  var _a;
  if (lang_1.default.isString(options))
    return writeFileSync(filePath, data, { encoding: options });
  const timeout2 = Date.now() + ((_a = options.timeout) !== null && _a !== void 0 ? _a : consts_1.DEFAULT_TIMEOUT_SYNC);
  let tempDisposer = null, tempPath = null, fd = null;
  try {
    filePath = fs_1.default.realpathSyncAttempt(filePath) || filePath;
    [tempPath, tempDisposer] = temp_1.default.get(filePath, options.tmpCreate || temp_1.default.create, !(options.tmpPurge === false));
    const useStatChown = consts_1.IS_POSIX && lang_1.default.isUndefined(options.chown), useStatMode = lang_1.default.isUndefined(options.mode);
    if (useStatChown || useStatMode) {
      const stat = fs_1.default.statSyncAttempt(filePath);
      if (stat) {
        options = __spreadValues({}, options);
        if (useStatChown)
          options.chown = { uid: stat.uid, gid: stat.gid };
        if (useStatMode)
          options.mode = stat.mode;
      }
    }
    const parentPath = path$6.dirname(filePath);
    fs_1.default.mkdirSyncAttempt(parentPath, {
      mode: consts_1.DEFAULT_FOLDER_MODE,
      recursive: true
    });
    fd = fs_1.default.openSyncRetry(timeout2)(tempPath, "w", options.mode || consts_1.DEFAULT_FILE_MODE);
    if (options.tmpCreated)
      options.tmpCreated(tempPath);
    if (lang_1.default.isString(data)) {
      fs_1.default.writeSyncRetry(timeout2)(fd, data, 0, options.encoding || consts_1.DEFAULT_ENCODING);
    } else if (!lang_1.default.isUndefined(data)) {
      fs_1.default.writeSyncRetry(timeout2)(fd, data, 0, data.length, 0);
    }
    if (options.fsync !== false) {
      if (options.fsyncWait !== false) {
        fs_1.default.fsyncSyncRetry(timeout2)(fd);
      } else {
        fs_1.default.fsyncAttempt(fd);
      }
    }
    fs_1.default.closeSyncRetry(timeout2)(fd);
    fd = null;
    if (options.chown)
      fs_1.default.chownSyncAttempt(tempPath, options.chown.uid, options.chown.gid);
    if (options.mode)
      fs_1.default.chmodSyncAttempt(tempPath, options.mode);
    try {
      fs_1.default.renameSyncRetry(timeout2)(tempPath, filePath);
    } catch (error2) {
      if (error2.code !== "ENAMETOOLONG")
        throw error2;
      fs_1.default.renameSyncRetry(timeout2)(tempPath, temp_1.default.truncate(filePath));
    }
    tempDisposer();
    tempPath = null;
  } finally {
    if (fd)
      fs_1.default.closeSyncAttempt(fd);
    if (tempPath)
      temp_1.default.purge(tempPath);
  }
};
dist$3.writeFileSync = writeFileSync;
var ajv = { exports: {} };
var core$2 = {};
var validate = {};
var boolSchema = {};
var errors = {};
var codegen = {};
var code$1 = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.regexpCode = exports.getEsmExportName = exports.getProperty = exports.safeStringify = exports.stringify = exports.strConcat = exports.addCodeArg = exports.str = exports._ = exports.nil = exports._Code = exports.Name = exports.IDENTIFIER = exports._CodeOrName = void 0;
  class _CodeOrName {
  }
  exports._CodeOrName = _CodeOrName;
  exports.IDENTIFIER = /^[a-z$_][a-z$_0-9]*$/i;
  class Name extends _CodeOrName {
    constructor(s) {
      super();
      if (!exports.IDENTIFIER.test(s))
        throw new Error("CodeGen: name must be a valid identifier");
      this.str = s;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      return false;
    }
    get names() {
      return { [this.str]: 1 };
    }
  }
  exports.Name = Name;
  class _Code extends _CodeOrName {
    constructor(code2) {
      super();
      this._items = typeof code2 === "string" ? [code2] : code2;
    }
    toString() {
      return this.str;
    }
    emptyStr() {
      if (this._items.length > 1)
        return false;
      const item = this._items[0];
      return item === "" || item === '""';
    }
    get str() {
      var _a;
      return (_a = this._str) !== null && _a !== void 0 ? _a : this._str = this._items.reduce((s, c) => `${s}${c}`, "");
    }
    get names() {
      var _a;
      return (_a = this._names) !== null && _a !== void 0 ? _a : this._names = this._items.reduce((names2, c) => {
        if (c instanceof Name)
          names2[c.str] = (names2[c.str] || 0) + 1;
        return names2;
      }, {});
    }
  }
  exports._Code = _Code;
  exports.nil = new _Code("");
  function _2(strs, ...args) {
    const code2 = [strs[0]];
    let i = 0;
    while (i < args.length) {
      addCodeArg(code2, args[i]);
      code2.push(strs[++i]);
    }
    return new _Code(code2);
  }
  exports._ = _2;
  const plus = new _Code("+");
  function str(strs, ...args) {
    const expr = [safeStringify(strs[0])];
    let i = 0;
    while (i < args.length) {
      expr.push(plus);
      addCodeArg(expr, args[i]);
      expr.push(plus, safeStringify(strs[++i]));
    }
    optimize(expr);
    return new _Code(expr);
  }
  exports.str = str;
  function addCodeArg(code2, arg) {
    if (arg instanceof _Code)
      code2.push(...arg._items);
    else if (arg instanceof Name)
      code2.push(arg);
    else
      code2.push(interpolate(arg));
  }
  exports.addCodeArg = addCodeArg;
  function optimize(expr) {
    let i = 1;
    while (i < expr.length - 1) {
      if (expr[i] === plus) {
        const res = mergeExprItems(expr[i - 1], expr[i + 1]);
        if (res !== void 0) {
          expr.splice(i - 1, 3, res);
          continue;
        }
        expr[i++] = "+";
      }
      i++;
    }
  }
  function mergeExprItems(a, b) {
    if (b === '""')
      return a;
    if (a === '""')
      return b;
    if (typeof a == "string") {
      if (b instanceof Name || a[a.length - 1] !== '"')
        return;
      if (typeof b != "string")
        return `${a.slice(0, -1)}${b}"`;
      if (b[0] === '"')
        return a.slice(0, -1) + b.slice(1);
      return;
    }
    if (typeof b == "string" && b[0] === '"' && !(a instanceof Name))
      return `"${a}${b.slice(1)}`;
    return;
  }
  function strConcat(c1, c2) {
    return c2.emptyStr() ? c1 : c1.emptyStr() ? c2 : str`${c1}${c2}`;
  }
  exports.strConcat = strConcat;
  function interpolate(x) {
    return typeof x == "number" || typeof x == "boolean" || x === null ? x : safeStringify(Array.isArray(x) ? x.join(",") : x);
  }
  function stringify(x) {
    return new _Code(safeStringify(x));
  }
  exports.stringify = stringify;
  function safeStringify(x) {
    return JSON.stringify(x).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
  }
  exports.safeStringify = safeStringify;
  function getProperty(key) {
    return typeof key == "string" && exports.IDENTIFIER.test(key) ? new _Code(`.${key}`) : _2`[${key}]`;
  }
  exports.getProperty = getProperty;
  function getEsmExportName(key) {
    if (typeof key == "string" && exports.IDENTIFIER.test(key)) {
      return new _Code(`${key}`);
    }
    throw new Error(`CodeGen: invalid export name: ${key}, use explicit $id name mapping`);
  }
  exports.getEsmExportName = getEsmExportName;
  function regexpCode(rx) {
    return new _Code(rx.toString());
  }
  exports.regexpCode = regexpCode;
})(code$1);
var scope = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.ValueScope = exports.ValueScopeName = exports.Scope = exports.varKinds = exports.UsedValueState = void 0;
  const code_12 = code$1;
  class ValueError extends Error {
    constructor(name) {
      super(`CodeGen: "code" for ${name} not defined`);
      this.value = name.value;
    }
  }
  var UsedValueState;
  (function(UsedValueState2) {
    UsedValueState2[UsedValueState2["Started"] = 0] = "Started";
    UsedValueState2[UsedValueState2["Completed"] = 1] = "Completed";
  })(UsedValueState = exports.UsedValueState || (exports.UsedValueState = {}));
  exports.varKinds = {
    const: new code_12.Name("const"),
    let: new code_12.Name("let"),
    var: new code_12.Name("var")
  };
  class Scope {
    constructor({ prefixes, parent } = {}) {
      this._names = {};
      this._prefixes = prefixes;
      this._parent = parent;
    }
    toName(nameOrPrefix) {
      return nameOrPrefix instanceof code_12.Name ? nameOrPrefix : this.name(nameOrPrefix);
    }
    name(prefix) {
      return new code_12.Name(this._newName(prefix));
    }
    _newName(prefix) {
      const ng = this._names[prefix] || this._nameGroup(prefix);
      return `${prefix}${ng.index++}`;
    }
    _nameGroup(prefix) {
      var _a, _b;
      if (((_b = (_a = this._parent) === null || _a === void 0 ? void 0 : _a._prefixes) === null || _b === void 0 ? void 0 : _b.has(prefix)) || this._prefixes && !this._prefixes.has(prefix)) {
        throw new Error(`CodeGen: prefix "${prefix}" is not allowed in this scope`);
      }
      return this._names[prefix] = { prefix, index: 0 };
    }
  }
  exports.Scope = Scope;
  class ValueScopeName extends code_12.Name {
    constructor(prefix, nameStr) {
      super(nameStr);
      this.prefix = prefix;
    }
    setValue(value, { property, itemIndex }) {
      this.value = value;
      this.scopePath = (0, code_12._)`.${new code_12.Name(property)}[${itemIndex}]`;
    }
  }
  exports.ValueScopeName = ValueScopeName;
  const line = (0, code_12._)`\n`;
  class ValueScope extends Scope {
    constructor(opts2) {
      super(opts2);
      this._values = {};
      this._scope = opts2.scope;
      this.opts = __spreadProps(__spreadValues({}, opts2), { _n: opts2.lines ? line : code_12.nil });
    }
    get() {
      return this._scope;
    }
    name(prefix) {
      return new ValueScopeName(prefix, this._newName(prefix));
    }
    value(nameOrPrefix, value) {
      var _a;
      if (value.ref === void 0)
        throw new Error("CodeGen: ref must be passed in value");
      const name = this.toName(nameOrPrefix);
      const { prefix } = name;
      const valueKey = (_a = value.key) !== null && _a !== void 0 ? _a : value.ref;
      let vs = this._values[prefix];
      if (vs) {
        const _name = vs.get(valueKey);
        if (_name)
          return _name;
      } else {
        vs = this._values[prefix] = new Map();
      }
      vs.set(valueKey, name);
      const s = this._scope[prefix] || (this._scope[prefix] = []);
      const itemIndex = s.length;
      s[itemIndex] = value.ref;
      name.setValue(value, { property: prefix, itemIndex });
      return name;
    }
    getValue(prefix, keyOrRef) {
      const vs = this._values[prefix];
      if (!vs)
        return;
      return vs.get(keyOrRef);
    }
    scopeRefs(scopeName, values = this._values) {
      return this._reduceValues(values, (name) => {
        if (name.scopePath === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return (0, code_12._)`${scopeName}${name.scopePath}`;
      });
    }
    scopeCode(values = this._values, usedValues, getCode) {
      return this._reduceValues(values, (name) => {
        if (name.value === void 0)
          throw new Error(`CodeGen: name "${name}" has no value`);
        return name.value.code;
      }, usedValues, getCode);
    }
    _reduceValues(values, valueCode, usedValues = {}, getCode) {
      let code2 = code_12.nil;
      for (const prefix in values) {
        const vs = values[prefix];
        if (!vs)
          continue;
        const nameSet = usedValues[prefix] = usedValues[prefix] || new Map();
        vs.forEach((name) => {
          if (nameSet.has(name))
            return;
          nameSet.set(name, UsedValueState.Started);
          let c = valueCode(name);
          if (c) {
            const def2 = this.opts.es5 ? exports.varKinds.var : exports.varKinds.const;
            code2 = (0, code_12._)`${code2}${def2} ${name} = ${c};${this.opts._n}`;
          } else if (c = getCode === null || getCode === void 0 ? void 0 : getCode(name)) {
            code2 = (0, code_12._)`${code2}${c}${this.opts._n}`;
          } else {
            throw new ValueError(name);
          }
          nameSet.set(name, UsedValueState.Completed);
        });
      }
      return code2;
    }
  }
  exports.ValueScope = ValueScope;
})(scope);
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.or = exports.and = exports.not = exports.CodeGen = exports.operators = exports.varKinds = exports.ValueScopeName = exports.ValueScope = exports.Scope = exports.Name = exports.regexpCode = exports.stringify = exports.getProperty = exports.nil = exports.strConcat = exports.str = exports._ = void 0;
  const code_12 = code$1;
  const scope_1 = scope;
  var code_2 = code$1;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return code_2._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return code_2.str;
  } });
  Object.defineProperty(exports, "strConcat", { enumerable: true, get: function() {
    return code_2.strConcat;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return code_2.nil;
  } });
  Object.defineProperty(exports, "getProperty", { enumerable: true, get: function() {
    return code_2.getProperty;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return code_2.stringify;
  } });
  Object.defineProperty(exports, "regexpCode", { enumerable: true, get: function() {
    return code_2.regexpCode;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return code_2.Name;
  } });
  var scope_2 = scope;
  Object.defineProperty(exports, "Scope", { enumerable: true, get: function() {
    return scope_2.Scope;
  } });
  Object.defineProperty(exports, "ValueScope", { enumerable: true, get: function() {
    return scope_2.ValueScope;
  } });
  Object.defineProperty(exports, "ValueScopeName", { enumerable: true, get: function() {
    return scope_2.ValueScopeName;
  } });
  Object.defineProperty(exports, "varKinds", { enumerable: true, get: function() {
    return scope_2.varKinds;
  } });
  exports.operators = {
    GT: new code_12._Code(">"),
    GTE: new code_12._Code(">="),
    LT: new code_12._Code("<"),
    LTE: new code_12._Code("<="),
    EQ: new code_12._Code("==="),
    NEQ: new code_12._Code("!=="),
    NOT: new code_12._Code("!"),
    OR: new code_12._Code("||"),
    AND: new code_12._Code("&&"),
    ADD: new code_12._Code("+")
  };
  class Node2 {
    optimizeNodes() {
      return this;
    }
    optimizeNames(_names, _constants) {
      return this;
    }
  }
  class Def extends Node2 {
    constructor(varKind, name, rhs) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.rhs = rhs;
    }
    render({ es5, _n }) {
      const varKind = es5 ? scope_1.varKinds.var : this.varKind;
      const rhs = this.rhs === void 0 ? "" : ` = ${this.rhs}`;
      return `${varKind} ${this.name}${rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (!names2[this.name.str])
        return;
      if (this.rhs)
        this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      return this.rhs instanceof code_12._CodeOrName ? this.rhs.names : {};
    }
  }
  class Assign extends Node2 {
    constructor(lhs, rhs, sideEffects) {
      super();
      this.lhs = lhs;
      this.rhs = rhs;
      this.sideEffects = sideEffects;
    }
    render({ _n }) {
      return `${this.lhs} = ${this.rhs};` + _n;
    }
    optimizeNames(names2, constants2) {
      if (this.lhs instanceof code_12.Name && !names2[this.lhs.str] && !this.sideEffects)
        return;
      this.rhs = optimizeExpr(this.rhs, names2, constants2);
      return this;
    }
    get names() {
      const names2 = this.lhs instanceof code_12.Name ? {} : __spreadValues({}, this.lhs.names);
      return addExprNames(names2, this.rhs);
    }
  }
  class AssignOp extends Assign {
    constructor(lhs, op, rhs, sideEffects) {
      super(lhs, rhs, sideEffects);
      this.op = op;
    }
    render({ _n }) {
      return `${this.lhs} ${this.op}= ${this.rhs};` + _n;
    }
  }
  class Label extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      return `${this.label}:` + _n;
    }
  }
  class Break extends Node2 {
    constructor(label) {
      super();
      this.label = label;
      this.names = {};
    }
    render({ _n }) {
      const label = this.label ? ` ${this.label}` : "";
      return `break${label};` + _n;
    }
  }
  class Throw extends Node2 {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render({ _n }) {
      return `throw ${this.error};` + _n;
    }
    get names() {
      return this.error.names;
    }
  }
  class AnyCode extends Node2 {
    constructor(code2) {
      super();
      this.code = code2;
    }
    render({ _n }) {
      return `${this.code};` + _n;
    }
    optimizeNodes() {
      return `${this.code}` ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      this.code = optimizeExpr(this.code, names2, constants2);
      return this;
    }
    get names() {
      return this.code instanceof code_12._CodeOrName ? this.code.names : {};
    }
  }
  class ParentNode extends Node2 {
    constructor(nodes = []) {
      super();
      this.nodes = nodes;
    }
    render(opts2) {
      return this.nodes.reduce((code2, n) => code2 + n.render(opts2), "");
    }
    optimizeNodes() {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i].optimizeNodes();
        if (Array.isArray(n))
          nodes.splice(i, 1, ...n);
        else if (n)
          nodes[i] = n;
        else
          nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    optimizeNames(names2, constants2) {
      const { nodes } = this;
      let i = nodes.length;
      while (i--) {
        const n = nodes[i];
        if (n.optimizeNames(names2, constants2))
          continue;
        subtractNames(names2, n.names);
        nodes.splice(i, 1);
      }
      return nodes.length > 0 ? this : void 0;
    }
    get names() {
      return this.nodes.reduce((names2, n) => addNames(names2, n.names), {});
    }
  }
  class BlockNode extends ParentNode {
    render(opts2) {
      return "{" + opts2._n + super.render(opts2) + "}" + opts2._n;
    }
  }
  class Root extends ParentNode {
  }
  class Else extends BlockNode {
  }
  Else.kind = "else";
  class If extends BlockNode {
    constructor(condition, nodes) {
      super(nodes);
      this.condition = condition;
    }
    render(opts2) {
      let code2 = `if(${this.condition})` + super.render(opts2);
      if (this.else)
        code2 += "else " + this.else.render(opts2);
      return code2;
    }
    optimizeNodes() {
      super.optimizeNodes();
      const cond = this.condition;
      if (cond === true)
        return this.nodes;
      let e = this.else;
      if (e) {
        const ns = e.optimizeNodes();
        e = this.else = Array.isArray(ns) ? new Else(ns) : ns;
      }
      if (e) {
        if (cond === false)
          return e instanceof If ? e : e.nodes;
        if (this.nodes.length)
          return this;
        return new If(not2(cond), e instanceof If ? [e] : e.nodes);
      }
      if (cond === false || !this.nodes.length)
        return void 0;
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a;
      this.else = (_a = this.else) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      if (!(super.optimizeNames(names2, constants2) || this.else))
        return;
      this.condition = optimizeExpr(this.condition, names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      addExprNames(names2, this.condition);
      if (this.else)
        addNames(names2, this.else.names);
      return names2;
    }
  }
  If.kind = "if";
  class For extends BlockNode {
  }
  For.kind = "for";
  class ForLoop extends For {
    constructor(iteration) {
      super();
      this.iteration = iteration;
    }
    render(opts2) {
      return `for(${this.iteration})` + super.render(opts2);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iteration = optimizeExpr(this.iteration, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iteration.names);
    }
  }
  class ForRange extends For {
    constructor(varKind, name, from, to) {
      super();
      this.varKind = varKind;
      this.name = name;
      this.from = from;
      this.to = to;
    }
    render(opts2) {
      const varKind = opts2.es5 ? scope_1.varKinds.var : this.varKind;
      const { name, from, to } = this;
      return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts2);
    }
    get names() {
      const names2 = addExprNames(super.names, this.from);
      return addExprNames(names2, this.to);
    }
  }
  class ForIter extends For {
    constructor(loop, varKind, name, iterable) {
      super();
      this.loop = loop;
      this.varKind = varKind;
      this.name = name;
      this.iterable = iterable;
    }
    render(opts2) {
      return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts2);
    }
    optimizeNames(names2, constants2) {
      if (!super.optimizeNames(names2, constants2))
        return;
      this.iterable = optimizeExpr(this.iterable, names2, constants2);
      return this;
    }
    get names() {
      return addNames(super.names, this.iterable.names);
    }
  }
  class Func extends BlockNode {
    constructor(name, args, async) {
      super();
      this.name = name;
      this.args = args;
      this.async = async;
    }
    render(opts2) {
      const _async = this.async ? "async " : "";
      return `${_async}function ${this.name}(${this.args})` + super.render(opts2);
    }
  }
  Func.kind = "func";
  class Return extends ParentNode {
    render(opts2) {
      return "return " + super.render(opts2);
    }
  }
  Return.kind = "return";
  class Try extends BlockNode {
    render(opts2) {
      let code2 = "try" + super.render(opts2);
      if (this.catch)
        code2 += this.catch.render(opts2);
      if (this.finally)
        code2 += this.finally.render(opts2);
      return code2;
    }
    optimizeNodes() {
      var _a, _b;
      super.optimizeNodes();
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNodes();
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNodes();
      return this;
    }
    optimizeNames(names2, constants2) {
      var _a, _b;
      super.optimizeNames(names2, constants2);
      (_a = this.catch) === null || _a === void 0 ? void 0 : _a.optimizeNames(names2, constants2);
      (_b = this.finally) === null || _b === void 0 ? void 0 : _b.optimizeNames(names2, constants2);
      return this;
    }
    get names() {
      const names2 = super.names;
      if (this.catch)
        addNames(names2, this.catch.names);
      if (this.finally)
        addNames(names2, this.finally.names);
      return names2;
    }
  }
  class Catch extends BlockNode {
    constructor(error2) {
      super();
      this.error = error2;
    }
    render(opts2) {
      return `catch(${this.error})` + super.render(opts2);
    }
  }
  Catch.kind = "catch";
  class Finally extends BlockNode {
    render(opts2) {
      return "finally" + super.render(opts2);
    }
  }
  Finally.kind = "finally";
  class CodeGen {
    constructor(extScope, opts2 = {}) {
      this._values = {};
      this._blockStarts = [];
      this._constants = {};
      this.opts = __spreadProps(__spreadValues({}, opts2), { _n: opts2.lines ? "\n" : "" });
      this._extScope = extScope;
      this._scope = new scope_1.Scope({ parent: extScope });
      this._nodes = [new Root()];
    }
    toString() {
      return this._root.render(this.opts);
    }
    name(prefix) {
      return this._scope.name(prefix);
    }
    scopeName(prefix) {
      return this._extScope.name(prefix);
    }
    scopeValue(prefixOrName, value) {
      const name = this._extScope.value(prefixOrName, value);
      const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set());
      vs.add(name);
      return name;
    }
    getScopeValue(prefix, keyOrRef) {
      return this._extScope.getValue(prefix, keyOrRef);
    }
    scopeRefs(scopeName) {
      return this._extScope.scopeRefs(scopeName, this._values);
    }
    scopeCode() {
      return this._extScope.scopeCode(this._values);
    }
    _def(varKind, nameOrPrefix, rhs, constant) {
      const name = this._scope.toName(nameOrPrefix);
      if (rhs !== void 0 && constant)
        this._constants[name.str] = rhs;
      this._leafNode(new Def(varKind, name, rhs));
      return name;
    }
    const(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.const, nameOrPrefix, rhs, _constant);
    }
    let(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.let, nameOrPrefix, rhs, _constant);
    }
    var(nameOrPrefix, rhs, _constant) {
      return this._def(scope_1.varKinds.var, nameOrPrefix, rhs, _constant);
    }
    assign(lhs, rhs, sideEffects) {
      return this._leafNode(new Assign(lhs, rhs, sideEffects));
    }
    add(lhs, rhs) {
      return this._leafNode(new AssignOp(lhs, exports.operators.ADD, rhs));
    }
    code(c) {
      if (typeof c == "function")
        c();
      else if (c !== code_12.nil)
        this._leafNode(new AnyCode(c));
      return this;
    }
    object(...keyValues) {
      const code2 = ["{"];
      for (const [key, value] of keyValues) {
        if (code2.length > 1)
          code2.push(",");
        code2.push(key);
        if (key !== value || this.opts.es5) {
          code2.push(":");
          (0, code_12.addCodeArg)(code2, value);
        }
      }
      code2.push("}");
      return new code_12._Code(code2);
    }
    if(condition, thenBody, elseBody) {
      this._blockNode(new If(condition));
      if (thenBody && elseBody) {
        this.code(thenBody).else().code(elseBody).endIf();
      } else if (thenBody) {
        this.code(thenBody).endIf();
      } else if (elseBody) {
        throw new Error('CodeGen: "else" body without "then" body');
      }
      return this;
    }
    elseIf(condition) {
      return this._elseNode(new If(condition));
    }
    else() {
      return this._elseNode(new Else());
    }
    endIf() {
      return this._endBlockNode(If, Else);
    }
    _for(node, forBody) {
      this._blockNode(node);
      if (forBody)
        this.code(forBody).endFor();
      return this;
    }
    for(iteration, forBody) {
      return this._for(new ForLoop(iteration), forBody);
    }
    forRange(nameOrPrefix, from, to, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.let) {
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForRange(varKind, name, from, to), () => forBody(name));
    }
    forOf(nameOrPrefix, iterable, forBody, varKind = scope_1.varKinds.const) {
      const name = this._scope.toName(nameOrPrefix);
      if (this.opts.es5) {
        const arr = iterable instanceof code_12.Name ? iterable : this.var("_arr", iterable);
        return this.forRange("_i", 0, (0, code_12._)`${arr}.length`, (i) => {
          this.var(name, (0, code_12._)`${arr}[${i}]`);
          forBody(name);
        });
      }
      return this._for(new ForIter("of", varKind, name, iterable), () => forBody(name));
    }
    forIn(nameOrPrefix, obj, forBody, varKind = this.opts.es5 ? scope_1.varKinds.var : scope_1.varKinds.const) {
      if (this.opts.ownProperties) {
        return this.forOf(nameOrPrefix, (0, code_12._)`Object.keys(${obj})`, forBody);
      }
      const name = this._scope.toName(nameOrPrefix);
      return this._for(new ForIter("in", varKind, name, obj), () => forBody(name));
    }
    endFor() {
      return this._endBlockNode(For);
    }
    label(label) {
      return this._leafNode(new Label(label));
    }
    break(label) {
      return this._leafNode(new Break(label));
    }
    return(value) {
      const node = new Return();
      this._blockNode(node);
      this.code(value);
      if (node.nodes.length !== 1)
        throw new Error('CodeGen: "return" should have one node');
      return this._endBlockNode(Return);
    }
    try(tryBody, catchCode, finallyCode) {
      if (!catchCode && !finallyCode)
        throw new Error('CodeGen: "try" without "catch" and "finally"');
      const node = new Try();
      this._blockNode(node);
      this.code(tryBody);
      if (catchCode) {
        const error2 = this.name("e");
        this._currNode = node.catch = new Catch(error2);
        catchCode(error2);
      }
      if (finallyCode) {
        this._currNode = node.finally = new Finally();
        this.code(finallyCode);
      }
      return this._endBlockNode(Catch, Finally);
    }
    throw(error2) {
      return this._leafNode(new Throw(error2));
    }
    block(body, nodeCount) {
      this._blockStarts.push(this._nodes.length);
      if (body)
        this.code(body).endBlock(nodeCount);
      return this;
    }
    endBlock(nodeCount) {
      const len = this._blockStarts.pop();
      if (len === void 0)
        throw new Error("CodeGen: not in self-balancing block");
      const toClose = this._nodes.length - len;
      if (toClose < 0 || nodeCount !== void 0 && toClose !== nodeCount) {
        throw new Error(`CodeGen: wrong number of nodes: ${toClose} vs ${nodeCount} expected`);
      }
      this._nodes.length = len;
      return this;
    }
    func(name, args = code_12.nil, async, funcBody) {
      this._blockNode(new Func(name, args, async));
      if (funcBody)
        this.code(funcBody).endFunc();
      return this;
    }
    endFunc() {
      return this._endBlockNode(Func);
    }
    optimize(n = 1) {
      while (n-- > 0) {
        this._root.optimizeNodes();
        this._root.optimizeNames(this._root.names, this._constants);
      }
    }
    _leafNode(node) {
      this._currNode.nodes.push(node);
      return this;
    }
    _blockNode(node) {
      this._currNode.nodes.push(node);
      this._nodes.push(node);
    }
    _endBlockNode(N1, N2) {
      const n = this._currNode;
      if (n instanceof N1 || N2 && n instanceof N2) {
        this._nodes.pop();
        return this;
      }
      throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`);
    }
    _elseNode(node) {
      const n = this._currNode;
      if (!(n instanceof If)) {
        throw new Error('CodeGen: "else" without "if"');
      }
      this._currNode = n.else = node;
      return this;
    }
    get _root() {
      return this._nodes[0];
    }
    get _currNode() {
      const ns = this._nodes;
      return ns[ns.length - 1];
    }
    set _currNode(node) {
      const ns = this._nodes;
      ns[ns.length - 1] = node;
    }
  }
  exports.CodeGen = CodeGen;
  function addNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) + (from[n] || 0);
    return names2;
  }
  function addExprNames(names2, from) {
    return from instanceof code_12._CodeOrName ? addNames(names2, from.names) : names2;
  }
  function optimizeExpr(expr, names2, constants2) {
    if (expr instanceof code_12.Name)
      return replaceName(expr);
    if (!canOptimize(expr))
      return expr;
    return new code_12._Code(expr._items.reduce((items2, c) => {
      if (c instanceof code_12.Name)
        c = replaceName(c);
      if (c instanceof code_12._Code)
        items2.push(...c._items);
      else
        items2.push(c);
      return items2;
    }, []));
    function replaceName(n) {
      const c = constants2[n.str];
      if (c === void 0 || names2[n.str] !== 1)
        return n;
      delete names2[n.str];
      return c;
    }
    function canOptimize(e) {
      return e instanceof code_12._Code && e._items.some((c) => c instanceof code_12.Name && names2[c.str] === 1 && constants2[c.str] !== void 0);
    }
  }
  function subtractNames(names2, from) {
    for (const n in from)
      names2[n] = (names2[n] || 0) - (from[n] || 0);
  }
  function not2(x) {
    return typeof x == "boolean" || typeof x == "number" || x === null ? !x : (0, code_12._)`!${par(x)}`;
  }
  exports.not = not2;
  const andCode = mappend(exports.operators.AND);
  function and(...args) {
    return args.reduce(andCode);
  }
  exports.and = and;
  const orCode = mappend(exports.operators.OR);
  function or(...args) {
    return args.reduce(orCode);
  }
  exports.or = or;
  function mappend(op) {
    return (x, y) => x === code_12.nil ? y : y === code_12.nil ? x : (0, code_12._)`${par(x)} ${op} ${par(y)}`;
  }
  function par(x) {
    return x instanceof code_12.Name ? x : (0, code_12._)`(${x})`;
  }
})(codegen);
var util = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.checkStrictMode = exports.getErrorPath = exports.Type = exports.useFunc = exports.setEvaluated = exports.evaluatedPropsToName = exports.mergeEvaluated = exports.eachItem = exports.unescapeJsonPointer = exports.escapeJsonPointer = exports.escapeFragment = exports.unescapeFragment = exports.schemaRefOrVal = exports.schemaHasRulesButRef = exports.schemaHasRules = exports.checkUnknownRules = exports.alwaysValidSchema = exports.toHash = void 0;
  const codegen_12 = codegen;
  const code_12 = code$1;
  function toHash(arr) {
    const hash = {};
    for (const item of arr)
      hash[item] = true;
    return hash;
  }
  exports.toHash = toHash;
  function alwaysValidSchema(it, schema) {
    if (typeof schema == "boolean")
      return schema;
    if (Object.keys(schema).length === 0)
      return true;
    checkUnknownRules(it, schema);
    return !schemaHasRules(schema, it.self.RULES.all);
  }
  exports.alwaysValidSchema = alwaysValidSchema;
  function checkUnknownRules(it, schema = it.schema) {
    const { opts: opts2, self: self2 } = it;
    if (!opts2.strictSchema)
      return;
    if (typeof schema === "boolean")
      return;
    const rules2 = self2.RULES.keywords;
    for (const key in schema) {
      if (!rules2[key])
        checkStrictMode(it, `unknown keyword: "${key}"`);
    }
  }
  exports.checkUnknownRules = checkUnknownRules;
  function schemaHasRules(schema, rules2) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (rules2[key])
        return true;
    return false;
  }
  exports.schemaHasRules = schemaHasRules;
  function schemaHasRulesButRef(schema, RULES) {
    if (typeof schema == "boolean")
      return !schema;
    for (const key in schema)
      if (key !== "$ref" && RULES.all[key])
        return true;
    return false;
  }
  exports.schemaHasRulesButRef = schemaHasRulesButRef;
  function schemaRefOrVal({ topSchemaRef, schemaPath }, schema, keyword2, $data) {
    if (!$data) {
      if (typeof schema == "number" || typeof schema == "boolean")
        return schema;
      if (typeof schema == "string")
        return (0, codegen_12._)`${schema}`;
    }
    return (0, codegen_12._)`${topSchemaRef}${schemaPath}${(0, codegen_12.getProperty)(keyword2)}`;
  }
  exports.schemaRefOrVal = schemaRefOrVal;
  function unescapeFragment(str) {
    return unescapeJsonPointer(decodeURIComponent(str));
  }
  exports.unescapeFragment = unescapeFragment;
  function escapeFragment(str) {
    return encodeURIComponent(escapeJsonPointer(str));
  }
  exports.escapeFragment = escapeFragment;
  function escapeJsonPointer(str) {
    if (typeof str == "number")
      return `${str}`;
    return str.replace(/~/g, "~0").replace(/\//g, "~1");
  }
  exports.escapeJsonPointer = escapeJsonPointer;
  function unescapeJsonPointer(str) {
    return str.replace(/~1/g, "/").replace(/~0/g, "~");
  }
  exports.unescapeJsonPointer = unescapeJsonPointer;
  function eachItem(xs, f) {
    if (Array.isArray(xs)) {
      for (const x of xs)
        f(x);
    } else {
      f(xs);
    }
  }
  exports.eachItem = eachItem;
  function makeMergeEvaluated({ mergeNames, mergeToName, mergeValues, resultToName }) {
    return (gen, from, to, toName) => {
      const res = to === void 0 ? from : to instanceof codegen_12.Name ? (from instanceof codegen_12.Name ? mergeNames(gen, from, to) : mergeToName(gen, from, to), to) : from instanceof codegen_12.Name ? (mergeToName(gen, to, from), from) : mergeValues(from, to);
      return toName === codegen_12.Name && !(res instanceof codegen_12.Name) ? resultToName(gen, res) : res;
    };
  }
  exports.mergeEvaluated = {
    props: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true && ${from} !== undefined`, () => {
        gen.if((0, codegen_12._)`${from} === true`, () => gen.assign(to, true), () => gen.assign(to, (0, codegen_12._)`${to} || {}`).code((0, codegen_12._)`Object.assign(${to}, ${from})`));
      }),
      mergeToName: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true`, () => {
        if (from === true) {
          gen.assign(to, true);
        } else {
          gen.assign(to, (0, codegen_12._)`${to} || {}`);
          setEvaluated(gen, to, from);
        }
      }),
      mergeValues: (from, to) => from === true ? true : __spreadValues(__spreadValues({}, from), to),
      resultToName: evaluatedPropsToName
    }),
    items: makeMergeEvaluated({
      mergeNames: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true && ${from} !== undefined`, () => gen.assign(to, (0, codegen_12._)`${from} === true ? true : ${to} > ${from} ? ${to} : ${from}`)),
      mergeToName: (gen, from, to) => gen.if((0, codegen_12._)`${to} !== true`, () => gen.assign(to, from === true ? true : (0, codegen_12._)`${to} > ${from} ? ${to} : ${from}`)),
      mergeValues: (from, to) => from === true ? true : Math.max(from, to),
      resultToName: (gen, items2) => gen.var("items", items2)
    })
  };
  function evaluatedPropsToName(gen, ps) {
    if (ps === true)
      return gen.var("props", true);
    const props = gen.var("props", (0, codegen_12._)`{}`);
    if (ps !== void 0)
      setEvaluated(gen, props, ps);
    return props;
  }
  exports.evaluatedPropsToName = evaluatedPropsToName;
  function setEvaluated(gen, props, ps) {
    Object.keys(ps).forEach((p) => gen.assign((0, codegen_12._)`${props}${(0, codegen_12.getProperty)(p)}`, true));
  }
  exports.setEvaluated = setEvaluated;
  const snippets = {};
  function useFunc(gen, f) {
    return gen.scopeValue("func", {
      ref: f,
      code: snippets[f.code] || (snippets[f.code] = new code_12._Code(f.code))
    });
  }
  exports.useFunc = useFunc;
  var Type;
  (function(Type2) {
    Type2[Type2["Num"] = 0] = "Num";
    Type2[Type2["Str"] = 1] = "Str";
  })(Type = exports.Type || (exports.Type = {}));
  function getErrorPath(dataProp, dataPropType, jsPropertySyntax) {
    if (dataProp instanceof codegen_12.Name) {
      const isNumber = dataPropType === Type.Num;
      return jsPropertySyntax ? isNumber ? (0, codegen_12._)`"[" + ${dataProp} + "]"` : (0, codegen_12._)`"['" + ${dataProp} + "']"` : isNumber ? (0, codegen_12._)`"/" + ${dataProp}` : (0, codegen_12._)`"/" + ${dataProp}.replace(/~/g, "~0").replace(/\\//g, "~1")`;
    }
    return jsPropertySyntax ? (0, codegen_12.getProperty)(dataProp).toString() : "/" + escapeJsonPointer(dataProp);
  }
  exports.getErrorPath = getErrorPath;
  function checkStrictMode(it, msg, mode = it.opts.strictSchema) {
    if (!mode)
      return;
    msg = `strict mode: ${msg}`;
    if (mode === true)
      throw new Error(msg);
    it.self.logger.warn(msg);
  }
  exports.checkStrictMode = checkStrictMode;
})(util);
var names$1 = {};
Object.defineProperty(names$1, "__esModule", { value: true });
const codegen_1$t = codegen;
const names = {
  data: new codegen_1$t.Name("data"),
  valCxt: new codegen_1$t.Name("valCxt"),
  instancePath: new codegen_1$t.Name("instancePath"),
  parentData: new codegen_1$t.Name("parentData"),
  parentDataProperty: new codegen_1$t.Name("parentDataProperty"),
  rootData: new codegen_1$t.Name("rootData"),
  dynamicAnchors: new codegen_1$t.Name("dynamicAnchors"),
  vErrors: new codegen_1$t.Name("vErrors"),
  errors: new codegen_1$t.Name("errors"),
  this: new codegen_1$t.Name("this"),
  self: new codegen_1$t.Name("self"),
  scope: new codegen_1$t.Name("scope"),
  json: new codegen_1$t.Name("json"),
  jsonPos: new codegen_1$t.Name("jsonPos"),
  jsonLen: new codegen_1$t.Name("jsonLen"),
  jsonPart: new codegen_1$t.Name("jsonPart")
};
names$1.default = names;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.extendErrors = exports.resetErrorsCount = exports.reportExtraError = exports.reportError = exports.keyword$DataError = exports.keywordError = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const names_12 = names$1;
  exports.keywordError = {
    message: ({ keyword: keyword2 }) => (0, codegen_12.str)`must pass "${keyword2}" keyword validation`
  };
  exports.keyword$DataError = {
    message: ({ keyword: keyword2, schemaType }) => schemaType ? (0, codegen_12.str)`"${keyword2}" keyword must be ${schemaType} ($data)` : (0, codegen_12.str)`"${keyword2}" keyword is invalid ($data)`
  };
  function reportError(cxt, error2 = exports.keywordError, errorPaths, overrideAllErrors) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    if (overrideAllErrors !== null && overrideAllErrors !== void 0 ? overrideAllErrors : compositeRule || allErrors) {
      addError(gen, errObj);
    } else {
      returnErrors(it, (0, codegen_12._)`[${errObj}]`);
    }
  }
  exports.reportError = reportError;
  function reportExtraError(cxt, error2 = exports.keywordError, errorPaths) {
    const { it } = cxt;
    const { gen, compositeRule, allErrors } = it;
    const errObj = errorObjectCode(cxt, error2, errorPaths);
    addError(gen, errObj);
    if (!(compositeRule || allErrors)) {
      returnErrors(it, names_12.default.vErrors);
    }
  }
  exports.reportExtraError = reportExtraError;
  function resetErrorsCount(gen, errsCount) {
    gen.assign(names_12.default.errors, errsCount);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} !== null`, () => gen.if(errsCount, () => gen.assign((0, codegen_12._)`${names_12.default.vErrors}.length`, errsCount), () => gen.assign(names_12.default.vErrors, null)));
  }
  exports.resetErrorsCount = resetErrorsCount;
  function extendErrors({ gen, keyword: keyword2, schemaValue, data, errsCount, it }) {
    if (errsCount === void 0)
      throw new Error("ajv implementation error");
    const err = gen.name("err");
    gen.forRange("i", errsCount, names_12.default.errors, (i) => {
      gen.const(err, (0, codegen_12._)`${names_12.default.vErrors}[${i}]`);
      gen.if((0, codegen_12._)`${err}.instancePath === undefined`, () => gen.assign((0, codegen_12._)`${err}.instancePath`, (0, codegen_12.strConcat)(names_12.default.instancePath, it.errorPath)));
      gen.assign((0, codegen_12._)`${err}.schemaPath`, (0, codegen_12.str)`${it.errSchemaPath}/${keyword2}`);
      if (it.opts.verbose) {
        gen.assign((0, codegen_12._)`${err}.schema`, schemaValue);
        gen.assign((0, codegen_12._)`${err}.data`, data);
      }
    });
  }
  exports.extendErrors = extendErrors;
  function addError(gen, errObj) {
    const err = gen.const("err", errObj);
    gen.if((0, codegen_12._)`${names_12.default.vErrors} === null`, () => gen.assign(names_12.default.vErrors, (0, codegen_12._)`[${err}]`), (0, codegen_12._)`${names_12.default.vErrors}.push(${err})`);
    gen.code((0, codegen_12._)`${names_12.default.errors}++`);
  }
  function returnErrors(it, errs) {
    const { gen, validateName, schemaEnv } = it;
    if (schemaEnv.$async) {
      gen.throw((0, codegen_12._)`new ${it.ValidationError}(${errs})`);
    } else {
      gen.assign((0, codegen_12._)`${validateName}.errors`, errs);
      gen.return(false);
    }
  }
  const E = {
    keyword: new codegen_12.Name("keyword"),
    schemaPath: new codegen_12.Name("schemaPath"),
    params: new codegen_12.Name("params"),
    propertyName: new codegen_12.Name("propertyName"),
    message: new codegen_12.Name("message"),
    schema: new codegen_12.Name("schema"),
    parentSchema: new codegen_12.Name("parentSchema")
  };
  function errorObjectCode(cxt, error2, errorPaths) {
    const { createErrors } = cxt.it;
    if (createErrors === false)
      return (0, codegen_12._)`{}`;
    return errorObject(cxt, error2, errorPaths);
  }
  function errorObject(cxt, error2, errorPaths = {}) {
    const { gen, it } = cxt;
    const keyValues = [
      errorInstancePath(it, errorPaths),
      errorSchemaPath(cxt, errorPaths)
    ];
    extraErrorProps(cxt, error2, keyValues);
    return gen.object(...keyValues);
  }
  function errorInstancePath({ errorPath }, { instancePath }) {
    const instPath = instancePath ? (0, codegen_12.str)`${errorPath}${(0, util_12.getErrorPath)(instancePath, util_12.Type.Str)}` : errorPath;
    return [names_12.default.instancePath, (0, codegen_12.strConcat)(names_12.default.instancePath, instPath)];
  }
  function errorSchemaPath({ keyword: keyword2, it: { errSchemaPath } }, { schemaPath, parentSchema }) {
    let schPath = parentSchema ? errSchemaPath : (0, codegen_12.str)`${errSchemaPath}/${keyword2}`;
    if (schemaPath) {
      schPath = (0, codegen_12.str)`${schPath}${(0, util_12.getErrorPath)(schemaPath, util_12.Type.Str)}`;
    }
    return [E.schemaPath, schPath];
  }
  function extraErrorProps(cxt, { params, message }, keyValues) {
    const { keyword: keyword2, data, schemaValue, it } = cxt;
    const { opts: opts2, propertyName, topSchemaRef, schemaPath } = it;
    keyValues.push([E.keyword, keyword2], [E.params, typeof params == "function" ? params(cxt) : params || (0, codegen_12._)`{}`]);
    if (opts2.messages) {
      keyValues.push([E.message, typeof message == "function" ? message(cxt) : message]);
    }
    if (opts2.verbose) {
      keyValues.push([E.schema, schemaValue], [E.parentSchema, (0, codegen_12._)`${topSchemaRef}${schemaPath}`], [names_12.default.data, data]);
    }
    if (propertyName)
      keyValues.push([E.propertyName, propertyName]);
  }
})(errors);
Object.defineProperty(boolSchema, "__esModule", { value: true });
boolSchema.boolOrEmptySchema = boolSchema.topBoolOrEmptySchema = void 0;
const errors_1$2 = errors;
const codegen_1$s = codegen;
const names_1$6 = names$1;
const boolError = {
  message: "boolean schema is false"
};
function topBoolOrEmptySchema(it) {
  const { gen, schema, validateName } = it;
  if (schema === false) {
    falseSchemaError(it, false);
  } else if (typeof schema == "object" && schema.$async === true) {
    gen.return(names_1$6.default.data);
  } else {
    gen.assign((0, codegen_1$s._)`${validateName}.errors`, null);
    gen.return(true);
  }
}
boolSchema.topBoolOrEmptySchema = topBoolOrEmptySchema;
function boolOrEmptySchema(it, valid2) {
  const { gen, schema } = it;
  if (schema === false) {
    gen.var(valid2, false);
    falseSchemaError(it);
  } else {
    gen.var(valid2, true);
  }
}
boolSchema.boolOrEmptySchema = boolOrEmptySchema;
function falseSchemaError(it, overrideAllErrors) {
  const { gen, data } = it;
  const cxt = {
    gen,
    keyword: "false schema",
    data,
    schema: false,
    schemaCode: false,
    schemaValue: false,
    params: {},
    it
  };
  (0, errors_1$2.reportError)(cxt, boolError, void 0, overrideAllErrors);
}
var dataType = {};
var rules = {};
Object.defineProperty(rules, "__esModule", { value: true });
rules.getRules = rules.isJSONType = void 0;
const _jsonTypes = ["string", "number", "integer", "boolean", "null", "object", "array"];
const jsonTypes = new Set(_jsonTypes);
function isJSONType(x) {
  return typeof x == "string" && jsonTypes.has(x);
}
rules.isJSONType = isJSONType;
function getRules() {
  const groups = {
    number: { type: "number", rules: [] },
    string: { type: "string", rules: [] },
    array: { type: "array", rules: [] },
    object: { type: "object", rules: [] }
  };
  return {
    types: __spreadProps(__spreadValues({}, groups), { integer: true, boolean: true, null: true }),
    rules: [{ rules: [] }, groups.number, groups.string, groups.array, groups.object],
    post: { rules: [] },
    all: {},
    keywords: {}
  };
}
rules.getRules = getRules;
var applicability = {};
Object.defineProperty(applicability, "__esModule", { value: true });
applicability.shouldUseRule = applicability.shouldUseGroup = applicability.schemaHasRulesForType = void 0;
function schemaHasRulesForType({ schema, self: self2 }, type2) {
  const group = self2.RULES.types[type2];
  return group && group !== true && shouldUseGroup(schema, group);
}
applicability.schemaHasRulesForType = schemaHasRulesForType;
function shouldUseGroup(schema, group) {
  return group.rules.some((rule) => shouldUseRule(schema, rule));
}
applicability.shouldUseGroup = shouldUseGroup;
function shouldUseRule(schema, rule) {
  var _a;
  return schema[rule.keyword] !== void 0 || ((_a = rule.definition.implements) === null || _a === void 0 ? void 0 : _a.some((kwd) => schema[kwd] !== void 0));
}
applicability.shouldUseRule = shouldUseRule;
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.reportTypeError = exports.checkDataTypes = exports.checkDataType = exports.coerceAndCheckDataType = exports.getJSONTypes = exports.getSchemaTypes = exports.DataType = void 0;
  const rules_1 = rules;
  const applicability_12 = applicability;
  const errors_12 = errors;
  const codegen_12 = codegen;
  const util_12 = util;
  var DataType;
  (function(DataType2) {
    DataType2[DataType2["Correct"] = 0] = "Correct";
    DataType2[DataType2["Wrong"] = 1] = "Wrong";
  })(DataType = exports.DataType || (exports.DataType = {}));
  function getSchemaTypes(schema) {
    const types2 = getJSONTypes(schema.type);
    const hasNull = types2.includes("null");
    if (hasNull) {
      if (schema.nullable === false)
        throw new Error("type: null contradicts nullable: false");
    } else {
      if (!types2.length && schema.nullable !== void 0) {
        throw new Error('"nullable" cannot be used without "type"');
      }
      if (schema.nullable === true)
        types2.push("null");
    }
    return types2;
  }
  exports.getSchemaTypes = getSchemaTypes;
  function getJSONTypes(ts) {
    const types2 = Array.isArray(ts) ? ts : ts ? [ts] : [];
    if (types2.every(rules_1.isJSONType))
      return types2;
    throw new Error("type must be JSONType or JSONType[]: " + types2.join(","));
  }
  exports.getJSONTypes = getJSONTypes;
  function coerceAndCheckDataType(it, types2) {
    const { gen, data, opts: opts2 } = it;
    const coerceTo = coerceToTypes(types2, opts2.coerceTypes);
    const checkTypes = types2.length > 0 && !(coerceTo.length === 0 && types2.length === 1 && (0, applicability_12.schemaHasRulesForType)(it, types2[0]));
    if (checkTypes) {
      const wrongType = checkDataTypes(types2, data, opts2.strictNumbers, DataType.Wrong);
      gen.if(wrongType, () => {
        if (coerceTo.length)
          coerceData(it, types2, coerceTo);
        else
          reportTypeError(it);
      });
    }
    return checkTypes;
  }
  exports.coerceAndCheckDataType = coerceAndCheckDataType;
  const COERCIBLE = new Set(["string", "number", "integer", "boolean", "null"]);
  function coerceToTypes(types2, coerceTypes) {
    return coerceTypes ? types2.filter((t2) => COERCIBLE.has(t2) || coerceTypes === "array" && t2 === "array") : [];
  }
  function coerceData(it, types2, coerceTo) {
    const { gen, data, opts: opts2 } = it;
    const dataType2 = gen.let("dataType", (0, codegen_12._)`typeof ${data}`);
    const coerced = gen.let("coerced", (0, codegen_12._)`undefined`);
    if (opts2.coerceTypes === "array") {
      gen.if((0, codegen_12._)`${dataType2} == 'object' && Array.isArray(${data}) && ${data}.length == 1`, () => gen.assign(data, (0, codegen_12._)`${data}[0]`).assign(dataType2, (0, codegen_12._)`typeof ${data}`).if(checkDataTypes(types2, data, opts2.strictNumbers), () => gen.assign(coerced, data)));
    }
    gen.if((0, codegen_12._)`${coerced} !== undefined`);
    for (const t2 of coerceTo) {
      if (COERCIBLE.has(t2) || t2 === "array" && opts2.coerceTypes === "array") {
        coerceSpecificType(t2);
      }
    }
    gen.else();
    reportTypeError(it);
    gen.endIf();
    gen.if((0, codegen_12._)`${coerced} !== undefined`, () => {
      gen.assign(data, coerced);
      assignParentData(it, coerced);
    });
    function coerceSpecificType(t2) {
      switch (t2) {
        case "string":
          gen.elseIf((0, codegen_12._)`${dataType2} == "number" || ${dataType2} == "boolean"`).assign(coerced, (0, codegen_12._)`"" + ${data}`).elseIf((0, codegen_12._)`${data} === null`).assign(coerced, (0, codegen_12._)`""`);
          return;
        case "number":
          gen.elseIf((0, codegen_12._)`${dataType2} == "boolean" || ${data} === null
              || (${dataType2} == "string" && ${data} && ${data} == +${data})`).assign(coerced, (0, codegen_12._)`+${data}`);
          return;
        case "integer":
          gen.elseIf((0, codegen_12._)`${dataType2} === "boolean" || ${data} === null
              || (${dataType2} === "string" && ${data} && ${data} == +${data} && !(${data} % 1))`).assign(coerced, (0, codegen_12._)`+${data}`);
          return;
        case "boolean":
          gen.elseIf((0, codegen_12._)`${data} === "false" || ${data} === 0 || ${data} === null`).assign(coerced, false).elseIf((0, codegen_12._)`${data} === "true" || ${data} === 1`).assign(coerced, true);
          return;
        case "null":
          gen.elseIf((0, codegen_12._)`${data} === "" || ${data} === 0 || ${data} === false`);
          gen.assign(coerced, null);
          return;
        case "array":
          gen.elseIf((0, codegen_12._)`${dataType2} === "string" || ${dataType2} === "number"
              || ${dataType2} === "boolean" || ${data} === null`).assign(coerced, (0, codegen_12._)`[${data}]`);
      }
    }
  }
  function assignParentData({ gen, parentData, parentDataProperty }, expr) {
    gen.if((0, codegen_12._)`${parentData} !== undefined`, () => gen.assign((0, codegen_12._)`${parentData}[${parentDataProperty}]`, expr));
  }
  function checkDataType(dataType2, data, strictNums, correct = DataType.Correct) {
    const EQ = correct === DataType.Correct ? codegen_12.operators.EQ : codegen_12.operators.NEQ;
    let cond;
    switch (dataType2) {
      case "null":
        return (0, codegen_12._)`${data} ${EQ} null`;
      case "array":
        cond = (0, codegen_12._)`Array.isArray(${data})`;
        break;
      case "object":
        cond = (0, codegen_12._)`${data} && typeof ${data} == "object" && !Array.isArray(${data})`;
        break;
      case "integer":
        cond = numCond((0, codegen_12._)`!(${data} % 1) && !isNaN(${data})`);
        break;
      case "number":
        cond = numCond();
        break;
      default:
        return (0, codegen_12._)`typeof ${data} ${EQ} ${dataType2}`;
    }
    return correct === DataType.Correct ? cond : (0, codegen_12.not)(cond);
    function numCond(_cond = codegen_12.nil) {
      return (0, codegen_12.and)((0, codegen_12._)`typeof ${data} == "number"`, _cond, strictNums ? (0, codegen_12._)`isFinite(${data})` : codegen_12.nil);
    }
  }
  exports.checkDataType = checkDataType;
  function checkDataTypes(dataTypes, data, strictNums, correct) {
    if (dataTypes.length === 1) {
      return checkDataType(dataTypes[0], data, strictNums, correct);
    }
    let cond;
    const types2 = (0, util_12.toHash)(dataTypes);
    if (types2.array && types2.object) {
      const notObj = (0, codegen_12._)`typeof ${data} != "object"`;
      cond = types2.null ? notObj : (0, codegen_12._)`!${data} || ${notObj}`;
      delete types2.null;
      delete types2.array;
      delete types2.object;
    } else {
      cond = codegen_12.nil;
    }
    if (types2.number)
      delete types2.integer;
    for (const t2 in types2)
      cond = (0, codegen_12.and)(cond, checkDataType(t2, data, strictNums, correct));
    return cond;
  }
  exports.checkDataTypes = checkDataTypes;
  const typeError = {
    message: ({ schema }) => `must be ${schema}`,
    params: ({ schema, schemaValue }) => typeof schema == "string" ? (0, codegen_12._)`{type: ${schema}}` : (0, codegen_12._)`{type: ${schemaValue}}`
  };
  function reportTypeError(it) {
    const cxt = getTypeErrorContext(it);
    (0, errors_12.reportError)(cxt, typeError);
  }
  exports.reportTypeError = reportTypeError;
  function getTypeErrorContext(it) {
    const { gen, data, schema } = it;
    const schemaCode = (0, util_12.schemaRefOrVal)(it, schema, "type");
    return {
      gen,
      keyword: "type",
      data,
      schema: schema.type,
      schemaCode,
      schemaValue: schemaCode,
      parentSchema: schema,
      params: {},
      it
    };
  }
})(dataType);
var defaults$1 = {};
Object.defineProperty(defaults$1, "__esModule", { value: true });
defaults$1.assignDefaults = void 0;
const codegen_1$r = codegen;
const util_1$p = util;
function assignDefaults(it, ty) {
  const { properties: properties2, items: items2 } = it.schema;
  if (ty === "object" && properties2) {
    for (const key in properties2) {
      assignDefault(it, key, properties2[key].default);
    }
  } else if (ty === "array" && Array.isArray(items2)) {
    items2.forEach((sch, i) => assignDefault(it, i, sch.default));
  }
}
defaults$1.assignDefaults = assignDefaults;
function assignDefault(it, prop, defaultValue) {
  const { gen, compositeRule, data, opts: opts2 } = it;
  if (defaultValue === void 0)
    return;
  const childData = (0, codegen_1$r._)`${data}${(0, codegen_1$r.getProperty)(prop)}`;
  if (compositeRule) {
    (0, util_1$p.checkStrictMode)(it, `default is ignored for: ${childData}`);
    return;
  }
  let condition = (0, codegen_1$r._)`${childData} === undefined`;
  if (opts2.useDefaults === "empty") {
    condition = (0, codegen_1$r._)`${condition} || ${childData} === null || ${childData} === ""`;
  }
  gen.if(condition, (0, codegen_1$r._)`${childData} = ${(0, codegen_1$r.stringify)(defaultValue)}`);
}
var keyword = {};
var code = {};
Object.defineProperty(code, "__esModule", { value: true });
code.validateUnion = code.validateArray = code.usePattern = code.callValidateCode = code.schemaProperties = code.allSchemaProperties = code.noPropertyInData = code.propertyInData = code.isOwnProperty = code.hasPropFunc = code.reportMissingProp = code.checkMissingProp = code.checkReportMissingProp = void 0;
const codegen_1$q = codegen;
const util_1$o = util;
const names_1$5 = names$1;
const util_2$1 = util;
function checkReportMissingProp(cxt, prop) {
  const { gen, data, it } = cxt;
  gen.if(noPropertyInData(gen, data, prop, it.opts.ownProperties), () => {
    cxt.setParams({ missingProperty: (0, codegen_1$q._)`${prop}` }, true);
    cxt.error();
  });
}
code.checkReportMissingProp = checkReportMissingProp;
function checkMissingProp({ gen, data, it: { opts: opts2 } }, properties2, missing) {
  return (0, codegen_1$q.or)(...properties2.map((prop) => (0, codegen_1$q.and)(noPropertyInData(gen, data, prop, opts2.ownProperties), (0, codegen_1$q._)`${missing} = ${prop}`)));
}
code.checkMissingProp = checkMissingProp;
function reportMissingProp(cxt, missing) {
  cxt.setParams({ missingProperty: missing }, true);
  cxt.error();
}
code.reportMissingProp = reportMissingProp;
function hasPropFunc(gen) {
  return gen.scopeValue("func", {
    ref: Object.prototype.hasOwnProperty,
    code: (0, codegen_1$q._)`Object.prototype.hasOwnProperty`
  });
}
code.hasPropFunc = hasPropFunc;
function isOwnProperty(gen, data, property) {
  return (0, codegen_1$q._)`${hasPropFunc(gen)}.call(${data}, ${property})`;
}
code.isOwnProperty = isOwnProperty;
function propertyInData(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} !== undefined`;
  return ownProperties ? (0, codegen_1$q._)`${cond} && ${isOwnProperty(gen, data, property)}` : cond;
}
code.propertyInData = propertyInData;
function noPropertyInData(gen, data, property, ownProperties) {
  const cond = (0, codegen_1$q._)`${data}${(0, codegen_1$q.getProperty)(property)} === undefined`;
  return ownProperties ? (0, codegen_1$q.or)(cond, (0, codegen_1$q.not)(isOwnProperty(gen, data, property))) : cond;
}
code.noPropertyInData = noPropertyInData;
function allSchemaProperties(schemaMap) {
  return schemaMap ? Object.keys(schemaMap).filter((p) => p !== "__proto__") : [];
}
code.allSchemaProperties = allSchemaProperties;
function schemaProperties(it, schemaMap) {
  return allSchemaProperties(schemaMap).filter((p) => !(0, util_1$o.alwaysValidSchema)(it, schemaMap[p]));
}
code.schemaProperties = schemaProperties;
function callValidateCode({ schemaCode, data, it: { gen, topSchemaRef, schemaPath, errorPath }, it }, func, context, passSchema) {
  const dataAndSchema = passSchema ? (0, codegen_1$q._)`${schemaCode}, ${data}, ${topSchemaRef}${schemaPath}` : data;
  const valCxt = [
    [names_1$5.default.instancePath, (0, codegen_1$q.strConcat)(names_1$5.default.instancePath, errorPath)],
    [names_1$5.default.parentData, it.parentData],
    [names_1$5.default.parentDataProperty, it.parentDataProperty],
    [names_1$5.default.rootData, names_1$5.default.rootData]
  ];
  if (it.opts.dynamicRef)
    valCxt.push([names_1$5.default.dynamicAnchors, names_1$5.default.dynamicAnchors]);
  const args = (0, codegen_1$q._)`${dataAndSchema}, ${gen.object(...valCxt)}`;
  return context !== codegen_1$q.nil ? (0, codegen_1$q._)`${func}.call(${context}, ${args})` : (0, codegen_1$q._)`${func}(${args})`;
}
code.callValidateCode = callValidateCode;
const newRegExp = (0, codegen_1$q._)`new RegExp`;
function usePattern({ gen, it: { opts: opts2 } }, pattern2) {
  const u = opts2.unicodeRegExp ? "u" : "";
  const { regExp } = opts2.code;
  const rx = regExp(pattern2, u);
  return gen.scopeValue("pattern", {
    key: rx.toString(),
    ref: rx,
    code: (0, codegen_1$q._)`${regExp.code === "new RegExp" ? newRegExp : (0, util_2$1.useFunc)(gen, regExp)}(${pattern2}, ${u})`
  });
}
code.usePattern = usePattern;
function validateArray(cxt) {
  const { gen, data, keyword: keyword2, it } = cxt;
  const valid2 = gen.name("valid");
  if (it.allErrors) {
    const validArr = gen.let("valid", true);
    validateItems(() => gen.assign(validArr, false));
    return validArr;
  }
  gen.var(valid2, true);
  validateItems(() => gen.break());
  return valid2;
  function validateItems(notValid) {
    const len = gen.const("len", (0, codegen_1$q._)`${data}.length`);
    gen.forRange("i", 0, len, (i) => {
      cxt.subschema({
        keyword: keyword2,
        dataProp: i,
        dataPropType: util_1$o.Type.Num
      }, valid2);
      gen.if((0, codegen_1$q.not)(valid2), notValid);
    });
  }
}
code.validateArray = validateArray;
function validateUnion(cxt) {
  const { gen, schema, keyword: keyword2, it } = cxt;
  if (!Array.isArray(schema))
    throw new Error("ajv implementation error");
  const alwaysValid = schema.some((sch) => (0, util_1$o.alwaysValidSchema)(it, sch));
  if (alwaysValid && !it.opts.unevaluated)
    return;
  const valid2 = gen.let("valid", false);
  const schValid = gen.name("_valid");
  gen.block(() => schema.forEach((_sch, i) => {
    const schCxt = cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      compositeRule: true
    }, schValid);
    gen.assign(valid2, (0, codegen_1$q._)`${valid2} || ${schValid}`);
    const merged = cxt.mergeValidEvaluated(schCxt, schValid);
    if (!merged)
      gen.if((0, codegen_1$q.not)(valid2));
  }));
  cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
}
code.validateUnion = validateUnion;
Object.defineProperty(keyword, "__esModule", { value: true });
keyword.validateKeywordUsage = keyword.validSchemaType = keyword.funcKeywordCode = keyword.macroKeywordCode = void 0;
const codegen_1$p = codegen;
const names_1$4 = names$1;
const code_1$9 = code;
const errors_1$1 = errors;
function macroKeywordCode(cxt, def2) {
  const { gen, keyword: keyword2, schema, parentSchema, it } = cxt;
  const macroSchema = def2.macro.call(it.self, schema, parentSchema, it);
  const schemaRef = useKeyword(gen, keyword2, macroSchema);
  if (it.opts.validateSchema !== false)
    it.self.validateSchema(macroSchema, true);
  const valid2 = gen.name("valid");
  cxt.subschema({
    schema: macroSchema,
    schemaPath: codegen_1$p.nil,
    errSchemaPath: `${it.errSchemaPath}/${keyword2}`,
    topSchemaRef: schemaRef,
    compositeRule: true
  }, valid2);
  cxt.pass(valid2, () => cxt.error(true));
}
keyword.macroKeywordCode = macroKeywordCode;
function funcKeywordCode(cxt, def2) {
  var _a;
  const { gen, keyword: keyword2, schema, parentSchema, $data, it } = cxt;
  checkAsyncKeyword(it, def2);
  const validate2 = !$data && def2.compile ? def2.compile.call(it.self, schema, parentSchema, it) : def2.validate;
  const validateRef = useKeyword(gen, keyword2, validate2);
  const valid2 = gen.let("valid");
  cxt.block$data(valid2, validateKeyword);
  cxt.ok((_a = def2.valid) !== null && _a !== void 0 ? _a : valid2);
  function validateKeyword() {
    if (def2.errors === false) {
      assignValid();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => cxt.error());
    } else {
      const ruleErrs = def2.async ? validateAsync() : validateSync();
      if (def2.modifying)
        modifyData(cxt);
      reportErrs(() => addErrs(cxt, ruleErrs));
    }
  }
  function validateAsync() {
    const ruleErrs = gen.let("ruleErrs", null);
    gen.try(() => assignValid((0, codegen_1$p._)`await `), (e) => gen.assign(valid2, false).if((0, codegen_1$p._)`${e} instanceof ${it.ValidationError}`, () => gen.assign(ruleErrs, (0, codegen_1$p._)`${e}.errors`), () => gen.throw(e)));
    return ruleErrs;
  }
  function validateSync() {
    const validateErrs = (0, codegen_1$p._)`${validateRef}.errors`;
    gen.assign(validateErrs, null);
    assignValid(codegen_1$p.nil);
    return validateErrs;
  }
  function assignValid(_await = def2.async ? (0, codegen_1$p._)`await ` : codegen_1$p.nil) {
    const passCxt = it.opts.passContext ? names_1$4.default.this : names_1$4.default.self;
    const passSchema = !("compile" in def2 && !$data || def2.schema === false);
    gen.assign(valid2, (0, codegen_1$p._)`${_await}${(0, code_1$9.callValidateCode)(cxt, validateRef, passCxt, passSchema)}`, def2.modifying);
  }
  function reportErrs(errors2) {
    var _a2;
    gen.if((0, codegen_1$p.not)((_a2 = def2.valid) !== null && _a2 !== void 0 ? _a2 : valid2), errors2);
  }
}
keyword.funcKeywordCode = funcKeywordCode;
function modifyData(cxt) {
  const { gen, data, it } = cxt;
  gen.if(it.parentData, () => gen.assign(data, (0, codegen_1$p._)`${it.parentData}[${it.parentDataProperty}]`));
}
function addErrs(cxt, errs) {
  const { gen } = cxt;
  gen.if((0, codegen_1$p._)`Array.isArray(${errs})`, () => {
    gen.assign(names_1$4.default.vErrors, (0, codegen_1$p._)`${names_1$4.default.vErrors} === null ? ${errs} : ${names_1$4.default.vErrors}.concat(${errs})`).assign(names_1$4.default.errors, (0, codegen_1$p._)`${names_1$4.default.vErrors}.length`);
    (0, errors_1$1.extendErrors)(cxt);
  }, () => cxt.error());
}
function checkAsyncKeyword({ schemaEnv }, def2) {
  if (def2.async && !schemaEnv.$async)
    throw new Error("async keyword in sync schema");
}
function useKeyword(gen, keyword2, result) {
  if (result === void 0)
    throw new Error(`keyword "${keyword2}" failed to compile`);
  return gen.scopeValue("keyword", typeof result == "function" ? { ref: result } : { ref: result, code: (0, codegen_1$p.stringify)(result) });
}
function validSchemaType(schema, schemaType, allowUndefined = false) {
  return !schemaType.length || schemaType.some((st) => st === "array" ? Array.isArray(schema) : st === "object" ? schema && typeof schema == "object" && !Array.isArray(schema) : typeof schema == st || allowUndefined && typeof schema == "undefined");
}
keyword.validSchemaType = validSchemaType;
function validateKeywordUsage({ schema, opts: opts2, self: self2, errSchemaPath }, def2, keyword2) {
  if (Array.isArray(def2.keyword) ? !def2.keyword.includes(keyword2) : def2.keyword !== keyword2) {
    throw new Error("ajv implementation error");
  }
  const deps = def2.dependencies;
  if (deps === null || deps === void 0 ? void 0 : deps.some((kwd) => !Object.prototype.hasOwnProperty.call(schema, kwd))) {
    throw new Error(`parent schema must have dependencies of ${keyword2}: ${deps.join(",")}`);
  }
  if (def2.validateSchema) {
    const valid2 = def2.validateSchema(schema[keyword2]);
    if (!valid2) {
      const msg = `keyword "${keyword2}" value is invalid at path "${errSchemaPath}": ` + self2.errorsText(def2.validateSchema.errors);
      if (opts2.validateSchema === "log")
        self2.logger.error(msg);
      else
        throw new Error(msg);
    }
  }
}
keyword.validateKeywordUsage = validateKeywordUsage;
var subschema = {};
Object.defineProperty(subschema, "__esModule", { value: true });
subschema.extendSubschemaMode = subschema.extendSubschemaData = subschema.getSubschema = void 0;
const codegen_1$o = codegen;
const util_1$n = util;
function getSubschema(it, { keyword: keyword2, schemaProp, schema, schemaPath, errSchemaPath, topSchemaRef }) {
  if (keyword2 !== void 0 && schema !== void 0) {
    throw new Error('both "keyword" and "schema" passed, only one allowed');
  }
  if (keyword2 !== void 0) {
    const sch = it.schema[keyword2];
    return schemaProp === void 0 ? {
      schema: sch,
      schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}`
    } : {
      schema: sch[schemaProp],
      schemaPath: (0, codegen_1$o._)`${it.schemaPath}${(0, codegen_1$o.getProperty)(keyword2)}${(0, codegen_1$o.getProperty)(schemaProp)}`,
      errSchemaPath: `${it.errSchemaPath}/${keyword2}/${(0, util_1$n.escapeFragment)(schemaProp)}`
    };
  }
  if (schema !== void 0) {
    if (schemaPath === void 0 || errSchemaPath === void 0 || topSchemaRef === void 0) {
      throw new Error('"schemaPath", "errSchemaPath" and "topSchemaRef" are required with "schema"');
    }
    return {
      schema,
      schemaPath,
      topSchemaRef,
      errSchemaPath
    };
  }
  throw new Error('either "keyword" or "schema" must be passed');
}
subschema.getSubschema = getSubschema;
function extendSubschemaData(subschema2, it, { dataProp, dataPropType: dpType, data, dataTypes, propertyName }) {
  if (data !== void 0 && dataProp !== void 0) {
    throw new Error('both "data" and "dataProp" passed, only one allowed');
  }
  const { gen } = it;
  if (dataProp !== void 0) {
    const { errorPath, dataPathArr, opts: opts2 } = it;
    const nextData = gen.let("data", (0, codegen_1$o._)`${it.data}${(0, codegen_1$o.getProperty)(dataProp)}`, true);
    dataContextProps(nextData);
    subschema2.errorPath = (0, codegen_1$o.str)`${errorPath}${(0, util_1$n.getErrorPath)(dataProp, dpType, opts2.jsPropertySyntax)}`;
    subschema2.parentDataProperty = (0, codegen_1$o._)`${dataProp}`;
    subschema2.dataPathArr = [...dataPathArr, subschema2.parentDataProperty];
  }
  if (data !== void 0) {
    const nextData = data instanceof codegen_1$o.Name ? data : gen.let("data", data, true);
    dataContextProps(nextData);
    if (propertyName !== void 0)
      subschema2.propertyName = propertyName;
  }
  if (dataTypes)
    subschema2.dataTypes = dataTypes;
  function dataContextProps(_nextData) {
    subschema2.data = _nextData;
    subschema2.dataLevel = it.dataLevel + 1;
    subschema2.dataTypes = [];
    it.definedProperties = new Set();
    subschema2.parentData = it.data;
    subschema2.dataNames = [...it.dataNames, _nextData];
  }
}
subschema.extendSubschemaData = extendSubschemaData;
function extendSubschemaMode(subschema2, { jtdDiscriminator, jtdMetadata, compositeRule, createErrors, allErrors }) {
  if (compositeRule !== void 0)
    subschema2.compositeRule = compositeRule;
  if (createErrors !== void 0)
    subschema2.createErrors = createErrors;
  if (allErrors !== void 0)
    subschema2.allErrors = allErrors;
  subschema2.jtdDiscriminator = jtdDiscriminator;
  subschema2.jtdMetadata = jtdMetadata;
}
subschema.extendSubschemaMode = extendSubschemaMode;
var resolve$1 = {};
var fastDeepEqual = function equal2(a, b) {
  if (a === b)
    return true;
  if (a && b && typeof a == "object" && typeof b == "object") {
    if (a.constructor !== b.constructor)
      return false;
    var length, i, keys;
    if (Array.isArray(a)) {
      length = a.length;
      if (length != b.length)
        return false;
      for (i = length; i-- !== 0; )
        if (!equal2(a[i], b[i]))
          return false;
      return true;
    }
    if (a.constructor === RegExp)
      return a.source === b.source && a.flags === b.flags;
    if (a.valueOf !== Object.prototype.valueOf)
      return a.valueOf() === b.valueOf();
    if (a.toString !== Object.prototype.toString)
      return a.toString() === b.toString();
    keys = Object.keys(a);
    length = keys.length;
    if (length !== Object.keys(b).length)
      return false;
    for (i = length; i-- !== 0; )
      if (!Object.prototype.hasOwnProperty.call(b, keys[i]))
        return false;
    for (i = length; i-- !== 0; ) {
      var key = keys[i];
      if (!equal2(a[key], b[key]))
        return false;
    }
    return true;
  }
  return a !== a && b !== b;
};
var jsonSchemaTraverse = { exports: {} };
var traverse$1 = jsonSchemaTraverse.exports = function(schema, opts2, cb) {
  if (typeof opts2 == "function") {
    cb = opts2;
    opts2 = {};
  }
  cb = opts2.cb || cb;
  var pre = typeof cb == "function" ? cb : cb.pre || function() {
  };
  var post = cb.post || function() {
  };
  _traverse(opts2, pre, post, schema, "", schema);
};
traverse$1.keywords = {
  additionalItems: true,
  items: true,
  contains: true,
  additionalProperties: true,
  propertyNames: true,
  not: true,
  if: true,
  then: true,
  else: true
};
traverse$1.arrayKeywords = {
  items: true,
  allOf: true,
  anyOf: true,
  oneOf: true
};
traverse$1.propsKeywords = {
  $defs: true,
  definitions: true,
  properties: true,
  patternProperties: true,
  dependencies: true
};
traverse$1.skipKeywords = {
  default: true,
  enum: true,
  const: true,
  required: true,
  maximum: true,
  minimum: true,
  exclusiveMaximum: true,
  exclusiveMinimum: true,
  multipleOf: true,
  maxLength: true,
  minLength: true,
  pattern: true,
  format: true,
  maxItems: true,
  minItems: true,
  uniqueItems: true,
  maxProperties: true,
  minProperties: true
};
function _traverse(opts2, pre, post, schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex) {
  if (schema && typeof schema == "object" && !Array.isArray(schema)) {
    pre(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
    for (var key in schema) {
      var sch = schema[key];
      if (Array.isArray(sch)) {
        if (key in traverse$1.arrayKeywords) {
          for (var i = 0; i < sch.length; i++)
            _traverse(opts2, pre, post, sch[i], jsonPtr + "/" + key + "/" + i, rootSchema, jsonPtr, key, schema, i);
        }
      } else if (key in traverse$1.propsKeywords) {
        if (sch && typeof sch == "object") {
          for (var prop in sch)
            _traverse(opts2, pre, post, sch[prop], jsonPtr + "/" + key + "/" + escapeJsonPtr(prop), rootSchema, jsonPtr, key, schema, prop);
        }
      } else if (key in traverse$1.keywords || opts2.allKeys && !(key in traverse$1.skipKeywords)) {
        _traverse(opts2, pre, post, sch, jsonPtr + "/" + key, rootSchema, jsonPtr, key, schema);
      }
    }
    post(schema, jsonPtr, rootSchema, parentJsonPtr, parentKeyword, parentSchema, keyIndex);
  }
}
function escapeJsonPtr(str) {
  return str.replace(/~/g, "~0").replace(/\//g, "~1");
}
var uri_all = { exports: {} };
/** @license URI.js v4.4.1 (c) 2011 Gary Court. License: http://github.com/garycourt/uri-js */
(function(module, exports) {
  (function(global2, factory) {
    factory(exports);
  })(commonjsGlobal, function(exports2) {
    function merge() {
      for (var _len = arguments.length, sets = Array(_len), _key = 0; _key < _len; _key++) {
        sets[_key] = arguments[_key];
      }
      if (sets.length > 1) {
        sets[0] = sets[0].slice(0, -1);
        var xl = sets.length - 1;
        for (var x = 1; x < xl; ++x) {
          sets[x] = sets[x].slice(1, -1);
        }
        sets[xl] = sets[xl].slice(1);
        return sets.join("");
      } else {
        return sets[0];
      }
    }
    function subexp(str) {
      return "(?:" + str + ")";
    }
    function typeOf(o) {
      return o === void 0 ? "undefined" : o === null ? "null" : Object.prototype.toString.call(o).split(" ").pop().split("]").shift().toLowerCase();
    }
    function toUpperCase(str) {
      return str.toUpperCase();
    }
    function toArray(obj) {
      return obj !== void 0 && obj !== null ? obj instanceof Array ? obj : typeof obj.length !== "number" || obj.split || obj.setInterval || obj.call ? [obj] : Array.prototype.slice.call(obj) : [];
    }
    function assign(target, source2) {
      var obj = target;
      if (source2) {
        for (var key in source2) {
          obj[key] = source2[key];
        }
      }
      return obj;
    }
    function buildExps(isIRI) {
      var ALPHA$$ = "[A-Za-z]", DIGIT$$ = "[0-9]", HEXDIG$$2 = merge(DIGIT$$, "[A-Fa-f]"), PCT_ENCODED$2 = subexp(subexp("%[EFef]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$2 + "%" + HEXDIG$$2 + HEXDIG$$2) + "|" + subexp("%" + HEXDIG$$2 + HEXDIG$$2)), GEN_DELIMS$$ = "[\\:\\/\\?\\#\\[\\]\\@]", SUB_DELIMS$$ = "[\\!\\$\\&\\'\\(\\)\\*\\+\\,\\;\\=]", RESERVED$$ = merge(GEN_DELIMS$$, SUB_DELIMS$$), UCSCHAR$$ = isIRI ? "[\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]" : "[]", IPRIVATE$$ = isIRI ? "[\\uE000-\\uF8FF]" : "[]", UNRESERVED$$2 = merge(ALPHA$$, DIGIT$$, "[\\-\\.\\_\\~]", UCSCHAR$$);
      subexp(ALPHA$$ + merge(ALPHA$$, DIGIT$$, "[\\+\\-\\.]") + "*");
      subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]")) + "*");
      var DEC_OCTET_RELAXED$ = subexp(subexp("25[0-5]") + "|" + subexp("2[0-4]" + DIGIT$$) + "|" + subexp("1" + DIGIT$$ + DIGIT$$) + "|" + subexp("0?[1-9]" + DIGIT$$) + "|0?0?" + DIGIT$$), IPV4ADDRESS$ = subexp(DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$ + "\\." + DEC_OCTET_RELAXED$), H16$ = subexp(HEXDIG$$2 + "{1,4}"), LS32$ = subexp(subexp(H16$ + "\\:" + H16$) + "|" + IPV4ADDRESS$), IPV6ADDRESS1$ = subexp(subexp(H16$ + "\\:") + "{6}" + LS32$), IPV6ADDRESS2$ = subexp("\\:\\:" + subexp(H16$ + "\\:") + "{5}" + LS32$), IPV6ADDRESS3$ = subexp(subexp(H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{4}" + LS32$), IPV6ADDRESS4$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,1}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{3}" + LS32$), IPV6ADDRESS5$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,2}" + H16$) + "?\\:\\:" + subexp(H16$ + "\\:") + "{2}" + LS32$), IPV6ADDRESS6$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,3}" + H16$) + "?\\:\\:" + H16$ + "\\:" + LS32$), IPV6ADDRESS7$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,4}" + H16$) + "?\\:\\:" + LS32$), IPV6ADDRESS8$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,5}" + H16$) + "?\\:\\:" + H16$), IPV6ADDRESS9$ = subexp(subexp(subexp(H16$ + "\\:") + "{0,6}" + H16$) + "?\\:\\:"), IPV6ADDRESS$ = subexp([IPV6ADDRESS1$, IPV6ADDRESS2$, IPV6ADDRESS3$, IPV6ADDRESS4$, IPV6ADDRESS5$, IPV6ADDRESS6$, IPV6ADDRESS7$, IPV6ADDRESS8$, IPV6ADDRESS9$].join("|")), ZONEID$ = subexp(subexp(UNRESERVED$$2 + "|" + PCT_ENCODED$2) + "+");
      subexp("[vV]" + HEXDIG$$2 + "+\\." + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:]") + "+");
      subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$)) + "*");
      var PCHAR$ = subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@]"));
      subexp(subexp(PCT_ENCODED$2 + "|" + merge(UNRESERVED$$2, SUB_DELIMS$$, "[\\@]")) + "+");
      subexp(subexp(PCHAR$ + "|" + merge("[\\/\\?]", IPRIVATE$$)) + "*");
      return {
        NOT_SCHEME: new RegExp(merge("[^]", ALPHA$$, DIGIT$$, "[\\+\\-\\.]"), "g"),
        NOT_USERINFO: new RegExp(merge("[^\\%\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_HOST: new RegExp(merge("[^\\%\\[\\]\\:]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_PATH: new RegExp(merge("[^\\%\\/\\:\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_PATH_NOSCHEME: new RegExp(merge("[^\\%\\/\\@]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        NOT_QUERY: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]", IPRIVATE$$), "g"),
        NOT_FRAGMENT: new RegExp(merge("[^\\%]", UNRESERVED$$2, SUB_DELIMS$$, "[\\:\\@\\/\\?]"), "g"),
        ESCAPE: new RegExp(merge("[^]", UNRESERVED$$2, SUB_DELIMS$$), "g"),
        UNRESERVED: new RegExp(UNRESERVED$$2, "g"),
        OTHER_CHARS: new RegExp(merge("[^\\%]", UNRESERVED$$2, RESERVED$$), "g"),
        PCT_ENCODED: new RegExp(PCT_ENCODED$2, "g"),
        IPV4ADDRESS: new RegExp("^(" + IPV4ADDRESS$ + ")$"),
        IPV6ADDRESS: new RegExp("^\\[?(" + IPV6ADDRESS$ + ")" + subexp(subexp("\\%25|\\%(?!" + HEXDIG$$2 + "{2})") + "(" + ZONEID$ + ")") + "?\\]?$")
      };
    }
    var URI_PROTOCOL = buildExps(false);
    var IRI_PROTOCOL = buildExps(true);
    var slicedToArray = function() {
      function sliceIterator(arr, i) {
        var _arr = [];
        var _n = true;
        var _d = false;
        var _e = void 0;
        try {
          for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
            _arr.push(_s.value);
            if (i && _arr.length === i)
              break;
          }
        } catch (err) {
          _d = true;
          _e = err;
        } finally {
          try {
            if (!_n && _i["return"])
              _i["return"]();
          } finally {
            if (_d)
              throw _e;
          }
        }
        return _arr;
      }
      return function(arr, i) {
        if (Array.isArray(arr)) {
          return arr;
        } else if (Symbol.iterator in Object(arr)) {
          return sliceIterator(arr, i);
        } else {
          throw new TypeError("Invalid attempt to destructure non-iterable instance");
        }
      };
    }();
    var toConsumableArray = function(arr) {
      if (Array.isArray(arr)) {
        for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++)
          arr2[i] = arr[i];
        return arr2;
      } else {
        return Array.from(arr);
      }
    };
    var maxInt = 2147483647;
    var base = 36;
    var tMin = 1;
    var tMax = 26;
    var skew = 38;
    var damp = 700;
    var initialBias = 72;
    var initialN = 128;
    var delimiter = "-";
    var regexPunycode = /^xn--/;
    var regexNonASCII = /[^\0-\x7E]/;
    var regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
    var errors2 = {
      "overflow": "Overflow: input needs wider integers to process",
      "not-basic": "Illegal input >= 0x80 (not a basic code point)",
      "invalid-input": "Invalid input"
    };
    var baseMinusTMin = base - tMin;
    var floor = Math.floor;
    var stringFromCharCode = String.fromCharCode;
    function error$12(type2) {
      throw new RangeError(errors2[type2]);
    }
    function map(array, fn) {
      var result = [];
      var length = array.length;
      while (length--) {
        result[length] = fn(array[length]);
      }
      return result;
    }
    function mapDomain(string, fn) {
      var parts = string.split("@");
      var result = "";
      if (parts.length > 1) {
        result = parts[0] + "@";
        string = parts[1];
      }
      string = string.replace(regexSeparators, ".");
      var labels = string.split(".");
      var encoded = map(labels, fn).join(".");
      return result + encoded;
    }
    function ucs2decode(string) {
      var output = [];
      var counter = 0;
      var length = string.length;
      while (counter < length) {
        var value = string.charCodeAt(counter++);
        if (value >= 55296 && value <= 56319 && counter < length) {
          var extra = string.charCodeAt(counter++);
          if ((extra & 64512) == 56320) {
            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
          } else {
            output.push(value);
            counter--;
          }
        } else {
          output.push(value);
        }
      }
      return output;
    }
    var ucs2encode = function ucs2encode2(array) {
      return String.fromCodePoint.apply(String, toConsumableArray(array));
    };
    var basicToDigit = function basicToDigit2(codePoint) {
      if (codePoint - 48 < 10) {
        return codePoint - 22;
      }
      if (codePoint - 65 < 26) {
        return codePoint - 65;
      }
      if (codePoint - 97 < 26) {
        return codePoint - 97;
      }
      return base;
    };
    var digitToBasic = function digitToBasic2(digit, flag) {
      return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
    };
    var adapt = function adapt2(delta, numPoints, firstTime) {
      var k = 0;
      delta = firstTime ? floor(delta / damp) : delta >> 1;
      delta += floor(delta / numPoints);
      for (; delta > baseMinusTMin * tMax >> 1; k += base) {
        delta = floor(delta / baseMinusTMin);
      }
      return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
    };
    var decode = function decode2(input) {
      var output = [];
      var inputLength = input.length;
      var i = 0;
      var n = initialN;
      var bias = initialBias;
      var basic = input.lastIndexOf(delimiter);
      if (basic < 0) {
        basic = 0;
      }
      for (var j = 0; j < basic; ++j) {
        if (input.charCodeAt(j) >= 128) {
          error$12("not-basic");
        }
        output.push(input.charCodeAt(j));
      }
      for (var index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
        var oldi = i;
        for (var w = 1, k = base; ; k += base) {
          if (index >= inputLength) {
            error$12("invalid-input");
          }
          var digit = basicToDigit(input.charCodeAt(index++));
          if (digit >= base || digit > floor((maxInt - i) / w)) {
            error$12("overflow");
          }
          i += digit * w;
          var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
          if (digit < t2) {
            break;
          }
          var baseMinusT = base - t2;
          if (w > floor(maxInt / baseMinusT)) {
            error$12("overflow");
          }
          w *= baseMinusT;
        }
        var out = output.length + 1;
        bias = adapt(i - oldi, out, oldi == 0);
        if (floor(i / out) > maxInt - n) {
          error$12("overflow");
        }
        n += floor(i / out);
        i %= out;
        output.splice(i++, 0, n);
      }
      return String.fromCodePoint.apply(String, output);
    };
    var encode = function encode2(input) {
      var output = [];
      input = ucs2decode(input);
      var inputLength = input.length;
      var n = initialN;
      var delta = 0;
      var bias = initialBias;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = void 0;
      try {
        for (var _iterator = input[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _currentValue2 = _step.value;
          if (_currentValue2 < 128) {
            output.push(stringFromCharCode(_currentValue2));
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
      var basicLength = output.length;
      var handledCPCount = basicLength;
      if (basicLength) {
        output.push(delimiter);
      }
      while (handledCPCount < inputLength) {
        var m = maxInt;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = void 0;
        try {
          for (var _iterator2 = input[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var currentValue = _step2.value;
            if (currentValue >= n && currentValue < m) {
              m = currentValue;
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
        var handledCPCountPlusOne = handledCPCount + 1;
        if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
          error$12("overflow");
        }
        delta += (m - n) * handledCPCountPlusOne;
        n = m;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = void 0;
        try {
          for (var _iterator3 = input[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _currentValue = _step3.value;
            if (_currentValue < n && ++delta > maxInt) {
              error$12("overflow");
            }
            if (_currentValue == n) {
              var q = delta;
              for (var k = base; ; k += base) {
                var t2 = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (q < t2) {
                  break;
                }
                var qMinusT = q - t2;
                var baseMinusT = base - t2;
                output.push(stringFromCharCode(digitToBasic(t2 + qMinusT % baseMinusT, 0)));
                q = floor(qMinusT / baseMinusT);
              }
              output.push(stringFromCharCode(digitToBasic(q, 0)));
              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
              delta = 0;
              ++handledCPCount;
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3.return) {
              _iterator3.return();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }
        ++delta;
        ++n;
      }
      return output.join("");
    };
    var toUnicode = function toUnicode2(input) {
      return mapDomain(input, function(string) {
        return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
      });
    };
    var toASCII = function toASCII2(input) {
      return mapDomain(input, function(string) {
        return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
      });
    };
    var punycode = {
      "version": "2.1.0",
      "ucs2": {
        "decode": ucs2decode,
        "encode": ucs2encode
      },
      "decode": decode,
      "encode": encode,
      "toASCII": toASCII,
      "toUnicode": toUnicode
    };
    var SCHEMES = {};
    function pctEncChar(chr) {
      var c = chr.charCodeAt(0);
      var e = void 0;
      if (c < 16)
        e = "%0" + c.toString(16).toUpperCase();
      else if (c < 128)
        e = "%" + c.toString(16).toUpperCase();
      else if (c < 2048)
        e = "%" + (c >> 6 | 192).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
      else
        e = "%" + (c >> 12 | 224).toString(16).toUpperCase() + "%" + (c >> 6 & 63 | 128).toString(16).toUpperCase() + "%" + (c & 63 | 128).toString(16).toUpperCase();
      return e;
    }
    function pctDecChars(str) {
      var newStr = "";
      var i = 0;
      var il = str.length;
      while (i < il) {
        var c = parseInt(str.substr(i + 1, 2), 16);
        if (c < 128) {
          newStr += String.fromCharCode(c);
          i += 3;
        } else if (c >= 194 && c < 224) {
          if (il - i >= 6) {
            var c2 = parseInt(str.substr(i + 4, 2), 16);
            newStr += String.fromCharCode((c & 31) << 6 | c2 & 63);
          } else {
            newStr += str.substr(i, 6);
          }
          i += 6;
        } else if (c >= 224) {
          if (il - i >= 9) {
            var _c = parseInt(str.substr(i + 4, 2), 16);
            var c3 = parseInt(str.substr(i + 7, 2), 16);
            newStr += String.fromCharCode((c & 15) << 12 | (_c & 63) << 6 | c3 & 63);
          } else {
            newStr += str.substr(i, 9);
          }
          i += 9;
        } else {
          newStr += str.substr(i, 3);
          i += 3;
        }
      }
      return newStr;
    }
    function _normalizeComponentEncoding(components, protocol) {
      function decodeUnreserved2(str) {
        var decStr = pctDecChars(str);
        return !decStr.match(protocol.UNRESERVED) ? str : decStr;
      }
      if (components.scheme)
        components.scheme = String(components.scheme).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_SCHEME, "");
      if (components.userinfo !== void 0)
        components.userinfo = String(components.userinfo).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_USERINFO, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.host !== void 0)
        components.host = String(components.host).replace(protocol.PCT_ENCODED, decodeUnreserved2).toLowerCase().replace(protocol.NOT_HOST, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.path !== void 0)
        components.path = String(components.path).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(components.scheme ? protocol.NOT_PATH : protocol.NOT_PATH_NOSCHEME, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.query !== void 0)
        components.query = String(components.query).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_QUERY, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      if (components.fragment !== void 0)
        components.fragment = String(components.fragment).replace(protocol.PCT_ENCODED, decodeUnreserved2).replace(protocol.NOT_FRAGMENT, pctEncChar).replace(protocol.PCT_ENCODED, toUpperCase);
      return components;
    }
    function _stripLeadingZeros(str) {
      return str.replace(/^0*(.*)/, "$1") || "0";
    }
    function _normalizeIPv4(host, protocol) {
      var matches = host.match(protocol.IPV4ADDRESS) || [];
      var _matches = slicedToArray(matches, 2), address = _matches[1];
      if (address) {
        return address.split(".").map(_stripLeadingZeros).join(".");
      } else {
        return host;
      }
    }
    function _normalizeIPv6(host, protocol) {
      var matches = host.match(protocol.IPV6ADDRESS) || [];
      var _matches2 = slicedToArray(matches, 3), address = _matches2[1], zone = _matches2[2];
      if (address) {
        var _address$toLowerCase$ = address.toLowerCase().split("::").reverse(), _address$toLowerCase$2 = slicedToArray(_address$toLowerCase$, 2), last = _address$toLowerCase$2[0], first = _address$toLowerCase$2[1];
        var firstFields = first ? first.split(":").map(_stripLeadingZeros) : [];
        var lastFields = last.split(":").map(_stripLeadingZeros);
        var isLastFieldIPv4Address = protocol.IPV4ADDRESS.test(lastFields[lastFields.length - 1]);
        var fieldCount = isLastFieldIPv4Address ? 7 : 8;
        var lastFieldsStart = lastFields.length - fieldCount;
        var fields = Array(fieldCount);
        for (var x = 0; x < fieldCount; ++x) {
          fields[x] = firstFields[x] || lastFields[lastFieldsStart + x] || "";
        }
        if (isLastFieldIPv4Address) {
          fields[fieldCount - 1] = _normalizeIPv4(fields[fieldCount - 1], protocol);
        }
        var allZeroFields = fields.reduce(function(acc, field, index) {
          if (!field || field === "0") {
            var lastLongest = acc[acc.length - 1];
            if (lastLongest && lastLongest.index + lastLongest.length === index) {
              lastLongest.length++;
            } else {
              acc.push({ index, length: 1 });
            }
          }
          return acc;
        }, []);
        var longestZeroFields = allZeroFields.sort(function(a, b) {
          return b.length - a.length;
        })[0];
        var newHost = void 0;
        if (longestZeroFields && longestZeroFields.length > 1) {
          var newFirst = fields.slice(0, longestZeroFields.index);
          var newLast = fields.slice(longestZeroFields.index + longestZeroFields.length);
          newHost = newFirst.join(":") + "::" + newLast.join(":");
        } else {
          newHost = fields.join(":");
        }
        if (zone) {
          newHost += "%" + zone;
        }
        return newHost;
      } else {
        return host;
      }
    }
    var URI_PARSE = /^(?:([^:\/?#]+):)?(?:\/\/((?:([^\/?#@]*)@)?(\[[^\/?#\]]+\]|[^\/?#:]*)(?:\:(\d*))?))?([^?#]*)(?:\?([^#]*))?(?:#((?:.|\n|\r)*))?/i;
    var NO_MATCH_IS_UNDEFINED = "".match(/(){0}/)[1] === void 0;
    function parse2(uriString) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var components = {};
      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
      if (options.reference === "suffix")
        uriString = (options.scheme ? options.scheme + ":" : "") + "//" + uriString;
      var matches = uriString.match(URI_PARSE);
      if (matches) {
        if (NO_MATCH_IS_UNDEFINED) {
          components.scheme = matches[1];
          components.userinfo = matches[3];
          components.host = matches[4];
          components.port = parseInt(matches[5], 10);
          components.path = matches[6] || "";
          components.query = matches[7];
          components.fragment = matches[8];
          if (isNaN(components.port)) {
            components.port = matches[5];
          }
        } else {
          components.scheme = matches[1] || void 0;
          components.userinfo = uriString.indexOf("@") !== -1 ? matches[3] : void 0;
          components.host = uriString.indexOf("//") !== -1 ? matches[4] : void 0;
          components.port = parseInt(matches[5], 10);
          components.path = matches[6] || "";
          components.query = uriString.indexOf("?") !== -1 ? matches[7] : void 0;
          components.fragment = uriString.indexOf("#") !== -1 ? matches[8] : void 0;
          if (isNaN(components.port)) {
            components.port = uriString.match(/\/\/(?:.|\n)*\:(?:\/|\?|\#|$)/) ? matches[4] : void 0;
          }
        }
        if (components.host) {
          components.host = _normalizeIPv6(_normalizeIPv4(components.host, protocol), protocol);
        }
        if (components.scheme === void 0 && components.userinfo === void 0 && components.host === void 0 && components.port === void 0 && !components.path && components.query === void 0) {
          components.reference = "same-document";
        } else if (components.scheme === void 0) {
          components.reference = "relative";
        } else if (components.fragment === void 0) {
          components.reference = "absolute";
        } else {
          components.reference = "uri";
        }
        if (options.reference && options.reference !== "suffix" && options.reference !== components.reference) {
          components.error = components.error || "URI is not a " + options.reference + " reference.";
        }
        var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
        if (!options.unicodeSupport && (!schemeHandler || !schemeHandler.unicodeSupport)) {
          if (components.host && (options.domainHost || schemeHandler && schemeHandler.domainHost)) {
            try {
              components.host = punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase());
            } catch (e) {
              components.error = components.error || "Host's domain name can not be converted to ASCII via punycode: " + e;
            }
          }
          _normalizeComponentEncoding(components, URI_PROTOCOL);
        } else {
          _normalizeComponentEncoding(components, protocol);
        }
        if (schemeHandler && schemeHandler.parse) {
          schemeHandler.parse(components, options);
        }
      } else {
        components.error = components.error || "URI can not be parsed.";
      }
      return components;
    }
    function _recomposeAuthority(components, options) {
      var protocol = options.iri !== false ? IRI_PROTOCOL : URI_PROTOCOL;
      var uriTokens = [];
      if (components.userinfo !== void 0) {
        uriTokens.push(components.userinfo);
        uriTokens.push("@");
      }
      if (components.host !== void 0) {
        uriTokens.push(_normalizeIPv6(_normalizeIPv4(String(components.host), protocol), protocol).replace(protocol.IPV6ADDRESS, function(_2, $1, $2) {
          return "[" + $1 + ($2 ? "%25" + $2 : "") + "]";
        }));
      }
      if (typeof components.port === "number" || typeof components.port === "string") {
        uriTokens.push(":");
        uriTokens.push(String(components.port));
      }
      return uriTokens.length ? uriTokens.join("") : void 0;
    }
    var RDS1 = /^\.\.?\//;
    var RDS2 = /^\/\.(\/|$)/;
    var RDS3 = /^\/\.\.(\/|$)/;
    var RDS5 = /^\/?(?:.|\n)*?(?=\/|$)/;
    function removeDotSegments(input) {
      var output = [];
      while (input.length) {
        if (input.match(RDS1)) {
          input = input.replace(RDS1, "");
        } else if (input.match(RDS2)) {
          input = input.replace(RDS2, "/");
        } else if (input.match(RDS3)) {
          input = input.replace(RDS3, "/");
          output.pop();
        } else if (input === "." || input === "..") {
          input = "";
        } else {
          var im = input.match(RDS5);
          if (im) {
            var s = im[0];
            input = input.slice(s.length);
            output.push(s);
          } else {
            throw new Error("Unexpected dot segment condition");
          }
        }
      }
      return output.join("");
    }
    function serialize(components) {
      var options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
      var protocol = options.iri ? IRI_PROTOCOL : URI_PROTOCOL;
      var uriTokens = [];
      var schemeHandler = SCHEMES[(options.scheme || components.scheme || "").toLowerCase()];
      if (schemeHandler && schemeHandler.serialize)
        schemeHandler.serialize(components, options);
      if (components.host) {
        if (protocol.IPV6ADDRESS.test(components.host))
          ;
        else if (options.domainHost || schemeHandler && schemeHandler.domainHost) {
          try {
            components.host = !options.iri ? punycode.toASCII(components.host.replace(protocol.PCT_ENCODED, pctDecChars).toLowerCase()) : punycode.toUnicode(components.host);
          } catch (e) {
            components.error = components.error || "Host's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
          }
        }
      }
      _normalizeComponentEncoding(components, protocol);
      if (options.reference !== "suffix" && components.scheme) {
        uriTokens.push(components.scheme);
        uriTokens.push(":");
      }
      var authority = _recomposeAuthority(components, options);
      if (authority !== void 0) {
        if (options.reference !== "suffix") {
          uriTokens.push("//");
        }
        uriTokens.push(authority);
        if (components.path && components.path.charAt(0) !== "/") {
          uriTokens.push("/");
        }
      }
      if (components.path !== void 0) {
        var s = components.path;
        if (!options.absolutePath && (!schemeHandler || !schemeHandler.absolutePath)) {
          s = removeDotSegments(s);
        }
        if (authority === void 0) {
          s = s.replace(/^\/\//, "/%2F");
        }
        uriTokens.push(s);
      }
      if (components.query !== void 0) {
        uriTokens.push("?");
        uriTokens.push(components.query);
      }
      if (components.fragment !== void 0) {
        uriTokens.push("#");
        uriTokens.push(components.fragment);
      }
      return uriTokens.join("");
    }
    function resolveComponents(base2, relative) {
      var options = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
      var skipNormalization = arguments[3];
      var target = {};
      if (!skipNormalization) {
        base2 = parse2(serialize(base2, options), options);
        relative = parse2(serialize(relative, options), options);
      }
      options = options || {};
      if (!options.tolerant && relative.scheme) {
        target.scheme = relative.scheme;
        target.userinfo = relative.userinfo;
        target.host = relative.host;
        target.port = relative.port;
        target.path = removeDotSegments(relative.path || "");
        target.query = relative.query;
      } else {
        if (relative.userinfo !== void 0 || relative.host !== void 0 || relative.port !== void 0) {
          target.userinfo = relative.userinfo;
          target.host = relative.host;
          target.port = relative.port;
          target.path = removeDotSegments(relative.path || "");
          target.query = relative.query;
        } else {
          if (!relative.path) {
            target.path = base2.path;
            if (relative.query !== void 0) {
              target.query = relative.query;
            } else {
              target.query = base2.query;
            }
          } else {
            if (relative.path.charAt(0) === "/") {
              target.path = removeDotSegments(relative.path);
            } else {
              if ((base2.userinfo !== void 0 || base2.host !== void 0 || base2.port !== void 0) && !base2.path) {
                target.path = "/" + relative.path;
              } else if (!base2.path) {
                target.path = relative.path;
              } else {
                target.path = base2.path.slice(0, base2.path.lastIndexOf("/") + 1) + relative.path;
              }
              target.path = removeDotSegments(target.path);
            }
            target.query = relative.query;
          }
          target.userinfo = base2.userinfo;
          target.host = base2.host;
          target.port = base2.port;
        }
        target.scheme = base2.scheme;
      }
      target.fragment = relative.fragment;
      return target;
    }
    function resolve2(baseURI, relativeURI, options) {
      var schemelessOptions = assign({ scheme: "null" }, options);
      return serialize(resolveComponents(parse2(baseURI, schemelessOptions), parse2(relativeURI, schemelessOptions), schemelessOptions, true), schemelessOptions);
    }
    function normalize(uri, options) {
      if (typeof uri === "string") {
        uri = serialize(parse2(uri, options), options);
      } else if (typeOf(uri) === "object") {
        uri = parse2(serialize(uri, options), options);
      }
      return uri;
    }
    function equal3(uriA, uriB, options) {
      if (typeof uriA === "string") {
        uriA = serialize(parse2(uriA, options), options);
      } else if (typeOf(uriA) === "object") {
        uriA = serialize(uriA, options);
      }
      if (typeof uriB === "string") {
        uriB = serialize(parse2(uriB, options), options);
      } else if (typeOf(uriB) === "object") {
        uriB = serialize(uriB, options);
      }
      return uriA === uriB;
    }
    function escapeComponent(str, options) {
      return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.ESCAPE : IRI_PROTOCOL.ESCAPE, pctEncChar);
    }
    function unescapeComponent(str, options) {
      return str && str.toString().replace(!options || !options.iri ? URI_PROTOCOL.PCT_ENCODED : IRI_PROTOCOL.PCT_ENCODED, pctDecChars);
    }
    var handler = {
      scheme: "http",
      domainHost: true,
      parse: function parse3(components, options) {
        if (!components.host) {
          components.error = components.error || "HTTP URIs must have a host.";
        }
        return components;
      },
      serialize: function serialize2(components, options) {
        var secure = String(components.scheme).toLowerCase() === "https";
        if (components.port === (secure ? 443 : 80) || components.port === "") {
          components.port = void 0;
        }
        if (!components.path) {
          components.path = "/";
        }
        return components;
      }
    };
    var handler$1 = {
      scheme: "https",
      domainHost: handler.domainHost,
      parse: handler.parse,
      serialize: handler.serialize
    };
    function isSecure(wsComponents) {
      return typeof wsComponents.secure === "boolean" ? wsComponents.secure : String(wsComponents.scheme).toLowerCase() === "wss";
    }
    var handler$2 = {
      scheme: "ws",
      domainHost: true,
      parse: function parse3(components, options) {
        var wsComponents = components;
        wsComponents.secure = isSecure(wsComponents);
        wsComponents.resourceName = (wsComponents.path || "/") + (wsComponents.query ? "?" + wsComponents.query : "");
        wsComponents.path = void 0;
        wsComponents.query = void 0;
        return wsComponents;
      },
      serialize: function serialize2(wsComponents, options) {
        if (wsComponents.port === (isSecure(wsComponents) ? 443 : 80) || wsComponents.port === "") {
          wsComponents.port = void 0;
        }
        if (typeof wsComponents.secure === "boolean") {
          wsComponents.scheme = wsComponents.secure ? "wss" : "ws";
          wsComponents.secure = void 0;
        }
        if (wsComponents.resourceName) {
          var _wsComponents$resourc = wsComponents.resourceName.split("?"), _wsComponents$resourc2 = slicedToArray(_wsComponents$resourc, 2), path2 = _wsComponents$resourc2[0], query = _wsComponents$resourc2[1];
          wsComponents.path = path2 && path2 !== "/" ? path2 : void 0;
          wsComponents.query = query;
          wsComponents.resourceName = void 0;
        }
        wsComponents.fragment = void 0;
        return wsComponents;
      }
    };
    var handler$3 = {
      scheme: "wss",
      domainHost: handler$2.domainHost,
      parse: handler$2.parse,
      serialize: handler$2.serialize
    };
    var O = {};
    var UNRESERVED$$ = "[A-Za-z0-9\\-\\.\\_\\~\\xA0-\\u200D\\u2010-\\u2029\\u202F-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFEF]";
    var HEXDIG$$ = "[0-9A-Fa-f]";
    var PCT_ENCODED$ = subexp(subexp("%[EFef]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%[89A-Fa-f]" + HEXDIG$$ + "%" + HEXDIG$$ + HEXDIG$$) + "|" + subexp("%" + HEXDIG$$ + HEXDIG$$));
    var ATEXT$$ = "[A-Za-z0-9\\!\\$\\%\\'\\*\\+\\-\\^\\_\\`\\{\\|\\}\\~]";
    var QTEXT$$ = "[\\!\\$\\%\\'\\(\\)\\*\\+\\,\\-\\.0-9\\<\\>A-Z\\x5E-\\x7E]";
    var VCHAR$$ = merge(QTEXT$$, '[\\"\\\\]');
    var SOME_DELIMS$$ = "[\\!\\$\\'\\(\\)\\*\\+\\,\\;\\:\\@]";
    var UNRESERVED = new RegExp(UNRESERVED$$, "g");
    var PCT_ENCODED = new RegExp(PCT_ENCODED$, "g");
    var NOT_LOCAL_PART = new RegExp(merge("[^]", ATEXT$$, "[\\.]", '[\\"]', VCHAR$$), "g");
    var NOT_HFNAME = new RegExp(merge("[^]", UNRESERVED$$, SOME_DELIMS$$), "g");
    var NOT_HFVALUE = NOT_HFNAME;
    function decodeUnreserved(str) {
      var decStr = pctDecChars(str);
      return !decStr.match(UNRESERVED) ? str : decStr;
    }
    var handler$4 = {
      scheme: "mailto",
      parse: function parse$$1(components, options) {
        var mailtoComponents = components;
        var to = mailtoComponents.to = mailtoComponents.path ? mailtoComponents.path.split(",") : [];
        mailtoComponents.path = void 0;
        if (mailtoComponents.query) {
          var unknownHeaders = false;
          var headers = {};
          var hfields = mailtoComponents.query.split("&");
          for (var x = 0, xl = hfields.length; x < xl; ++x) {
            var hfield = hfields[x].split("=");
            switch (hfield[0]) {
              case "to":
                var toAddrs = hfield[1].split(",");
                for (var _x = 0, _xl = toAddrs.length; _x < _xl; ++_x) {
                  to.push(toAddrs[_x]);
                }
                break;
              case "subject":
                mailtoComponents.subject = unescapeComponent(hfield[1], options);
                break;
              case "body":
                mailtoComponents.body = unescapeComponent(hfield[1], options);
                break;
              default:
                unknownHeaders = true;
                headers[unescapeComponent(hfield[0], options)] = unescapeComponent(hfield[1], options);
                break;
            }
          }
          if (unknownHeaders)
            mailtoComponents.headers = headers;
        }
        mailtoComponents.query = void 0;
        for (var _x2 = 0, _xl2 = to.length; _x2 < _xl2; ++_x2) {
          var addr = to[_x2].split("@");
          addr[0] = unescapeComponent(addr[0]);
          if (!options.unicodeSupport) {
            try {
              addr[1] = punycode.toASCII(unescapeComponent(addr[1], options).toLowerCase());
            } catch (e) {
              mailtoComponents.error = mailtoComponents.error || "Email address's domain name can not be converted to ASCII via punycode: " + e;
            }
          } else {
            addr[1] = unescapeComponent(addr[1], options).toLowerCase();
          }
          to[_x2] = addr.join("@");
        }
        return mailtoComponents;
      },
      serialize: function serialize$$1(mailtoComponents, options) {
        var components = mailtoComponents;
        var to = toArray(mailtoComponents.to);
        if (to) {
          for (var x = 0, xl = to.length; x < xl; ++x) {
            var toAddr = String(to[x]);
            var atIdx = toAddr.lastIndexOf("@");
            var localPart = toAddr.slice(0, atIdx).replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_LOCAL_PART, pctEncChar);
            var domain = toAddr.slice(atIdx + 1);
            try {
              domain = !options.iri ? punycode.toASCII(unescapeComponent(domain, options).toLowerCase()) : punycode.toUnicode(domain);
            } catch (e) {
              components.error = components.error || "Email address's domain name can not be converted to " + (!options.iri ? "ASCII" : "Unicode") + " via punycode: " + e;
            }
            to[x] = localPart + "@" + domain;
          }
          components.path = to.join(",");
        }
        var headers = mailtoComponents.headers = mailtoComponents.headers || {};
        if (mailtoComponents.subject)
          headers["subject"] = mailtoComponents.subject;
        if (mailtoComponents.body)
          headers["body"] = mailtoComponents.body;
        var fields = [];
        for (var name in headers) {
          if (headers[name] !== O[name]) {
            fields.push(name.replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFNAME, pctEncChar) + "=" + headers[name].replace(PCT_ENCODED, decodeUnreserved).replace(PCT_ENCODED, toUpperCase).replace(NOT_HFVALUE, pctEncChar));
          }
        }
        if (fields.length) {
          components.query = fields.join("&");
        }
        return components;
      }
    };
    var URN_PARSE = /^([^\:]+)\:(.*)/;
    var handler$5 = {
      scheme: "urn",
      parse: function parse$$1(components, options) {
        var matches = components.path && components.path.match(URN_PARSE);
        var urnComponents = components;
        if (matches) {
          var scheme = options.scheme || urnComponents.scheme || "urn";
          var nid = matches[1].toLowerCase();
          var nss = matches[2];
          var urnScheme = scheme + ":" + (options.nid || nid);
          var schemeHandler = SCHEMES[urnScheme];
          urnComponents.nid = nid;
          urnComponents.nss = nss;
          urnComponents.path = void 0;
          if (schemeHandler) {
            urnComponents = schemeHandler.parse(urnComponents, options);
          }
        } else {
          urnComponents.error = urnComponents.error || "URN can not be parsed.";
        }
        return urnComponents;
      },
      serialize: function serialize$$1(urnComponents, options) {
        var scheme = options.scheme || urnComponents.scheme || "urn";
        var nid = urnComponents.nid;
        var urnScheme = scheme + ":" + (options.nid || nid);
        var schemeHandler = SCHEMES[urnScheme];
        if (schemeHandler) {
          urnComponents = schemeHandler.serialize(urnComponents, options);
        }
        var uriComponents = urnComponents;
        var nss = urnComponents.nss;
        uriComponents.path = (nid || options.nid) + ":" + nss;
        return uriComponents;
      }
    };
    var UUID = /^[0-9A-Fa-f]{8}(?:\-[0-9A-Fa-f]{4}){3}\-[0-9A-Fa-f]{12}$/;
    var handler$6 = {
      scheme: "urn:uuid",
      parse: function parse3(urnComponents, options) {
        var uuidComponents = urnComponents;
        uuidComponents.uuid = uuidComponents.nss;
        uuidComponents.nss = void 0;
        if (!options.tolerant && (!uuidComponents.uuid || !uuidComponents.uuid.match(UUID))) {
          uuidComponents.error = uuidComponents.error || "UUID is not valid.";
        }
        return uuidComponents;
      },
      serialize: function serialize2(uuidComponents, options) {
        var urnComponents = uuidComponents;
        urnComponents.nss = (uuidComponents.uuid || "").toLowerCase();
        return urnComponents;
      }
    };
    SCHEMES[handler.scheme] = handler;
    SCHEMES[handler$1.scheme] = handler$1;
    SCHEMES[handler$2.scheme] = handler$2;
    SCHEMES[handler$3.scheme] = handler$3;
    SCHEMES[handler$4.scheme] = handler$4;
    SCHEMES[handler$5.scheme] = handler$5;
    SCHEMES[handler$6.scheme] = handler$6;
    exports2.SCHEMES = SCHEMES;
    exports2.pctEncChar = pctEncChar;
    exports2.pctDecChars = pctDecChars;
    exports2.parse = parse2;
    exports2.removeDotSegments = removeDotSegments;
    exports2.serialize = serialize;
    exports2.resolveComponents = resolveComponents;
    exports2.resolve = resolve2;
    exports2.normalize = normalize;
    exports2.equal = equal3;
    exports2.escapeComponent = escapeComponent;
    exports2.unescapeComponent = unescapeComponent;
    Object.defineProperty(exports2, "__esModule", { value: true });
  });
})(uri_all, uri_all.exports);
Object.defineProperty(resolve$1, "__esModule", { value: true });
resolve$1.getSchemaRefs = resolve$1.resolveUrl = resolve$1.normalizeId = resolve$1._getFullPath = resolve$1.getFullPath = resolve$1.inlineRef = void 0;
const util_1$m = util;
const equal$2 = fastDeepEqual;
const traverse = jsonSchemaTraverse.exports;
const URI$1 = uri_all.exports;
const SIMPLE_INLINED = new Set([
  "type",
  "format",
  "pattern",
  "maxLength",
  "minLength",
  "maxProperties",
  "minProperties",
  "maxItems",
  "minItems",
  "maximum",
  "minimum",
  "uniqueItems",
  "multipleOf",
  "required",
  "enum",
  "const"
]);
function inlineRef(schema, limit2 = true) {
  if (typeof schema == "boolean")
    return true;
  if (limit2 === true)
    return !hasRef(schema);
  if (!limit2)
    return false;
  return countKeys(schema) <= limit2;
}
resolve$1.inlineRef = inlineRef;
const REF_KEYWORDS = new Set([
  "$ref",
  "$recursiveRef",
  "$recursiveAnchor",
  "$dynamicRef",
  "$dynamicAnchor"
]);
function hasRef(schema) {
  for (const key in schema) {
    if (REF_KEYWORDS.has(key))
      return true;
    const sch = schema[key];
    if (Array.isArray(sch) && sch.some(hasRef))
      return true;
    if (typeof sch == "object" && hasRef(sch))
      return true;
  }
  return false;
}
function countKeys(schema) {
  let count = 0;
  for (const key in schema) {
    if (key === "$ref")
      return Infinity;
    count++;
    if (SIMPLE_INLINED.has(key))
      continue;
    if (typeof schema[key] == "object") {
      (0, util_1$m.eachItem)(schema[key], (sch) => count += countKeys(sch));
    }
    if (count === Infinity)
      return Infinity;
  }
  return count;
}
function getFullPath(id2 = "", normalize) {
  if (normalize !== false)
    id2 = normalizeId(id2);
  const p = URI$1.parse(id2);
  return _getFullPath(p);
}
resolve$1.getFullPath = getFullPath;
function _getFullPath(p) {
  return URI$1.serialize(p).split("#")[0] + "#";
}
resolve$1._getFullPath = _getFullPath;
const TRAILING_SLASH_HASH = /#\/?$/;
function normalizeId(id2) {
  return id2 ? id2.replace(TRAILING_SLASH_HASH, "") : "";
}
resolve$1.normalizeId = normalizeId;
function resolveUrl(baseId, id2) {
  id2 = normalizeId(id2);
  return URI$1.resolve(baseId, id2);
}
resolve$1.resolveUrl = resolveUrl;
const ANCHOR = /^[a-z_][-a-z0-9._]*$/i;
function getSchemaRefs(schema, baseId) {
  if (typeof schema == "boolean")
    return {};
  const { schemaId } = this.opts;
  const schId = normalizeId(schema[schemaId] || baseId);
  const baseIds = { "": schId };
  const pathPrefix = getFullPath(schId, false);
  const localRefs = {};
  const schemaRefs = new Set();
  traverse(schema, { allKeys: true }, (sch, jsonPtr, _2, parentJsonPtr) => {
    if (parentJsonPtr === void 0)
      return;
    const fullPath = pathPrefix + jsonPtr;
    let baseId2 = baseIds[parentJsonPtr];
    if (typeof sch[schemaId] == "string")
      baseId2 = addRef.call(this, sch[schemaId]);
    addAnchor.call(this, sch.$anchor);
    addAnchor.call(this, sch.$dynamicAnchor);
    baseIds[jsonPtr] = baseId2;
    function addRef(ref2) {
      ref2 = normalizeId(baseId2 ? URI$1.resolve(baseId2, ref2) : ref2);
      if (schemaRefs.has(ref2))
        throw ambiguos(ref2);
      schemaRefs.add(ref2);
      let schOrRef = this.refs[ref2];
      if (typeof schOrRef == "string")
        schOrRef = this.refs[schOrRef];
      if (typeof schOrRef == "object") {
        checkAmbiguosRef(sch, schOrRef.schema, ref2);
      } else if (ref2 !== normalizeId(fullPath)) {
        if (ref2[0] === "#") {
          checkAmbiguosRef(sch, localRefs[ref2], ref2);
          localRefs[ref2] = sch;
        } else {
          this.refs[ref2] = fullPath;
        }
      }
      return ref2;
    }
    function addAnchor(anchor) {
      if (typeof anchor == "string") {
        if (!ANCHOR.test(anchor))
          throw new Error(`invalid anchor "${anchor}"`);
        addRef.call(this, `#${anchor}`);
      }
    }
  });
  return localRefs;
  function checkAmbiguosRef(sch1, sch2, ref2) {
    if (sch2 !== void 0 && !equal$2(sch1, sch2))
      throw ambiguos(ref2);
  }
  function ambiguos(ref2) {
    return new Error(`reference "${ref2}" resolves to more than one schema`);
  }
}
resolve$1.getSchemaRefs = getSchemaRefs;
Object.defineProperty(validate, "__esModule", { value: true });
validate.getData = validate.KeywordCxt = validate.validateFunctionCode = void 0;
const boolSchema_1 = boolSchema;
const dataType_1$1 = dataType;
const applicability_1 = applicability;
const dataType_2 = dataType;
const defaults_1 = defaults$1;
const keyword_1 = keyword;
const subschema_1 = subschema;
const codegen_1$n = codegen;
const names_1$3 = names$1;
const resolve_1$2 = resolve$1;
const util_1$l = util;
const errors_1 = errors;
function validateFunctionCode(it) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      topSchemaObjCode(it);
      return;
    }
  }
  validateFunction(it, () => (0, boolSchema_1.topBoolOrEmptySchema)(it));
}
validate.validateFunctionCode = validateFunctionCode;
function validateFunction({ gen, validateName, schema, schemaEnv, opts: opts2 }, body) {
  if (opts2.code.es5) {
    gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${names_1$3.default.valCxt}`, schemaEnv.$async, () => {
      gen.code((0, codegen_1$n._)`"use strict"; ${funcSourceUrl(schema, opts2)}`);
      destructureValCxtES5(gen, opts2);
      gen.code(body);
    });
  } else {
    gen.func(validateName, (0, codegen_1$n._)`${names_1$3.default.data}, ${destructureValCxt(opts2)}`, schemaEnv.$async, () => gen.code(funcSourceUrl(schema, opts2)).code(body));
  }
}
function destructureValCxt(opts2) {
  return (0, codegen_1$n._)`{${names_1$3.default.instancePath}="", ${names_1$3.default.parentData}, ${names_1$3.default.parentDataProperty}, ${names_1$3.default.rootData}=${names_1$3.default.data}${opts2.dynamicRef ? (0, codegen_1$n._)`, ${names_1$3.default.dynamicAnchors}={}` : codegen_1$n.nil}}={}`;
}
function destructureValCxtES5(gen, opts2) {
  gen.if(names_1$3.default.valCxt, () => {
    gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.instancePath}`);
    gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentData}`);
    gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.parentDataProperty}`);
    gen.var(names_1$3.default.rootData, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.rootData}`);
    if (opts2.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`${names_1$3.default.valCxt}.${names_1$3.default.dynamicAnchors}`);
  }, () => {
    gen.var(names_1$3.default.instancePath, (0, codegen_1$n._)`""`);
    gen.var(names_1$3.default.parentData, (0, codegen_1$n._)`undefined`);
    gen.var(names_1$3.default.parentDataProperty, (0, codegen_1$n._)`undefined`);
    gen.var(names_1$3.default.rootData, names_1$3.default.data);
    if (opts2.dynamicRef)
      gen.var(names_1$3.default.dynamicAnchors, (0, codegen_1$n._)`{}`);
  });
}
function topSchemaObjCode(it) {
  const { schema, opts: opts2, gen } = it;
  validateFunction(it, () => {
    if (opts2.$comment && schema.$comment)
      commentKeyword(it);
    checkNoDefault(it);
    gen.let(names_1$3.default.vErrors, null);
    gen.let(names_1$3.default.errors, 0);
    if (opts2.unevaluated)
      resetEvaluated(it);
    typeAndKeywords(it);
    returnResults(it);
  });
  return;
}
function resetEvaluated(it) {
  const { gen, validateName } = it;
  it.evaluated = gen.const("evaluated", (0, codegen_1$n._)`${validateName}.evaluated`);
  gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicProps`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.props`, (0, codegen_1$n._)`undefined`));
  gen.if((0, codegen_1$n._)`${it.evaluated}.dynamicItems`, () => gen.assign((0, codegen_1$n._)`${it.evaluated}.items`, (0, codegen_1$n._)`undefined`));
}
function funcSourceUrl(schema, opts2) {
  const schId = typeof schema == "object" && schema[opts2.schemaId];
  return schId && (opts2.code.source || opts2.code.process) ? (0, codegen_1$n._)`/*# sourceURL=${schId} */` : codegen_1$n.nil;
}
function subschemaCode(it, valid2) {
  if (isSchemaObj(it)) {
    checkKeywords(it);
    if (schemaCxtHasRules(it)) {
      subSchemaObjCode(it, valid2);
      return;
    }
  }
  (0, boolSchema_1.boolOrEmptySchema)(it, valid2);
}
function schemaCxtHasRules({ schema, self: self2 }) {
  if (typeof schema == "boolean")
    return !schema;
  for (const key in schema)
    if (self2.RULES.all[key])
      return true;
  return false;
}
function isSchemaObj(it) {
  return typeof it.schema != "boolean";
}
function subSchemaObjCode(it, valid2) {
  const { schema, gen, opts: opts2 } = it;
  if (opts2.$comment && schema.$comment)
    commentKeyword(it);
  updateContext(it);
  checkAsyncSchema(it);
  const errsCount = gen.const("_errs", names_1$3.default.errors);
  typeAndKeywords(it, errsCount);
  gen.var(valid2, (0, codegen_1$n._)`${errsCount} === ${names_1$3.default.errors}`);
}
function checkKeywords(it) {
  (0, util_1$l.checkUnknownRules)(it);
  checkRefsAndKeywords(it);
}
function typeAndKeywords(it, errsCount) {
  if (it.opts.jtd)
    return schemaKeywords(it, [], false, errsCount);
  const types2 = (0, dataType_1$1.getSchemaTypes)(it.schema);
  const checkedTypes = (0, dataType_1$1.coerceAndCheckDataType)(it, types2);
  schemaKeywords(it, types2, !checkedTypes, errsCount);
}
function checkRefsAndKeywords(it) {
  const { schema, errSchemaPath, opts: opts2, self: self2 } = it;
  if (schema.$ref && opts2.ignoreKeywordsWithRef && (0, util_1$l.schemaHasRulesButRef)(schema, self2.RULES)) {
    self2.logger.warn(`$ref: keywords ignored in schema at path "${errSchemaPath}"`);
  }
}
function checkNoDefault(it) {
  const { schema, opts: opts2 } = it;
  if (schema.default !== void 0 && opts2.useDefaults && opts2.strictSchema) {
    (0, util_1$l.checkStrictMode)(it, "default is ignored in the schema root");
  }
}
function updateContext(it) {
  const schId = it.schema[it.opts.schemaId];
  if (schId)
    it.baseId = (0, resolve_1$2.resolveUrl)(it.baseId, schId);
}
function checkAsyncSchema(it) {
  if (it.schema.$async && !it.schemaEnv.$async)
    throw new Error("async schema in sync schema");
}
function commentKeyword({ gen, schemaEnv, schema, errSchemaPath, opts: opts2 }) {
  const msg = schema.$comment;
  if (opts2.$comment === true) {
    gen.code((0, codegen_1$n._)`${names_1$3.default.self}.logger.log(${msg})`);
  } else if (typeof opts2.$comment == "function") {
    const schemaPath = (0, codegen_1$n.str)`${errSchemaPath}/$comment`;
    const rootName = gen.scopeValue("root", { ref: schemaEnv.root });
    gen.code((0, codegen_1$n._)`${names_1$3.default.self}.opts.$comment(${msg}, ${schemaPath}, ${rootName}.schema)`);
  }
}
function returnResults(it) {
  const { gen, schemaEnv, validateName, ValidationError: ValidationError2, opts: opts2 } = it;
  if (schemaEnv.$async) {
    gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === 0`, () => gen.return(names_1$3.default.data), () => gen.throw((0, codegen_1$n._)`new ${ValidationError2}(${names_1$3.default.vErrors})`));
  } else {
    gen.assign((0, codegen_1$n._)`${validateName}.errors`, names_1$3.default.vErrors);
    if (opts2.unevaluated)
      assignEvaluated(it);
    gen.return((0, codegen_1$n._)`${names_1$3.default.errors} === 0`);
  }
}
function assignEvaluated({ gen, evaluated, props, items: items2 }) {
  if (props instanceof codegen_1$n.Name)
    gen.assign((0, codegen_1$n._)`${evaluated}.props`, props);
  if (items2 instanceof codegen_1$n.Name)
    gen.assign((0, codegen_1$n._)`${evaluated}.items`, items2);
}
function schemaKeywords(it, types2, typeErrors, errsCount) {
  const { gen, schema, data, allErrors, opts: opts2, self: self2 } = it;
  const { RULES } = self2;
  if (schema.$ref && (opts2.ignoreKeywordsWithRef || !(0, util_1$l.schemaHasRulesButRef)(schema, RULES))) {
    gen.block(() => keywordCode(it, "$ref", RULES.all.$ref.definition));
    return;
  }
  if (!opts2.jtd)
    checkStrictTypes(it, types2);
  gen.block(() => {
    for (const group of RULES.rules)
      groupKeywords(group);
    groupKeywords(RULES.post);
  });
  function groupKeywords(group) {
    if (!(0, applicability_1.shouldUseGroup)(schema, group))
      return;
    if (group.type) {
      gen.if((0, dataType_2.checkDataType)(group.type, data, opts2.strictNumbers));
      iterateKeywords(it, group);
      if (types2.length === 1 && types2[0] === group.type && typeErrors) {
        gen.else();
        (0, dataType_2.reportTypeError)(it);
      }
      gen.endIf();
    } else {
      iterateKeywords(it, group);
    }
    if (!allErrors)
      gen.if((0, codegen_1$n._)`${names_1$3.default.errors} === ${errsCount || 0}`);
  }
}
function iterateKeywords(it, group) {
  const { gen, schema, opts: { useDefaults } } = it;
  if (useDefaults)
    (0, defaults_1.assignDefaults)(it, group.type);
  gen.block(() => {
    for (const rule of group.rules) {
      if ((0, applicability_1.shouldUseRule)(schema, rule)) {
        keywordCode(it, rule.keyword, rule.definition, group.type);
      }
    }
  });
}
function checkStrictTypes(it, types2) {
  if (it.schemaEnv.meta || !it.opts.strictTypes)
    return;
  checkContextTypes(it, types2);
  if (!it.opts.allowUnionTypes)
    checkMultipleTypes(it, types2);
  checkKeywordTypes(it, it.dataTypes);
}
function checkContextTypes(it, types2) {
  if (!types2.length)
    return;
  if (!it.dataTypes.length) {
    it.dataTypes = types2;
    return;
  }
  types2.forEach((t2) => {
    if (!includesType(it.dataTypes, t2)) {
      strictTypesError(it, `type "${t2}" not allowed by context "${it.dataTypes.join(",")}"`);
    }
  });
  it.dataTypes = it.dataTypes.filter((t2) => includesType(types2, t2));
}
function checkMultipleTypes(it, ts) {
  if (ts.length > 1 && !(ts.length === 2 && ts.includes("null"))) {
    strictTypesError(it, "use allowUnionTypes to allow union type keyword");
  }
}
function checkKeywordTypes(it, ts) {
  const rules2 = it.self.RULES.all;
  for (const keyword2 in rules2) {
    const rule = rules2[keyword2];
    if (typeof rule == "object" && (0, applicability_1.shouldUseRule)(it.schema, rule)) {
      const { type: type2 } = rule.definition;
      if (type2.length && !type2.some((t2) => hasApplicableType(ts, t2))) {
        strictTypesError(it, `missing type "${type2.join(",")}" for keyword "${keyword2}"`);
      }
    }
  }
}
function hasApplicableType(schTs, kwdT) {
  return schTs.includes(kwdT) || kwdT === "number" && schTs.includes("integer");
}
function includesType(ts, t2) {
  return ts.includes(t2) || t2 === "integer" && ts.includes("number");
}
function strictTypesError(it, msg) {
  const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
  msg += ` at "${schemaPath}" (strictTypes)`;
  (0, util_1$l.checkStrictMode)(it, msg, it.opts.strictTypes);
}
class KeywordCxt {
  constructor(it, def2, keyword2) {
    (0, keyword_1.validateKeywordUsage)(it, def2, keyword2);
    this.gen = it.gen;
    this.allErrors = it.allErrors;
    this.keyword = keyword2;
    this.data = it.data;
    this.schema = it.schema[keyword2];
    this.$data = def2.$data && it.opts.$data && this.schema && this.schema.$data;
    this.schemaValue = (0, util_1$l.schemaRefOrVal)(it, this.schema, keyword2, this.$data);
    this.schemaType = def2.schemaType;
    this.parentSchema = it.schema;
    this.params = {};
    this.it = it;
    this.def = def2;
    if (this.$data) {
      this.schemaCode = it.gen.const("vSchema", getData(this.$data, it));
    } else {
      this.schemaCode = this.schemaValue;
      if (!(0, keyword_1.validSchemaType)(this.schema, def2.schemaType, def2.allowUndefined)) {
        throw new Error(`${keyword2} value must be ${JSON.stringify(def2.schemaType)}`);
      }
    }
    if ("code" in def2 ? def2.trackErrors : def2.errors !== false) {
      this.errsCount = it.gen.const("_errs", names_1$3.default.errors);
    }
  }
  result(condition, successAction, failAction) {
    this.failResult((0, codegen_1$n.not)(condition), successAction, failAction);
  }
  failResult(condition, successAction, failAction) {
    this.gen.if(condition);
    if (failAction)
      failAction();
    else
      this.error();
    if (successAction) {
      this.gen.else();
      successAction();
      if (this.allErrors)
        this.gen.endIf();
    } else {
      if (this.allErrors)
        this.gen.endIf();
      else
        this.gen.else();
    }
  }
  pass(condition, failAction) {
    this.failResult((0, codegen_1$n.not)(condition), void 0, failAction);
  }
  fail(condition) {
    if (condition === void 0) {
      this.error();
      if (!this.allErrors)
        this.gen.if(false);
      return;
    }
    this.gen.if(condition);
    this.error();
    if (this.allErrors)
      this.gen.endIf();
    else
      this.gen.else();
  }
  fail$data(condition) {
    if (!this.$data)
      return this.fail(condition);
    const { schemaCode } = this;
    this.fail((0, codegen_1$n._)`${schemaCode} !== undefined && (${(0, codegen_1$n.or)(this.invalid$data(), condition)})`);
  }
  error(append, errorParams, errorPaths) {
    if (errorParams) {
      this.setParams(errorParams);
      this._error(append, errorPaths);
      this.setParams({});
      return;
    }
    this._error(append, errorPaths);
  }
  _error(append, errorPaths) {
    (append ? errors_1.reportExtraError : errors_1.reportError)(this, this.def.error, errorPaths);
  }
  $dataError() {
    (0, errors_1.reportError)(this, this.def.$dataError || errors_1.keyword$DataError);
  }
  reset() {
    if (this.errsCount === void 0)
      throw new Error('add "trackErrors" to keyword definition');
    (0, errors_1.resetErrorsCount)(this.gen, this.errsCount);
  }
  ok(cond) {
    if (!this.allErrors)
      this.gen.if(cond);
  }
  setParams(obj, assign) {
    if (assign)
      Object.assign(this.params, obj);
    else
      this.params = obj;
  }
  block$data(valid2, codeBlock, $dataValid = codegen_1$n.nil) {
    this.gen.block(() => {
      this.check$data(valid2, $dataValid);
      codeBlock();
    });
  }
  check$data(valid2 = codegen_1$n.nil, $dataValid = codegen_1$n.nil) {
    if (!this.$data)
      return;
    const { gen, schemaCode, schemaType, def: def2 } = this;
    gen.if((0, codegen_1$n.or)((0, codegen_1$n._)`${schemaCode} === undefined`, $dataValid));
    if (valid2 !== codegen_1$n.nil)
      gen.assign(valid2, true);
    if (schemaType.length || def2.validateSchema) {
      gen.elseIf(this.invalid$data());
      this.$dataError();
      if (valid2 !== codegen_1$n.nil)
        gen.assign(valid2, false);
    }
    gen.else();
  }
  invalid$data() {
    const { gen, schemaCode, schemaType, def: def2, it } = this;
    return (0, codegen_1$n.or)(wrong$DataType(), invalid$DataSchema());
    function wrong$DataType() {
      if (schemaType.length) {
        if (!(schemaCode instanceof codegen_1$n.Name))
          throw new Error("ajv implementation error");
        const st = Array.isArray(schemaType) ? schemaType : [schemaType];
        return (0, codegen_1$n._)`${(0, dataType_2.checkDataTypes)(st, schemaCode, it.opts.strictNumbers, dataType_2.DataType.Wrong)}`;
      }
      return codegen_1$n.nil;
    }
    function invalid$DataSchema() {
      if (def2.validateSchema) {
        const validateSchemaRef = gen.scopeValue("validate$data", { ref: def2.validateSchema });
        return (0, codegen_1$n._)`!${validateSchemaRef}(${schemaCode})`;
      }
      return codegen_1$n.nil;
    }
  }
  subschema(appl, valid2) {
    const subschema2 = (0, subschema_1.getSubschema)(this.it, appl);
    (0, subschema_1.extendSubschemaData)(subschema2, this.it, appl);
    (0, subschema_1.extendSubschemaMode)(subschema2, appl);
    const nextContext = __spreadProps(__spreadValues(__spreadValues({}, this.it), subschema2), { items: void 0, props: void 0 });
    subschemaCode(nextContext, valid2);
    return nextContext;
  }
  mergeEvaluated(schemaCxt, toName) {
    const { it, gen } = this;
    if (!it.opts.unevaluated)
      return;
    if (it.props !== true && schemaCxt.props !== void 0) {
      it.props = util_1$l.mergeEvaluated.props(gen, schemaCxt.props, it.props, toName);
    }
    if (it.items !== true && schemaCxt.items !== void 0) {
      it.items = util_1$l.mergeEvaluated.items(gen, schemaCxt.items, it.items, toName);
    }
  }
  mergeValidEvaluated(schemaCxt, valid2) {
    const { it, gen } = this;
    if (it.opts.unevaluated && (it.props !== true || it.items !== true)) {
      gen.if(valid2, () => this.mergeEvaluated(schemaCxt, codegen_1$n.Name));
      return true;
    }
  }
}
validate.KeywordCxt = KeywordCxt;
function keywordCode(it, keyword2, def2, ruleType) {
  const cxt = new KeywordCxt(it, def2, keyword2);
  if ("code" in def2) {
    def2.code(cxt, ruleType);
  } else if (cxt.$data && def2.validate) {
    (0, keyword_1.funcKeywordCode)(cxt, def2);
  } else if ("macro" in def2) {
    (0, keyword_1.macroKeywordCode)(cxt, def2);
  } else if (def2.compile || def2.validate) {
    (0, keyword_1.funcKeywordCode)(cxt, def2);
  }
}
const JSON_POINTER = /^\/(?:[^~]|~0|~1)*$/;
const RELATIVE_JSON_POINTER = /^([0-9]+)(#|\/(?:[^~]|~0|~1)*)?$/;
function getData($data, { dataLevel, dataNames, dataPathArr }) {
  let jsonPointer;
  let data;
  if ($data === "")
    return names_1$3.default.rootData;
  if ($data[0] === "/") {
    if (!JSON_POINTER.test($data))
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    jsonPointer = $data;
    data = names_1$3.default.rootData;
  } else {
    const matches = RELATIVE_JSON_POINTER.exec($data);
    if (!matches)
      throw new Error(`Invalid JSON-pointer: ${$data}`);
    const up = +matches[1];
    jsonPointer = matches[2];
    if (jsonPointer === "#") {
      if (up >= dataLevel)
        throw new Error(errorMsg("property/index", up));
      return dataPathArr[dataLevel - up];
    }
    if (up > dataLevel)
      throw new Error(errorMsg("data", up));
    data = dataNames[dataLevel - up];
    if (!jsonPointer)
      return data;
  }
  let expr = data;
  const segments = jsonPointer.split("/");
  for (const segment of segments) {
    if (segment) {
      data = (0, codegen_1$n._)`${data}${(0, codegen_1$n.getProperty)((0, util_1$l.unescapeJsonPointer)(segment))}`;
      expr = (0, codegen_1$n._)`${expr} && ${data}`;
    }
  }
  return expr;
  function errorMsg(pointerType, up) {
    return `Cannot access ${pointerType} ${up} levels up, current level is ${dataLevel}`;
  }
}
validate.getData = getData;
var validation_error = {};
Object.defineProperty(validation_error, "__esModule", { value: true });
class ValidationError extends Error {
  constructor(errors2) {
    super("validation failed");
    this.errors = errors2;
    this.ajv = this.validation = true;
  }
}
validation_error.default = ValidationError;
var ref_error = {};
Object.defineProperty(ref_error, "__esModule", { value: true });
const resolve_1$1 = resolve$1;
class MissingRefError extends Error {
  constructor(baseId, ref2, msg) {
    super(msg || `can't resolve reference ${ref2} from id ${baseId}`);
    this.missingRef = (0, resolve_1$1.resolveUrl)(baseId, ref2);
    this.missingSchema = (0, resolve_1$1.normalizeId)((0, resolve_1$1.getFullPath)(this.missingRef));
  }
}
ref_error.default = MissingRefError;
var compile = {};
Object.defineProperty(compile, "__esModule", { value: true });
compile.resolveSchema = compile.getCompilingSchema = compile.resolveRef = compile.compileSchema = compile.SchemaEnv = void 0;
const codegen_1$m = codegen;
const validation_error_1 = validation_error;
const names_1$2 = names$1;
const resolve_1 = resolve$1;
const util_1$k = util;
const validate_1$1 = validate;
const URI = uri_all.exports;
class SchemaEnv {
  constructor(env2) {
    var _a;
    this.refs = {};
    this.dynamicAnchors = {};
    let schema;
    if (typeof env2.schema == "object")
      schema = env2.schema;
    this.schema = env2.schema;
    this.schemaId = env2.schemaId;
    this.root = env2.root || this;
    this.baseId = (_a = env2.baseId) !== null && _a !== void 0 ? _a : (0, resolve_1.normalizeId)(schema === null || schema === void 0 ? void 0 : schema[env2.schemaId || "$id"]);
    this.schemaPath = env2.schemaPath;
    this.localRefs = env2.localRefs;
    this.meta = env2.meta;
    this.$async = schema === null || schema === void 0 ? void 0 : schema.$async;
    this.refs = {};
  }
}
compile.SchemaEnv = SchemaEnv;
function compileSchema(sch) {
  const _sch = getCompilingSchema.call(this, sch);
  if (_sch)
    return _sch;
  const rootId = (0, resolve_1.getFullPath)(sch.root.baseId);
  const { es5, lines } = this.opts.code;
  const { ownProperties } = this.opts;
  const gen = new codegen_1$m.CodeGen(this.scope, { es5, lines, ownProperties });
  let _ValidationError;
  if (sch.$async) {
    _ValidationError = gen.scopeValue("Error", {
      ref: validation_error_1.default,
      code: (0, codegen_1$m._)`require("ajv/dist/runtime/validation_error").default`
    });
  }
  const validateName = gen.scopeName("validate");
  sch.validateName = validateName;
  const schemaCxt = {
    gen,
    allErrors: this.opts.allErrors,
    data: names_1$2.default.data,
    parentData: names_1$2.default.parentData,
    parentDataProperty: names_1$2.default.parentDataProperty,
    dataNames: [names_1$2.default.data],
    dataPathArr: [codegen_1$m.nil],
    dataLevel: 0,
    dataTypes: [],
    definedProperties: new Set(),
    topSchemaRef: gen.scopeValue("schema", this.opts.code.source === true ? { ref: sch.schema, code: (0, codegen_1$m.stringify)(sch.schema) } : { ref: sch.schema }),
    validateName,
    ValidationError: _ValidationError,
    schema: sch.schema,
    schemaEnv: sch,
    rootId,
    baseId: sch.baseId || rootId,
    schemaPath: codegen_1$m.nil,
    errSchemaPath: sch.schemaPath || (this.opts.jtd ? "" : "#"),
    errorPath: (0, codegen_1$m._)`""`,
    opts: this.opts,
    self: this
  };
  let sourceCode;
  try {
    this._compilations.add(sch);
    (0, validate_1$1.validateFunctionCode)(schemaCxt);
    gen.optimize(this.opts.code.optimize);
    const validateCode = gen.toString();
    sourceCode = `${gen.scopeRefs(names_1$2.default.scope)}return ${validateCode}`;
    if (this.opts.code.process)
      sourceCode = this.opts.code.process(sourceCode, sch);
    const makeValidate = new Function(`${names_1$2.default.self}`, `${names_1$2.default.scope}`, sourceCode);
    const validate2 = makeValidate(this, this.scope.get());
    this.scope.value(validateName, { ref: validate2 });
    validate2.errors = null;
    validate2.schema = sch.schema;
    validate2.schemaEnv = sch;
    if (sch.$async)
      validate2.$async = true;
    if (this.opts.code.source === true) {
      validate2.source = { validateName, validateCode, scopeValues: gen._values };
    }
    if (this.opts.unevaluated) {
      const { props, items: items2 } = schemaCxt;
      validate2.evaluated = {
        props: props instanceof codegen_1$m.Name ? void 0 : props,
        items: items2 instanceof codegen_1$m.Name ? void 0 : items2,
        dynamicProps: props instanceof codegen_1$m.Name,
        dynamicItems: items2 instanceof codegen_1$m.Name
      };
      if (validate2.source)
        validate2.source.evaluated = (0, codegen_1$m.stringify)(validate2.evaluated);
    }
    sch.validate = validate2;
    return sch;
  } catch (e) {
    delete sch.validate;
    delete sch.validateName;
    if (sourceCode)
      this.logger.error("Error compiling schema, function code:", sourceCode);
    throw e;
  } finally {
    this._compilations.delete(sch);
  }
}
compile.compileSchema = compileSchema;
function resolveRef(root, baseId, ref2) {
  var _a;
  ref2 = (0, resolve_1.resolveUrl)(baseId, ref2);
  const schOrFunc = root.refs[ref2];
  if (schOrFunc)
    return schOrFunc;
  let _sch = resolve.call(this, root, ref2);
  if (_sch === void 0) {
    const schema = (_a = root.localRefs) === null || _a === void 0 ? void 0 : _a[ref2];
    const { schemaId } = this.opts;
    if (schema)
      _sch = new SchemaEnv({ schema, schemaId, root, baseId });
  }
  if (_sch === void 0)
    return;
  return root.refs[ref2] = inlineOrCompile.call(this, _sch);
}
compile.resolveRef = resolveRef;
function inlineOrCompile(sch) {
  if ((0, resolve_1.inlineRef)(sch.schema, this.opts.inlineRefs))
    return sch.schema;
  return sch.validate ? sch : compileSchema.call(this, sch);
}
function getCompilingSchema(schEnv) {
  for (const sch of this._compilations) {
    if (sameSchemaEnv(sch, schEnv))
      return sch;
  }
}
compile.getCompilingSchema = getCompilingSchema;
function sameSchemaEnv(s1, s2) {
  return s1.schema === s2.schema && s1.root === s2.root && s1.baseId === s2.baseId;
}
function resolve(root, ref2) {
  let sch;
  while (typeof (sch = this.refs[ref2]) == "string")
    ref2 = sch;
  return sch || this.schemas[ref2] || resolveSchema.call(this, root, ref2);
}
function resolveSchema(root, ref2) {
  const p = URI.parse(ref2);
  const refPath = (0, resolve_1._getFullPath)(p);
  let baseId = (0, resolve_1.getFullPath)(root.baseId);
  if (Object.keys(root.schema).length > 0 && refPath === baseId) {
    return getJsonPointer.call(this, p, root);
  }
  const id2 = (0, resolve_1.normalizeId)(refPath);
  const schOrRef = this.refs[id2] || this.schemas[id2];
  if (typeof schOrRef == "string") {
    const sch = resolveSchema.call(this, root, schOrRef);
    if (typeof (sch === null || sch === void 0 ? void 0 : sch.schema) !== "object")
      return;
    return getJsonPointer.call(this, p, sch);
  }
  if (typeof (schOrRef === null || schOrRef === void 0 ? void 0 : schOrRef.schema) !== "object")
    return;
  if (!schOrRef.validate)
    compileSchema.call(this, schOrRef);
  if (id2 === (0, resolve_1.normalizeId)(ref2)) {
    const { schema } = schOrRef;
    const { schemaId } = this.opts;
    const schId = schema[schemaId];
    if (schId)
      baseId = (0, resolve_1.resolveUrl)(baseId, schId);
    return new SchemaEnv({ schema, schemaId, root, baseId });
  }
  return getJsonPointer.call(this, p, schOrRef);
}
compile.resolveSchema = resolveSchema;
const PREVENT_SCOPE_CHANGE = new Set([
  "properties",
  "patternProperties",
  "enum",
  "dependencies",
  "definitions"
]);
function getJsonPointer(parsedRef, { baseId, schema, root }) {
  var _a;
  if (((_a = parsedRef.fragment) === null || _a === void 0 ? void 0 : _a[0]) !== "/")
    return;
  for (const part of parsedRef.fragment.slice(1).split("/")) {
    if (typeof schema === "boolean")
      return;
    const partSchema = schema[(0, util_1$k.unescapeFragment)(part)];
    if (partSchema === void 0)
      return;
    schema = partSchema;
    const schId = typeof schema === "object" && schema[this.opts.schemaId];
    if (!PREVENT_SCOPE_CHANGE.has(part) && schId) {
      baseId = (0, resolve_1.resolveUrl)(baseId, schId);
    }
  }
  let env2;
  if (typeof schema != "boolean" && schema.$ref && !(0, util_1$k.schemaHasRulesButRef)(schema, this.RULES)) {
    const $ref = (0, resolve_1.resolveUrl)(baseId, schema.$ref);
    env2 = resolveSchema.call(this, root, $ref);
  }
  const { schemaId } = this.opts;
  env2 = env2 || new SchemaEnv({ schema, schemaId, root, baseId });
  if (env2.schema !== env2.root.schema)
    return env2;
  return void 0;
}
const $id$1 = "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#";
const description = "Meta-schema for $data reference (JSON AnySchema extension proposal)";
const type$1 = "object";
const required$1 = [
  "$data"
];
const properties$2 = {
  $data: {
    type: "string",
    anyOf: [
      {
        format: "relative-json-pointer"
      },
      {
        format: "json-pointer"
      }
    ]
  }
};
const additionalProperties$1 = false;
var require$$9 = {
  $id: $id$1,
  description,
  type: type$1,
  required: required$1,
  properties: properties$2,
  additionalProperties: additionalProperties$1
};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
  var validate_12 = validate;
  Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
  const validation_error_12 = validation_error;
  const ref_error_12 = ref_error;
  const rules_1 = rules;
  const compile_12 = compile;
  const codegen_2 = codegen;
  const resolve_12 = resolve$1;
  const dataType_12 = dataType;
  const util_12 = util;
  const $dataRefSchema = require$$9;
  const defaultRegExp = (str, flags) => new RegExp(str, flags);
  defaultRegExp.code = "new RegExp";
  const META_IGNORE_OPTIONS = ["removeAdditional", "useDefaults", "coerceTypes"];
  const EXT_SCOPE_NAMES = new Set([
    "validate",
    "serialize",
    "parse",
    "wrapper",
    "root",
    "schema",
    "keyword",
    "pattern",
    "formats",
    "validate$data",
    "func",
    "obj",
    "Error"
  ]);
  const removedOptions = {
    errorDataPath: "",
    format: "`validateFormats: false` can be used instead.",
    nullable: '"nullable" keyword is supported by default.',
    jsonPointers: "Deprecated jsPropertySyntax can be used instead.",
    extendRefs: "Deprecated ignoreKeywordsWithRef can be used instead.",
    missingRefs: "Pass empty schema with $id that should be ignored to ajv.addSchema.",
    processCode: "Use option `code: {process: (code, schemaEnv: object) => string}`",
    sourceCode: "Use option `code: {source: true}`",
    strictDefaults: "It is default now, see option `strict`.",
    strictKeywords: "It is default now, see option `strict`.",
    uniqueItems: '"uniqueItems" keyword is always validated.',
    unknownFormats: "Disable strict mode or pass `true` to `ajv.addFormat` (or `formats` option).",
    cache: "Map is used as cache, schema object as key.",
    serialize: "Map is used as cache, schema object as key.",
    ajvErrors: "It is default now."
  };
  const deprecatedOptions = {
    ignoreKeywordsWithRef: "",
    jsPropertySyntax: "",
    unicode: '"minLength"/"maxLength" account for unicode characters by default.'
  };
  const MAX_EXPRESSION = 200;
  function requiredOptions(o) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
    const s = o.strict;
    const _optz = (_a = o.code) === null || _a === void 0 ? void 0 : _a.optimize;
    const optimize = _optz === true || _optz === void 0 ? 1 : _optz || 0;
    const regExp = (_c = (_b = o.code) === null || _b === void 0 ? void 0 : _b.regExp) !== null && _c !== void 0 ? _c : defaultRegExp;
    return {
      strictSchema: (_e = (_d = o.strictSchema) !== null && _d !== void 0 ? _d : s) !== null && _e !== void 0 ? _e : true,
      strictNumbers: (_g = (_f = o.strictNumbers) !== null && _f !== void 0 ? _f : s) !== null && _g !== void 0 ? _g : true,
      strictTypes: (_j = (_h = o.strictTypes) !== null && _h !== void 0 ? _h : s) !== null && _j !== void 0 ? _j : "log",
      strictTuples: (_l = (_k = o.strictTuples) !== null && _k !== void 0 ? _k : s) !== null && _l !== void 0 ? _l : "log",
      strictRequired: (_o = (_m = o.strictRequired) !== null && _m !== void 0 ? _m : s) !== null && _o !== void 0 ? _o : false,
      code: o.code ? __spreadProps(__spreadValues({}, o.code), { optimize, regExp }) : { optimize, regExp },
      loopRequired: (_p = o.loopRequired) !== null && _p !== void 0 ? _p : MAX_EXPRESSION,
      loopEnum: (_q = o.loopEnum) !== null && _q !== void 0 ? _q : MAX_EXPRESSION,
      meta: (_r = o.meta) !== null && _r !== void 0 ? _r : true,
      messages: (_s = o.messages) !== null && _s !== void 0 ? _s : true,
      inlineRefs: (_t = o.inlineRefs) !== null && _t !== void 0 ? _t : true,
      schemaId: (_u = o.schemaId) !== null && _u !== void 0 ? _u : "$id",
      addUsedSchema: (_v = o.addUsedSchema) !== null && _v !== void 0 ? _v : true,
      validateSchema: (_w = o.validateSchema) !== null && _w !== void 0 ? _w : true,
      validateFormats: (_x = o.validateFormats) !== null && _x !== void 0 ? _x : true,
      unicodeRegExp: (_y = o.unicodeRegExp) !== null && _y !== void 0 ? _y : true,
      int32range: (_z = o.int32range) !== null && _z !== void 0 ? _z : true
    };
  }
  class Ajv {
    constructor(opts2 = {}) {
      this.schemas = {};
      this.refs = {};
      this.formats = {};
      this._compilations = new Set();
      this._loading = {};
      this._cache = new Map();
      opts2 = this.opts = __spreadValues(__spreadValues({}, opts2), requiredOptions(opts2));
      const { es5, lines } = this.opts.code;
      this.scope = new codegen_2.ValueScope({ scope: {}, prefixes: EXT_SCOPE_NAMES, es5, lines });
      this.logger = getLogger(opts2.logger);
      const formatOpt = opts2.validateFormats;
      opts2.validateFormats = false;
      this.RULES = (0, rules_1.getRules)();
      checkOptions.call(this, removedOptions, opts2, "NOT SUPPORTED");
      checkOptions.call(this, deprecatedOptions, opts2, "DEPRECATED", "warn");
      this._metaOpts = getMetaSchemaOptions.call(this);
      if (opts2.formats)
        addInitialFormats.call(this);
      this._addVocabularies();
      this._addDefaultMetaSchema();
      if (opts2.keywords)
        addInitialKeywords.call(this, opts2.keywords);
      if (typeof opts2.meta == "object")
        this.addMetaSchema(opts2.meta);
      addInitialSchemas.call(this);
      opts2.validateFormats = formatOpt;
    }
    _addVocabularies() {
      this.addKeyword("$async");
    }
    _addDefaultMetaSchema() {
      const { $data, meta, schemaId } = this.opts;
      let _dataRefSchema = $dataRefSchema;
      if (schemaId === "id") {
        _dataRefSchema = __spreadValues({}, $dataRefSchema);
        _dataRefSchema.id = _dataRefSchema.$id;
        delete _dataRefSchema.$id;
      }
      if (meta && $data)
        this.addMetaSchema(_dataRefSchema, _dataRefSchema[schemaId], false);
    }
    defaultMeta() {
      const { meta, schemaId } = this.opts;
      return this.opts.defaultMeta = typeof meta == "object" ? meta[schemaId] || meta : void 0;
    }
    validate(schemaKeyRef, data) {
      let v;
      if (typeof schemaKeyRef == "string") {
        v = this.getSchema(schemaKeyRef);
        if (!v)
          throw new Error(`no schema with key or ref "${schemaKeyRef}"`);
      } else {
        v = this.compile(schemaKeyRef);
      }
      const valid2 = v(data);
      if (!("$async" in v))
        this.errors = v.errors;
      return valid2;
    }
    compile(schema, _meta) {
      const sch = this._addSchema(schema, _meta);
      return sch.validate || this._compileSchemaEnv(sch);
    }
    compileAsync(schema, meta) {
      if (typeof this.opts.loadSchema != "function") {
        throw new Error("options.loadSchema should be a function");
      }
      const { loadSchema } = this.opts;
      return runCompileAsync.call(this, schema, meta);
      async function runCompileAsync(_schema, _meta) {
        await loadMetaSchema.call(this, _schema.$schema);
        const sch = this._addSchema(_schema, _meta);
        return sch.validate || _compileAsync.call(this, sch);
      }
      async function loadMetaSchema($ref) {
        if ($ref && !this.getSchema($ref)) {
          await runCompileAsync.call(this, { $ref }, true);
        }
      }
      async function _compileAsync(sch) {
        try {
          return this._compileSchemaEnv(sch);
        } catch (e) {
          if (!(e instanceof ref_error_12.default))
            throw e;
          checkLoaded.call(this, e);
          await loadMissingSchema.call(this, e.missingSchema);
          return _compileAsync.call(this, sch);
        }
      }
      function checkLoaded({ missingSchema: ref2, missingRef }) {
        if (this.refs[ref2]) {
          throw new Error(`AnySchema ${ref2} is loaded but ${missingRef} cannot be resolved`);
        }
      }
      async function loadMissingSchema(ref2) {
        const _schema = await _loadSchema.call(this, ref2);
        if (!this.refs[ref2])
          await loadMetaSchema.call(this, _schema.$schema);
        if (!this.refs[ref2])
          this.addSchema(_schema, ref2, meta);
      }
      async function _loadSchema(ref2) {
        const p = this._loading[ref2];
        if (p)
          return p;
        try {
          return await (this._loading[ref2] = loadSchema(ref2));
        } finally {
          delete this._loading[ref2];
        }
      }
    }
    addSchema(schema, key, _meta, _validateSchema = this.opts.validateSchema) {
      if (Array.isArray(schema)) {
        for (const sch of schema)
          this.addSchema(sch, void 0, _meta, _validateSchema);
        return this;
      }
      let id2;
      if (typeof schema === "object") {
        const { schemaId } = this.opts;
        id2 = schema[schemaId];
        if (id2 !== void 0 && typeof id2 != "string") {
          throw new Error(`schema ${schemaId} must be string`);
        }
      }
      key = (0, resolve_12.normalizeId)(key || id2);
      this._checkUnique(key);
      this.schemas[key] = this._addSchema(schema, _meta, key, _validateSchema, true);
      return this;
    }
    addMetaSchema(schema, key, _validateSchema = this.opts.validateSchema) {
      this.addSchema(schema, key, true, _validateSchema);
      return this;
    }
    validateSchema(schema, throwOrLogError) {
      if (typeof schema == "boolean")
        return true;
      let $schema2;
      $schema2 = schema.$schema;
      if ($schema2 !== void 0 && typeof $schema2 != "string") {
        throw new Error("$schema must be a string");
      }
      $schema2 = $schema2 || this.opts.defaultMeta || this.defaultMeta();
      if (!$schema2) {
        this.logger.warn("meta-schema not available");
        this.errors = null;
        return true;
      }
      const valid2 = this.validate($schema2, schema);
      if (!valid2 && throwOrLogError) {
        const message = "schema is invalid: " + this.errorsText();
        if (this.opts.validateSchema === "log")
          this.logger.error(message);
        else
          throw new Error(message);
      }
      return valid2;
    }
    getSchema(keyRef) {
      let sch;
      while (typeof (sch = getSchEnv.call(this, keyRef)) == "string")
        keyRef = sch;
      if (sch === void 0) {
        const { schemaId } = this.opts;
        const root = new compile_12.SchemaEnv({ schema: {}, schemaId });
        sch = compile_12.resolveSchema.call(this, root, keyRef);
        if (!sch)
          return;
        this.refs[keyRef] = sch;
      }
      return sch.validate || this._compileSchemaEnv(sch);
    }
    removeSchema(schemaKeyRef) {
      if (schemaKeyRef instanceof RegExp) {
        this._removeAllSchemas(this.schemas, schemaKeyRef);
        this._removeAllSchemas(this.refs, schemaKeyRef);
        return this;
      }
      switch (typeof schemaKeyRef) {
        case "undefined":
          this._removeAllSchemas(this.schemas);
          this._removeAllSchemas(this.refs);
          this._cache.clear();
          return this;
        case "string": {
          const sch = getSchEnv.call(this, schemaKeyRef);
          if (typeof sch == "object")
            this._cache.delete(sch.schema);
          delete this.schemas[schemaKeyRef];
          delete this.refs[schemaKeyRef];
          return this;
        }
        case "object": {
          const cacheKey = schemaKeyRef;
          this._cache.delete(cacheKey);
          let id2 = schemaKeyRef[this.opts.schemaId];
          if (id2) {
            id2 = (0, resolve_12.normalizeId)(id2);
            delete this.schemas[id2];
            delete this.refs[id2];
          }
          return this;
        }
        default:
          throw new Error("ajv.removeSchema: invalid parameter");
      }
    }
    addVocabulary(definitions2) {
      for (const def2 of definitions2)
        this.addKeyword(def2);
      return this;
    }
    addKeyword(kwdOrDef, def2) {
      let keyword2;
      if (typeof kwdOrDef == "string") {
        keyword2 = kwdOrDef;
        if (typeof def2 == "object") {
          this.logger.warn("these parameters are deprecated, see docs for addKeyword");
          def2.keyword = keyword2;
        }
      } else if (typeof kwdOrDef == "object" && def2 === void 0) {
        def2 = kwdOrDef;
        keyword2 = def2.keyword;
        if (Array.isArray(keyword2) && !keyword2.length) {
          throw new Error("addKeywords: keyword must be string or non-empty array");
        }
      } else {
        throw new Error("invalid addKeywords parameters");
      }
      checkKeyword.call(this, keyword2, def2);
      if (!def2) {
        (0, util_12.eachItem)(keyword2, (kwd) => addRule.call(this, kwd));
        return this;
      }
      keywordMetaschema.call(this, def2);
      const definition = __spreadProps(__spreadValues({}, def2), {
        type: (0, dataType_12.getJSONTypes)(def2.type),
        schemaType: (0, dataType_12.getJSONTypes)(def2.schemaType)
      });
      (0, util_12.eachItem)(keyword2, definition.type.length === 0 ? (k) => addRule.call(this, k, definition) : (k) => definition.type.forEach((t2) => addRule.call(this, k, definition, t2)));
      return this;
    }
    getKeyword(keyword2) {
      const rule = this.RULES.all[keyword2];
      return typeof rule == "object" ? rule.definition : !!rule;
    }
    removeKeyword(keyword2) {
      const { RULES } = this;
      delete RULES.keywords[keyword2];
      delete RULES.all[keyword2];
      for (const group of RULES.rules) {
        const i = group.rules.findIndex((rule) => rule.keyword === keyword2);
        if (i >= 0)
          group.rules.splice(i, 1);
      }
      return this;
    }
    addFormat(name, format2) {
      if (typeof format2 == "string")
        format2 = new RegExp(format2);
      this.formats[name] = format2;
      return this;
    }
    errorsText(errors2 = this.errors, { separator = ", ", dataVar = "data" } = {}) {
      if (!errors2 || errors2.length === 0)
        return "No errors";
      return errors2.map((e) => `${dataVar}${e.instancePath} ${e.message}`).reduce((text, msg) => text + separator + msg);
    }
    $dataMetaSchema(metaSchema, keywordsJsonPointers) {
      const rules2 = this.RULES.all;
      metaSchema = JSON.parse(JSON.stringify(metaSchema));
      for (const jsonPointer of keywordsJsonPointers) {
        const segments = jsonPointer.split("/").slice(1);
        let keywords = metaSchema;
        for (const seg of segments)
          keywords = keywords[seg];
        for (const key in rules2) {
          const rule = rules2[key];
          if (typeof rule != "object")
            continue;
          const { $data } = rule.definition;
          const schema = keywords[key];
          if ($data && schema)
            keywords[key] = schemaOrData(schema);
        }
      }
      return metaSchema;
    }
    _removeAllSchemas(schemas, regex) {
      for (const keyRef in schemas) {
        const sch = schemas[keyRef];
        if (!regex || regex.test(keyRef)) {
          if (typeof sch == "string") {
            delete schemas[keyRef];
          } else if (sch && !sch.meta) {
            this._cache.delete(sch.schema);
            delete schemas[keyRef];
          }
        }
      }
    }
    _addSchema(schema, meta, baseId, validateSchema = this.opts.validateSchema, addSchema = this.opts.addUsedSchema) {
      let id2;
      const { schemaId } = this.opts;
      if (typeof schema == "object") {
        id2 = schema[schemaId];
      } else {
        if (this.opts.jtd)
          throw new Error("schema must be object");
        else if (typeof schema != "boolean")
          throw new Error("schema must be object or boolean");
      }
      let sch = this._cache.get(schema);
      if (sch !== void 0)
        return sch;
      baseId = (0, resolve_12.normalizeId)(id2 || baseId);
      const localRefs = resolve_12.getSchemaRefs.call(this, schema, baseId);
      sch = new compile_12.SchemaEnv({ schema, schemaId, meta, baseId, localRefs });
      this._cache.set(sch.schema, sch);
      if (addSchema && !baseId.startsWith("#")) {
        if (baseId)
          this._checkUnique(baseId);
        this.refs[baseId] = sch;
      }
      if (validateSchema)
        this.validateSchema(schema, true);
      return sch;
    }
    _checkUnique(id2) {
      if (this.schemas[id2] || this.refs[id2]) {
        throw new Error(`schema with key or id "${id2}" already exists`);
      }
    }
    _compileSchemaEnv(sch) {
      if (sch.meta)
        this._compileMetaSchema(sch);
      else
        compile_12.compileSchema.call(this, sch);
      if (!sch.validate)
        throw new Error("ajv implementation error");
      return sch.validate;
    }
    _compileMetaSchema(sch) {
      const currentOpts = this.opts;
      this.opts = this._metaOpts;
      try {
        compile_12.compileSchema.call(this, sch);
      } finally {
        this.opts = currentOpts;
      }
    }
  }
  exports.default = Ajv;
  Ajv.ValidationError = validation_error_12.default;
  Ajv.MissingRefError = ref_error_12.default;
  function checkOptions(checkOpts, options, msg, log = "error") {
    for (const key in checkOpts) {
      const opt = key;
      if (opt in options)
        this.logger[log](`${msg}: option ${key}. ${checkOpts[opt]}`);
    }
  }
  function getSchEnv(keyRef) {
    keyRef = (0, resolve_12.normalizeId)(keyRef);
    return this.schemas[keyRef] || this.refs[keyRef];
  }
  function addInitialSchemas() {
    const optsSchemas = this.opts.schemas;
    if (!optsSchemas)
      return;
    if (Array.isArray(optsSchemas))
      this.addSchema(optsSchemas);
    else
      for (const key in optsSchemas)
        this.addSchema(optsSchemas[key], key);
  }
  function addInitialFormats() {
    for (const name in this.opts.formats) {
      const format2 = this.opts.formats[name];
      if (format2)
        this.addFormat(name, format2);
    }
  }
  function addInitialKeywords(defs) {
    if (Array.isArray(defs)) {
      this.addVocabulary(defs);
      return;
    }
    this.logger.warn("keywords option as map is deprecated, pass array");
    for (const keyword2 in defs) {
      const def2 = defs[keyword2];
      if (!def2.keyword)
        def2.keyword = keyword2;
      this.addKeyword(def2);
    }
  }
  function getMetaSchemaOptions() {
    const metaOpts = __spreadValues({}, this.opts);
    for (const opt of META_IGNORE_OPTIONS)
      delete metaOpts[opt];
    return metaOpts;
  }
  const noLogs = { log() {
  }, warn() {
  }, error() {
  } };
  function getLogger(logger) {
    if (logger === false)
      return noLogs;
    if (logger === void 0)
      return console;
    if (logger.log && logger.warn && logger.error)
      return logger;
    throw new Error("logger must implement log, warn and error methods");
  }
  const KEYWORD_NAME = /^[a-z_$][a-z0-9_$:-]*$/i;
  function checkKeyword(keyword2, def2) {
    const { RULES } = this;
    (0, util_12.eachItem)(keyword2, (kwd) => {
      if (RULES.keywords[kwd])
        throw new Error(`Keyword ${kwd} is already defined`);
      if (!KEYWORD_NAME.test(kwd))
        throw new Error(`Keyword ${kwd} has invalid name`);
    });
    if (!def2)
      return;
    if (def2.$data && !("code" in def2 || "validate" in def2)) {
      throw new Error('$data keyword must have "code" or "validate" function');
    }
  }
  function addRule(keyword2, definition, dataType2) {
    var _a;
    const post = definition === null || definition === void 0 ? void 0 : definition.post;
    if (dataType2 && post)
      throw new Error('keyword with "post" flag cannot have "type"');
    const { RULES } = this;
    let ruleGroup = post ? RULES.post : RULES.rules.find(({ type: t2 }) => t2 === dataType2);
    if (!ruleGroup) {
      ruleGroup = { type: dataType2, rules: [] };
      RULES.rules.push(ruleGroup);
    }
    RULES.keywords[keyword2] = true;
    if (!definition)
      return;
    const rule = {
      keyword: keyword2,
      definition: __spreadProps(__spreadValues({}, definition), {
        type: (0, dataType_12.getJSONTypes)(definition.type),
        schemaType: (0, dataType_12.getJSONTypes)(definition.schemaType)
      })
    };
    if (definition.before)
      addBeforeRule.call(this, ruleGroup, rule, definition.before);
    else
      ruleGroup.rules.push(rule);
    RULES.all[keyword2] = rule;
    (_a = definition.implements) === null || _a === void 0 ? void 0 : _a.forEach((kwd) => this.addKeyword(kwd));
  }
  function addBeforeRule(ruleGroup, rule, before) {
    const i = ruleGroup.rules.findIndex((_rule) => _rule.keyword === before);
    if (i >= 0) {
      ruleGroup.rules.splice(i, 0, rule);
    } else {
      ruleGroup.rules.push(rule);
      this.logger.warn(`rule ${before} is not defined`);
    }
  }
  function keywordMetaschema(def2) {
    let { metaSchema } = def2;
    if (metaSchema === void 0)
      return;
    if (def2.$data && this.opts.$data)
      metaSchema = schemaOrData(metaSchema);
    def2.validateSchema = this.compile(metaSchema, true);
  }
  const $dataRef = {
    $ref: "https://raw.githubusercontent.com/ajv-validator/ajv/master/lib/refs/data.json#"
  };
  function schemaOrData(schema) {
    return { anyOf: [schema, $dataRef] };
  }
})(core$2);
var draft7 = {};
var core$1 = {};
var id = {};
Object.defineProperty(id, "__esModule", { value: true });
const def$s = {
  keyword: "id",
  code() {
    throw new Error('NOT SUPPORTED: keyword "id", use "$id" for schema ID');
  }
};
id.default = def$s;
var ref = {};
Object.defineProperty(ref, "__esModule", { value: true });
ref.callRef = ref.getValidate = void 0;
const ref_error_1 = ref_error;
const code_1$8 = code;
const codegen_1$l = codegen;
const names_1$1 = names$1;
const compile_1$1 = compile;
const util_1$j = util;
const def$r = {
  keyword: "$ref",
  schemaType: "string",
  code(cxt) {
    const { gen, schema: $ref, it } = cxt;
    const { baseId, schemaEnv: env2, validateName, opts: opts2, self: self2 } = it;
    const { root } = env2;
    if (($ref === "#" || $ref === "#/") && baseId === root.baseId)
      return callRootRef();
    const schOrEnv = compile_1$1.resolveRef.call(self2, root, baseId, $ref);
    if (schOrEnv === void 0)
      throw new ref_error_1.default(baseId, $ref);
    if (schOrEnv instanceof compile_1$1.SchemaEnv)
      return callValidate(schOrEnv);
    return inlineRefSchema(schOrEnv);
    function callRootRef() {
      if (env2 === root)
        return callRef(cxt, validateName, env2, env2.$async);
      const rootName = gen.scopeValue("root", { ref: root });
      return callRef(cxt, (0, codegen_1$l._)`${rootName}.validate`, root, root.$async);
    }
    function callValidate(sch) {
      const v = getValidate(cxt, sch);
      callRef(cxt, v, sch, sch.$async);
    }
    function inlineRefSchema(sch) {
      const schName = gen.scopeValue("schema", opts2.code.source === true ? { ref: sch, code: (0, codegen_1$l.stringify)(sch) } : { ref: sch });
      const valid2 = gen.name("valid");
      const schCxt = cxt.subschema({
        schema: sch,
        dataTypes: [],
        schemaPath: codegen_1$l.nil,
        topSchemaRef: schName,
        errSchemaPath: $ref
      }, valid2);
      cxt.mergeEvaluated(schCxt);
      cxt.ok(valid2);
    }
  }
};
function getValidate(cxt, sch) {
  const { gen } = cxt;
  return sch.validate ? gen.scopeValue("validate", { ref: sch.validate }) : (0, codegen_1$l._)`${gen.scopeValue("wrapper", { ref: sch })}.validate`;
}
ref.getValidate = getValidate;
function callRef(cxt, v, sch, $async) {
  const { gen, it } = cxt;
  const { allErrors, schemaEnv: env2, opts: opts2 } = it;
  const passCxt = opts2.passContext ? names_1$1.default.this : codegen_1$l.nil;
  if ($async)
    callAsyncRef();
  else
    callSyncRef();
  function callAsyncRef() {
    if (!env2.$async)
      throw new Error("async schema referenced by sync schema");
    const valid2 = gen.let("valid");
    gen.try(() => {
      gen.code((0, codegen_1$l._)`await ${(0, code_1$8.callValidateCode)(cxt, v, passCxt)}`);
      addEvaluatedFrom(v);
      if (!allErrors)
        gen.assign(valid2, true);
    }, (e) => {
      gen.if((0, codegen_1$l._)`!(${e} instanceof ${it.ValidationError})`, () => gen.throw(e));
      addErrorsFrom(e);
      if (!allErrors)
        gen.assign(valid2, false);
    });
    cxt.ok(valid2);
  }
  function callSyncRef() {
    cxt.result((0, code_1$8.callValidateCode)(cxt, v, passCxt), () => addEvaluatedFrom(v), () => addErrorsFrom(v));
  }
  function addErrorsFrom(source2) {
    const errs = (0, codegen_1$l._)`${source2}.errors`;
    gen.assign(names_1$1.default.vErrors, (0, codegen_1$l._)`${names_1$1.default.vErrors} === null ? ${errs} : ${names_1$1.default.vErrors}.concat(${errs})`);
    gen.assign(names_1$1.default.errors, (0, codegen_1$l._)`${names_1$1.default.vErrors}.length`);
  }
  function addEvaluatedFrom(source2) {
    var _a;
    if (!it.opts.unevaluated)
      return;
    const schEvaluated = (_a = sch === null || sch === void 0 ? void 0 : sch.validate) === null || _a === void 0 ? void 0 : _a.evaluated;
    if (it.props !== true) {
      if (schEvaluated && !schEvaluated.dynamicProps) {
        if (schEvaluated.props !== void 0) {
          it.props = util_1$j.mergeEvaluated.props(gen, schEvaluated.props, it.props);
        }
      } else {
        const props = gen.var("props", (0, codegen_1$l._)`${source2}.evaluated.props`);
        it.props = util_1$j.mergeEvaluated.props(gen, props, it.props, codegen_1$l.Name);
      }
    }
    if (it.items !== true) {
      if (schEvaluated && !schEvaluated.dynamicItems) {
        if (schEvaluated.items !== void 0) {
          it.items = util_1$j.mergeEvaluated.items(gen, schEvaluated.items, it.items);
        }
      } else {
        const items2 = gen.var("items", (0, codegen_1$l._)`${source2}.evaluated.items`);
        it.items = util_1$j.mergeEvaluated.items(gen, items2, it.items, codegen_1$l.Name);
      }
    }
  }
}
ref.callRef = callRef;
ref.default = def$r;
Object.defineProperty(core$1, "__esModule", { value: true });
const id_1 = id;
const ref_1 = ref;
const core = [
  "$schema",
  "$id",
  "$defs",
  "$vocabulary",
  { keyword: "$comment" },
  "definitions",
  id_1.default,
  ref_1.default
];
core$1.default = core;
var validation$1 = {};
var limitNumber = {};
Object.defineProperty(limitNumber, "__esModule", { value: true });
const codegen_1$k = codegen;
const ops = codegen_1$k.operators;
const KWDs = {
  maximum: { okStr: "<=", ok: ops.LTE, fail: ops.GT },
  minimum: { okStr: ">=", ok: ops.GTE, fail: ops.LT },
  exclusiveMaximum: { okStr: "<", ok: ops.LT, fail: ops.GTE },
  exclusiveMinimum: { okStr: ">", ok: ops.GT, fail: ops.LTE }
};
const error$i = {
  message: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k.str)`must be ${KWDs[keyword2].okStr} ${schemaCode}`,
  params: ({ keyword: keyword2, schemaCode }) => (0, codegen_1$k._)`{comparison: ${KWDs[keyword2].okStr}, limit: ${schemaCode}}`
};
const def$q = {
  keyword: Object.keys(KWDs),
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$i,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    cxt.fail$data((0, codegen_1$k._)`${data} ${KWDs[keyword2].fail} ${schemaCode} || isNaN(${data})`);
  }
};
limitNumber.default = def$q;
var multipleOf = {};
Object.defineProperty(multipleOf, "__esModule", { value: true });
const codegen_1$j = codegen;
const error$h = {
  message: ({ schemaCode }) => (0, codegen_1$j.str)`must be multiple of ${schemaCode}`,
  params: ({ schemaCode }) => (0, codegen_1$j._)`{multipleOf: ${schemaCode}}`
};
const def$p = {
  keyword: "multipleOf",
  type: "number",
  schemaType: "number",
  $data: true,
  error: error$h,
  code(cxt) {
    const { gen, data, schemaCode, it } = cxt;
    const prec = it.opts.multipleOfPrecision;
    const res = gen.let("res");
    const invalid = prec ? (0, codegen_1$j._)`Math.abs(Math.round(${res}) - ${res}) > 1e-${prec}` : (0, codegen_1$j._)`${res} !== parseInt(${res})`;
    cxt.fail$data((0, codegen_1$j._)`(${schemaCode} === 0 || (${res} = ${data}/${schemaCode}, ${invalid}))`);
  }
};
multipleOf.default = def$p;
var limitLength = {};
var ucs2length$1 = {};
Object.defineProperty(ucs2length$1, "__esModule", { value: true });
function ucs2length(str) {
  const len = str.length;
  let length = 0;
  let pos = 0;
  let value;
  while (pos < len) {
    length++;
    value = str.charCodeAt(pos++);
    if (value >= 55296 && value <= 56319 && pos < len) {
      value = str.charCodeAt(pos);
      if ((value & 64512) === 56320)
        pos++;
    }
  }
  return length;
}
ucs2length$1.default = ucs2length;
ucs2length.code = 'require("ajv/dist/runtime/ucs2length").default';
Object.defineProperty(limitLength, "__esModule", { value: true });
const codegen_1$i = codegen;
const util_1$i = util;
const ucs2length_1 = ucs2length$1;
const error$g = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxLength" ? "more" : "fewer";
    return (0, codegen_1$i.str)`must NOT have ${comp} than ${schemaCode} characters`;
  },
  params: ({ schemaCode }) => (0, codegen_1$i._)`{limit: ${schemaCode}}`
};
const def$o = {
  keyword: ["maxLength", "minLength"],
  type: "string",
  schemaType: "number",
  $data: true,
  error: error$g,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode, it } = cxt;
    const op = keyword2 === "maxLength" ? codegen_1$i.operators.GT : codegen_1$i.operators.LT;
    const len = it.opts.unicode === false ? (0, codegen_1$i._)`${data}.length` : (0, codegen_1$i._)`${(0, util_1$i.useFunc)(cxt.gen, ucs2length_1.default)}(${data})`;
    cxt.fail$data((0, codegen_1$i._)`${len} ${op} ${schemaCode}`);
  }
};
limitLength.default = def$o;
var pattern = {};
Object.defineProperty(pattern, "__esModule", { value: true });
const code_1$7 = code;
const codegen_1$h = codegen;
const error$f = {
  message: ({ schemaCode }) => (0, codegen_1$h.str)`must match pattern "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$h._)`{pattern: ${schemaCode}}`
};
const def$n = {
  keyword: "pattern",
  type: "string",
  schemaType: "string",
  $data: true,
  error: error$f,
  code(cxt) {
    const { data, $data, schema, schemaCode, it } = cxt;
    const u = it.opts.unicodeRegExp ? "u" : "";
    const regExp = $data ? (0, codegen_1$h._)`(new RegExp(${schemaCode}, ${u}))` : (0, code_1$7.usePattern)(cxt, schema);
    cxt.fail$data((0, codegen_1$h._)`!${regExp}.test(${data})`);
  }
};
pattern.default = def$n;
var limitProperties = {};
Object.defineProperty(limitProperties, "__esModule", { value: true });
const codegen_1$g = codegen;
const error$e = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxProperties" ? "more" : "fewer";
    return (0, codegen_1$g.str)`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => (0, codegen_1$g._)`{limit: ${schemaCode}}`
};
const def$m = {
  keyword: ["maxProperties", "minProperties"],
  type: "object",
  schemaType: "number",
  $data: true,
  error: error$e,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxProperties" ? codegen_1$g.operators.GT : codegen_1$g.operators.LT;
    cxt.fail$data((0, codegen_1$g._)`Object.keys(${data}).length ${op} ${schemaCode}`);
  }
};
limitProperties.default = def$m;
var required = {};
Object.defineProperty(required, "__esModule", { value: true });
const code_1$6 = code;
const codegen_1$f = codegen;
const util_1$h = util;
const error$d = {
  message: ({ params: { missingProperty } }) => (0, codegen_1$f.str)`must have required property '${missingProperty}'`,
  params: ({ params: { missingProperty } }) => (0, codegen_1$f._)`{missingProperty: ${missingProperty}}`
};
const def$l = {
  keyword: "required",
  type: "object",
  schemaType: "array",
  $data: true,
  error: error$d,
  code(cxt) {
    const { gen, schema, schemaCode, data, $data, it } = cxt;
    const { opts: opts2 } = it;
    if (!$data && schema.length === 0)
      return;
    const useLoop = schema.length >= opts2.loopRequired;
    if (it.allErrors)
      allErrorsMode();
    else
      exitOnErrorMode();
    if (opts2.strictRequired) {
      const props = cxt.parentSchema.properties;
      const { definedProperties } = cxt.it;
      for (const requiredKey of schema) {
        if ((props === null || props === void 0 ? void 0 : props[requiredKey]) === void 0 && !definedProperties.has(requiredKey)) {
          const schemaPath = it.schemaEnv.baseId + it.errSchemaPath;
          const msg = `required property "${requiredKey}" is not defined at "${schemaPath}" (strictRequired)`;
          (0, util_1$h.checkStrictMode)(it, msg, it.opts.strictRequired);
        }
      }
    }
    function allErrorsMode() {
      if (useLoop || $data) {
        cxt.block$data(codegen_1$f.nil, loopAllRequired);
      } else {
        for (const prop of schema) {
          (0, code_1$6.checkReportMissingProp)(cxt, prop);
        }
      }
    }
    function exitOnErrorMode() {
      const missing = gen.let("missing");
      if (useLoop || $data) {
        const valid2 = gen.let("valid", true);
        cxt.block$data(valid2, () => loopUntilMissing(missing, valid2));
        cxt.ok(valid2);
      } else {
        gen.if((0, code_1$6.checkMissingProp)(cxt, schema, missing));
        (0, code_1$6.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
    function loopAllRequired() {
      gen.forOf("prop", schemaCode, (prop) => {
        cxt.setParams({ missingProperty: prop });
        gen.if((0, code_1$6.noPropertyInData)(gen, data, prop, opts2.ownProperties), () => cxt.error());
      });
    }
    function loopUntilMissing(missing, valid2) {
      cxt.setParams({ missingProperty: missing });
      gen.forOf(missing, schemaCode, () => {
        gen.assign(valid2, (0, code_1$6.propertyInData)(gen, data, missing, opts2.ownProperties));
        gen.if((0, codegen_1$f.not)(valid2), () => {
          cxt.error();
          gen.break();
        });
      }, codegen_1$f.nil);
    }
  }
};
required.default = def$l;
var limitItems = {};
Object.defineProperty(limitItems, "__esModule", { value: true });
const codegen_1$e = codegen;
const error$c = {
  message({ keyword: keyword2, schemaCode }) {
    const comp = keyword2 === "maxItems" ? "more" : "fewer";
    return (0, codegen_1$e.str)`must NOT have ${comp} than ${schemaCode} items`;
  },
  params: ({ schemaCode }) => (0, codegen_1$e._)`{limit: ${schemaCode}}`
};
const def$k = {
  keyword: ["maxItems", "minItems"],
  type: "array",
  schemaType: "number",
  $data: true,
  error: error$c,
  code(cxt) {
    const { keyword: keyword2, data, schemaCode } = cxt;
    const op = keyword2 === "maxItems" ? codegen_1$e.operators.GT : codegen_1$e.operators.LT;
    cxt.fail$data((0, codegen_1$e._)`${data}.length ${op} ${schemaCode}`);
  }
};
limitItems.default = def$k;
var uniqueItems = {};
var equal$1 = {};
Object.defineProperty(equal$1, "__esModule", { value: true });
const equal = fastDeepEqual;
equal.code = 'require("ajv/dist/runtime/equal").default';
equal$1.default = equal;
Object.defineProperty(uniqueItems, "__esModule", { value: true });
const dataType_1 = dataType;
const codegen_1$d = codegen;
const util_1$g = util;
const equal_1$2 = equal$1;
const error$b = {
  message: ({ params: { i, j } }) => (0, codegen_1$d.str)`must NOT have duplicate items (items ## ${j} and ${i} are identical)`,
  params: ({ params: { i, j } }) => (0, codegen_1$d._)`{i: ${i}, j: ${j}}`
};
const def$j = {
  keyword: "uniqueItems",
  type: "array",
  schemaType: "boolean",
  $data: true,
  error: error$b,
  code(cxt) {
    const { gen, data, $data, schema, parentSchema, schemaCode, it } = cxt;
    if (!$data && !schema)
      return;
    const valid2 = gen.let("valid");
    const itemTypes = parentSchema.items ? (0, dataType_1.getSchemaTypes)(parentSchema.items) : [];
    cxt.block$data(valid2, validateUniqueItems, (0, codegen_1$d._)`${schemaCode} === false`);
    cxt.ok(valid2);
    function validateUniqueItems() {
      const i = gen.let("i", (0, codegen_1$d._)`${data}.length`);
      const j = gen.let("j");
      cxt.setParams({ i, j });
      gen.assign(valid2, true);
      gen.if((0, codegen_1$d._)`${i} > 1`, () => (canOptimize() ? loopN : loopN2)(i, j));
    }
    function canOptimize() {
      return itemTypes.length > 0 && !itemTypes.some((t2) => t2 === "object" || t2 === "array");
    }
    function loopN(i, j) {
      const item = gen.name("item");
      const wrongType = (0, dataType_1.checkDataTypes)(itemTypes, item, it.opts.strictNumbers, dataType_1.DataType.Wrong);
      const indices = gen.const("indices", (0, codegen_1$d._)`{}`);
      gen.for((0, codegen_1$d._)`;${i}--;`, () => {
        gen.let(item, (0, codegen_1$d._)`${data}[${i}]`);
        gen.if(wrongType, (0, codegen_1$d._)`continue`);
        if (itemTypes.length > 1)
          gen.if((0, codegen_1$d._)`typeof ${item} == "string"`, (0, codegen_1$d._)`${item} += "_"`);
        gen.if((0, codegen_1$d._)`typeof ${indices}[${item}] == "number"`, () => {
          gen.assign(j, (0, codegen_1$d._)`${indices}[${item}]`);
          cxt.error();
          gen.assign(valid2, false).break();
        }).code((0, codegen_1$d._)`${indices}[${item}] = ${i}`);
      });
    }
    function loopN2(i, j) {
      const eql = (0, util_1$g.useFunc)(gen, equal_1$2.default);
      const outer = gen.name("outer");
      gen.label(outer).for((0, codegen_1$d._)`;${i}--;`, () => gen.for((0, codegen_1$d._)`${j} = ${i}; ${j}--;`, () => gen.if((0, codegen_1$d._)`${eql}(${data}[${i}], ${data}[${j}])`, () => {
        cxt.error();
        gen.assign(valid2, false).break(outer);
      })));
    }
  }
};
uniqueItems.default = def$j;
var _const = {};
Object.defineProperty(_const, "__esModule", { value: true });
const codegen_1$c = codegen;
const util_1$f = util;
const equal_1$1 = equal$1;
const error$a = {
  message: "must be equal to constant",
  params: ({ schemaCode }) => (0, codegen_1$c._)`{allowedValue: ${schemaCode}}`
};
const def$i = {
  keyword: "const",
  $data: true,
  error: error$a,
  code(cxt) {
    const { gen, data, $data, schemaCode, schema } = cxt;
    if ($data || schema && typeof schema == "object") {
      cxt.fail$data((0, codegen_1$c._)`!${(0, util_1$f.useFunc)(gen, equal_1$1.default)}(${data}, ${schemaCode})`);
    } else {
      cxt.fail((0, codegen_1$c._)`${schema} !== ${data}`);
    }
  }
};
_const.default = def$i;
var _enum = {};
Object.defineProperty(_enum, "__esModule", { value: true });
const codegen_1$b = codegen;
const util_1$e = util;
const equal_1 = equal$1;
const error$9 = {
  message: "must be equal to one of the allowed values",
  params: ({ schemaCode }) => (0, codegen_1$b._)`{allowedValues: ${schemaCode}}`
};
const def$h = {
  keyword: "enum",
  schemaType: "array",
  $data: true,
  error: error$9,
  code(cxt) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    if (!$data && schema.length === 0)
      throw new Error("enum must have non-empty array");
    const useLoop = schema.length >= it.opts.loopEnum;
    const eql = (0, util_1$e.useFunc)(gen, equal_1.default);
    let valid2;
    if (useLoop || $data) {
      valid2 = gen.let("valid");
      cxt.block$data(valid2, loopEnum);
    } else {
      if (!Array.isArray(schema))
        throw new Error("ajv implementation error");
      const vSchema = gen.const("vSchema", schemaCode);
      valid2 = (0, codegen_1$b.or)(...schema.map((_x, i) => equalCode(vSchema, i)));
    }
    cxt.pass(valid2);
    function loopEnum() {
      gen.assign(valid2, false);
      gen.forOf("v", schemaCode, (v) => gen.if((0, codegen_1$b._)`${eql}(${data}, ${v})`, () => gen.assign(valid2, true).break()));
    }
    function equalCode(vSchema, i) {
      const sch = schema[i];
      return typeof sch === "object" && sch !== null ? (0, codegen_1$b._)`${eql}(${data}, ${vSchema}[${i}])` : (0, codegen_1$b._)`${data} === ${sch}`;
    }
  }
};
_enum.default = def$h;
Object.defineProperty(validation$1, "__esModule", { value: true });
const limitNumber_1 = limitNumber;
const multipleOf_1 = multipleOf;
const limitLength_1 = limitLength;
const pattern_1 = pattern;
const limitProperties_1 = limitProperties;
const required_1 = required;
const limitItems_1 = limitItems;
const uniqueItems_1 = uniqueItems;
const const_1 = _const;
const enum_1 = _enum;
const validation = [
  limitNumber_1.default,
  multipleOf_1.default,
  limitLength_1.default,
  pattern_1.default,
  limitProperties_1.default,
  required_1.default,
  limitItems_1.default,
  uniqueItems_1.default,
  { keyword: "type", schemaType: ["string", "array"] },
  { keyword: "nullable", schemaType: "boolean" },
  const_1.default,
  enum_1.default
];
validation$1.default = validation;
var applicator = {};
var additionalItems = {};
Object.defineProperty(additionalItems, "__esModule", { value: true });
additionalItems.validateAdditionalItems = void 0;
const codegen_1$a = codegen;
const util_1$d = util;
const error$8 = {
  message: ({ params: { len } }) => (0, codegen_1$a.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$a._)`{limit: ${len}}`
};
const def$g = {
  keyword: "additionalItems",
  type: "array",
  schemaType: ["boolean", "object"],
  before: "uniqueItems",
  error: error$8,
  code(cxt) {
    const { parentSchema, it } = cxt;
    const { items: items2 } = parentSchema;
    if (!Array.isArray(items2)) {
      (0, util_1$d.checkStrictMode)(it, '"additionalItems" is ignored when "items" is not an array of schemas');
      return;
    }
    validateAdditionalItems(cxt, items2);
  }
};
function validateAdditionalItems(cxt, items2) {
  const { gen, schema, data, keyword: keyword2, it } = cxt;
  it.items = true;
  const len = gen.const("len", (0, codegen_1$a._)`${data}.length`);
  if (schema === false) {
    cxt.setParams({ len: items2.length });
    cxt.pass((0, codegen_1$a._)`${len} <= ${items2.length}`);
  } else if (typeof schema == "object" && !(0, util_1$d.alwaysValidSchema)(it, schema)) {
    const valid2 = gen.var("valid", (0, codegen_1$a._)`${len} <= ${items2.length}`);
    gen.if((0, codegen_1$a.not)(valid2), () => validateItems(valid2));
    cxt.ok(valid2);
  }
  function validateItems(valid2) {
    gen.forRange("i", items2.length, len, (i) => {
      cxt.subschema({ keyword: keyword2, dataProp: i, dataPropType: util_1$d.Type.Num }, valid2);
      if (!it.allErrors)
        gen.if((0, codegen_1$a.not)(valid2), () => gen.break());
    });
  }
}
additionalItems.validateAdditionalItems = validateAdditionalItems;
additionalItems.default = def$g;
var prefixItems = {};
var items = {};
Object.defineProperty(items, "__esModule", { value: true });
items.validateTuple = void 0;
const codegen_1$9 = codegen;
const util_1$c = util;
const code_1$5 = code;
const def$f = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "array", "boolean"],
  before: "uniqueItems",
  code(cxt) {
    const { schema, it } = cxt;
    if (Array.isArray(schema))
      return validateTuple(cxt, "additionalItems", schema);
    it.items = true;
    if ((0, util_1$c.alwaysValidSchema)(it, schema))
      return;
    cxt.ok((0, code_1$5.validateArray)(cxt));
  }
};
function validateTuple(cxt, extraItems, schArr = cxt.schema) {
  const { gen, parentSchema, data, keyword: keyword2, it } = cxt;
  checkStrictTuple(parentSchema);
  if (it.opts.unevaluated && schArr.length && it.items !== true) {
    it.items = util_1$c.mergeEvaluated.items(gen, schArr.length, it.items);
  }
  const valid2 = gen.name("valid");
  const len = gen.const("len", (0, codegen_1$9._)`${data}.length`);
  schArr.forEach((sch, i) => {
    if ((0, util_1$c.alwaysValidSchema)(it, sch))
      return;
    gen.if((0, codegen_1$9._)`${len} > ${i}`, () => cxt.subschema({
      keyword: keyword2,
      schemaProp: i,
      dataProp: i
    }, valid2));
    cxt.ok(valid2);
  });
  function checkStrictTuple(sch) {
    const { opts: opts2, errSchemaPath } = it;
    const l = schArr.length;
    const fullTuple = l === sch.minItems && (l === sch.maxItems || sch[extraItems] === false);
    if (opts2.strictTuples && !fullTuple) {
      const msg = `"${keyword2}" is ${l}-tuple, but minItems or maxItems/${extraItems} are not specified or different at path "${errSchemaPath}"`;
      (0, util_1$c.checkStrictMode)(it, msg, opts2.strictTuples);
    }
  }
}
items.validateTuple = validateTuple;
items.default = def$f;
Object.defineProperty(prefixItems, "__esModule", { value: true });
const items_1$1 = items;
const def$e = {
  keyword: "prefixItems",
  type: "array",
  schemaType: ["array"],
  before: "uniqueItems",
  code: (cxt) => (0, items_1$1.validateTuple)(cxt, "items")
};
prefixItems.default = def$e;
var items2020 = {};
Object.defineProperty(items2020, "__esModule", { value: true });
const codegen_1$8 = codegen;
const util_1$b = util;
const code_1$4 = code;
const additionalItems_1$1 = additionalItems;
const error$7 = {
  message: ({ params: { len } }) => (0, codegen_1$8.str)`must NOT have more than ${len} items`,
  params: ({ params: { len } }) => (0, codegen_1$8._)`{limit: ${len}}`
};
const def$d = {
  keyword: "items",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  error: error$7,
  code(cxt) {
    const { schema, parentSchema, it } = cxt;
    const { prefixItems: prefixItems2 } = parentSchema;
    it.items = true;
    if ((0, util_1$b.alwaysValidSchema)(it, schema))
      return;
    if (prefixItems2)
      (0, additionalItems_1$1.validateAdditionalItems)(cxt, prefixItems2);
    else
      cxt.ok((0, code_1$4.validateArray)(cxt));
  }
};
items2020.default = def$d;
var contains = {};
Object.defineProperty(contains, "__esModule", { value: true });
const codegen_1$7 = codegen;
const util_1$a = util;
const error$6 = {
  message: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7.str)`must contain at least ${min} valid item(s)` : (0, codegen_1$7.str)`must contain at least ${min} and no more than ${max} valid item(s)`,
  params: ({ params: { min, max } }) => max === void 0 ? (0, codegen_1$7._)`{minContains: ${min}}` : (0, codegen_1$7._)`{minContains: ${min}, maxContains: ${max}}`
};
const def$c = {
  keyword: "contains",
  type: "array",
  schemaType: ["object", "boolean"],
  before: "uniqueItems",
  trackErrors: true,
  error: error$6,
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    let min;
    let max;
    const { minContains, maxContains } = parentSchema;
    if (it.opts.next) {
      min = minContains === void 0 ? 1 : minContains;
      max = maxContains;
    } else {
      min = 1;
    }
    const len = gen.const("len", (0, codegen_1$7._)`${data}.length`);
    cxt.setParams({ min, max });
    if (max === void 0 && min === 0) {
      (0, util_1$a.checkStrictMode)(it, `"minContains" == 0 without "maxContains": "contains" keyword ignored`);
      return;
    }
    if (max !== void 0 && min > max) {
      (0, util_1$a.checkStrictMode)(it, `"minContains" > "maxContains" is always invalid`);
      cxt.fail();
      return;
    }
    if ((0, util_1$a.alwaysValidSchema)(it, schema)) {
      let cond = (0, codegen_1$7._)`${len} >= ${min}`;
      if (max !== void 0)
        cond = (0, codegen_1$7._)`${cond} && ${len} <= ${max}`;
      cxt.pass(cond);
      return;
    }
    it.items = true;
    const valid2 = gen.name("valid");
    if (max === void 0 && min === 1) {
      validateItems(valid2, () => gen.if(valid2, () => gen.break()));
    } else if (min === 0) {
      gen.let(valid2, true);
      if (max !== void 0)
        gen.if((0, codegen_1$7._)`${data}.length > 0`, validateItemsWithCount);
    } else {
      gen.let(valid2, false);
      validateItemsWithCount();
    }
    cxt.result(valid2, () => cxt.reset());
    function validateItemsWithCount() {
      const schValid = gen.name("_valid");
      const count = gen.let("count", 0);
      validateItems(schValid, () => gen.if(schValid, () => checkLimits(count)));
    }
    function validateItems(_valid, block) {
      gen.forRange("i", 0, len, (i) => {
        cxt.subschema({
          keyword: "contains",
          dataProp: i,
          dataPropType: util_1$a.Type.Num,
          compositeRule: true
        }, _valid);
        block();
      });
    }
    function checkLimits(count) {
      gen.code((0, codegen_1$7._)`${count}++`);
      if (max === void 0) {
        gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid2, true).break());
      } else {
        gen.if((0, codegen_1$7._)`${count} > ${max}`, () => gen.assign(valid2, false).break());
        if (min === 1)
          gen.assign(valid2, true);
        else
          gen.if((0, codegen_1$7._)`${count} >= ${min}`, () => gen.assign(valid2, true));
      }
    }
  }
};
contains.default = def$c;
var dependencies = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.validateSchemaDeps = exports.validatePropertyDeps = exports.error = void 0;
  const codegen_12 = codegen;
  const util_12 = util;
  const code_12 = code;
  exports.error = {
    message: ({ params: { property, depsCount, deps } }) => {
      const property_ies = depsCount === 1 ? "property" : "properties";
      return (0, codegen_12.str)`must have ${property_ies} ${deps} when property ${property} is present`;
    },
    params: ({ params: { property, depsCount, deps, missingProperty } }) => (0, codegen_12._)`{property: ${property},
    missingProperty: ${missingProperty},
    depsCount: ${depsCount},
    deps: ${deps}}`
  };
  const def2 = {
    keyword: "dependencies",
    type: "object",
    schemaType: "object",
    error: exports.error,
    code(cxt) {
      const [propDeps, schDeps] = splitDependencies(cxt);
      validatePropertyDeps(cxt, propDeps);
      validateSchemaDeps(cxt, schDeps);
    }
  };
  function splitDependencies({ schema }) {
    const propertyDeps = {};
    const schemaDeps = {};
    for (const key in schema) {
      if (key === "__proto__")
        continue;
      const deps = Array.isArray(schema[key]) ? propertyDeps : schemaDeps;
      deps[key] = schema[key];
    }
    return [propertyDeps, schemaDeps];
  }
  function validatePropertyDeps(cxt, propertyDeps = cxt.schema) {
    const { gen, data, it } = cxt;
    if (Object.keys(propertyDeps).length === 0)
      return;
    const missing = gen.let("missing");
    for (const prop in propertyDeps) {
      const deps = propertyDeps[prop];
      if (deps.length === 0)
        continue;
      const hasProperty = (0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties);
      cxt.setParams({
        property: prop,
        depsCount: deps.length,
        deps: deps.join(", ")
      });
      if (it.allErrors) {
        gen.if(hasProperty, () => {
          for (const depProp of deps) {
            (0, code_12.checkReportMissingProp)(cxt, depProp);
          }
        });
      } else {
        gen.if((0, codegen_12._)`${hasProperty} && (${(0, code_12.checkMissingProp)(cxt, deps, missing)})`);
        (0, code_12.reportMissingProp)(cxt, missing);
        gen.else();
      }
    }
  }
  exports.validatePropertyDeps = validatePropertyDeps;
  function validateSchemaDeps(cxt, schemaDeps = cxt.schema) {
    const { gen, data, keyword: keyword2, it } = cxt;
    const valid2 = gen.name("valid");
    for (const prop in schemaDeps) {
      if ((0, util_12.alwaysValidSchema)(it, schemaDeps[prop]))
        continue;
      gen.if((0, code_12.propertyInData)(gen, data, prop, it.opts.ownProperties), () => {
        const schCxt = cxt.subschema({ keyword: keyword2, schemaProp: prop }, valid2);
        cxt.mergeValidEvaluated(schCxt, valid2);
      }, () => gen.var(valid2, true));
      cxt.ok(valid2);
    }
  }
  exports.validateSchemaDeps = validateSchemaDeps;
  exports.default = def2;
})(dependencies);
var propertyNames = {};
Object.defineProperty(propertyNames, "__esModule", { value: true });
const codegen_1$6 = codegen;
const util_1$9 = util;
const error$5 = {
  message: "property name must be valid",
  params: ({ params }) => (0, codegen_1$6._)`{propertyName: ${params.propertyName}}`
};
const def$b = {
  keyword: "propertyNames",
  type: "object",
  schemaType: ["object", "boolean"],
  error: error$5,
  code(cxt) {
    const { gen, schema, data, it } = cxt;
    if ((0, util_1$9.alwaysValidSchema)(it, schema))
      return;
    const valid2 = gen.name("valid");
    gen.forIn("key", data, (key) => {
      cxt.setParams({ propertyName: key });
      cxt.subschema({
        keyword: "propertyNames",
        data: key,
        dataTypes: ["string"],
        propertyName: key,
        compositeRule: true
      }, valid2);
      gen.if((0, codegen_1$6.not)(valid2), () => {
        cxt.error(true);
        if (!it.allErrors)
          gen.break();
      });
    });
    cxt.ok(valid2);
  }
};
propertyNames.default = def$b;
var additionalProperties = {};
Object.defineProperty(additionalProperties, "__esModule", { value: true });
const code_1$3 = code;
const codegen_1$5 = codegen;
const names_1 = names$1;
const util_1$8 = util;
const error$4 = {
  message: "must NOT have additional properties",
  params: ({ params }) => (0, codegen_1$5._)`{additionalProperty: ${params.additionalProperty}}`
};
const def$a = {
  keyword: "additionalProperties",
  type: ["object"],
  schemaType: ["boolean", "object"],
  allowUndefined: true,
  trackErrors: true,
  error: error$4,
  code(cxt) {
    const { gen, schema, parentSchema, data, errsCount, it } = cxt;
    if (!errsCount)
      throw new Error("ajv implementation error");
    const { allErrors, opts: opts2 } = it;
    it.props = true;
    if (opts2.removeAdditional !== "all" && (0, util_1$8.alwaysValidSchema)(it, schema))
      return;
    const props = (0, code_1$3.allSchemaProperties)(parentSchema.properties);
    const patProps = (0, code_1$3.allSchemaProperties)(parentSchema.patternProperties);
    checkAdditionalProperties();
    cxt.ok((0, codegen_1$5._)`${errsCount} === ${names_1.default.errors}`);
    function checkAdditionalProperties() {
      gen.forIn("key", data, (key) => {
        if (!props.length && !patProps.length)
          additionalPropertyCode(key);
        else
          gen.if(isAdditional(key), () => additionalPropertyCode(key));
      });
    }
    function isAdditional(key) {
      let definedProp;
      if (props.length > 8) {
        const propsSchema = (0, util_1$8.schemaRefOrVal)(it, parentSchema.properties, "properties");
        definedProp = (0, code_1$3.isOwnProperty)(gen, propsSchema, key);
      } else if (props.length) {
        definedProp = (0, codegen_1$5.or)(...props.map((p) => (0, codegen_1$5._)`${key} === ${p}`));
      } else {
        definedProp = codegen_1$5.nil;
      }
      if (patProps.length) {
        definedProp = (0, codegen_1$5.or)(definedProp, ...patProps.map((p) => (0, codegen_1$5._)`${(0, code_1$3.usePattern)(cxt, p)}.test(${key})`));
      }
      return (0, codegen_1$5.not)(definedProp);
    }
    function deleteAdditional(key) {
      gen.code((0, codegen_1$5._)`delete ${data}[${key}]`);
    }
    function additionalPropertyCode(key) {
      if (opts2.removeAdditional === "all" || opts2.removeAdditional && schema === false) {
        deleteAdditional(key);
        return;
      }
      if (schema === false) {
        cxt.setParams({ additionalProperty: key });
        cxt.error();
        if (!allErrors)
          gen.break();
        return;
      }
      if (typeof schema == "object" && !(0, util_1$8.alwaysValidSchema)(it, schema)) {
        const valid2 = gen.name("valid");
        if (opts2.removeAdditional === "failing") {
          applyAdditionalSchema(key, valid2, false);
          gen.if((0, codegen_1$5.not)(valid2), () => {
            cxt.reset();
            deleteAdditional(key);
          });
        } else {
          applyAdditionalSchema(key, valid2);
          if (!allErrors)
            gen.if((0, codegen_1$5.not)(valid2), () => gen.break());
        }
      }
    }
    function applyAdditionalSchema(key, valid2, errors2) {
      const subschema2 = {
        keyword: "additionalProperties",
        dataProp: key,
        dataPropType: util_1$8.Type.Str
      };
      if (errors2 === false) {
        Object.assign(subschema2, {
          compositeRule: true,
          createErrors: false,
          allErrors: false
        });
      }
      cxt.subschema(subschema2, valid2);
    }
  }
};
additionalProperties.default = def$a;
var properties$1 = {};
Object.defineProperty(properties$1, "__esModule", { value: true });
const validate_1 = validate;
const code_1$2 = code;
const util_1$7 = util;
const additionalProperties_1$1 = additionalProperties;
const def$9 = {
  keyword: "properties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, parentSchema, data, it } = cxt;
    if (it.opts.removeAdditional === "all" && parentSchema.additionalProperties === void 0) {
      additionalProperties_1$1.default.code(new validate_1.KeywordCxt(it, additionalProperties_1$1.default, "additionalProperties"));
    }
    const allProps = (0, code_1$2.allSchemaProperties)(schema);
    for (const prop of allProps) {
      it.definedProperties.add(prop);
    }
    if (it.opts.unevaluated && allProps.length && it.props !== true) {
      it.props = util_1$7.mergeEvaluated.props(gen, (0, util_1$7.toHash)(allProps), it.props);
    }
    const properties2 = allProps.filter((p) => !(0, util_1$7.alwaysValidSchema)(it, schema[p]));
    if (properties2.length === 0)
      return;
    const valid2 = gen.name("valid");
    for (const prop of properties2) {
      if (hasDefault(prop)) {
        applyPropertySchema(prop);
      } else {
        gen.if((0, code_1$2.propertyInData)(gen, data, prop, it.opts.ownProperties));
        applyPropertySchema(prop);
        if (!it.allErrors)
          gen.else().var(valid2, true);
        gen.endIf();
      }
      cxt.it.definedProperties.add(prop);
      cxt.ok(valid2);
    }
    function hasDefault(prop) {
      return it.opts.useDefaults && !it.compositeRule && schema[prop].default !== void 0;
    }
    function applyPropertySchema(prop) {
      cxt.subschema({
        keyword: "properties",
        schemaProp: prop,
        dataProp: prop
      }, valid2);
    }
  }
};
properties$1.default = def$9;
var patternProperties = {};
Object.defineProperty(patternProperties, "__esModule", { value: true });
const code_1$1 = code;
const codegen_1$4 = codegen;
const util_1$6 = util;
const util_2 = util;
const def$8 = {
  keyword: "patternProperties",
  type: "object",
  schemaType: "object",
  code(cxt) {
    const { gen, schema, data, parentSchema, it } = cxt;
    const { opts: opts2 } = it;
    const patterns = (0, code_1$1.allSchemaProperties)(schema);
    const alwaysValidPatterns = patterns.filter((p) => (0, util_1$6.alwaysValidSchema)(it, schema[p]));
    if (patterns.length === 0 || alwaysValidPatterns.length === patterns.length && (!it.opts.unevaluated || it.props === true)) {
      return;
    }
    const checkProperties = opts2.strictSchema && !opts2.allowMatchingProperties && parentSchema.properties;
    const valid2 = gen.name("valid");
    if (it.props !== true && !(it.props instanceof codegen_1$4.Name)) {
      it.props = (0, util_2.evaluatedPropsToName)(gen, it.props);
    }
    const { props } = it;
    validatePatternProperties();
    function validatePatternProperties() {
      for (const pat of patterns) {
        if (checkProperties)
          checkMatchingProperties(pat);
        if (it.allErrors) {
          validateProperties(pat);
        } else {
          gen.var(valid2, true);
          validateProperties(pat);
          gen.if(valid2);
        }
      }
    }
    function checkMatchingProperties(pat) {
      for (const prop in checkProperties) {
        if (new RegExp(pat).test(prop)) {
          (0, util_1$6.checkStrictMode)(it, `property ${prop} matches pattern ${pat} (use allowMatchingProperties)`);
        }
      }
    }
    function validateProperties(pat) {
      gen.forIn("key", data, (key) => {
        gen.if((0, codegen_1$4._)`${(0, code_1$1.usePattern)(cxt, pat)}.test(${key})`, () => {
          const alwaysValid = alwaysValidPatterns.includes(pat);
          if (!alwaysValid) {
            cxt.subschema({
              keyword: "patternProperties",
              schemaProp: pat,
              dataProp: key,
              dataPropType: util_2.Type.Str
            }, valid2);
          }
          if (it.opts.unevaluated && props !== true) {
            gen.assign((0, codegen_1$4._)`${props}[${key}]`, true);
          } else if (!alwaysValid && !it.allErrors) {
            gen.if((0, codegen_1$4.not)(valid2), () => gen.break());
          }
        });
      });
    }
  }
};
patternProperties.default = def$8;
var not = {};
Object.defineProperty(not, "__esModule", { value: true });
const util_1$5 = util;
const def$7 = {
  keyword: "not",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  code(cxt) {
    const { gen, schema, it } = cxt;
    if ((0, util_1$5.alwaysValidSchema)(it, schema)) {
      cxt.fail();
      return;
    }
    const valid2 = gen.name("valid");
    cxt.subschema({
      keyword: "not",
      compositeRule: true,
      createErrors: false,
      allErrors: false
    }, valid2);
    cxt.failResult(valid2, () => cxt.reset(), () => cxt.error());
  },
  error: { message: "must NOT be valid" }
};
not.default = def$7;
var anyOf = {};
Object.defineProperty(anyOf, "__esModule", { value: true });
const code_1 = code;
const def$6 = {
  keyword: "anyOf",
  schemaType: "array",
  trackErrors: true,
  code: code_1.validateUnion,
  error: { message: "must match a schema in anyOf" }
};
anyOf.default = def$6;
var oneOf = {};
Object.defineProperty(oneOf, "__esModule", { value: true });
const codegen_1$3 = codegen;
const util_1$4 = util;
const error$3 = {
  message: "must match exactly one schema in oneOf",
  params: ({ params }) => (0, codegen_1$3._)`{passingSchemas: ${params.passing}}`
};
const def$5 = {
  keyword: "oneOf",
  schemaType: "array",
  trackErrors: true,
  error: error$3,
  code(cxt) {
    const { gen, schema, parentSchema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    if (it.opts.discriminator && parentSchema.discriminator)
      return;
    const schArr = schema;
    const valid2 = gen.let("valid", false);
    const passing = gen.let("passing", null);
    const schValid = gen.name("_valid");
    cxt.setParams({ passing });
    gen.block(validateOneOf);
    cxt.result(valid2, () => cxt.reset(), () => cxt.error(true));
    function validateOneOf() {
      schArr.forEach((sch, i) => {
        let schCxt;
        if ((0, util_1$4.alwaysValidSchema)(it, sch)) {
          gen.var(schValid, true);
        } else {
          schCxt = cxt.subschema({
            keyword: "oneOf",
            schemaProp: i,
            compositeRule: true
          }, schValid);
        }
        if (i > 0) {
          gen.if((0, codegen_1$3._)`${schValid} && ${valid2}`).assign(valid2, false).assign(passing, (0, codegen_1$3._)`[${passing}, ${i}]`).else();
        }
        gen.if(schValid, () => {
          gen.assign(valid2, true);
          gen.assign(passing, i);
          if (schCxt)
            cxt.mergeEvaluated(schCxt, codegen_1$3.Name);
        });
      });
    }
  }
};
oneOf.default = def$5;
var allOf = {};
Object.defineProperty(allOf, "__esModule", { value: true });
const util_1$3 = util;
const def$4 = {
  keyword: "allOf",
  schemaType: "array",
  code(cxt) {
    const { gen, schema, it } = cxt;
    if (!Array.isArray(schema))
      throw new Error("ajv implementation error");
    const valid2 = gen.name("valid");
    schema.forEach((sch, i) => {
      if ((0, util_1$3.alwaysValidSchema)(it, sch))
        return;
      const schCxt = cxt.subschema({ keyword: "allOf", schemaProp: i }, valid2);
      cxt.ok(valid2);
      cxt.mergeEvaluated(schCxt);
    });
  }
};
allOf.default = def$4;
var _if = {};
Object.defineProperty(_if, "__esModule", { value: true });
const codegen_1$2 = codegen;
const util_1$2 = util;
const error$2 = {
  message: ({ params }) => (0, codegen_1$2.str)`must match "${params.ifClause}" schema`,
  params: ({ params }) => (0, codegen_1$2._)`{failingKeyword: ${params.ifClause}}`
};
const def$3 = {
  keyword: "if",
  schemaType: ["object", "boolean"],
  trackErrors: true,
  error: error$2,
  code(cxt) {
    const { gen, parentSchema, it } = cxt;
    if (parentSchema.then === void 0 && parentSchema.else === void 0) {
      (0, util_1$2.checkStrictMode)(it, '"if" without "then" and "else" is ignored');
    }
    const hasThen = hasSchema(it, "then");
    const hasElse = hasSchema(it, "else");
    if (!hasThen && !hasElse)
      return;
    const valid2 = gen.let("valid", true);
    const schValid = gen.name("_valid");
    validateIf();
    cxt.reset();
    if (hasThen && hasElse) {
      const ifClause = gen.let("ifClause");
      cxt.setParams({ ifClause });
      gen.if(schValid, validateClause("then", ifClause), validateClause("else", ifClause));
    } else if (hasThen) {
      gen.if(schValid, validateClause("then"));
    } else {
      gen.if((0, codegen_1$2.not)(schValid), validateClause("else"));
    }
    cxt.pass(valid2, () => cxt.error(true));
    function validateIf() {
      const schCxt = cxt.subschema({
        keyword: "if",
        compositeRule: true,
        createErrors: false,
        allErrors: false
      }, schValid);
      cxt.mergeEvaluated(schCxt);
    }
    function validateClause(keyword2, ifClause) {
      return () => {
        const schCxt = cxt.subschema({ keyword: keyword2 }, schValid);
        gen.assign(valid2, schValid);
        cxt.mergeValidEvaluated(schCxt, valid2);
        if (ifClause)
          gen.assign(ifClause, (0, codegen_1$2._)`${keyword2}`);
        else
          cxt.setParams({ ifClause: keyword2 });
      };
    }
  }
};
function hasSchema(it, keyword2) {
  const schema = it.schema[keyword2];
  return schema !== void 0 && !(0, util_1$2.alwaysValidSchema)(it, schema);
}
_if.default = def$3;
var thenElse = {};
Object.defineProperty(thenElse, "__esModule", { value: true });
const util_1$1 = util;
const def$2 = {
  keyword: ["then", "else"],
  schemaType: ["object", "boolean"],
  code({ keyword: keyword2, parentSchema, it }) {
    if (parentSchema.if === void 0)
      (0, util_1$1.checkStrictMode)(it, `"${keyword2}" without "if" is ignored`);
  }
};
thenElse.default = def$2;
Object.defineProperty(applicator, "__esModule", { value: true });
const additionalItems_1 = additionalItems;
const prefixItems_1 = prefixItems;
const items_1 = items;
const items2020_1 = items2020;
const contains_1 = contains;
const dependencies_1 = dependencies;
const propertyNames_1 = propertyNames;
const additionalProperties_1 = additionalProperties;
const properties_1 = properties$1;
const patternProperties_1 = patternProperties;
const not_1 = not;
const anyOf_1 = anyOf;
const oneOf_1 = oneOf;
const allOf_1 = allOf;
const if_1 = _if;
const thenElse_1 = thenElse;
function getApplicator(draft2020 = false) {
  const applicator2 = [
    not_1.default,
    anyOf_1.default,
    oneOf_1.default,
    allOf_1.default,
    if_1.default,
    thenElse_1.default,
    propertyNames_1.default,
    additionalProperties_1.default,
    dependencies_1.default,
    properties_1.default,
    patternProperties_1.default
  ];
  if (draft2020)
    applicator2.push(prefixItems_1.default, items2020_1.default);
  else
    applicator2.push(additionalItems_1.default, items_1.default);
  applicator2.push(contains_1.default);
  return applicator2;
}
applicator.default = getApplicator;
var format$2 = {};
var format$1 = {};
Object.defineProperty(format$1, "__esModule", { value: true });
const codegen_1$1 = codegen;
const error$1 = {
  message: ({ schemaCode }) => (0, codegen_1$1.str)`must match format "${schemaCode}"`,
  params: ({ schemaCode }) => (0, codegen_1$1._)`{format: ${schemaCode}}`
};
const def$1 = {
  keyword: "format",
  type: ["number", "string"],
  schemaType: "string",
  $data: true,
  error: error$1,
  code(cxt, ruleType) {
    const { gen, data, $data, schema, schemaCode, it } = cxt;
    const { opts: opts2, errSchemaPath, schemaEnv, self: self2 } = it;
    if (!opts2.validateFormats)
      return;
    if ($data)
      validate$DataFormat();
    else
      validateFormat();
    function validate$DataFormat() {
      const fmts = gen.scopeValue("formats", {
        ref: self2.formats,
        code: opts2.code.formats
      });
      const fDef = gen.const("fDef", (0, codegen_1$1._)`${fmts}[${schemaCode}]`);
      const fType = gen.let("fType");
      const format2 = gen.let("format");
      gen.if((0, codegen_1$1._)`typeof ${fDef} == "object" && !(${fDef} instanceof RegExp)`, () => gen.assign(fType, (0, codegen_1$1._)`${fDef}.type || "string"`).assign(format2, (0, codegen_1$1._)`${fDef}.validate`), () => gen.assign(fType, (0, codegen_1$1._)`"string"`).assign(format2, fDef));
      cxt.fail$data((0, codegen_1$1.or)(unknownFmt(), invalidFmt()));
      function unknownFmt() {
        if (opts2.strictSchema === false)
          return codegen_1$1.nil;
        return (0, codegen_1$1._)`${schemaCode} && !${format2}`;
      }
      function invalidFmt() {
        const callFormat = schemaEnv.$async ? (0, codegen_1$1._)`(${fDef}.async ? await ${format2}(${data}) : ${format2}(${data}))` : (0, codegen_1$1._)`${format2}(${data})`;
        const validData = (0, codegen_1$1._)`(typeof ${format2} == "function" ? ${callFormat} : ${format2}.test(${data}))`;
        return (0, codegen_1$1._)`${format2} && ${format2} !== true && ${fType} === ${ruleType} && !${validData}`;
      }
    }
    function validateFormat() {
      const formatDef = self2.formats[schema];
      if (!formatDef) {
        unknownFormat();
        return;
      }
      if (formatDef === true)
        return;
      const [fmtType, format2, fmtRef] = getFormat(formatDef);
      if (fmtType === ruleType)
        cxt.pass(validCondition());
      function unknownFormat() {
        if (opts2.strictSchema === false) {
          self2.logger.warn(unknownMsg());
          return;
        }
        throw new Error(unknownMsg());
        function unknownMsg() {
          return `unknown format "${schema}" ignored in schema at path "${errSchemaPath}"`;
        }
      }
      function getFormat(fmtDef) {
        const code2 = fmtDef instanceof RegExp ? (0, codegen_1$1.regexpCode)(fmtDef) : opts2.code.formats ? (0, codegen_1$1._)`${opts2.code.formats}${(0, codegen_1$1.getProperty)(schema)}` : void 0;
        const fmt = gen.scopeValue("formats", { key: schema, ref: fmtDef, code: code2 });
        if (typeof fmtDef == "object" && !(fmtDef instanceof RegExp)) {
          return [fmtDef.type || "string", fmtDef.validate, (0, codegen_1$1._)`${fmt}.validate`];
        }
        return ["string", fmtDef, fmt];
      }
      function validCondition() {
        if (typeof formatDef == "object" && !(formatDef instanceof RegExp) && formatDef.async) {
          if (!schemaEnv.$async)
            throw new Error("async format in sync schema");
          return (0, codegen_1$1._)`await ${fmtRef}(${data})`;
        }
        return typeof format2 == "function" ? (0, codegen_1$1._)`${fmtRef}(${data})` : (0, codegen_1$1._)`${fmtRef}.test(${data})`;
      }
    }
  }
};
format$1.default = def$1;
Object.defineProperty(format$2, "__esModule", { value: true });
const format_1$1 = format$1;
const format = [format_1$1.default];
format$2.default = format;
var metadata = {};
Object.defineProperty(metadata, "__esModule", { value: true });
metadata.contentVocabulary = metadata.metadataVocabulary = void 0;
metadata.metadataVocabulary = [
  "title",
  "description",
  "default",
  "deprecated",
  "readOnly",
  "writeOnly",
  "examples"
];
metadata.contentVocabulary = [
  "contentMediaType",
  "contentEncoding",
  "contentSchema"
];
Object.defineProperty(draft7, "__esModule", { value: true });
const core_1 = core$1;
const validation_1 = validation$1;
const applicator_1 = applicator;
const format_1 = format$2;
const metadata_1 = metadata;
const draft7Vocabularies = [
  core_1.default,
  validation_1.default,
  (0, applicator_1.default)(),
  format_1.default,
  metadata_1.metadataVocabulary,
  metadata_1.contentVocabulary
];
draft7.default = draft7Vocabularies;
var discriminator = {};
var types = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.DiscrError = void 0;
  (function(DiscrError) {
    DiscrError["Tag"] = "tag";
    DiscrError["Mapping"] = "mapping";
  })(exports.DiscrError || (exports.DiscrError = {}));
})(types);
Object.defineProperty(discriminator, "__esModule", { value: true });
const codegen_1 = codegen;
const types_1 = types;
const compile_1 = compile;
const util_1 = util;
const error = {
  message: ({ params: { discrError, tagName } }) => discrError === types_1.DiscrError.Tag ? `tag "${tagName}" must be string` : `value of tag "${tagName}" must be in oneOf`,
  params: ({ params: { discrError, tag, tagName } }) => (0, codegen_1._)`{error: ${discrError}, tag: ${tagName}, tagValue: ${tag}}`
};
const def = {
  keyword: "discriminator",
  type: "object",
  schemaType: "object",
  error,
  code(cxt) {
    const { gen, data, schema, parentSchema, it } = cxt;
    const { oneOf: oneOf2 } = parentSchema;
    if (!it.opts.discriminator) {
      throw new Error("discriminator: requires discriminator option");
    }
    const tagName = schema.propertyName;
    if (typeof tagName != "string")
      throw new Error("discriminator: requires propertyName");
    if (schema.mapping)
      throw new Error("discriminator: mapping is not supported");
    if (!oneOf2)
      throw new Error("discriminator: requires oneOf keyword");
    const valid2 = gen.let("valid", false);
    const tag = gen.const("tag", (0, codegen_1._)`${data}${(0, codegen_1.getProperty)(tagName)}`);
    gen.if((0, codegen_1._)`typeof ${tag} == "string"`, () => validateMapping(), () => cxt.error(false, { discrError: types_1.DiscrError.Tag, tag, tagName }));
    cxt.ok(valid2);
    function validateMapping() {
      const mapping = getMapping();
      gen.if(false);
      for (const tagValue in mapping) {
        gen.elseIf((0, codegen_1._)`${tag} === ${tagValue}`);
        gen.assign(valid2, applyTagSchema(mapping[tagValue]));
      }
      gen.else();
      cxt.error(false, { discrError: types_1.DiscrError.Mapping, tag, tagName });
      gen.endIf();
    }
    function applyTagSchema(schemaProp) {
      const _valid = gen.name("valid");
      const schCxt = cxt.subschema({ keyword: "oneOf", schemaProp }, _valid);
      cxt.mergeEvaluated(schCxt, codegen_1.Name);
      return _valid;
    }
    function getMapping() {
      var _a;
      const oneOfMapping = {};
      const topRequired = hasRequired(parentSchema);
      let tagRequired = true;
      for (let i = 0; i < oneOf2.length; i++) {
        let sch = oneOf2[i];
        if ((sch === null || sch === void 0 ? void 0 : sch.$ref) && !(0, util_1.schemaHasRulesButRef)(sch, it.self.RULES)) {
          sch = compile_1.resolveRef.call(it.self, it.schemaEnv, it.baseId, sch === null || sch === void 0 ? void 0 : sch.$ref);
          if (sch instanceof compile_1.SchemaEnv)
            sch = sch.schema;
        }
        const propSch = (_a = sch === null || sch === void 0 ? void 0 : sch.properties) === null || _a === void 0 ? void 0 : _a[tagName];
        if (typeof propSch != "object") {
          throw new Error(`discriminator: oneOf subschemas (or referenced schemas) must have "properties/${tagName}"`);
        }
        tagRequired = tagRequired && (topRequired || hasRequired(sch));
        addMappings(propSch, i);
      }
      if (!tagRequired)
        throw new Error(`discriminator: "${tagName}" must be required`);
      return oneOfMapping;
      function hasRequired({ required: required2 }) {
        return Array.isArray(required2) && required2.includes(tagName);
      }
      function addMappings(sch, i) {
        if (sch.const) {
          addMapping(sch.const, i);
        } else if (sch.enum) {
          for (const tagValue of sch.enum) {
            addMapping(tagValue, i);
          }
        } else {
          throw new Error(`discriminator: "properties/${tagName}" must have "const" or "enum"`);
        }
      }
      function addMapping(tagValue, i) {
        if (typeof tagValue != "string" || tagValue in oneOfMapping) {
          throw new Error(`discriminator: "${tagName}" values must be unique strings`);
        }
        oneOfMapping[tagValue] = i;
      }
    }
  }
};
discriminator.default = def;
const $schema = "http://json-schema.org/draft-07/schema#";
const $id = "http://json-schema.org/draft-07/schema#";
const title = "Core schema meta-schema";
const definitions = {
  schemaArray: {
    type: "array",
    minItems: 1,
    items: {
      $ref: "#"
    }
  },
  nonNegativeInteger: {
    type: "integer",
    minimum: 0
  },
  nonNegativeIntegerDefault0: {
    allOf: [
      {
        $ref: "#/definitions/nonNegativeInteger"
      },
      {
        "default": 0
      }
    ]
  },
  simpleTypes: {
    "enum": [
      "array",
      "boolean",
      "integer",
      "null",
      "number",
      "object",
      "string"
    ]
  },
  stringArray: {
    type: "array",
    items: {
      type: "string"
    },
    uniqueItems: true,
    "default": []
  }
};
const type = [
  "object",
  "boolean"
];
const properties = {
  $id: {
    type: "string",
    format: "uri-reference"
  },
  $schema: {
    type: "string",
    format: "uri"
  },
  $ref: {
    type: "string",
    format: "uri-reference"
  },
  $comment: {
    type: "string"
  },
  title: {
    type: "string"
  },
  description: {
    type: "string"
  },
  "default": true,
  readOnly: {
    type: "boolean",
    "default": false
  },
  examples: {
    type: "array",
    items: true
  },
  multipleOf: {
    type: "number",
    exclusiveMinimum: 0
  },
  maximum: {
    type: "number"
  },
  exclusiveMaximum: {
    type: "number"
  },
  minimum: {
    type: "number"
  },
  exclusiveMinimum: {
    type: "number"
  },
  maxLength: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minLength: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  pattern: {
    type: "string",
    format: "regex"
  },
  additionalItems: {
    $ref: "#"
  },
  items: {
    anyOf: [
      {
        $ref: "#"
      },
      {
        $ref: "#/definitions/schemaArray"
      }
    ],
    "default": true
  },
  maxItems: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minItems: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  uniqueItems: {
    type: "boolean",
    "default": false
  },
  contains: {
    $ref: "#"
  },
  maxProperties: {
    $ref: "#/definitions/nonNegativeInteger"
  },
  minProperties: {
    $ref: "#/definitions/nonNegativeIntegerDefault0"
  },
  required: {
    $ref: "#/definitions/stringArray"
  },
  additionalProperties: {
    $ref: "#"
  },
  definitions: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  properties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    "default": {}
  },
  patternProperties: {
    type: "object",
    additionalProperties: {
      $ref: "#"
    },
    propertyNames: {
      format: "regex"
    },
    "default": {}
  },
  dependencies: {
    type: "object",
    additionalProperties: {
      anyOf: [
        {
          $ref: "#"
        },
        {
          $ref: "#/definitions/stringArray"
        }
      ]
    }
  },
  propertyNames: {
    $ref: "#"
  },
  "const": true,
  "enum": {
    type: "array",
    items: true,
    minItems: 1,
    uniqueItems: true
  },
  type: {
    anyOf: [
      {
        $ref: "#/definitions/simpleTypes"
      },
      {
        type: "array",
        items: {
          $ref: "#/definitions/simpleTypes"
        },
        minItems: 1,
        uniqueItems: true
      }
    ]
  },
  format: {
    type: "string"
  },
  contentMediaType: {
    type: "string"
  },
  contentEncoding: {
    type: "string"
  },
  "if": {
    $ref: "#"
  },
  then: {
    $ref: "#"
  },
  "else": {
    $ref: "#"
  },
  allOf: {
    $ref: "#/definitions/schemaArray"
  },
  anyOf: {
    $ref: "#/definitions/schemaArray"
  },
  oneOf: {
    $ref: "#/definitions/schemaArray"
  },
  not: {
    $ref: "#"
  }
};
var require$$3 = {
  $schema,
  $id,
  title,
  definitions,
  type,
  properties,
  "default": true
};
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.CodeGen = exports.Name = exports.nil = exports.stringify = exports.str = exports._ = exports.KeywordCxt = void 0;
  const core_12 = core$2;
  const draft7_1 = draft7;
  const discriminator_1 = discriminator;
  const draft7MetaSchema = require$$3;
  const META_SUPPORT_DATA = ["/properties"];
  const META_SCHEMA_ID = "http://json-schema.org/draft-07/schema";
  class Ajv extends core_12.default {
    _addVocabularies() {
      super._addVocabularies();
      draft7_1.default.forEach((v) => this.addVocabulary(v));
      if (this.opts.discriminator)
        this.addKeyword(discriminator_1.default);
    }
    _addDefaultMetaSchema() {
      super._addDefaultMetaSchema();
      if (!this.opts.meta)
        return;
      const metaSchema = this.opts.$data ? this.$dataMetaSchema(draft7MetaSchema, META_SUPPORT_DATA) : draft7MetaSchema;
      this.addMetaSchema(metaSchema, META_SCHEMA_ID, false);
      this.refs["http://json-schema.org/schema"] = META_SCHEMA_ID;
    }
    defaultMeta() {
      return this.opts.defaultMeta = super.defaultMeta() || (this.getSchema(META_SCHEMA_ID) ? META_SCHEMA_ID : void 0);
    }
  }
  module.exports = exports = Ajv;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = Ajv;
  var validate_12 = validate;
  Object.defineProperty(exports, "KeywordCxt", { enumerable: true, get: function() {
    return validate_12.KeywordCxt;
  } });
  var codegen_12 = codegen;
  Object.defineProperty(exports, "_", { enumerable: true, get: function() {
    return codegen_12._;
  } });
  Object.defineProperty(exports, "str", { enumerable: true, get: function() {
    return codegen_12.str;
  } });
  Object.defineProperty(exports, "stringify", { enumerable: true, get: function() {
    return codegen_12.stringify;
  } });
  Object.defineProperty(exports, "nil", { enumerable: true, get: function() {
    return codegen_12.nil;
  } });
  Object.defineProperty(exports, "Name", { enumerable: true, get: function() {
    return codegen_12.Name;
  } });
  Object.defineProperty(exports, "CodeGen", { enumerable: true, get: function() {
    return codegen_12.CodeGen;
  } });
})(ajv, ajv.exports);
var dist$2 = { exports: {} };
var formats = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.formatNames = exports.fastFormats = exports.fullFormats = void 0;
  function fmtDef(validate2, compare2) {
    return { validate: validate2, compare: compare2 };
  }
  exports.fullFormats = {
    date: fmtDef(date, compareDate),
    time: fmtDef(time, compareTime),
    "date-time": fmtDef(date_time, compareDateTime),
    duration: /^P(?!$)((\d+Y)?(\d+M)?(\d+D)?(T(?=\d)(\d+H)?(\d+M)?(\d+S)?)?|(\d+W)?)$/,
    uri,
    "uri-reference": /^(?:[a-z][a-z0-9+\-.]*:)?(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'"()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'"()*+,;=:@]|%[0-9a-f]{2})*)*)?(?:\?(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'"()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i,
    "uri-template": /^(?:(?:[^\x00-\x20"'<>%\\^`{|}]|%[0-9a-f]{2})|\{[+#./;?&=,!@|]?(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?(?:,(?:[a-z0-9_]|%[0-9a-f]{2})+(?::[1-9][0-9]{0,3}|\*)?)*\})*$/i,
    url: /^(?:https?|ftp):\/\/(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)(?:\.(?:[a-z0-9\u{00a1}-\u{ffff}]+-)*[a-z0-9\u{00a1}-\u{ffff}]+)*(?:\.(?:[a-z\u{00a1}-\u{ffff}]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/iu,
    email: /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i,
    hostname: /^(?=.{1,253}\.?$)[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[-0-9a-z]{0,61}[0-9a-z])?)*\.?$/i,
    ipv4: /^(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)$/,
    ipv6: /^((([0-9a-f]{1,4}:){7}([0-9a-f]{1,4}|:))|(([0-9a-f]{1,4}:){6}(:[0-9a-f]{1,4}|((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){5}(((:[0-9a-f]{1,4}){1,2})|:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3})|:))|(([0-9a-f]{1,4}:){4}(((:[0-9a-f]{1,4}){1,3})|((:[0-9a-f]{1,4})?:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){3}(((:[0-9a-f]{1,4}){1,4})|((:[0-9a-f]{1,4}){0,2}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){2}(((:[0-9a-f]{1,4}){1,5})|((:[0-9a-f]{1,4}){0,3}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(([0-9a-f]{1,4}:){1}(((:[0-9a-f]{1,4}){1,6})|((:[0-9a-f]{1,4}){0,4}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:))|(:(((:[0-9a-f]{1,4}){1,7})|((:[0-9a-f]{1,4}){0,5}:((25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)(\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)){3}))|:)))$/i,
    regex,
    uuid: /^(?:urn:uuid:)?[0-9a-f]{8}-(?:[0-9a-f]{4}-){3}[0-9a-f]{12}$/i,
    "json-pointer": /^(?:\/(?:[^~/]|~0|~1)*)*$/,
    "json-pointer-uri-fragment": /^#(?:\/(?:[a-z0-9_\-.!$&'()*+,;:=@]|%[0-9a-f]{2}|~0|~1)*)*$/i,
    "relative-json-pointer": /^(?:0|[1-9][0-9]*)(?:#|(?:\/(?:[^~/]|~0|~1)*)*)$/,
    byte,
    int32: { type: "number", validate: validateInt32 },
    int64: { type: "number", validate: validateInt64 },
    float: { type: "number", validate: validateNumber },
    double: { type: "number", validate: validateNumber },
    password: true,
    binary: true
  };
  exports.fastFormats = __spreadProps(__spreadValues({}, exports.fullFormats), {
    date: fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d$/, compareDate),
    time: fmtDef(/^(?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)?$/i, compareTime),
    "date-time": fmtDef(/^\d\d\d\d-[0-1]\d-[0-3]\d[t\s](?:[0-2]\d:[0-5]\d:[0-5]\d|23:59:60)(?:\.\d+)?(?:z|[+-]\d\d(?::?\d\d)?)$/i, compareDateTime),
    uri: /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/)?[^\s]*$/i,
    "uri-reference": /^(?:(?:[a-z][a-z0-9+\-.]*:)?\/?\/)?(?:[^\\\s#][^\s#]*)?(?:#[^\\\s]*)?$/i,
    email: /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?)*$/i
  });
  exports.formatNames = Object.keys(exports.fullFormats);
  function isLeapYear(year) {
    return year % 4 === 0 && (year % 100 !== 0 || year % 400 === 0);
  }
  const DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)$/;
  const DAYS = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  function date(str) {
    const matches = DATE.exec(str);
    if (!matches)
      return false;
    const year = +matches[1];
    const month = +matches[2];
    const day = +matches[3];
    return month >= 1 && month <= 12 && day >= 1 && day <= (month === 2 && isLeapYear(year) ? 29 : DAYS[month]);
  }
  function compareDate(d1, d2) {
    if (!(d1 && d2))
      return void 0;
    if (d1 > d2)
      return 1;
    if (d1 < d2)
      return -1;
    return 0;
  }
  const TIME = /^(\d\d):(\d\d):(\d\d)(\.\d+)?(z|[+-]\d\d(?::?\d\d)?)?$/i;
  function time(str, withTimeZone) {
    const matches = TIME.exec(str);
    if (!matches)
      return false;
    const hour = +matches[1];
    const minute = +matches[2];
    const second = +matches[3];
    const timeZone = matches[5];
    return (hour <= 23 && minute <= 59 && second <= 59 || hour === 23 && minute === 59 && second === 60) && (!withTimeZone || timeZone !== "");
  }
  function compareTime(t1, t2) {
    if (!(t1 && t2))
      return void 0;
    const a1 = TIME.exec(t1);
    const a2 = TIME.exec(t2);
    if (!(a1 && a2))
      return void 0;
    t1 = a1[1] + a1[2] + a1[3] + (a1[4] || "");
    t2 = a2[1] + a2[2] + a2[3] + (a2[4] || "");
    if (t1 > t2)
      return 1;
    if (t1 < t2)
      return -1;
    return 0;
  }
  const DATE_TIME_SEPARATOR = /t|\s/i;
  function date_time(str) {
    const dateTime = str.split(DATE_TIME_SEPARATOR);
    return dateTime.length === 2 && date(dateTime[0]) && time(dateTime[1], true);
  }
  function compareDateTime(dt1, dt2) {
    if (!(dt1 && dt2))
      return void 0;
    const [d1, t1] = dt1.split(DATE_TIME_SEPARATOR);
    const [d2, t2] = dt2.split(DATE_TIME_SEPARATOR);
    const res = compareDate(d1, d2);
    if (res === void 0)
      return void 0;
    return res || compareTime(t1, t2);
  }
  const NOT_URI_FRAGMENT = /\/|:/;
  const URI2 = /^(?:[a-z][a-z0-9+\-.]*:)(?:\/?\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:]|%[0-9a-f]{2})*@)?(?:\[(?:(?:(?:(?:[0-9a-f]{1,4}:){6}|::(?:[0-9a-f]{1,4}:){5}|(?:[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){4}|(?:(?:[0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){3}|(?:(?:[0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::(?:[0-9a-f]{1,4}:){2}|(?:(?:[0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:|(?:(?:[0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::)(?:[0-9a-f]{1,4}:[0-9a-f]{1,4}|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?))|(?:(?:[0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4}|(?:(?:[0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::)|[Vv][0-9a-f]+\.[a-z0-9\-._~!$&'()*+,;=:]+)\]|(?:(?:25[0-5]|2[0-4]\d|[01]?\d\d?)\.){3}(?:25[0-5]|2[0-4]\d|[01]?\d\d?)|(?:[a-z0-9\-._~!$&'()*+,;=]|%[0-9a-f]{2})*)(?::\d*)?(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*|\/(?:(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)?|(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})+(?:\/(?:[a-z0-9\-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*)*)(?:\?(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?(?:#(?:[a-z0-9\-._~!$&'()*+,;=:@/?]|%[0-9a-f]{2})*)?$/i;
  function uri(str) {
    return NOT_URI_FRAGMENT.test(str) && URI2.test(str);
  }
  const BYTE = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/gm;
  function byte(str) {
    BYTE.lastIndex = 0;
    return BYTE.test(str);
  }
  const MIN_INT32 = -(2 ** 31);
  const MAX_INT32 = 2 ** 31 - 1;
  function validateInt32(value) {
    return Number.isInteger(value) && value <= MAX_INT32 && value >= MIN_INT32;
  }
  function validateInt64(value) {
    return Number.isInteger(value);
  }
  function validateNumber() {
    return true;
  }
  const Z_ANCHOR = /[^\\]\\Z/;
  function regex(str) {
    if (Z_ANCHOR.test(str))
      return false;
    try {
      new RegExp(str);
      return true;
    } catch (e) {
      return false;
    }
  }
})(formats);
var limit = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.formatLimitDefinition = void 0;
  const ajv_1 = ajv.exports;
  const codegen_12 = codegen;
  const ops2 = codegen_12.operators;
  const KWDs2 = {
    formatMaximum: { okStr: "<=", ok: ops2.LTE, fail: ops2.GT },
    formatMinimum: { okStr: ">=", ok: ops2.GTE, fail: ops2.LT },
    formatExclusiveMaximum: { okStr: "<", ok: ops2.LT, fail: ops2.GTE },
    formatExclusiveMinimum: { okStr: ">", ok: ops2.GT, fail: ops2.LTE }
  };
  const error2 = {
    message: ({ keyword: keyword2, schemaCode }) => codegen_12.str`should be ${KWDs2[keyword2].okStr} ${schemaCode}`,
    params: ({ keyword: keyword2, schemaCode }) => codegen_12._`{comparison: ${KWDs2[keyword2].okStr}, limit: ${schemaCode}}`
  };
  exports.formatLimitDefinition = {
    keyword: Object.keys(KWDs2),
    type: "string",
    schemaType: "string",
    $data: true,
    error: error2,
    code(cxt) {
      const { gen, data, schemaCode, keyword: keyword2, it } = cxt;
      const { opts: opts2, self: self2 } = it;
      if (!opts2.validateFormats)
        return;
      const fCxt = new ajv_1.KeywordCxt(it, self2.RULES.all.format.definition, "format");
      if (fCxt.$data)
        validate$DataFormat();
      else
        validateFormat();
      function validate$DataFormat() {
        const fmts = gen.scopeValue("formats", {
          ref: self2.formats,
          code: opts2.code.formats
        });
        const fmt = gen.const("fmt", codegen_12._`${fmts}[${fCxt.schemaCode}]`);
        cxt.fail$data(codegen_12.or(codegen_12._`typeof ${fmt} != "object"`, codegen_12._`${fmt} instanceof RegExp`, codegen_12._`typeof ${fmt}.compare != "function"`, compareCode(fmt)));
      }
      function validateFormat() {
        const format2 = fCxt.schema;
        const fmtDef = self2.formats[format2];
        if (!fmtDef || fmtDef === true)
          return;
        if (typeof fmtDef != "object" || fmtDef instanceof RegExp || typeof fmtDef.compare != "function") {
          throw new Error(`"${keyword2}": format "${format2}" does not define "compare" function`);
        }
        const fmt = gen.scopeValue("formats", {
          key: format2,
          ref: fmtDef,
          code: opts2.code.formats ? codegen_12._`${opts2.code.formats}${codegen_12.getProperty(format2)}` : void 0
        });
        cxt.fail$data(compareCode(fmt));
      }
      function compareCode(fmt) {
        return codegen_12._`${fmt}.compare(${data}, ${schemaCode}) ${KWDs2[keyword2].fail} 0`;
      }
    },
    dependencies: ["format"]
  };
  const formatLimitPlugin = (ajv2) => {
    ajv2.addKeyword(exports.formatLimitDefinition);
    return ajv2;
  };
  exports.default = formatLimitPlugin;
})(limit);
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  const formats_1 = formats;
  const limit_1 = limit;
  const codegen_12 = codegen;
  const fullName = new codegen_12.Name("fullFormats");
  const fastName = new codegen_12.Name("fastFormats");
  const formatsPlugin = (ajv2, opts2 = { keywords: true }) => {
    if (Array.isArray(opts2)) {
      addFormats(ajv2, opts2, formats_1.fullFormats, fullName);
      return ajv2;
    }
    const [formats2, exportName] = opts2.mode === "fast" ? [formats_1.fastFormats, fastName] : [formats_1.fullFormats, fullName];
    const list = opts2.formats || formats_1.formatNames;
    addFormats(ajv2, list, formats2, exportName);
    if (opts2.keywords)
      limit_1.default(ajv2);
    return ajv2;
  };
  formatsPlugin.get = (name, mode = "full") => {
    const formats2 = mode === "fast" ? formats_1.fastFormats : formats_1.fullFormats;
    const f = formats2[name];
    if (!f)
      throw new Error(`Unknown format "${name}"`);
    return f;
  };
  function addFormats(ajv2, list, fs2, exportName) {
    var _a;
    var _b;
    (_a = (_b = ajv2.opts.code).formats) !== null && _a !== void 0 ? _a : _b.formats = codegen_12._`require("ajv-formats/dist/formats").${exportName}`;
    for (const f of list)
      ajv2.addFormat(f, fs2[f]);
  }
  module.exports = exports = formatsPlugin;
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.default = formatsPlugin;
})(dist$2, dist$2.exports);
const copyProperty = (to, from, property, ignoreNonConfigurable) => {
  if (property === "length" || property === "prototype") {
    return;
  }
  if (property === "arguments" || property === "caller") {
    return;
  }
  const toDescriptor = Object.getOwnPropertyDescriptor(to, property);
  const fromDescriptor = Object.getOwnPropertyDescriptor(from, property);
  if (!canCopyProperty(toDescriptor, fromDescriptor) && ignoreNonConfigurable) {
    return;
  }
  Object.defineProperty(to, property, fromDescriptor);
};
const canCopyProperty = function(toDescriptor, fromDescriptor) {
  return toDescriptor === void 0 || toDescriptor.configurable || toDescriptor.writable === fromDescriptor.writable && toDescriptor.enumerable === fromDescriptor.enumerable && toDescriptor.configurable === fromDescriptor.configurable && (toDescriptor.writable || toDescriptor.value === fromDescriptor.value);
};
const changePrototype = (to, from) => {
  const fromPrototype = Object.getPrototypeOf(from);
  if (fromPrototype === Object.getPrototypeOf(to)) {
    return;
  }
  Object.setPrototypeOf(to, fromPrototype);
};
const wrappedToString = (withName, fromBody) => `/* Wrapped ${withName}*/
${fromBody}`;
const toStringDescriptor = Object.getOwnPropertyDescriptor(Function.prototype, "toString");
const toStringName = Object.getOwnPropertyDescriptor(Function.prototype.toString, "name");
const changeToString = (to, from, name) => {
  const withName = name === "" ? "" : `with ${name.trim()}() `;
  const newToString = wrappedToString.bind(null, withName, from.toString());
  Object.defineProperty(newToString, "name", toStringName);
  Object.defineProperty(to, "toString", __spreadProps(__spreadValues({}, toStringDescriptor), { value: newToString }));
};
const mimicFn$4 = (to, from, { ignoreNonConfigurable = false } = {}) => {
  const { name } = to;
  for (const property of Reflect.ownKeys(from)) {
    copyProperty(to, from, property, ignoreNonConfigurable);
  }
  changePrototype(to, from);
  changeToString(to, from, name);
  return to;
};
var mimicFn_1 = mimicFn$4;
const mimicFn$3 = mimicFn_1;
var debounceFn = (inputFunction, options = {}) => {
  if (typeof inputFunction !== "function") {
    throw new TypeError(`Expected the first argument to be a function, got \`${typeof inputFunction}\``);
  }
  const {
    wait = 0,
    before = false,
    after = true
  } = options;
  if (!before && !after) {
    throw new Error("Both `before` and `after` are false, function wouldn't be called.");
  }
  let timeout2;
  let result;
  const debouncedFunction = function(...arguments_) {
    const context = this;
    const later = () => {
      timeout2 = void 0;
      if (after) {
        result = inputFunction.apply(context, arguments_);
      }
    };
    const shouldCallNow = before && !timeout2;
    clearTimeout(timeout2);
    timeout2 = setTimeout(later, wait);
    if (shouldCallNow) {
      result = inputFunction.apply(context, arguments_);
    }
    return result;
  };
  mimicFn$3(debouncedFunction, inputFunction);
  debouncedFunction.cancel = () => {
    if (timeout2) {
      clearTimeout(timeout2);
      timeout2 = void 0;
    }
  };
  return debouncedFunction;
};
var re$5 = { exports: {} };
const SEMVER_SPEC_VERSION = "2.0.0";
const MAX_LENGTH$2 = 256;
const MAX_SAFE_INTEGER$1 = Number.MAX_SAFE_INTEGER || 9007199254740991;
const MAX_SAFE_COMPONENT_LENGTH = 16;
var constants = {
  SEMVER_SPEC_VERSION,
  MAX_LENGTH: MAX_LENGTH$2,
  MAX_SAFE_INTEGER: MAX_SAFE_INTEGER$1,
  MAX_SAFE_COMPONENT_LENGTH
};
const debug$3 = typeof process === "object" && process.env && {}.NODE_DEBUG && /\bsemver\b/i.test({}.NODE_DEBUG) ? (...args) => console.error("SEMVER", ...args) : () => {
};
var debug_1 = debug$3;
(function(module, exports) {
  const { MAX_SAFE_COMPONENT_LENGTH: MAX_SAFE_COMPONENT_LENGTH2 } = constants;
  const debug2 = debug_1;
  exports = module.exports = {};
  const re2 = exports.re = [];
  const src = exports.src = [];
  const t2 = exports.t = {};
  let R = 0;
  const createToken = (name, value, isGlobal) => {
    const index = R++;
    debug2(index, value);
    t2[name] = index;
    src[index] = value;
    re2[index] = new RegExp(value, isGlobal ? "g" : void 0);
  };
  createToken("NUMERICIDENTIFIER", "0|[1-9]\\d*");
  createToken("NUMERICIDENTIFIERLOOSE", "[0-9]+");
  createToken("NONNUMERICIDENTIFIER", "\\d*[a-zA-Z-][a-zA-Z0-9-]*");
  createToken("MAINVERSION", `(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})\\.(${src[t2.NUMERICIDENTIFIER]})`);
  createToken("MAINVERSIONLOOSE", `(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})\\.(${src[t2.NUMERICIDENTIFIERLOOSE]})`);
  createToken("PRERELEASEIDENTIFIER", `(?:${src[t2.NUMERICIDENTIFIER]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASEIDENTIFIERLOOSE", `(?:${src[t2.NUMERICIDENTIFIERLOOSE]}|${src[t2.NONNUMERICIDENTIFIER]})`);
  createToken("PRERELEASE", `(?:-(${src[t2.PRERELEASEIDENTIFIER]}(?:\\.${src[t2.PRERELEASEIDENTIFIER]})*))`);
  createToken("PRERELEASELOOSE", `(?:-?(${src[t2.PRERELEASEIDENTIFIERLOOSE]}(?:\\.${src[t2.PRERELEASEIDENTIFIERLOOSE]})*))`);
  createToken("BUILDIDENTIFIER", "[0-9A-Za-z-]+");
  createToken("BUILD", `(?:\\+(${src[t2.BUILDIDENTIFIER]}(?:\\.${src[t2.BUILDIDENTIFIER]})*))`);
  createToken("FULLPLAIN", `v?${src[t2.MAINVERSION]}${src[t2.PRERELEASE]}?${src[t2.BUILD]}?`);
  createToken("FULL", `^${src[t2.FULLPLAIN]}$`);
  createToken("LOOSEPLAIN", `[v=\\s]*${src[t2.MAINVERSIONLOOSE]}${src[t2.PRERELEASELOOSE]}?${src[t2.BUILD]}?`);
  createToken("LOOSE", `^${src[t2.LOOSEPLAIN]}$`);
  createToken("GTLT", "((?:<|>)?=?)");
  createToken("XRANGEIDENTIFIERLOOSE", `${src[t2.NUMERICIDENTIFIERLOOSE]}|x|X|\\*`);
  createToken("XRANGEIDENTIFIER", `${src[t2.NUMERICIDENTIFIER]}|x|X|\\*`);
  createToken("XRANGEPLAIN", `[v=\\s]*(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:\\.(${src[t2.XRANGEIDENTIFIER]})(?:${src[t2.PRERELEASE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGEPLAINLOOSE", `[v=\\s]*(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:\\.(${src[t2.XRANGEIDENTIFIERLOOSE]})(?:${src[t2.PRERELEASELOOSE]})?${src[t2.BUILD]}?)?)?`);
  createToken("XRANGE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAIN]}$`);
  createToken("XRANGELOOSE", `^${src[t2.GTLT]}\\s*${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COERCE", `${"(^|[^\\d])(\\d{1,"}${MAX_SAFE_COMPONENT_LENGTH2}})(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:\\.(\\d{1,${MAX_SAFE_COMPONENT_LENGTH2}}))?(?:$|[^\\d])`);
  createToken("COERCERTL", src[t2.COERCE], true);
  createToken("LONETILDE", "(?:~>?)");
  createToken("TILDETRIM", `(\\s*)${src[t2.LONETILDE]}\\s+`, true);
  exports.tildeTrimReplace = "$1~";
  createToken("TILDE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAIN]}$`);
  createToken("TILDELOOSE", `^${src[t2.LONETILDE]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("LONECARET", "(?:\\^)");
  createToken("CARETTRIM", `(\\s*)${src[t2.LONECARET]}\\s+`, true);
  exports.caretTrimReplace = "$1^";
  createToken("CARET", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAIN]}$`);
  createToken("CARETLOOSE", `^${src[t2.LONECARET]}${src[t2.XRANGEPLAINLOOSE]}$`);
  createToken("COMPARATORLOOSE", `^${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]})$|^$`);
  createToken("COMPARATOR", `^${src[t2.GTLT]}\\s*(${src[t2.FULLPLAIN]})$|^$`);
  createToken("COMPARATORTRIM", `(\\s*)${src[t2.GTLT]}\\s*(${src[t2.LOOSEPLAIN]}|${src[t2.XRANGEPLAIN]})`, true);
  exports.comparatorTrimReplace = "$1$2$3";
  createToken("HYPHENRANGE", `^\\s*(${src[t2.XRANGEPLAIN]})\\s+-\\s+(${src[t2.XRANGEPLAIN]})\\s*$`);
  createToken("HYPHENRANGELOOSE", `^\\s*(${src[t2.XRANGEPLAINLOOSE]})\\s+-\\s+(${src[t2.XRANGEPLAINLOOSE]})\\s*$`);
  createToken("STAR", "(<|>)?=?\\s*\\*");
  createToken("GTE0", "^\\s*>=\\s*0.0.0\\s*$");
  createToken("GTE0PRE", "^\\s*>=\\s*0.0.0-0\\s*$");
})(re$5, re$5.exports);
const opts = ["includePrerelease", "loose", "rtl"];
const parseOptions$4 = (options) => !options ? {} : typeof options !== "object" ? { loose: true } : opts.filter((k) => options[k]).reduce((options2, k) => {
  options2[k] = true;
  return options2;
}, {});
var parseOptions_1 = parseOptions$4;
const numeric = /^[0-9]+$/;
const compareIdentifiers$1 = (a, b) => {
  const anum = numeric.test(a);
  const bnum = numeric.test(b);
  if (anum && bnum) {
    a = +a;
    b = +b;
  }
  return a === b ? 0 : anum && !bnum ? -1 : bnum && !anum ? 1 : a < b ? -1 : 1;
};
const rcompareIdentifiers = (a, b) => compareIdentifiers$1(b, a);
var identifiers = {
  compareIdentifiers: compareIdentifiers$1,
  rcompareIdentifiers
};
const debug$2 = debug_1;
const { MAX_LENGTH: MAX_LENGTH$1, MAX_SAFE_INTEGER } = constants;
const { re: re$4, t: t$4 } = re$5.exports;
const parseOptions$3 = parseOptions_1;
const { compareIdentifiers } = identifiers;
class SemVer$e {
  constructor(version, options) {
    options = parseOptions$3(options);
    if (version instanceof SemVer$e) {
      if (version.loose === !!options.loose && version.includePrerelease === !!options.includePrerelease) {
        return version;
      } else {
        version = version.version;
      }
    } else if (typeof version !== "string") {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    if (version.length > MAX_LENGTH$1) {
      throw new TypeError(`version is longer than ${MAX_LENGTH$1} characters`);
    }
    debug$2("SemVer", version, options);
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    const m = version.trim().match(options.loose ? re$4[t$4.LOOSE] : re$4[t$4.FULL]);
    if (!m) {
      throw new TypeError(`Invalid Version: ${version}`);
    }
    this.raw = version;
    this.major = +m[1];
    this.minor = +m[2];
    this.patch = +m[3];
    if (this.major > MAX_SAFE_INTEGER || this.major < 0) {
      throw new TypeError("Invalid major version");
    }
    if (this.minor > MAX_SAFE_INTEGER || this.minor < 0) {
      throw new TypeError("Invalid minor version");
    }
    if (this.patch > MAX_SAFE_INTEGER || this.patch < 0) {
      throw new TypeError("Invalid patch version");
    }
    if (!m[4]) {
      this.prerelease = [];
    } else {
      this.prerelease = m[4].split(".").map((id2) => {
        if (/^[0-9]+$/.test(id2)) {
          const num = +id2;
          if (num >= 0 && num < MAX_SAFE_INTEGER) {
            return num;
          }
        }
        return id2;
      });
    }
    this.build = m[5] ? m[5].split(".") : [];
    this.format();
  }
  format() {
    this.version = `${this.major}.${this.minor}.${this.patch}`;
    if (this.prerelease.length) {
      this.version += `-${this.prerelease.join(".")}`;
    }
    return this.version;
  }
  toString() {
    return this.version;
  }
  compare(other) {
    debug$2("SemVer.compare", this.version, this.options, other);
    if (!(other instanceof SemVer$e)) {
      if (typeof other === "string" && other === this.version) {
        return 0;
      }
      other = new SemVer$e(other, this.options);
    }
    if (other.version === this.version) {
      return 0;
    }
    return this.compareMain(other) || this.comparePre(other);
  }
  compareMain(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    return compareIdentifiers(this.major, other.major) || compareIdentifiers(this.minor, other.minor) || compareIdentifiers(this.patch, other.patch);
  }
  comparePre(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    if (this.prerelease.length && !other.prerelease.length) {
      return -1;
    } else if (!this.prerelease.length && other.prerelease.length) {
      return 1;
    } else if (!this.prerelease.length && !other.prerelease.length) {
      return 0;
    }
    let i = 0;
    do {
      const a = this.prerelease[i];
      const b = other.prerelease[i];
      debug$2("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  compareBuild(other) {
    if (!(other instanceof SemVer$e)) {
      other = new SemVer$e(other, this.options);
    }
    let i = 0;
    do {
      const a = this.build[i];
      const b = other.build[i];
      debug$2("prerelease compare", i, a, b);
      if (a === void 0 && b === void 0) {
        return 0;
      } else if (b === void 0) {
        return 1;
      } else if (a === void 0) {
        return -1;
      } else if (a === b) {
        continue;
      } else {
        return compareIdentifiers(a, b);
      }
    } while (++i);
  }
  inc(release, identifier) {
    switch (release) {
      case "premajor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor = 0;
        this.major++;
        this.inc("pre", identifier);
        break;
      case "preminor":
        this.prerelease.length = 0;
        this.patch = 0;
        this.minor++;
        this.inc("pre", identifier);
        break;
      case "prepatch":
        this.prerelease.length = 0;
        this.inc("patch", identifier);
        this.inc("pre", identifier);
        break;
      case "prerelease":
        if (this.prerelease.length === 0) {
          this.inc("patch", identifier);
        }
        this.inc("pre", identifier);
        break;
      case "major":
        if (this.minor !== 0 || this.patch !== 0 || this.prerelease.length === 0) {
          this.major++;
        }
        this.minor = 0;
        this.patch = 0;
        this.prerelease = [];
        break;
      case "minor":
        if (this.patch !== 0 || this.prerelease.length === 0) {
          this.minor++;
        }
        this.patch = 0;
        this.prerelease = [];
        break;
      case "patch":
        if (this.prerelease.length === 0) {
          this.patch++;
        }
        this.prerelease = [];
        break;
      case "pre":
        if (this.prerelease.length === 0) {
          this.prerelease = [0];
        } else {
          let i = this.prerelease.length;
          while (--i >= 0) {
            if (typeof this.prerelease[i] === "number") {
              this.prerelease[i]++;
              i = -2;
            }
          }
          if (i === -1) {
            this.prerelease.push(0);
          }
        }
        if (identifier) {
          if (this.prerelease[0] === identifier) {
            if (isNaN(this.prerelease[1])) {
              this.prerelease = [identifier, 0];
            }
          } else {
            this.prerelease = [identifier, 0];
          }
        }
        break;
      default:
        throw new Error(`invalid increment argument: ${release}`);
    }
    this.format();
    this.raw = this.version;
    return this;
  }
}
var semver$2 = SemVer$e;
const { MAX_LENGTH } = constants;
const { re: re$3, t: t$3 } = re$5.exports;
const SemVer$d = semver$2;
const parseOptions$2 = parseOptions_1;
const parse$5 = (version, options) => {
  options = parseOptions$2(options);
  if (version instanceof SemVer$d) {
    return version;
  }
  if (typeof version !== "string") {
    return null;
  }
  if (version.length > MAX_LENGTH) {
    return null;
  }
  const r = options.loose ? re$3[t$3.LOOSE] : re$3[t$3.FULL];
  if (!r.test(version)) {
    return null;
  }
  try {
    return new SemVer$d(version, options);
  } catch (er) {
    return null;
  }
};
var parse_1 = parse$5;
const parse$4 = parse_1;
const valid$1 = (version, options) => {
  const v = parse$4(version, options);
  return v ? v.version : null;
};
var valid_1 = valid$1;
const parse$3 = parse_1;
const clean = (version, options) => {
  const s = parse$3(version.trim().replace(/^[=v]+/, ""), options);
  return s ? s.version : null;
};
var clean_1 = clean;
const SemVer$c = semver$2;
const inc = (version, release, options, identifier) => {
  if (typeof options === "string") {
    identifier = options;
    options = void 0;
  }
  try {
    return new SemVer$c(version, options).inc(release, identifier).version;
  } catch (er) {
    return null;
  }
};
var inc_1 = inc;
const SemVer$b = semver$2;
const compare$a = (a, b, loose) => new SemVer$b(a, loose).compare(new SemVer$b(b, loose));
var compare_1 = compare$a;
const compare$9 = compare_1;
const eq$2 = (a, b, loose) => compare$9(a, b, loose) === 0;
var eq_1 = eq$2;
const parse$2 = parse_1;
const eq$1 = eq_1;
const diff = (version1, version2) => {
  if (eq$1(version1, version2)) {
    return null;
  } else {
    const v1 = parse$2(version1);
    const v2 = parse$2(version2);
    const hasPre = v1.prerelease.length || v2.prerelease.length;
    const prefix = hasPre ? "pre" : "";
    const defaultResult = hasPre ? "prerelease" : "";
    for (const key in v1) {
      if (key === "major" || key === "minor" || key === "patch") {
        if (v1[key] !== v2[key]) {
          return prefix + key;
        }
      }
    }
    return defaultResult;
  }
};
var diff_1 = diff;
const SemVer$a = semver$2;
const major = (a, loose) => new SemVer$a(a, loose).major;
var major_1 = major;
const SemVer$9 = semver$2;
const minor = (a, loose) => new SemVer$9(a, loose).minor;
var minor_1 = minor;
const SemVer$8 = semver$2;
const patch = (a, loose) => new SemVer$8(a, loose).patch;
var patch_1 = patch;
const parse$1 = parse_1;
const prerelease = (version, options) => {
  const parsed = parse$1(version, options);
  return parsed && parsed.prerelease.length ? parsed.prerelease : null;
};
var prerelease_1 = prerelease;
const compare$8 = compare_1;
const rcompare = (a, b, loose) => compare$8(b, a, loose);
var rcompare_1 = rcompare;
const compare$7 = compare_1;
const compareLoose = (a, b) => compare$7(a, b, true);
var compareLoose_1 = compareLoose;
const SemVer$7 = semver$2;
const compareBuild$2 = (a, b, loose) => {
  const versionA = new SemVer$7(a, loose);
  const versionB = new SemVer$7(b, loose);
  return versionA.compare(versionB) || versionA.compareBuild(versionB);
};
var compareBuild_1 = compareBuild$2;
const compareBuild$1 = compareBuild_1;
const sort = (list, loose) => list.sort((a, b) => compareBuild$1(a, b, loose));
var sort_1 = sort;
const compareBuild = compareBuild_1;
const rsort = (list, loose) => list.sort((a, b) => compareBuild(b, a, loose));
var rsort_1 = rsort;
const compare$6 = compare_1;
const gt$3 = (a, b, loose) => compare$6(a, b, loose) > 0;
var gt_1 = gt$3;
const compare$5 = compare_1;
const lt$2 = (a, b, loose) => compare$5(a, b, loose) < 0;
var lt_1 = lt$2;
const compare$4 = compare_1;
const neq$1 = (a, b, loose) => compare$4(a, b, loose) !== 0;
var neq_1 = neq$1;
const compare$3 = compare_1;
const gte$2 = (a, b, loose) => compare$3(a, b, loose) >= 0;
var gte_1 = gte$2;
const compare$2 = compare_1;
const lte$2 = (a, b, loose) => compare$2(a, b, loose) <= 0;
var lte_1 = lte$2;
const eq = eq_1;
const neq = neq_1;
const gt$2 = gt_1;
const gte$1 = gte_1;
const lt$1 = lt_1;
const lte$1 = lte_1;
const cmp$1 = (a, op, b, loose) => {
  switch (op) {
    case "===":
      if (typeof a === "object")
        a = a.version;
      if (typeof b === "object")
        b = b.version;
      return a === b;
    case "!==":
      if (typeof a === "object")
        a = a.version;
      if (typeof b === "object")
        b = b.version;
      return a !== b;
    case "":
    case "=":
    case "==":
      return eq(a, b, loose);
    case "!=":
      return neq(a, b, loose);
    case ">":
      return gt$2(a, b, loose);
    case ">=":
      return gte$1(a, b, loose);
    case "<":
      return lt$1(a, b, loose);
    case "<=":
      return lte$1(a, b, loose);
    default:
      throw new TypeError(`Invalid operator: ${op}`);
  }
};
var cmp_1 = cmp$1;
const SemVer$6 = semver$2;
const parse = parse_1;
const { re: re$2, t: t$2 } = re$5.exports;
const coerce = (version, options) => {
  if (version instanceof SemVer$6) {
    return version;
  }
  if (typeof version === "number") {
    version = String(version);
  }
  if (typeof version !== "string") {
    return null;
  }
  options = options || {};
  let match = null;
  if (!options.rtl) {
    match = version.match(re$2[t$2.COERCE]);
  } else {
    let next;
    while ((next = re$2[t$2.COERCERTL].exec(version)) && (!match || match.index + match[0].length !== version.length)) {
      if (!match || next.index + next[0].length !== match.index + match[0].length) {
        match = next;
      }
      re$2[t$2.COERCERTL].lastIndex = next.index + next[1].length + next[2].length;
    }
    re$2[t$2.COERCERTL].lastIndex = -1;
  }
  if (match === null)
    return null;
  return parse(`${match[2]}.${match[3] || "0"}.${match[4] || "0"}`, options);
};
var coerce_1 = coerce;
var yallist = Yallist$1;
Yallist$1.Node = Node;
Yallist$1.create = Yallist$1;
function Yallist$1(list) {
  var self2 = this;
  if (!(self2 instanceof Yallist$1)) {
    self2 = new Yallist$1();
  }
  self2.tail = null;
  self2.head = null;
  self2.length = 0;
  if (list && typeof list.forEach === "function") {
    list.forEach(function(item) {
      self2.push(item);
    });
  } else if (arguments.length > 0) {
    for (var i = 0, l = arguments.length; i < l; i++) {
      self2.push(arguments[i]);
    }
  }
  return self2;
}
Yallist$1.prototype.removeNode = function(node) {
  if (node.list !== this) {
    throw new Error("removing node which does not belong to this list");
  }
  var next = node.next;
  var prev = node.prev;
  if (next) {
    next.prev = prev;
  }
  if (prev) {
    prev.next = next;
  }
  if (node === this.head) {
    this.head = next;
  }
  if (node === this.tail) {
    this.tail = prev;
  }
  node.list.length--;
  node.next = null;
  node.prev = null;
  node.list = null;
  return next;
};
Yallist$1.prototype.unshiftNode = function(node) {
  if (node === this.head) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var head = this.head;
  node.list = this;
  node.next = head;
  if (head) {
    head.prev = node;
  }
  this.head = node;
  if (!this.tail) {
    this.tail = node;
  }
  this.length++;
};
Yallist$1.prototype.pushNode = function(node) {
  if (node === this.tail) {
    return;
  }
  if (node.list) {
    node.list.removeNode(node);
  }
  var tail = this.tail;
  node.list = this;
  node.prev = tail;
  if (tail) {
    tail.next = node;
  }
  this.tail = node;
  if (!this.head) {
    this.head = node;
  }
  this.length++;
};
Yallist$1.prototype.push = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    push(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.unshift = function() {
  for (var i = 0, l = arguments.length; i < l; i++) {
    unshift(this, arguments[i]);
  }
  return this.length;
};
Yallist$1.prototype.pop = function() {
  if (!this.tail) {
    return void 0;
  }
  var res = this.tail.value;
  this.tail = this.tail.prev;
  if (this.tail) {
    this.tail.next = null;
  } else {
    this.head = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.shift = function() {
  if (!this.head) {
    return void 0;
  }
  var res = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  this.length--;
  return res;
};
Yallist$1.prototype.forEach = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.head, i = 0; walker !== null; i++) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.next;
  }
};
Yallist$1.prototype.forEachReverse = function(fn, thisp) {
  thisp = thisp || this;
  for (var walker = this.tail, i = this.length - 1; walker !== null; i--) {
    fn.call(thisp, walker.value, i, this);
    walker = walker.prev;
  }
};
Yallist$1.prototype.get = function(n) {
  for (var i = 0, walker = this.head; walker !== null && i < n; i++) {
    walker = walker.next;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.getReverse = function(n) {
  for (var i = 0, walker = this.tail; walker !== null && i < n; i++) {
    walker = walker.prev;
  }
  if (i === n && walker !== null) {
    return walker.value;
  }
};
Yallist$1.prototype.map = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.head; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.next;
  }
  return res;
};
Yallist$1.prototype.mapReverse = function(fn, thisp) {
  thisp = thisp || this;
  var res = new Yallist$1();
  for (var walker = this.tail; walker !== null; ) {
    res.push(fn.call(thisp, walker.value, this));
    walker = walker.prev;
  }
  return res;
};
Yallist$1.prototype.reduce = function(fn, initial) {
  var acc;
  var walker = this.head;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.head) {
    walker = this.head.next;
    acc = this.head.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = 0; walker !== null; i++) {
    acc = fn(acc, walker.value, i);
    walker = walker.next;
  }
  return acc;
};
Yallist$1.prototype.reduceReverse = function(fn, initial) {
  var acc;
  var walker = this.tail;
  if (arguments.length > 1) {
    acc = initial;
  } else if (this.tail) {
    walker = this.tail.prev;
    acc = this.tail.value;
  } else {
    throw new TypeError("Reduce of empty list with no initial value");
  }
  for (var i = this.length - 1; walker !== null; i--) {
    acc = fn(acc, walker.value, i);
    walker = walker.prev;
  }
  return acc;
};
Yallist$1.prototype.toArray = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.head; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.next;
  }
  return arr;
};
Yallist$1.prototype.toArrayReverse = function() {
  var arr = new Array(this.length);
  for (var i = 0, walker = this.tail; walker !== null; i++) {
    arr[i] = walker.value;
    walker = walker.prev;
  }
  return arr;
};
Yallist$1.prototype.slice = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = 0, walker = this.head; walker !== null && i < from; i++) {
    walker = walker.next;
  }
  for (; walker !== null && i < to; i++, walker = walker.next) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.sliceReverse = function(from, to) {
  to = to || this.length;
  if (to < 0) {
    to += this.length;
  }
  from = from || 0;
  if (from < 0) {
    from += this.length;
  }
  var ret = new Yallist$1();
  if (to < from || to < 0) {
    return ret;
  }
  if (from < 0) {
    from = 0;
  }
  if (to > this.length) {
    to = this.length;
  }
  for (var i = this.length, walker = this.tail; walker !== null && i > to; i--) {
    walker = walker.prev;
  }
  for (; walker !== null && i > from; i--, walker = walker.prev) {
    ret.push(walker.value);
  }
  return ret;
};
Yallist$1.prototype.splice = function(start, deleteCount, ...nodes) {
  if (start > this.length) {
    start = this.length - 1;
  }
  if (start < 0) {
    start = this.length + start;
  }
  for (var i = 0, walker = this.head; walker !== null && i < start; i++) {
    walker = walker.next;
  }
  var ret = [];
  for (var i = 0; walker && i < deleteCount; i++) {
    ret.push(walker.value);
    walker = this.removeNode(walker);
  }
  if (walker === null) {
    walker = this.tail;
  }
  if (walker !== this.head && walker !== this.tail) {
    walker = walker.prev;
  }
  for (var i = 0; i < nodes.length; i++) {
    walker = insert(this, walker, nodes[i]);
  }
  return ret;
};
Yallist$1.prototype.reverse = function() {
  var head = this.head;
  var tail = this.tail;
  for (var walker = head; walker !== null; walker = walker.prev) {
    var p = walker.prev;
    walker.prev = walker.next;
    walker.next = p;
  }
  this.head = tail;
  this.tail = head;
  return this;
};
function insert(self2, node, value) {
  var inserted = node === self2.head ? new Node(value, null, node, self2) : new Node(value, node, node.next, self2);
  if (inserted.next === null) {
    self2.tail = inserted;
  }
  if (inserted.prev === null) {
    self2.head = inserted;
  }
  self2.length++;
  return inserted;
}
function push(self2, item) {
  self2.tail = new Node(item, self2.tail, null, self2);
  if (!self2.head) {
    self2.head = self2.tail;
  }
  self2.length++;
}
function unshift(self2, item) {
  self2.head = new Node(item, null, self2.head, self2);
  if (!self2.tail) {
    self2.tail = self2.head;
  }
  self2.length++;
}
function Node(value, prev, next, list) {
  if (!(this instanceof Node)) {
    return new Node(value, prev, next, list);
  }
  this.list = list;
  this.value = value;
  if (prev) {
    prev.next = this;
    this.prev = prev;
  } else {
    this.prev = null;
  }
  if (next) {
    next.prev = this;
    this.next = next;
  } else {
    this.next = null;
  }
}
try {
  require("./iterator.js")(Yallist$1);
} catch (er) {
}
const Yallist = yallist;
const MAX = Symbol("max");
const LENGTH = Symbol("length");
const LENGTH_CALCULATOR = Symbol("lengthCalculator");
const ALLOW_STALE = Symbol("allowStale");
const MAX_AGE = Symbol("maxAge");
const DISPOSE = Symbol("dispose");
const NO_DISPOSE_ON_SET = Symbol("noDisposeOnSet");
const LRU_LIST = Symbol("lruList");
const CACHE = Symbol("cache");
const UPDATE_AGE_ON_GET = Symbol("updateAgeOnGet");
const naiveLength = () => 1;
class LRUCache {
  constructor(options) {
    if (typeof options === "number")
      options = { max: options };
    if (!options)
      options = {};
    if (options.max && (typeof options.max !== "number" || options.max < 0))
      throw new TypeError("max must be a non-negative number");
    this[MAX] = options.max || Infinity;
    const lc = options.length || naiveLength;
    this[LENGTH_CALCULATOR] = typeof lc !== "function" ? naiveLength : lc;
    this[ALLOW_STALE] = options.stale || false;
    if (options.maxAge && typeof options.maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    this[MAX_AGE] = options.maxAge || 0;
    this[DISPOSE] = options.dispose;
    this[NO_DISPOSE_ON_SET] = options.noDisposeOnSet || false;
    this[UPDATE_AGE_ON_GET] = options.updateAgeOnGet || false;
    this.reset();
  }
  set max(mL) {
    if (typeof mL !== "number" || mL < 0)
      throw new TypeError("max must be a non-negative number");
    this[MAX] = mL || Infinity;
    trim(this);
  }
  get max() {
    return this[MAX];
  }
  set allowStale(allowStale) {
    this[ALLOW_STALE] = !!allowStale;
  }
  get allowStale() {
    return this[ALLOW_STALE];
  }
  set maxAge(mA) {
    if (typeof mA !== "number")
      throw new TypeError("maxAge must be a non-negative number");
    this[MAX_AGE] = mA;
    trim(this);
  }
  get maxAge() {
    return this[MAX_AGE];
  }
  set lengthCalculator(lC) {
    if (typeof lC !== "function")
      lC = naiveLength;
    if (lC !== this[LENGTH_CALCULATOR]) {
      this[LENGTH_CALCULATOR] = lC;
      this[LENGTH] = 0;
      this[LRU_LIST].forEach((hit) => {
        hit.length = this[LENGTH_CALCULATOR](hit.value, hit.key);
        this[LENGTH] += hit.length;
      });
    }
    trim(this);
  }
  get lengthCalculator() {
    return this[LENGTH_CALCULATOR];
  }
  get length() {
    return this[LENGTH];
  }
  get itemCount() {
    return this[LRU_LIST].length;
  }
  rforEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].tail; walker !== null; ) {
      const prev = walker.prev;
      forEachStep(this, fn, walker, thisp);
      walker = prev;
    }
  }
  forEach(fn, thisp) {
    thisp = thisp || this;
    for (let walker = this[LRU_LIST].head; walker !== null; ) {
      const next = walker.next;
      forEachStep(this, fn, walker, thisp);
      walker = next;
    }
  }
  keys() {
    return this[LRU_LIST].toArray().map((k) => k.key);
  }
  values() {
    return this[LRU_LIST].toArray().map((k) => k.value);
  }
  reset() {
    if (this[DISPOSE] && this[LRU_LIST] && this[LRU_LIST].length) {
      this[LRU_LIST].forEach((hit) => this[DISPOSE](hit.key, hit.value));
    }
    this[CACHE] = new Map();
    this[LRU_LIST] = new Yallist();
    this[LENGTH] = 0;
  }
  dump() {
    return this[LRU_LIST].map((hit) => isStale(this, hit) ? false : {
      k: hit.key,
      v: hit.value,
      e: hit.now + (hit.maxAge || 0)
    }).toArray().filter((h) => h);
  }
  dumpLru() {
    return this[LRU_LIST];
  }
  set(key, value, maxAge) {
    maxAge = maxAge || this[MAX_AGE];
    if (maxAge && typeof maxAge !== "number")
      throw new TypeError("maxAge must be a number");
    const now = maxAge ? Date.now() : 0;
    const len = this[LENGTH_CALCULATOR](value, key);
    if (this[CACHE].has(key)) {
      if (len > this[MAX]) {
        del(this, this[CACHE].get(key));
        return false;
      }
      const node = this[CACHE].get(key);
      const item = node.value;
      if (this[DISPOSE]) {
        if (!this[NO_DISPOSE_ON_SET])
          this[DISPOSE](key, item.value);
      }
      item.now = now;
      item.maxAge = maxAge;
      item.value = value;
      this[LENGTH] += len - item.length;
      item.length = len;
      this.get(key);
      trim(this);
      return true;
    }
    const hit = new Entry(key, value, len, now, maxAge);
    if (hit.length > this[MAX]) {
      if (this[DISPOSE])
        this[DISPOSE](key, value);
      return false;
    }
    this[LENGTH] += hit.length;
    this[LRU_LIST].unshift(hit);
    this[CACHE].set(key, this[LRU_LIST].head);
    trim(this);
    return true;
  }
  has(key) {
    if (!this[CACHE].has(key))
      return false;
    const hit = this[CACHE].get(key).value;
    return !isStale(this, hit);
  }
  get(key) {
    return get(this, key, true);
  }
  peek(key) {
    return get(this, key, false);
  }
  pop() {
    const node = this[LRU_LIST].tail;
    if (!node)
      return null;
    del(this, node);
    return node.value;
  }
  del(key) {
    del(this, this[CACHE].get(key));
  }
  load(arr) {
    this.reset();
    const now = Date.now();
    for (let l = arr.length - 1; l >= 0; l--) {
      const hit = arr[l];
      const expiresAt = hit.e || 0;
      if (expiresAt === 0)
        this.set(hit.k, hit.v);
      else {
        const maxAge = expiresAt - now;
        if (maxAge > 0) {
          this.set(hit.k, hit.v, maxAge);
        }
      }
    }
  }
  prune() {
    this[CACHE].forEach((value, key) => get(this, key, false));
  }
}
const get = (self2, key, doUse) => {
  const node = self2[CACHE].get(key);
  if (node) {
    const hit = node.value;
    if (isStale(self2, hit)) {
      del(self2, node);
      if (!self2[ALLOW_STALE])
        return void 0;
    } else {
      if (doUse) {
        if (self2[UPDATE_AGE_ON_GET])
          node.value.now = Date.now();
        self2[LRU_LIST].unshiftNode(node);
      }
    }
    return hit.value;
  }
};
const isStale = (self2, hit) => {
  if (!hit || !hit.maxAge && !self2[MAX_AGE])
    return false;
  const diff2 = Date.now() - hit.now;
  return hit.maxAge ? diff2 > hit.maxAge : self2[MAX_AGE] && diff2 > self2[MAX_AGE];
};
const trim = (self2) => {
  if (self2[LENGTH] > self2[MAX]) {
    for (let walker = self2[LRU_LIST].tail; self2[LENGTH] > self2[MAX] && walker !== null; ) {
      const prev = walker.prev;
      del(self2, walker);
      walker = prev;
    }
  }
};
const del = (self2, node) => {
  if (node) {
    const hit = node.value;
    if (self2[DISPOSE])
      self2[DISPOSE](hit.key, hit.value);
    self2[LENGTH] -= hit.length;
    self2[CACHE].delete(hit.key);
    self2[LRU_LIST].removeNode(node);
  }
};
class Entry {
  constructor(key, value, length, now, maxAge) {
    this.key = key;
    this.value = value;
    this.length = length;
    this.now = now;
    this.maxAge = maxAge || 0;
  }
}
const forEachStep = (self2, fn, node, thisp) => {
  let hit = node.value;
  if (isStale(self2, hit)) {
    del(self2, node);
    if (!self2[ALLOW_STALE])
      hit = void 0;
  }
  if (hit)
    fn.call(thisp, hit.value, hit.key, self2);
};
var lruCache = LRUCache;
class Range$a {
  constructor(range2, options) {
    options = parseOptions$1(options);
    if (range2 instanceof Range$a) {
      if (range2.loose === !!options.loose && range2.includePrerelease === !!options.includePrerelease) {
        return range2;
      } else {
        return new Range$a(range2.raw, options);
      }
    }
    if (range2 instanceof Comparator$3) {
      this.raw = range2.value;
      this.set = [[range2]];
      this.format();
      return this;
    }
    this.options = options;
    this.loose = !!options.loose;
    this.includePrerelease = !!options.includePrerelease;
    this.raw = range2;
    this.set = range2.split(/\s*\|\|\s*/).map((range3) => this.parseRange(range3.trim())).filter((c) => c.length);
    if (!this.set.length) {
      throw new TypeError(`Invalid SemVer Range: ${range2}`);
    }
    if (this.set.length > 1) {
      const first = this.set[0];
      this.set = this.set.filter((c) => !isNullSet(c[0]));
      if (this.set.length === 0)
        this.set = [first];
      else if (this.set.length > 1) {
        for (const c of this.set) {
          if (c.length === 1 && isAny(c[0])) {
            this.set = [c];
            break;
          }
        }
      }
    }
    this.format();
  }
  format() {
    this.range = this.set.map((comps) => {
      return comps.join(" ").trim();
    }).join("||").trim();
    return this.range;
  }
  toString() {
    return this.range;
  }
  parseRange(range2) {
    range2 = range2.trim();
    const memoOpts = Object.keys(this.options).join(",");
    const memoKey = `parseRange:${memoOpts}:${range2}`;
    const cached = cache.get(memoKey);
    if (cached)
      return cached;
    const loose = this.options.loose;
    const hr = loose ? re$1[t$1.HYPHENRANGELOOSE] : re$1[t$1.HYPHENRANGE];
    range2 = range2.replace(hr, hyphenReplace(this.options.includePrerelease));
    debug$1("hyphen replace", range2);
    range2 = range2.replace(re$1[t$1.COMPARATORTRIM], comparatorTrimReplace);
    debug$1("comparator trim", range2, re$1[t$1.COMPARATORTRIM]);
    range2 = range2.replace(re$1[t$1.TILDETRIM], tildeTrimReplace);
    range2 = range2.replace(re$1[t$1.CARETTRIM], caretTrimReplace);
    range2 = range2.split(/\s+/).join(" ");
    const compRe = loose ? re$1[t$1.COMPARATORLOOSE] : re$1[t$1.COMPARATOR];
    const rangeList = range2.split(" ").map((comp) => parseComparator(comp, this.options)).join(" ").split(/\s+/).map((comp) => replaceGTE0(comp, this.options)).filter(this.options.loose ? (comp) => !!comp.match(compRe) : () => true).map((comp) => new Comparator$3(comp, this.options));
    rangeList.length;
    const rangeMap = new Map();
    for (const comp of rangeList) {
      if (isNullSet(comp))
        return [comp];
      rangeMap.set(comp.value, comp);
    }
    if (rangeMap.size > 1 && rangeMap.has(""))
      rangeMap.delete("");
    const result = [...rangeMap.values()];
    cache.set(memoKey, result);
    return result;
  }
  intersects(range2, options) {
    if (!(range2 instanceof Range$a)) {
      throw new TypeError("a Range is required");
    }
    return this.set.some((thisComparators) => {
      return isSatisfiable(thisComparators, options) && range2.set.some((rangeComparators) => {
        return isSatisfiable(rangeComparators, options) && thisComparators.every((thisComparator) => {
          return rangeComparators.every((rangeComparator) => {
            return thisComparator.intersects(rangeComparator, options);
          });
        });
      });
    });
  }
  test(version) {
    if (!version) {
      return false;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$5(version, this.options);
      } catch (er) {
        return false;
      }
    }
    for (let i = 0; i < this.set.length; i++) {
      if (testSet(this.set[i], version, this.options)) {
        return true;
      }
    }
    return false;
  }
}
var range = Range$a;
const LRU = lruCache;
const cache = new LRU({ max: 1e3 });
const parseOptions$1 = parseOptions_1;
const Comparator$3 = comparator;
const debug$1 = debug_1;
const SemVer$5 = semver$2;
const {
  re: re$1,
  t: t$1,
  comparatorTrimReplace,
  tildeTrimReplace,
  caretTrimReplace
} = re$5.exports;
const isNullSet = (c) => c.value === "<0.0.0-0";
const isAny = (c) => c.value === "";
const isSatisfiable = (comparators, options) => {
  let result = true;
  const remainingComparators = comparators.slice();
  let testComparator = remainingComparators.pop();
  while (result && remainingComparators.length) {
    result = remainingComparators.every((otherComparator) => {
      return testComparator.intersects(otherComparator, options);
    });
    testComparator = remainingComparators.pop();
  }
  return result;
};
const parseComparator = (comp, options) => {
  debug$1("comp", comp, options);
  comp = replaceCarets(comp, options);
  debug$1("caret", comp);
  comp = replaceTildes(comp, options);
  debug$1("tildes", comp);
  comp = replaceXRanges(comp, options);
  debug$1("xrange", comp);
  comp = replaceStars(comp, options);
  debug$1("stars", comp);
  return comp;
};
const isX = (id2) => !id2 || id2.toLowerCase() === "x" || id2 === "*";
const replaceTildes = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
  return replaceTilde(comp2, options);
}).join(" ");
const replaceTilde = (comp, options) => {
  const r = options.loose ? re$1[t$1.TILDELOOSE] : re$1[t$1.TILDE];
  return comp.replace(r, (_2, M, m, p, pr) => {
    debug$1("tilde", comp, _2, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0 <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      ret = `>=${M}.${m}.0 <${M}.${+m + 1}.0-0`;
    } else if (pr) {
      debug$1("replaceTilde pr", pr);
      ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
    } else {
      ret = `>=${M}.${m}.${p} <${M}.${+m + 1}.0-0`;
    }
    debug$1("tilde return", ret);
    return ret;
  });
};
const replaceCarets = (comp, options) => comp.trim().split(/\s+/).map((comp2) => {
  return replaceCaret(comp2, options);
}).join(" ");
const replaceCaret = (comp, options) => {
  debug$1("caret", comp, options);
  const r = options.loose ? re$1[t$1.CARETLOOSE] : re$1[t$1.CARET];
  const z = options.includePrerelease ? "-0" : "";
  return comp.replace(r, (_2, M, m, p, pr) => {
    debug$1("caret", comp, _2, M, m, p, pr);
    let ret;
    if (isX(M)) {
      ret = "";
    } else if (isX(m)) {
      ret = `>=${M}.0.0${z} <${+M + 1}.0.0-0`;
    } else if (isX(p)) {
      if (M === "0") {
        ret = `>=${M}.${m}.0${z} <${M}.${+m + 1}.0-0`;
      } else {
        ret = `>=${M}.${m}.0${z} <${+M + 1}.0.0-0`;
      }
    } else if (pr) {
      debug$1("replaceCaret pr", pr);
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}-${pr} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p}-${pr} <${+M + 1}.0.0-0`;
      }
    } else {
      debug$1("no pr");
      if (M === "0") {
        if (m === "0") {
          ret = `>=${M}.${m}.${p}${z} <${M}.${m}.${+p + 1}-0`;
        } else {
          ret = `>=${M}.${m}.${p}${z} <${M}.${+m + 1}.0-0`;
        }
      } else {
        ret = `>=${M}.${m}.${p} <${+M + 1}.0.0-0`;
      }
    }
    debug$1("caret return", ret);
    return ret;
  });
};
const replaceXRanges = (comp, options) => {
  debug$1("replaceXRanges", comp, options);
  return comp.split(/\s+/).map((comp2) => {
    return replaceXRange(comp2, options);
  }).join(" ");
};
const replaceXRange = (comp, options) => {
  comp = comp.trim();
  const r = options.loose ? re$1[t$1.XRANGELOOSE] : re$1[t$1.XRANGE];
  return comp.replace(r, (ret, gtlt, M, m, p, pr) => {
    debug$1("xRange", comp, ret, gtlt, M, m, p, pr);
    const xM = isX(M);
    const xm = xM || isX(m);
    const xp = xm || isX(p);
    const anyX = xp;
    if (gtlt === "=" && anyX) {
      gtlt = "";
    }
    pr = options.includePrerelease ? "-0" : "";
    if (xM) {
      if (gtlt === ">" || gtlt === "<") {
        ret = "<0.0.0-0";
      } else {
        ret = "*";
      }
    } else if (gtlt && anyX) {
      if (xm) {
        m = 0;
      }
      p = 0;
      if (gtlt === ">") {
        gtlt = ">=";
        if (xm) {
          M = +M + 1;
          m = 0;
          p = 0;
        } else {
          m = +m + 1;
          p = 0;
        }
      } else if (gtlt === "<=") {
        gtlt = "<";
        if (xm) {
          M = +M + 1;
        } else {
          m = +m + 1;
        }
      }
      if (gtlt === "<")
        pr = "-0";
      ret = `${gtlt + M}.${m}.${p}${pr}`;
    } else if (xm) {
      ret = `>=${M}.0.0${pr} <${+M + 1}.0.0-0`;
    } else if (xp) {
      ret = `>=${M}.${m}.0${pr} <${M}.${+m + 1}.0-0`;
    }
    debug$1("xRange return", ret);
    return ret;
  });
};
const replaceStars = (comp, options) => {
  debug$1("replaceStars", comp, options);
  return comp.trim().replace(re$1[t$1.STAR], "");
};
const replaceGTE0 = (comp, options) => {
  debug$1("replaceGTE0", comp, options);
  return comp.trim().replace(re$1[options.includePrerelease ? t$1.GTE0PRE : t$1.GTE0], "");
};
const hyphenReplace = (incPr) => ($0, from, fM, fm, fp, fpr, fb, to, tM, tm, tp, tpr, tb) => {
  if (isX(fM)) {
    from = "";
  } else if (isX(fm)) {
    from = `>=${fM}.0.0${incPr ? "-0" : ""}`;
  } else if (isX(fp)) {
    from = `>=${fM}.${fm}.0${incPr ? "-0" : ""}`;
  } else if (fpr) {
    from = `>=${from}`;
  } else {
    from = `>=${from}${incPr ? "-0" : ""}`;
  }
  if (isX(tM)) {
    to = "";
  } else if (isX(tm)) {
    to = `<${+tM + 1}.0.0-0`;
  } else if (isX(tp)) {
    to = `<${tM}.${+tm + 1}.0-0`;
  } else if (tpr) {
    to = `<=${tM}.${tm}.${tp}-${tpr}`;
  } else if (incPr) {
    to = `<${tM}.${tm}.${+tp + 1}-0`;
  } else {
    to = `<=${to}`;
  }
  return `${from} ${to}`.trim();
};
const testSet = (set, version, options) => {
  for (let i = 0; i < set.length; i++) {
    if (!set[i].test(version)) {
      return false;
    }
  }
  if (version.prerelease.length && !options.includePrerelease) {
    for (let i = 0; i < set.length; i++) {
      debug$1(set[i].semver);
      if (set[i].semver === Comparator$3.ANY) {
        continue;
      }
      if (set[i].semver.prerelease.length > 0) {
        const allowed = set[i].semver;
        if (allowed.major === version.major && allowed.minor === version.minor && allowed.patch === version.patch) {
          return true;
        }
      }
    }
    return false;
  }
  return true;
};
const ANY$2 = Symbol("SemVer ANY");
class Comparator$2 {
  static get ANY() {
    return ANY$2;
  }
  constructor(comp, options) {
    options = parseOptions(options);
    if (comp instanceof Comparator$2) {
      if (comp.loose === !!options.loose) {
        return comp;
      } else {
        comp = comp.value;
      }
    }
    debug("comparator", comp, options);
    this.options = options;
    this.loose = !!options.loose;
    this.parse(comp);
    if (this.semver === ANY$2) {
      this.value = "";
    } else {
      this.value = this.operator + this.semver.version;
    }
    debug("comp", this);
  }
  parse(comp) {
    const r = this.options.loose ? re[t.COMPARATORLOOSE] : re[t.COMPARATOR];
    const m = comp.match(r);
    if (!m) {
      throw new TypeError(`Invalid comparator: ${comp}`);
    }
    this.operator = m[1] !== void 0 ? m[1] : "";
    if (this.operator === "=") {
      this.operator = "";
    }
    if (!m[2]) {
      this.semver = ANY$2;
    } else {
      this.semver = new SemVer$4(m[2], this.options.loose);
    }
  }
  toString() {
    return this.value;
  }
  test(version) {
    debug("Comparator.test", version, this.options.loose);
    if (this.semver === ANY$2 || version === ANY$2) {
      return true;
    }
    if (typeof version === "string") {
      try {
        version = new SemVer$4(version, this.options);
      } catch (er) {
        return false;
      }
    }
    return cmp(version, this.operator, this.semver, this.options);
  }
  intersects(comp, options) {
    if (!(comp instanceof Comparator$2)) {
      throw new TypeError("a Comparator is required");
    }
    if (!options || typeof options !== "object") {
      options = {
        loose: !!options,
        includePrerelease: false
      };
    }
    if (this.operator === "") {
      if (this.value === "") {
        return true;
      }
      return new Range$9(comp.value, options).test(this.value);
    } else if (comp.operator === "") {
      if (comp.value === "") {
        return true;
      }
      return new Range$9(this.value, options).test(comp.semver);
    }
    const sameDirectionIncreasing = (this.operator === ">=" || this.operator === ">") && (comp.operator === ">=" || comp.operator === ">");
    const sameDirectionDecreasing = (this.operator === "<=" || this.operator === "<") && (comp.operator === "<=" || comp.operator === "<");
    const sameSemVer = this.semver.version === comp.semver.version;
    const differentDirectionsInclusive = (this.operator === ">=" || this.operator === "<=") && (comp.operator === ">=" || comp.operator === "<=");
    const oppositeDirectionsLessThan = cmp(this.semver, "<", comp.semver, options) && (this.operator === ">=" || this.operator === ">") && (comp.operator === "<=" || comp.operator === "<");
    const oppositeDirectionsGreaterThan = cmp(this.semver, ">", comp.semver, options) && (this.operator === "<=" || this.operator === "<") && (comp.operator === ">=" || comp.operator === ">");
    return sameDirectionIncreasing || sameDirectionDecreasing || sameSemVer && differentDirectionsInclusive || oppositeDirectionsLessThan || oppositeDirectionsGreaterThan;
  }
}
var comparator = Comparator$2;
const parseOptions = parseOptions_1;
const { re, t } = re$5.exports;
const cmp = cmp_1;
const debug = debug_1;
const SemVer$4 = semver$2;
const Range$9 = range;
const Range$8 = range;
const satisfies$3 = (version, range2, options) => {
  try {
    range2 = new Range$8(range2, options);
  } catch (er) {
    return false;
  }
  return range2.test(version);
};
var satisfies_1 = satisfies$3;
const Range$7 = range;
const toComparators = (range2, options) => new Range$7(range2, options).set.map((comp) => comp.map((c) => c.value).join(" ").trim().split(" "));
var toComparators_1 = toComparators;
const SemVer$3 = semver$2;
const Range$6 = range;
const maxSatisfying = (versions, range2, options) => {
  let max = null;
  let maxSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$6(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!max || maxSV.compare(v) === -1) {
        max = v;
        maxSV = new SemVer$3(max, options);
      }
    }
  });
  return max;
};
var maxSatisfying_1 = maxSatisfying;
const SemVer$2 = semver$2;
const Range$5 = range;
const minSatisfying = (versions, range2, options) => {
  let min = null;
  let minSV = null;
  let rangeObj = null;
  try {
    rangeObj = new Range$5(range2, options);
  } catch (er) {
    return null;
  }
  versions.forEach((v) => {
    if (rangeObj.test(v)) {
      if (!min || minSV.compare(v) === 1) {
        min = v;
        minSV = new SemVer$2(min, options);
      }
    }
  });
  return min;
};
var minSatisfying_1 = minSatisfying;
const SemVer$1 = semver$2;
const Range$4 = range;
const gt$1 = gt_1;
const minVersion = (range2, loose) => {
  range2 = new Range$4(range2, loose);
  let minver = new SemVer$1("0.0.0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = new SemVer$1("0.0.0-0");
  if (range2.test(minver)) {
    return minver;
  }
  minver = null;
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let setMin = null;
    comparators.forEach((comparator2) => {
      const compver = new SemVer$1(comparator2.semver.version);
      switch (comparator2.operator) {
        case ">":
          if (compver.prerelease.length === 0) {
            compver.patch++;
          } else {
            compver.prerelease.push(0);
          }
          compver.raw = compver.format();
        case "":
        case ">=":
          if (!setMin || gt$1(compver, setMin)) {
            setMin = compver;
          }
          break;
        case "<":
        case "<=":
          break;
        default:
          throw new Error(`Unexpected operation: ${comparator2.operator}`);
      }
    });
    if (setMin && (!minver || gt$1(minver, setMin)))
      minver = setMin;
  }
  if (minver && range2.test(minver)) {
    return minver;
  }
  return null;
};
var minVersion_1 = minVersion;
const Range$3 = range;
const validRange = (range2, options) => {
  try {
    return new Range$3(range2, options).range || "*";
  } catch (er) {
    return null;
  }
};
var valid = validRange;
const SemVer = semver$2;
const Comparator$1 = comparator;
const { ANY: ANY$1 } = Comparator$1;
const Range$2 = range;
const satisfies$2 = satisfies_1;
const gt = gt_1;
const lt = lt_1;
const lte = lte_1;
const gte = gte_1;
const outside$2 = (version, range2, hilo, options) => {
  version = new SemVer(version, options);
  range2 = new Range$2(range2, options);
  let gtfn, ltefn, ltfn, comp, ecomp;
  switch (hilo) {
    case ">":
      gtfn = gt;
      ltefn = lte;
      ltfn = lt;
      comp = ">";
      ecomp = ">=";
      break;
    case "<":
      gtfn = lt;
      ltefn = gte;
      ltfn = gt;
      comp = "<";
      ecomp = "<=";
      break;
    default:
      throw new TypeError('Must provide a hilo val of "<" or ">"');
  }
  if (satisfies$2(version, range2, options)) {
    return false;
  }
  for (let i = 0; i < range2.set.length; ++i) {
    const comparators = range2.set[i];
    let high = null;
    let low = null;
    comparators.forEach((comparator2) => {
      if (comparator2.semver === ANY$1) {
        comparator2 = new Comparator$1(">=0.0.0");
      }
      high = high || comparator2;
      low = low || comparator2;
      if (gtfn(comparator2.semver, high.semver, options)) {
        high = comparator2;
      } else if (ltfn(comparator2.semver, low.semver, options)) {
        low = comparator2;
      }
    });
    if (high.operator === comp || high.operator === ecomp) {
      return false;
    }
    if ((!low.operator || low.operator === comp) && ltefn(version, low.semver)) {
      return false;
    } else if (low.operator === ecomp && ltfn(version, low.semver)) {
      return false;
    }
  }
  return true;
};
var outside_1 = outside$2;
const outside$1 = outside_1;
const gtr = (version, range2, options) => outside$1(version, range2, ">", options);
var gtr_1 = gtr;
const outside = outside_1;
const ltr = (version, range2, options) => outside(version, range2, "<", options);
var ltr_1 = ltr;
const Range$1 = range;
const intersects = (r1, r2, options) => {
  r1 = new Range$1(r1, options);
  r2 = new Range$1(r2, options);
  return r1.intersects(r2);
};
var intersects_1 = intersects;
const satisfies$1 = satisfies_1;
const compare$1 = compare_1;
var simplify = (versions, range2, options) => {
  const set = [];
  let min = null;
  let prev = null;
  const v = versions.sort((a, b) => compare$1(a, b, options));
  for (const version of v) {
    const included = satisfies$1(version, range2, options);
    if (included) {
      prev = version;
      if (!min)
        min = version;
    } else {
      if (prev) {
        set.push([min, prev]);
      }
      prev = null;
      min = null;
    }
  }
  if (min)
    set.push([min, null]);
  const ranges = [];
  for (const [min2, max] of set) {
    if (min2 === max)
      ranges.push(min2);
    else if (!max && min2 === v[0])
      ranges.push("*");
    else if (!max)
      ranges.push(`>=${min2}`);
    else if (min2 === v[0])
      ranges.push(`<=${max}`);
    else
      ranges.push(`${min2} - ${max}`);
  }
  const simplified = ranges.join(" || ");
  const original = typeof range2.raw === "string" ? range2.raw : String(range2);
  return simplified.length < original.length ? simplified : range2;
};
const Range = range;
const Comparator = comparator;
const { ANY } = Comparator;
const satisfies = satisfies_1;
const compare = compare_1;
const subset = (sub, dom, options = {}) => {
  if (sub === dom)
    return true;
  sub = new Range(sub, options);
  dom = new Range(dom, options);
  let sawNonNull = false;
  OUTER:
    for (const simpleSub of sub.set) {
      for (const simpleDom of dom.set) {
        const isSub = simpleSubset(simpleSub, simpleDom, options);
        sawNonNull = sawNonNull || isSub !== null;
        if (isSub)
          continue OUTER;
      }
      if (sawNonNull)
        return false;
    }
  return true;
};
const simpleSubset = (sub, dom, options) => {
  if (sub === dom)
    return true;
  if (sub.length === 1 && sub[0].semver === ANY) {
    if (dom.length === 1 && dom[0].semver === ANY)
      return true;
    else if (options.includePrerelease)
      sub = [new Comparator(">=0.0.0-0")];
    else
      sub = [new Comparator(">=0.0.0")];
  }
  if (dom.length === 1 && dom[0].semver === ANY) {
    if (options.includePrerelease)
      return true;
    else
      dom = [new Comparator(">=0.0.0")];
  }
  const eqSet = new Set();
  let gt2, lt2;
  for (const c of sub) {
    if (c.operator === ">" || c.operator === ">=")
      gt2 = higherGT(gt2, c, options);
    else if (c.operator === "<" || c.operator === "<=")
      lt2 = lowerLT(lt2, c, options);
    else
      eqSet.add(c.semver);
  }
  if (eqSet.size > 1)
    return null;
  let gtltComp;
  if (gt2 && lt2) {
    gtltComp = compare(gt2.semver, lt2.semver, options);
    if (gtltComp > 0)
      return null;
    else if (gtltComp === 0 && (gt2.operator !== ">=" || lt2.operator !== "<="))
      return null;
  }
  for (const eq2 of eqSet) {
    if (gt2 && !satisfies(eq2, String(gt2), options))
      return null;
    if (lt2 && !satisfies(eq2, String(lt2), options))
      return null;
    for (const c of dom) {
      if (!satisfies(eq2, String(c), options))
        return false;
    }
    return true;
  }
  let higher, lower;
  let hasDomLT, hasDomGT;
  let needDomLTPre = lt2 && !options.includePrerelease && lt2.semver.prerelease.length ? lt2.semver : false;
  let needDomGTPre = gt2 && !options.includePrerelease && gt2.semver.prerelease.length ? gt2.semver : false;
  if (needDomLTPre && needDomLTPre.prerelease.length === 1 && lt2.operator === "<" && needDomLTPre.prerelease[0] === 0) {
    needDomLTPre = false;
  }
  for (const c of dom) {
    hasDomGT = hasDomGT || c.operator === ">" || c.operator === ">=";
    hasDomLT = hasDomLT || c.operator === "<" || c.operator === "<=";
    if (gt2) {
      if (needDomGTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomGTPre.major && c.semver.minor === needDomGTPre.minor && c.semver.patch === needDomGTPre.patch) {
          needDomGTPre = false;
        }
      }
      if (c.operator === ">" || c.operator === ">=") {
        higher = higherGT(gt2, c, options);
        if (higher === c && higher !== gt2)
          return false;
      } else if (gt2.operator === ">=" && !satisfies(gt2.semver, String(c), options))
        return false;
    }
    if (lt2) {
      if (needDomLTPre) {
        if (c.semver.prerelease && c.semver.prerelease.length && c.semver.major === needDomLTPre.major && c.semver.minor === needDomLTPre.minor && c.semver.patch === needDomLTPre.patch) {
          needDomLTPre = false;
        }
      }
      if (c.operator === "<" || c.operator === "<=") {
        lower = lowerLT(lt2, c, options);
        if (lower === c && lower !== lt2)
          return false;
      } else if (lt2.operator === "<=" && !satisfies(lt2.semver, String(c), options))
        return false;
    }
    if (!c.operator && (lt2 || gt2) && gtltComp !== 0)
      return false;
  }
  if (gt2 && hasDomLT && !lt2 && gtltComp !== 0)
    return false;
  if (lt2 && hasDomGT && !gt2 && gtltComp !== 0)
    return false;
  if (needDomGTPre || needDomLTPre)
    return false;
  return true;
};
const higherGT = (a, b, options) => {
  if (!a)
    return b;
  const comp = compare(a.semver, b.semver, options);
  return comp > 0 ? a : comp < 0 ? b : b.operator === ">" && a.operator === ">=" ? b : a;
};
const lowerLT = (a, b, options) => {
  if (!a)
    return b;
  const comp = compare(a.semver, b.semver, options);
  return comp < 0 ? a : comp > 0 ? b : b.operator === "<" && a.operator === "<=" ? b : a;
};
var subset_1 = subset;
const internalRe = re$5.exports;
var semver$1 = {
  re: internalRe.re,
  src: internalRe.src,
  tokens: internalRe.t,
  SEMVER_SPEC_VERSION: constants.SEMVER_SPEC_VERSION,
  SemVer: semver$2,
  compareIdentifiers: identifiers.compareIdentifiers,
  rcompareIdentifiers: identifiers.rcompareIdentifiers,
  parse: parse_1,
  valid: valid_1,
  clean: clean_1,
  inc: inc_1,
  diff: diff_1,
  major: major_1,
  minor: minor_1,
  patch: patch_1,
  prerelease: prerelease_1,
  compare: compare_1,
  rcompare: rcompare_1,
  compareLoose: compareLoose_1,
  compareBuild: compareBuild_1,
  sort: sort_1,
  rsort: rsort_1,
  gt: gt_1,
  lt: lt_1,
  eq: eq_1,
  neq: neq_1,
  gte: gte_1,
  lte: lte_1,
  cmp: cmp_1,
  coerce: coerce_1,
  Comparator: comparator,
  Range: range,
  satisfies: satisfies_1,
  toComparators: toComparators_1,
  maxSatisfying: maxSatisfying_1,
  minSatisfying: minSatisfying_1,
  minVersion: minVersion_1,
  validRange: valid,
  outside: outside_1,
  gtr: gtr_1,
  ltr: ltr_1,
  intersects: intersects_1,
  simplifyRange: simplify,
  subset: subset_1
};
var onetime$1 = { exports: {} };
var mimicFn$2 = { exports: {} };
const mimicFn$1 = (to, from) => {
  for (const prop of Reflect.ownKeys(from)) {
    Object.defineProperty(to, prop, Object.getOwnPropertyDescriptor(from, prop));
  }
  return to;
};
mimicFn$2.exports = mimicFn$1;
mimicFn$2.exports.default = mimicFn$1;
const mimicFn = mimicFn$2.exports;
const calledFunctions = new WeakMap();
const onetime = (function_, options = {}) => {
  if (typeof function_ !== "function") {
    throw new TypeError("Expected a function");
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || "<anonymous>";
  const onetime2 = function(...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = null;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFn(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime$1.exports = onetime;
onetime$1.exports.default = onetime;
onetime$1.exports.callCount = (function_) => {
  if (!calledFunctions.has(function_)) {
    throw new Error(`The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`);
  }
  return calledFunctions.get(function_);
};
(function(module, exports) {
  var __classPrivateFieldSet = commonjsGlobal && commonjsGlobal.__classPrivateFieldSet || function(receiver, state, value, kind, f) {
    if (kind === "m")
      throw new TypeError("Private method is not writable");
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value), value;
  };
  var __classPrivateFieldGet = commonjsGlobal && commonjsGlobal.__classPrivateFieldGet || function(receiver, state, kind, f) {
    if (kind === "a" && !f)
      throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
      throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
  };
  var _a, _b;
  var _Conf_validator, _Conf_encryptionKey, _Conf_options, _Conf_defaultValues;
  Object.defineProperty(exports, "__esModule", { value: true });
  const util_12 = require$$1__default$1["default"];
  const fs2 = require$$0__default["default"];
  const path2 = require$$0__default$1["default"];
  const crypto = require$$3__default["default"];
  const assert2 = require$$4__default["default"];
  const events_1 = require$$5__default["default"];
  const dotProp$1 = dotProp;
  const pkgUp$1 = pkgUp.exports;
  const envPaths2 = envPaths$1.exports;
  const atomically = dist$3;
  const ajv_1 = ajv.exports;
  const ajv_formats_1 = dist$2.exports;
  const debounceFn$1 = debounceFn;
  const semver2 = semver$1;
  const onetime2 = onetime$1.exports;
  const encryptionAlgorithm = "aes-256-cbc";
  const createPlainObject = () => {
    return Object.create(null);
  };
  const isExist = (data) => {
    return data !== void 0 && data !== null;
  };
  let parentDir = "";
  try {
    delete require.cache[__filename];
    parentDir = path2.dirname((_b = (_a = module.parent) === null || _a === void 0 ? void 0 : _a.filename) !== null && _b !== void 0 ? _b : ".");
  } catch (_c) {
  }
  const checkValueType = (key, value) => {
    const nonJsonTypes = new Set([
      "undefined",
      "symbol",
      "function"
    ]);
    const type2 = typeof value;
    if (nonJsonTypes.has(type2)) {
      throw new TypeError(`Setting a value of type \`${type2}\` for key \`${key}\` is not allowed as it's not supported by JSON`);
    }
  };
  const INTERNAL_KEY = "__internal__";
  const MIGRATION_KEY = `${INTERNAL_KEY}.migrations.version`;
  class Conf2 {
    constructor(partialOptions = {}) {
      var _a2;
      _Conf_validator.set(this, void 0);
      _Conf_encryptionKey.set(this, void 0);
      _Conf_options.set(this, void 0);
      _Conf_defaultValues.set(this, {});
      this._deserialize = (value) => JSON.parse(value);
      this._serialize = (value) => JSON.stringify(value, void 0, "	");
      const options = __spreadValues({
        configName: "config",
        fileExtension: "json",
        projectSuffix: "nodejs",
        clearInvalidConfig: false,
        accessPropertiesByDotNotation: true,
        configFileMode: 438
      }, partialOptions);
      const getPackageData = onetime2(() => {
        const packagePath = pkgUp$1.sync({ cwd: parentDir });
        const packageData = packagePath && JSON.parse(fs2.readFileSync(packagePath, "utf8"));
        return packageData !== null && packageData !== void 0 ? packageData : {};
      });
      if (!options.cwd) {
        if (!options.projectName) {
          options.projectName = getPackageData().name;
        }
        if (!options.projectName) {
          throw new Error("Project name could not be inferred. Please specify the `projectName` option.");
        }
        options.cwd = envPaths2(options.projectName, { suffix: options.projectSuffix }).config;
      }
      __classPrivateFieldSet(this, _Conf_options, options, "f");
      if (options.schema) {
        if (typeof options.schema !== "object") {
          throw new TypeError("The `schema` option must be an object.");
        }
        const ajv2 = new ajv_1.default({
          allErrors: true,
          useDefaults: true
        });
        (0, ajv_formats_1.default)(ajv2);
        const schema = {
          type: "object",
          properties: options.schema
        };
        __classPrivateFieldSet(this, _Conf_validator, ajv2.compile(schema), "f");
        for (const [key, value] of Object.entries(options.schema)) {
          if (value === null || value === void 0 ? void 0 : value.default) {
            __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key] = value.default;
          }
        }
      }
      if (options.defaults) {
        __classPrivateFieldSet(this, _Conf_defaultValues, __spreadValues(__spreadValues({}, __classPrivateFieldGet(this, _Conf_defaultValues, "f")), options.defaults), "f");
      }
      if (options.serialize) {
        this._serialize = options.serialize;
      }
      if (options.deserialize) {
        this._deserialize = options.deserialize;
      }
      this.events = new events_1.EventEmitter();
      __classPrivateFieldSet(this, _Conf_encryptionKey, options.encryptionKey, "f");
      const fileExtension = options.fileExtension ? `.${options.fileExtension}` : "";
      this.path = path2.resolve(options.cwd, `${(_a2 = options.configName) !== null && _a2 !== void 0 ? _a2 : "config"}${fileExtension}`);
      const fileStore = this.store;
      const store2 = Object.assign(createPlainObject(), options.defaults, fileStore);
      this._validate(store2);
      try {
        assert2.deepEqual(fileStore, store2);
      } catch (_b2) {
        this.store = store2;
      }
      if (options.watch) {
        this._watch();
      }
      if (options.migrations) {
        if (!options.projectVersion) {
          options.projectVersion = getPackageData().version;
        }
        if (!options.projectVersion) {
          throw new Error("Project version could not be inferred. Please specify the `projectVersion` option.");
        }
        this._migrate(options.migrations, options.projectVersion);
      }
    }
    get(key, defaultValue) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return this._get(key, defaultValue);
      }
      const { store: store2 } = this;
      return key in store2 ? store2[key] : defaultValue;
    }
    set(key, value) {
      if (typeof key !== "string" && typeof key !== "object") {
        throw new TypeError(`Expected \`key\` to be of type \`string\` or \`object\`, got ${typeof key}`);
      }
      if (typeof key !== "object" && value === void 0) {
        throw new TypeError("Use `delete()` to clear values");
      }
      if (this._containsReservedKey(key)) {
        throw new TypeError(`Please don't use the ${INTERNAL_KEY} key, as it's used to manage this module internal operations.`);
      }
      const { store: store2 } = this;
      const set = (key2, value2) => {
        checkValueType(key2, value2);
        if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
          dotProp$1.set(store2, key2, value2);
        } else {
          store2[key2] = value2;
        }
      };
      if (typeof key === "object") {
        const object = key;
        for (const [key2, value2] of Object.entries(object)) {
          set(key2, value2);
        }
      } else {
        set(key, value);
      }
      this.store = store2;
    }
    has(key) {
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        return dotProp$1.has(this.store, key);
      }
      return key in this.store;
    }
    reset(...keys) {
      for (const key of keys) {
        if (isExist(__classPrivateFieldGet(this, _Conf_defaultValues, "f")[key])) {
          this.set(key, __classPrivateFieldGet(this, _Conf_defaultValues, "f")[key]);
        }
      }
    }
    delete(key) {
      const { store: store2 } = this;
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        dotProp$1.delete(store2, key);
      } else {
        delete store2[key];
      }
      this.store = store2;
    }
    clear() {
      this.store = createPlainObject();
      for (const key of Object.keys(__classPrivateFieldGet(this, _Conf_defaultValues, "f"))) {
        this.reset(key);
      }
    }
    onDidChange(key, callback) {
      if (typeof key !== "string") {
        throw new TypeError(`Expected \`key\` to be of type \`string\`, got ${typeof key}`);
      }
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.get(key), callback);
    }
    onDidAnyChange(callback) {
      if (typeof callback !== "function") {
        throw new TypeError(`Expected \`callback\` to be of type \`function\`, got ${typeof callback}`);
      }
      return this._handleChange(() => this.store, callback);
    }
    get size() {
      return Object.keys(this.store).length;
    }
    get store() {
      try {
        const data = fs2.readFileSync(this.path, __classPrivateFieldGet(this, _Conf_encryptionKey, "f") ? null : "utf8");
        const dataString = this._encryptData(data);
        const deserializedData = this._deserialize(dataString);
        this._validate(deserializedData);
        return Object.assign(createPlainObject(), deserializedData);
      } catch (error2) {
        if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "ENOENT") {
          this._ensureDirectory();
          return createPlainObject();
        }
        if (__classPrivateFieldGet(this, _Conf_options, "f").clearInvalidConfig && error2.name === "SyntaxError") {
          return createPlainObject();
        }
        throw error2;
      }
    }
    set store(value) {
      this._ensureDirectory();
      this._validate(value);
      this._write(value);
      this.events.emit("change");
    }
    *[(_Conf_validator = new WeakMap(), _Conf_encryptionKey = new WeakMap(), _Conf_options = new WeakMap(), _Conf_defaultValues = new WeakMap(), Symbol.iterator)]() {
      for (const [key, value] of Object.entries(this.store)) {
        yield [key, value];
      }
    }
    _encryptData(data) {
      if (!__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        return data.toString();
      }
      try {
        if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
          try {
            if (data.slice(16, 17).toString() === ":") {
              const initializationVector = data.slice(0, 16);
              const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
              const decipher = crypto.createDecipheriv(encryptionAlgorithm, password, initializationVector);
              data = Buffer.concat([decipher.update(Buffer.from(data.slice(17))), decipher.final()]).toString("utf8");
            } else {
              const decipher = crypto.createDecipher(encryptionAlgorithm, __classPrivateFieldGet(this, _Conf_encryptionKey, "f"));
              data = Buffer.concat([decipher.update(Buffer.from(data)), decipher.final()]).toString("utf8");
            }
          } catch (_a2) {
          }
        }
      } catch (_b2) {
      }
      return data.toString();
    }
    _handleChange(getter, callback) {
      let currentValue = getter();
      const onChange = () => {
        const oldValue = currentValue;
        const newValue = getter();
        if ((0, util_12.isDeepStrictEqual)(newValue, oldValue)) {
          return;
        }
        currentValue = newValue;
        callback.call(this, newValue, oldValue);
      };
      this.events.on("change", onChange);
      return () => this.events.removeListener("change", onChange);
    }
    _validate(data) {
      if (!__classPrivateFieldGet(this, _Conf_validator, "f")) {
        return;
      }
      const valid2 = __classPrivateFieldGet(this, _Conf_validator, "f").call(this, data);
      if (valid2 || !__classPrivateFieldGet(this, _Conf_validator, "f").errors) {
        return;
      }
      const errors2 = __classPrivateFieldGet(this, _Conf_validator, "f").errors.map(({ instancePath, message = "" }) => `\`${instancePath.slice(1)}\` ${message}`);
      throw new Error("Config schema violation: " + errors2.join("; "));
    }
    _ensureDirectory() {
      fs2.mkdirSync(path2.dirname(this.path), { recursive: true });
    }
    _write(value) {
      let data = this._serialize(value);
      if (__classPrivateFieldGet(this, _Conf_encryptionKey, "f")) {
        const initializationVector = crypto.randomBytes(16);
        const password = crypto.pbkdf2Sync(__classPrivateFieldGet(this, _Conf_encryptionKey, "f"), initializationVector.toString(), 1e4, 32, "sha512");
        const cipher = crypto.createCipheriv(encryptionAlgorithm, password, initializationVector);
        data = Buffer.concat([initializationVector, Buffer.from(":"), cipher.update(Buffer.from(data)), cipher.final()]);
      }
      {
        try {
          atomically.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
        } catch (error2) {
          if ((error2 === null || error2 === void 0 ? void 0 : error2.code) === "EXDEV") {
            fs2.writeFileSync(this.path, data, { mode: __classPrivateFieldGet(this, _Conf_options, "f").configFileMode });
            return;
          }
          throw error2;
        }
      }
    }
    _watch() {
      this._ensureDirectory();
      if (!fs2.existsSync(this.path)) {
        this._write(createPlainObject());
      }
      if (process.platform === "win32") {
        fs2.watch(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 100 }));
      } else {
        fs2.watchFile(this.path, { persistent: false }, debounceFn$1(() => {
          this.events.emit("change");
        }, { wait: 5e3 }));
      }
    }
    _migrate(migrations, versionToMigrate) {
      let previousMigratedVersion = this._get(MIGRATION_KEY, "0.0.0");
      const newerVersions = Object.keys(migrations).filter((candidateVersion) => this._shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate));
      let storeBackup = __spreadValues({}, this.store);
      for (const version of newerVersions) {
        try {
          const migration = migrations[version];
          migration(this);
          this._set(MIGRATION_KEY, version);
          previousMigratedVersion = version;
          storeBackup = __spreadValues({}, this.store);
        } catch (error2) {
          this.store = storeBackup;
          throw new Error(`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error2}`);
        }
      }
      if (this._isVersionInRangeFormat(previousMigratedVersion) || !semver2.eq(previousMigratedVersion, versionToMigrate)) {
        this._set(MIGRATION_KEY, versionToMigrate);
      }
    }
    _containsReservedKey(key) {
      if (typeof key === "object") {
        const firsKey = Object.keys(key)[0];
        if (firsKey === INTERNAL_KEY) {
          return true;
        }
      }
      if (typeof key !== "string") {
        return false;
      }
      if (__classPrivateFieldGet(this, _Conf_options, "f").accessPropertiesByDotNotation) {
        if (key.startsWith(`${INTERNAL_KEY}.`)) {
          return true;
        }
        return false;
      }
      return false;
    }
    _isVersionInRangeFormat(version) {
      return semver2.clean(version) === null;
    }
    _shouldPerformMigration(candidateVersion, previousMigratedVersion, versionToMigrate) {
      if (this._isVersionInRangeFormat(candidateVersion)) {
        if (previousMigratedVersion !== "0.0.0" && semver2.satisfies(previousMigratedVersion, candidateVersion)) {
          return false;
        }
        return semver2.satisfies(versionToMigrate, candidateVersion);
      }
      if (semver2.lte(candidateVersion, previousMigratedVersion)) {
        return false;
      }
      if (semver2.gt(candidateVersion, versionToMigrate)) {
        return false;
      }
      return true;
    }
    _get(key, defaultValue) {
      return dotProp$1.get(this.store, key, defaultValue);
    }
    _set(key, value) {
      const { store: store2 } = this;
      dotProp$1.set(store2, key, value);
      this.store = store2;
    }
  }
  exports.default = Conf2;
  module.exports = Conf2;
  module.exports.default = Conf2;
})(source, source.exports);
const path$5 = require$$0__default$1["default"];
const { app, ipcMain, ipcRenderer, shell } = require$$0__default$2["default"];
const Conf = source.exports;
let isInitialized = false;
const initDataListener = () => {
  if (!ipcMain || !app) {
    throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
  }
  const appData = {
    defaultCwd: app.getPath("userData"),
    appVersion: app.getVersion()
  };
  if (isInitialized) {
    return appData;
  }
  ipcMain.on("electron-store-get-data", (event) => {
    event.returnValue = appData;
  });
  isInitialized = true;
  return appData;
};
class ElectronStore extends Conf {
  constructor(options) {
    let defaultCwd;
    let appVersion;
    if (ipcRenderer) {
      const appData = ipcRenderer.sendSync("electron-store-get-data");
      if (!appData) {
        throw new Error("Electron Store: You need to call `.initRenderer()` from the main process.");
      }
      ({ defaultCwd, appVersion } = appData);
    } else if (ipcMain && app) {
      ({ defaultCwd, appVersion } = initDataListener());
    }
    options = __spreadValues({
      name: "config"
    }, options);
    if (!options.projectVersion) {
      options.projectVersion = appVersion;
    }
    if (options.cwd) {
      options.cwd = path$5.isAbsolute(options.cwd) ? options.cwd : path$5.join(defaultCwd, options.cwd);
    } else {
      options.cwd = defaultCwd;
    }
    options.configName = options.name;
    delete options.name;
    super(options);
  }
  static initRenderer() {
    initDataListener();
  }
  openInEditor() {
    shell.openPath(this.path);
  }
}
var electronStore = ElectronStore;
const store = new electronStore();
require$$0$2.ipcMain.handle("electron-store", async (_evnet, methodSign, ...args) => {
  if (typeof store[methodSign] === "function") {
    return store[methodSign](...args);
  }
  return store[methodSign];
});
const APP_NAME = require$$0$2.app.name;
require$$0$2.app.getVersion();
const DEFAULT_WINDOW_OPTIONS = {
  title: APP_NAME,
  width: 1300,
  height: 850,
  minHeight: 642,
  minWidth: 1e3,
  titleBarStyle: "hiddenInset",
  trafficLightPosition: { x: 7, y: 7 },
  webPreferences: {
    preload: require$$0$1.join(__dirname, "../preload/index.cjs"),
    scrollBounce: false
  },
  hasShadow: true,
  vibrancy: "fullscreen-ui"
};
var dist$1 = {};
var downloadChromeExtension$1 = {};
const assert = require$$4__default["default"];
const path$4 = require$$0__default$1["default"];
const fs$4 = require$$0__default["default"];
let glob = void 0;
try {
  glob = require("glob");
} catch (_err) {
}
const defaultGlobOpts = {
  nosort: true,
  silent: true
};
let timeout = 0;
const isWindows = process.platform === "win32";
const defaults = (options) => {
  const methods = [
    "unlink",
    "chmod",
    "stat",
    "lstat",
    "rmdir",
    "readdir"
  ];
  methods.forEach((m) => {
    options[m] = options[m] || fs$4[m];
    m = m + "Sync";
    options[m] = options[m] || fs$4[m];
  });
  options.maxBusyTries = options.maxBusyTries || 3;
  options.emfileWait = options.emfileWait || 1e3;
  if (options.glob === false) {
    options.disableGlob = true;
  }
  if (options.disableGlob !== true && glob === void 0) {
    throw Error("glob dependency not found, set `options.disableGlob = true` if intentional");
  }
  options.disableGlob = options.disableGlob || false;
  options.glob = options.glob || defaultGlobOpts;
};
const rimraf$1 = (p, options, cb) => {
  if (typeof options === "function") {
    cb = options;
    options = {};
  }
  assert(p, "rimraf: missing path");
  assert.equal(typeof p, "string", "rimraf: path should be a string");
  assert.equal(typeof cb, "function", "rimraf: callback function required");
  assert(options, "rimraf: invalid options argument provided");
  assert.equal(typeof options, "object", "rimraf: options should be object");
  defaults(options);
  let busyTries = 0;
  let errState = null;
  let n = 0;
  const next = (er) => {
    errState = errState || er;
    if (--n === 0)
      cb(errState);
  };
  const afterGlob = (er, results) => {
    if (er)
      return cb(er);
    n = results.length;
    if (n === 0)
      return cb();
    results.forEach((p2) => {
      const CB = (er2) => {
        if (er2) {
          if ((er2.code === "EBUSY" || er2.code === "ENOTEMPTY" || er2.code === "EPERM") && busyTries < options.maxBusyTries) {
            busyTries++;
            return setTimeout(() => rimraf_(p2, options, CB), busyTries * 100);
          }
          if (er2.code === "EMFILE" && timeout < options.emfileWait) {
            return setTimeout(() => rimraf_(p2, options, CB), timeout++);
          }
          if (er2.code === "ENOENT")
            er2 = null;
        }
        timeout = 0;
        next(er2);
      };
      rimraf_(p2, options, CB);
    });
  };
  if (options.disableGlob || !glob.hasMagic(p))
    return afterGlob(null, [p]);
  options.lstat(p, (er, stat) => {
    if (!er)
      return afterGlob(null, [p]);
    glob(p, options.glob, afterGlob);
  });
};
const rimraf_ = (p, options, cb) => {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.lstat(p, (er, st) => {
    if (er && er.code === "ENOENT")
      return cb(null);
    if (er && er.code === "EPERM" && isWindows)
      fixWinEPERM(p, options, er, cb);
    if (st && st.isDirectory())
      return rmdir(p, options, er, cb);
    options.unlink(p, (er2) => {
      if (er2) {
        if (er2.code === "ENOENT")
          return cb(null);
        if (er2.code === "EPERM")
          return isWindows ? fixWinEPERM(p, options, er2, cb) : rmdir(p, options, er2, cb);
        if (er2.code === "EISDIR")
          return rmdir(p, options, er2, cb);
      }
      return cb(er2);
    });
  });
};
const fixWinEPERM = (p, options, er, cb) => {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.chmod(p, 438, (er2) => {
    if (er2)
      cb(er2.code === "ENOENT" ? null : er);
    else
      options.stat(p, (er3, stats) => {
        if (er3)
          cb(er3.code === "ENOENT" ? null : er);
        else if (stats.isDirectory())
          rmdir(p, options, er, cb);
        else
          options.unlink(p, cb);
      });
  });
};
const fixWinEPERMSync = (p, options, er) => {
  assert(p);
  assert(options);
  try {
    options.chmodSync(p, 438);
  } catch (er2) {
    if (er2.code === "ENOENT")
      return;
    else
      throw er;
  }
  let stats;
  try {
    stats = options.statSync(p);
  } catch (er3) {
    if (er3.code === "ENOENT")
      return;
    else
      throw er;
  }
  if (stats.isDirectory())
    rmdirSync(p, options, er);
  else
    options.unlinkSync(p);
};
const rmdir = (p, options, originalEr, cb) => {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.rmdir(p, (er) => {
    if (er && (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM"))
      rmkids(p, options, cb);
    else if (er && er.code === "ENOTDIR")
      cb(originalEr);
    else
      cb(er);
  });
};
const rmkids = (p, options, cb) => {
  assert(p);
  assert(options);
  assert(typeof cb === "function");
  options.readdir(p, (er, files) => {
    if (er)
      return cb(er);
    let n = files.length;
    if (n === 0)
      return options.rmdir(p, cb);
    let errState;
    files.forEach((f) => {
      rimraf$1(path$4.join(p, f), options, (er2) => {
        if (errState)
          return;
        if (er2)
          return cb(errState = er2);
        if (--n === 0)
          options.rmdir(p, cb);
      });
    });
  });
};
const rimrafSync = (p, options) => {
  options = options || {};
  defaults(options);
  assert(p, "rimraf: missing path");
  assert.equal(typeof p, "string", "rimraf: path should be a string");
  assert(options, "rimraf: missing options");
  assert.equal(typeof options, "object", "rimraf: options should be object");
  let results;
  if (options.disableGlob || !glob.hasMagic(p)) {
    results = [p];
  } else {
    try {
      options.lstatSync(p);
      results = [p];
    } catch (er) {
      results = glob.sync(p, options.glob);
    }
  }
  if (!results.length)
    return;
  for (let i = 0; i < results.length; i++) {
    const p2 = results[i];
    let st;
    try {
      st = options.lstatSync(p2);
    } catch (er) {
      if (er.code === "ENOENT")
        return;
      if (er.code === "EPERM" && isWindows)
        fixWinEPERMSync(p2, options, er);
    }
    try {
      if (st && st.isDirectory())
        rmdirSync(p2, options, null);
      else
        options.unlinkSync(p2);
    } catch (er) {
      if (er.code === "ENOENT")
        return;
      if (er.code === "EPERM")
        return isWindows ? fixWinEPERMSync(p2, options, er) : rmdirSync(p2, options, er);
      if (er.code !== "EISDIR")
        throw er;
      rmdirSync(p2, options, er);
    }
  }
};
const rmdirSync = (p, options, originalEr) => {
  assert(p);
  assert(options);
  try {
    options.rmdirSync(p);
  } catch (er) {
    if (er.code === "ENOENT")
      return;
    if (er.code === "ENOTDIR")
      throw originalEr;
    if (er.code === "ENOTEMPTY" || er.code === "EEXIST" || er.code === "EPERM")
      rmkidsSync(p, options);
  }
};
const rmkidsSync = (p, options) => {
  assert(p);
  assert(options);
  options.readdirSync(p).forEach((f) => rimrafSync(path$4.join(p, f), options));
  const retries = isWindows ? 100 : 1;
  let i = 0;
  do {
    let threw = true;
    try {
      const ret = options.rmdirSync(p, options);
      threw = false;
      return ret;
    } finally {
      if (++i < retries && threw)
        continue;
    }
  } while (true);
};
var rimraf_1 = rimraf$1;
rimraf$1.sync = rimrafSync;
var utils = {};
(function(exports) {
  Object.defineProperty(exports, "__esModule", { value: true });
  exports.changePermissions = exports.downloadFile = exports.getPath = void 0;
  const electron_12 = require$$0__default$2["default"];
  const fs2 = require$$0__default["default"];
  const path2 = require$$0__default$1["default"];
  const https = require$$3__default$1["default"];
  const getPath = () => {
    const savePath = electron_12.app.getPath("userData");
    return path2.resolve(`${savePath}/extensions`);
  };
  exports.getPath = getPath;
  const request = electron_12.net ? electron_12.net.request : https.get;
  const downloadFile = (from, to) => {
    return new Promise((resolve2, reject) => {
      const req = request(from);
      req.on("response", (res) => {
        if (res.statusCode && res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          return exports.downloadFile(res.headers.location, to).then(resolve2).catch(reject);
        }
        res.pipe(fs2.createWriteStream(to)).on("close", resolve2);
        res.on("error", reject);
      });
      req.on("error", reject);
      req.end();
    });
  };
  exports.downloadFile = downloadFile;
  const changePermissions = (dir, mode) => {
    const files = fs2.readdirSync(dir);
    files.forEach((file) => {
      const filePath = path2.join(dir, file);
      fs2.chmodSync(filePath, parseInt(`${mode}`, 8));
      if (fs2.statSync(filePath).isDirectory()) {
        exports.changePermissions(filePath, mode);
      }
    });
  };
  exports.changePermissions = changePermissions;
})(utils);
var jszip_min = { exports: {} };
/*!

JSZip v3.7.1 - A JavaScript class for generating and reading zip files
<http://stuartk.com/jszip>

(c) 2009-2016 Stuart Knightley <stuart [at] stuartk.com>
Dual licenced under the MIT license or GPLv3. See https://raw.github.com/Stuk/jszip/master/LICENSE.markdown.

JSZip uses the library pako released under the MIT license :
https://github.com/nodeca/pako/blob/master/LICENSE
*/
(function(module, exports) {
  !function(t2) {
    module.exports = t2();
  }(function() {
    return function s(a, o, h) {
      function u(r, t3) {
        if (!o[r]) {
          if (!a[r]) {
            var e = typeof commonjsRequire == "function" && commonjsRequire;
            if (!t3 && e)
              return e(r, true);
            if (l)
              return l(r, true);
            var i = new Error("Cannot find module '" + r + "'");
            throw i.code = "MODULE_NOT_FOUND", i;
          }
          var n = o[r] = { exports: {} };
          a[r][0].call(n.exports, function(t4) {
            var e2 = a[r][1][t4];
            return u(e2 || t4);
          }, n, n.exports, s, a, o, h);
        }
        return o[r].exports;
      }
      for (var l = typeof commonjsRequire == "function" && commonjsRequire, t2 = 0; t2 < h.length; t2++)
        u(h[t2]);
      return u;
    }({ 1: [function(t2, e, r) {
      var c = t2("./utils"), d = t2("./support"), p = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      r.encode = function(t3) {
        for (var e2, r2, i, n, s, a, o, h = [], u = 0, l = t3.length, f = l, d2 = c.getTypeOf(t3) !== "string"; u < t3.length; )
          f = l - u, i = d2 ? (e2 = t3[u++], r2 = u < l ? t3[u++] : 0, u < l ? t3[u++] : 0) : (e2 = t3.charCodeAt(u++), r2 = u < l ? t3.charCodeAt(u++) : 0, u < l ? t3.charCodeAt(u++) : 0), n = e2 >> 2, s = (3 & e2) << 4 | r2 >> 4, a = 1 < f ? (15 & r2) << 2 | i >> 6 : 64, o = 2 < f ? 63 & i : 64, h.push(p.charAt(n) + p.charAt(s) + p.charAt(a) + p.charAt(o));
        return h.join("");
      }, r.decode = function(t3) {
        var e2, r2, i, n, s, a, o = 0, h = 0, u = "data:";
        if (t3.substr(0, u.length) === u)
          throw new Error("Invalid base64 input, it looks like a data url.");
        var l, f = 3 * (t3 = t3.replace(/[^A-Za-z0-9\+\/\=]/g, "")).length / 4;
        if (t3.charAt(t3.length - 1) === p.charAt(64) && f--, t3.charAt(t3.length - 2) === p.charAt(64) && f--, f % 1 != 0)
          throw new Error("Invalid base64 input, bad content length.");
        for (l = d.uint8array ? new Uint8Array(0 | f) : new Array(0 | f); o < t3.length; )
          e2 = p.indexOf(t3.charAt(o++)) << 2 | (n = p.indexOf(t3.charAt(o++))) >> 4, r2 = (15 & n) << 4 | (s = p.indexOf(t3.charAt(o++))) >> 2, i = (3 & s) << 6 | (a = p.indexOf(t3.charAt(o++))), l[h++] = e2, s !== 64 && (l[h++] = r2), a !== 64 && (l[h++] = i);
        return l;
      };
    }, { "./support": 30, "./utils": 32 }], 2: [function(t2, e, r) {
      var i = t2("./external"), n = t2("./stream/DataWorker"), s = t2("./stream/Crc32Probe"), a = t2("./stream/DataLengthProbe");
      function o(t3, e2, r2, i2, n2) {
        this.compressedSize = t3, this.uncompressedSize = e2, this.crc32 = r2, this.compression = i2, this.compressedContent = n2;
      }
      o.prototype = { getContentWorker: function() {
        var t3 = new n(i.Promise.resolve(this.compressedContent)).pipe(this.compression.uncompressWorker()).pipe(new a("data_length")), e2 = this;
        return t3.on("end", function() {
          if (this.streamInfo.data_length !== e2.uncompressedSize)
            throw new Error("Bug : uncompressed data size mismatch");
        }), t3;
      }, getCompressedWorker: function() {
        return new n(i.Promise.resolve(this.compressedContent)).withStreamInfo("compressedSize", this.compressedSize).withStreamInfo("uncompressedSize", this.uncompressedSize).withStreamInfo("crc32", this.crc32).withStreamInfo("compression", this.compression);
      } }, o.createWorkerFrom = function(t3, e2, r2) {
        return t3.pipe(new s()).pipe(new a("uncompressedSize")).pipe(e2.compressWorker(r2)).pipe(new a("compressedSize")).withStreamInfo("compression", e2);
      }, e.exports = o;
    }, { "./external": 6, "./stream/Crc32Probe": 25, "./stream/DataLengthProbe": 26, "./stream/DataWorker": 27 }], 3: [function(t2, e, r) {
      var i = t2("./stream/GenericWorker");
      r.STORE = { magic: "\0\0", compressWorker: function(t3) {
        return new i("STORE compression");
      }, uncompressWorker: function() {
        return new i("STORE decompression");
      } }, r.DEFLATE = t2("./flate");
    }, { "./flate": 7, "./stream/GenericWorker": 28 }], 4: [function(t2, e, r) {
      var i = t2("./utils");
      var o = function() {
        for (var t3, e2 = [], r2 = 0; r2 < 256; r2++) {
          t3 = r2;
          for (var i2 = 0; i2 < 8; i2++)
            t3 = 1 & t3 ? 3988292384 ^ t3 >>> 1 : t3 >>> 1;
          e2[r2] = t3;
        }
        return e2;
      }();
      e.exports = function(t3, e2) {
        return t3 !== void 0 && t3.length ? i.getTypeOf(t3) !== "string" ? function(t4, e3, r2, i2) {
          var n = o, s = i2 + r2;
          t4 ^= -1;
          for (var a = i2; a < s; a++)
            t4 = t4 >>> 8 ^ n[255 & (t4 ^ e3[a])];
          return -1 ^ t4;
        }(0 | e2, t3, t3.length, 0) : function(t4, e3, r2, i2) {
          var n = o, s = i2 + r2;
          t4 ^= -1;
          for (var a = i2; a < s; a++)
            t4 = t4 >>> 8 ^ n[255 & (t4 ^ e3.charCodeAt(a))];
          return -1 ^ t4;
        }(0 | e2, t3, t3.length, 0) : 0;
      };
    }, { "./utils": 32 }], 5: [function(t2, e, r) {
      r.base64 = false, r.binary = false, r.dir = false, r.createFolders = true, r.date = null, r.compression = null, r.compressionOptions = null, r.comment = null, r.unixPermissions = null, r.dosPermissions = null;
    }, {}], 6: [function(t2, e, r) {
      var i = null;
      i = typeof Promise != "undefined" ? Promise : t2("lie"), e.exports = { Promise: i };
    }, { lie: 37 }], 7: [function(t2, e, r) {
      var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Uint32Array != "undefined", n = t2("pako"), s = t2("./utils"), a = t2("./stream/GenericWorker"), o = i ? "uint8array" : "array";
      function h(t3, e2) {
        a.call(this, "FlateWorker/" + t3), this._pako = null, this._pakoAction = t3, this._pakoOptions = e2, this.meta = {};
      }
      r.magic = "\b\0", s.inherits(h, a), h.prototype.processChunk = function(t3) {
        this.meta = t3.meta, this._pako === null && this._createPako(), this._pako.push(s.transformTo(o, t3.data), false);
      }, h.prototype.flush = function() {
        a.prototype.flush.call(this), this._pako === null && this._createPako(), this._pako.push([], true);
      }, h.prototype.cleanUp = function() {
        a.prototype.cleanUp.call(this), this._pako = null;
      }, h.prototype._createPako = function() {
        this._pako = new n[this._pakoAction]({ raw: true, level: this._pakoOptions.level || -1 });
        var e2 = this;
        this._pako.onData = function(t3) {
          e2.push({ data: t3, meta: e2.meta });
        };
      }, r.compressWorker = function(t3) {
        return new h("Deflate", t3);
      }, r.uncompressWorker = function() {
        return new h("Inflate", {});
      };
    }, { "./stream/GenericWorker": 28, "./utils": 32, pako: 38 }], 8: [function(t2, e, r) {
      function A(t3, e2) {
        var r2, i2 = "";
        for (r2 = 0; r2 < e2; r2++)
          i2 += String.fromCharCode(255 & t3), t3 >>>= 8;
        return i2;
      }
      function i(t3, e2, r2, i2, n2, s2) {
        var a, o, h = t3.file, u = t3.compression, l = s2 !== O.utf8encode, f = I.transformTo("string", s2(h.name)), d = I.transformTo("string", O.utf8encode(h.name)), c = h.comment, p = I.transformTo("string", s2(c)), m = I.transformTo("string", O.utf8encode(c)), _2 = d.length !== h.name.length, g = m.length !== c.length, b = "", v = "", y = "", w = h.dir, k = h.date, x = { crc32: 0, compressedSize: 0, uncompressedSize: 0 };
        e2 && !r2 || (x.crc32 = t3.crc32, x.compressedSize = t3.compressedSize, x.uncompressedSize = t3.uncompressedSize);
        var S = 0;
        e2 && (S |= 8), l || !_2 && !g || (S |= 2048);
        var z = 0, C = 0;
        w && (z |= 16), n2 === "UNIX" ? (C = 798, z |= function(t4, e3) {
          var r3 = t4;
          return t4 || (r3 = e3 ? 16893 : 33204), (65535 & r3) << 16;
        }(h.unixPermissions, w)) : (C = 20, z |= function(t4) {
          return 63 & (t4 || 0);
        }(h.dosPermissions)), a = k.getUTCHours(), a <<= 6, a |= k.getUTCMinutes(), a <<= 5, a |= k.getUTCSeconds() / 2, o = k.getUTCFullYear() - 1980, o <<= 4, o |= k.getUTCMonth() + 1, o <<= 5, o |= k.getUTCDate(), _2 && (v = A(1, 1) + A(B(f), 4) + d, b += "up" + A(v.length, 2) + v), g && (y = A(1, 1) + A(B(p), 4) + m, b += "uc" + A(y.length, 2) + y);
        var E = "";
        return E += "\n\0", E += A(S, 2), E += u.magic, E += A(a, 2), E += A(o, 2), E += A(x.crc32, 4), E += A(x.compressedSize, 4), E += A(x.uncompressedSize, 4), E += A(f.length, 2), E += A(b.length, 2), { fileRecord: R.LOCAL_FILE_HEADER + E + f + b, dirRecord: R.CENTRAL_FILE_HEADER + A(C, 2) + E + A(p.length, 2) + "\0\0\0\0" + A(z, 4) + A(i2, 4) + f + b + p };
      }
      var I = t2("../utils"), n = t2("../stream/GenericWorker"), O = t2("../utf8"), B = t2("../crc32"), R = t2("../signature");
      function s(t3, e2, r2, i2) {
        n.call(this, "ZipFileWorker"), this.bytesWritten = 0, this.zipComment = e2, this.zipPlatform = r2, this.encodeFileName = i2, this.streamFiles = t3, this.accumulate = false, this.contentBuffer = [], this.dirRecords = [], this.currentSourceOffset = 0, this.entriesCount = 0, this.currentFile = null, this._sources = [];
      }
      I.inherits(s, n), s.prototype.push = function(t3) {
        var e2 = t3.meta.percent || 0, r2 = this.entriesCount, i2 = this._sources.length;
        this.accumulate ? this.contentBuffer.push(t3) : (this.bytesWritten += t3.data.length, n.prototype.push.call(this, { data: t3.data, meta: { currentFile: this.currentFile, percent: r2 ? (e2 + 100 * (r2 - i2 - 1)) / r2 : 100 } }));
      }, s.prototype.openedSource = function(t3) {
        this.currentSourceOffset = this.bytesWritten, this.currentFile = t3.file.name;
        var e2 = this.streamFiles && !t3.file.dir;
        if (e2) {
          var r2 = i(t3, e2, false, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
          this.push({ data: r2.fileRecord, meta: { percent: 0 } });
        } else
          this.accumulate = true;
      }, s.prototype.closedSource = function(t3) {
        this.accumulate = false;
        var e2 = this.streamFiles && !t3.file.dir, r2 = i(t3, e2, true, this.currentSourceOffset, this.zipPlatform, this.encodeFileName);
        if (this.dirRecords.push(r2.dirRecord), e2)
          this.push({ data: function(t4) {
            return R.DATA_DESCRIPTOR + A(t4.crc32, 4) + A(t4.compressedSize, 4) + A(t4.uncompressedSize, 4);
          }(t3), meta: { percent: 100 } });
        else
          for (this.push({ data: r2.fileRecord, meta: { percent: 0 } }); this.contentBuffer.length; )
            this.push(this.contentBuffer.shift());
        this.currentFile = null;
      }, s.prototype.flush = function() {
        for (var t3 = this.bytesWritten, e2 = 0; e2 < this.dirRecords.length; e2++)
          this.push({ data: this.dirRecords[e2], meta: { percent: 100 } });
        var r2 = this.bytesWritten - t3, i2 = function(t4, e3, r3, i3, n2) {
          var s2 = I.transformTo("string", n2(i3));
          return R.CENTRAL_DIRECTORY_END + "\0\0\0\0" + A(t4, 2) + A(t4, 2) + A(e3, 4) + A(r3, 4) + A(s2.length, 2) + s2;
        }(this.dirRecords.length, r2, t3, this.zipComment, this.encodeFileName);
        this.push({ data: i2, meta: { percent: 100 } });
      }, s.prototype.prepareNextSource = function() {
        this.previous = this._sources.shift(), this.openedSource(this.previous.streamInfo), this.isPaused ? this.previous.pause() : this.previous.resume();
      }, s.prototype.registerPrevious = function(t3) {
        this._sources.push(t3);
        var e2 = this;
        return t3.on("data", function(t4) {
          e2.processChunk(t4);
        }), t3.on("end", function() {
          e2.closedSource(e2.previous.streamInfo), e2._sources.length ? e2.prepareNextSource() : e2.end();
        }), t3.on("error", function(t4) {
          e2.error(t4);
        }), this;
      }, s.prototype.resume = function() {
        return !!n.prototype.resume.call(this) && (!this.previous && this._sources.length ? (this.prepareNextSource(), true) : this.previous || this._sources.length || this.generatedError ? void 0 : (this.end(), true));
      }, s.prototype.error = function(t3) {
        var e2 = this._sources;
        if (!n.prototype.error.call(this, t3))
          return false;
        for (var r2 = 0; r2 < e2.length; r2++)
          try {
            e2[r2].error(t3);
          } catch (t4) {
          }
        return true;
      }, s.prototype.lock = function() {
        n.prototype.lock.call(this);
        for (var t3 = this._sources, e2 = 0; e2 < t3.length; e2++)
          t3[e2].lock();
      }, e.exports = s;
    }, { "../crc32": 4, "../signature": 23, "../stream/GenericWorker": 28, "../utf8": 31, "../utils": 32 }], 9: [function(t2, e, r) {
      var u = t2("../compressions"), i = t2("./ZipFileWorker");
      r.generateWorker = function(t3, a, e2) {
        var o = new i(a.streamFiles, e2, a.platform, a.encodeFileName), h = 0;
        try {
          t3.forEach(function(t4, e3) {
            h++;
            var r2 = function(t5, e4) {
              var r3 = t5 || e4, i3 = u[r3];
              if (!i3)
                throw new Error(r3 + " is not a valid compression method !");
              return i3;
            }(e3.options.compression, a.compression), i2 = e3.options.compressionOptions || a.compressionOptions || {}, n = e3.dir, s = e3.date;
            e3._compressWorker(r2, i2).withStreamInfo("file", { name: t4, dir: n, date: s, comment: e3.comment || "", unixPermissions: e3.unixPermissions, dosPermissions: e3.dosPermissions }).pipe(o);
          }), o.entriesCount = h;
        } catch (t4) {
          o.error(t4);
        }
        return o;
      };
    }, { "../compressions": 3, "./ZipFileWorker": 8 }], 10: [function(t2, e, r) {
      function i() {
        if (!(this instanceof i))
          return new i();
        if (arguments.length)
          throw new Error("The constructor with parameters has been removed in JSZip 3.0, please check the upgrade guide.");
        this.files = Object.create(null), this.comment = null, this.root = "", this.clone = function() {
          var t3 = new i();
          for (var e2 in this)
            typeof this[e2] != "function" && (t3[e2] = this[e2]);
          return t3;
        };
      }
      (i.prototype = t2("./object")).loadAsync = t2("./load"), i.support = t2("./support"), i.defaults = t2("./defaults"), i.version = "3.7.1", i.loadAsync = function(t3, e2) {
        return new i().loadAsync(t3, e2);
      }, i.external = t2("./external"), e.exports = i;
    }, { "./defaults": 5, "./external": 6, "./load": 11, "./object": 15, "./support": 30 }], 11: [function(t2, e, r) {
      var i = t2("./utils"), n = t2("./external"), o = t2("./utf8"), h = t2("./zipEntries"), s = t2("./stream/Crc32Probe"), u = t2("./nodejsUtils");
      function l(i2) {
        return new n.Promise(function(t3, e2) {
          var r2 = i2.decompressed.getContentWorker().pipe(new s());
          r2.on("error", function(t4) {
            e2(t4);
          }).on("end", function() {
            r2.streamInfo.crc32 !== i2.decompressed.crc32 ? e2(new Error("Corrupted zip : CRC32 mismatch")) : t3();
          }).resume();
        });
      }
      e.exports = function(t3, s2) {
        var a = this;
        return s2 = i.extend(s2 || {}, { base64: false, checkCRC32: false, optimizedBinaryString: false, createFolders: false, decodeFileName: o.utf8decode }), u.isNode && u.isStream(t3) ? n.Promise.reject(new Error("JSZip can't accept a stream when loading a zip file.")) : i.prepareContent("the loaded zip file", t3, true, s2.optimizedBinaryString, s2.base64).then(function(t4) {
          var e2 = new h(s2);
          return e2.load(t4), e2;
        }).then(function(t4) {
          var e2 = [n.Promise.resolve(t4)], r2 = t4.files;
          if (s2.checkCRC32)
            for (var i2 = 0; i2 < r2.length; i2++)
              e2.push(l(r2[i2]));
          return n.Promise.all(e2);
        }).then(function(t4) {
          for (var e2 = t4.shift(), r2 = e2.files, i2 = 0; i2 < r2.length; i2++) {
            var n2 = r2[i2];
            a.file(n2.fileNameStr, n2.decompressed, { binary: true, optimizedBinaryString: true, date: n2.date, dir: n2.dir, comment: n2.fileCommentStr.length ? n2.fileCommentStr : null, unixPermissions: n2.unixPermissions, dosPermissions: n2.dosPermissions, createFolders: s2.createFolders });
          }
          return e2.zipComment.length && (a.comment = e2.zipComment), a;
        });
      };
    }, { "./external": 6, "./nodejsUtils": 14, "./stream/Crc32Probe": 25, "./utf8": 31, "./utils": 32, "./zipEntries": 33 }], 12: [function(t2, e, r) {
      var i = t2("../utils"), n = t2("../stream/GenericWorker");
      function s(t3, e2) {
        n.call(this, "Nodejs stream input adapter for " + t3), this._upstreamEnded = false, this._bindStream(e2);
      }
      i.inherits(s, n), s.prototype._bindStream = function(t3) {
        var e2 = this;
        (this._stream = t3).pause(), t3.on("data", function(t4) {
          e2.push({ data: t4, meta: { percent: 0 } });
        }).on("error", function(t4) {
          e2.isPaused ? this.generatedError = t4 : e2.error(t4);
        }).on("end", function() {
          e2.isPaused ? e2._upstreamEnded = true : e2.end();
        });
      }, s.prototype.pause = function() {
        return !!n.prototype.pause.call(this) && (this._stream.pause(), true);
      }, s.prototype.resume = function() {
        return !!n.prototype.resume.call(this) && (this._upstreamEnded ? this.end() : this._stream.resume(), true);
      }, e.exports = s;
    }, { "../stream/GenericWorker": 28, "../utils": 32 }], 13: [function(t2, e, r) {
      var n = t2("readable-stream").Readable;
      function i(t3, e2, r2) {
        n.call(this, e2), this._helper = t3;
        var i2 = this;
        t3.on("data", function(t4, e3) {
          i2.push(t4) || i2._helper.pause(), r2 && r2(e3);
        }).on("error", function(t4) {
          i2.emit("error", t4);
        }).on("end", function() {
          i2.push(null);
        });
      }
      t2("../utils").inherits(i, n), i.prototype._read = function() {
        this._helper.resume();
      }, e.exports = i;
    }, { "../utils": 32, "readable-stream": 16 }], 14: [function(t2, e, r) {
      e.exports = { isNode: typeof Buffer != "undefined", newBufferFrom: function(t3, e2) {
        if (Buffer.from && Buffer.from !== Uint8Array.from)
          return Buffer.from(t3, e2);
        if (typeof t3 == "number")
          throw new Error('The "data" argument must not be a number');
        return new Buffer(t3, e2);
      }, allocBuffer: function(t3) {
        if (Buffer.alloc)
          return Buffer.alloc(t3);
        var e2 = new Buffer(t3);
        return e2.fill(0), e2;
      }, isBuffer: function(t3) {
        return Buffer.isBuffer(t3);
      }, isStream: function(t3) {
        return t3 && typeof t3.on == "function" && typeof t3.pause == "function" && typeof t3.resume == "function";
      } };
    }, {}], 15: [function(t2, e, r) {
      function s(t3, e2, r2) {
        var i2, n2 = u.getTypeOf(e2), s2 = u.extend(r2 || {}, f);
        s2.date = s2.date || new Date(), s2.compression !== null && (s2.compression = s2.compression.toUpperCase()), typeof s2.unixPermissions == "string" && (s2.unixPermissions = parseInt(s2.unixPermissions, 8)), s2.unixPermissions && 16384 & s2.unixPermissions && (s2.dir = true), s2.dosPermissions && 16 & s2.dosPermissions && (s2.dir = true), s2.dir && (t3 = g(t3)), s2.createFolders && (i2 = _2(t3)) && b.call(this, i2, true);
        var a2 = n2 === "string" && s2.binary === false && s2.base64 === false;
        r2 && r2.binary !== void 0 || (s2.binary = !a2), (e2 instanceof d && e2.uncompressedSize === 0 || s2.dir || !e2 || e2.length === 0) && (s2.base64 = false, s2.binary = true, e2 = "", s2.compression = "STORE", n2 = "string");
        var o2 = null;
        o2 = e2 instanceof d || e2 instanceof l ? e2 : p.isNode && p.isStream(e2) ? new m(t3, e2) : u.prepareContent(t3, e2, s2.binary, s2.optimizedBinaryString, s2.base64);
        var h2 = new c(t3, o2, s2);
        this.files[t3] = h2;
      }
      var n = t2("./utf8"), u = t2("./utils"), l = t2("./stream/GenericWorker"), a = t2("./stream/StreamHelper"), f = t2("./defaults"), d = t2("./compressedObject"), c = t2("./zipObject"), o = t2("./generate"), p = t2("./nodejsUtils"), m = t2("./nodejs/NodejsStreamInputAdapter"), _2 = function(t3) {
        t3.slice(-1) === "/" && (t3 = t3.substring(0, t3.length - 1));
        var e2 = t3.lastIndexOf("/");
        return 0 < e2 ? t3.substring(0, e2) : "";
      }, g = function(t3) {
        return t3.slice(-1) !== "/" && (t3 += "/"), t3;
      }, b = function(t3, e2) {
        return e2 = e2 !== void 0 ? e2 : f.createFolders, t3 = g(t3), this.files[t3] || s.call(this, t3, null, { dir: true, createFolders: e2 }), this.files[t3];
      };
      function h(t3) {
        return Object.prototype.toString.call(t3) === "[object RegExp]";
      }
      var i = { load: function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, forEach: function(t3) {
        var e2, r2, i2;
        for (e2 in this.files)
          i2 = this.files[e2], (r2 = e2.slice(this.root.length, e2.length)) && e2.slice(0, this.root.length) === this.root && t3(r2, i2);
      }, filter: function(r2) {
        var i2 = [];
        return this.forEach(function(t3, e2) {
          r2(t3, e2) && i2.push(e2);
        }), i2;
      }, file: function(t3, e2, r2) {
        if (arguments.length !== 1)
          return t3 = this.root + t3, s.call(this, t3, e2, r2), this;
        if (h(t3)) {
          var i2 = t3;
          return this.filter(function(t4, e3) {
            return !e3.dir && i2.test(t4);
          });
        }
        var n2 = this.files[this.root + t3];
        return n2 && !n2.dir ? n2 : null;
      }, folder: function(r2) {
        if (!r2)
          return this;
        if (h(r2))
          return this.filter(function(t4, e3) {
            return e3.dir && r2.test(t4);
          });
        var t3 = this.root + r2, e2 = b.call(this, t3), i2 = this.clone();
        return i2.root = e2.name, i2;
      }, remove: function(r2) {
        r2 = this.root + r2;
        var t3 = this.files[r2];
        if (t3 || (r2.slice(-1) !== "/" && (r2 += "/"), t3 = this.files[r2]), t3 && !t3.dir)
          delete this.files[r2];
        else
          for (var e2 = this.filter(function(t4, e3) {
            return e3.name.slice(0, r2.length) === r2;
          }), i2 = 0; i2 < e2.length; i2++)
            delete this.files[e2[i2].name];
        return this;
      }, generate: function(t3) {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, generateInternalStream: function(t3) {
        var e2, r2 = {};
        try {
          if ((r2 = u.extend(t3 || {}, { streamFiles: false, compression: "STORE", compressionOptions: null, type: "", platform: "DOS", comment: null, mimeType: "application/zip", encodeFileName: n.utf8encode })).type = r2.type.toLowerCase(), r2.compression = r2.compression.toUpperCase(), r2.type === "binarystring" && (r2.type = "string"), !r2.type)
            throw new Error("No output type specified.");
          u.checkSupport(r2.type), r2.platform !== "darwin" && r2.platform !== "freebsd" && r2.platform !== "linux" && r2.platform !== "sunos" || (r2.platform = "UNIX"), r2.platform === "win32" && (r2.platform = "DOS");
          var i2 = r2.comment || this.comment || "";
          e2 = o.generateWorker(this, r2, i2);
        } catch (t4) {
          (e2 = new l("error")).error(t4);
        }
        return new a(e2, r2.type || "string", r2.mimeType);
      }, generateAsync: function(t3, e2) {
        return this.generateInternalStream(t3).accumulate(e2);
      }, generateNodeStream: function(t3, e2) {
        return (t3 = t3 || {}).type || (t3.type = "nodebuffer"), this.generateInternalStream(t3).toNodejsStream(e2);
      } };
      e.exports = i;
    }, { "./compressedObject": 2, "./defaults": 5, "./generate": 9, "./nodejs/NodejsStreamInputAdapter": 12, "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31, "./utils": 32, "./zipObject": 35 }], 16: [function(t2, e, r) {
      e.exports = t2("stream");
    }, { stream: void 0 }], 17: [function(t2, e, r) {
      var i = t2("./DataReader");
      function n(t3) {
        i.call(this, t3);
        for (var e2 = 0; e2 < this.data.length; e2++)
          t3[e2] = 255 & t3[e2];
      }
      t2("../utils").inherits(n, i), n.prototype.byteAt = function(t3) {
        return this.data[this.zero + t3];
      }, n.prototype.lastIndexOfSignature = function(t3) {
        for (var e2 = t3.charCodeAt(0), r2 = t3.charCodeAt(1), i2 = t3.charCodeAt(2), n2 = t3.charCodeAt(3), s = this.length - 4; 0 <= s; --s)
          if (this.data[s] === e2 && this.data[s + 1] === r2 && this.data[s + 2] === i2 && this.data[s + 3] === n2)
            return s - this.zero;
        return -1;
      }, n.prototype.readAndCheckSignature = function(t3) {
        var e2 = t3.charCodeAt(0), r2 = t3.charCodeAt(1), i2 = t3.charCodeAt(2), n2 = t3.charCodeAt(3), s = this.readData(4);
        return e2 === s[0] && r2 === s[1] && i2 === s[2] && n2 === s[3];
      }, n.prototype.readData = function(t3) {
        if (this.checkOffset(t3), t3 === 0)
          return [];
        var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t3);
        return this.index += t3, e2;
      }, e.exports = n;
    }, { "../utils": 32, "./DataReader": 18 }], 18: [function(t2, e, r) {
      var i = t2("../utils");
      function n(t3) {
        this.data = t3, this.length = t3.length, this.index = 0, this.zero = 0;
      }
      n.prototype = { checkOffset: function(t3) {
        this.checkIndex(this.index + t3);
      }, checkIndex: function(t3) {
        if (this.length < this.zero + t3 || t3 < 0)
          throw new Error("End of data reached (data length = " + this.length + ", asked index = " + t3 + "). Corrupted zip ?");
      }, setIndex: function(t3) {
        this.checkIndex(t3), this.index = t3;
      }, skip: function(t3) {
        this.setIndex(this.index + t3);
      }, byteAt: function(t3) {
      }, readInt: function(t3) {
        var e2, r2 = 0;
        for (this.checkOffset(t3), e2 = this.index + t3 - 1; e2 >= this.index; e2--)
          r2 = (r2 << 8) + this.byteAt(e2);
        return this.index += t3, r2;
      }, readString: function(t3) {
        return i.transformTo("string", this.readData(t3));
      }, readData: function(t3) {
      }, lastIndexOfSignature: function(t3) {
      }, readAndCheckSignature: function(t3) {
      }, readDate: function() {
        var t3 = this.readInt(4);
        return new Date(Date.UTC(1980 + (t3 >> 25 & 127), (t3 >> 21 & 15) - 1, t3 >> 16 & 31, t3 >> 11 & 31, t3 >> 5 & 63, (31 & t3) << 1));
      } }, e.exports = n;
    }, { "../utils": 32 }], 19: [function(t2, e, r) {
      var i = t2("./Uint8ArrayReader");
      function n(t3) {
        i.call(this, t3);
      }
      t2("../utils").inherits(n, i), n.prototype.readData = function(t3) {
        this.checkOffset(t3);
        var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t3);
        return this.index += t3, e2;
      }, e.exports = n;
    }, { "../utils": 32, "./Uint8ArrayReader": 21 }], 20: [function(t2, e, r) {
      var i = t2("./DataReader");
      function n(t3) {
        i.call(this, t3);
      }
      t2("../utils").inherits(n, i), n.prototype.byteAt = function(t3) {
        return this.data.charCodeAt(this.zero + t3);
      }, n.prototype.lastIndexOfSignature = function(t3) {
        return this.data.lastIndexOf(t3) - this.zero;
      }, n.prototype.readAndCheckSignature = function(t3) {
        return t3 === this.readData(4);
      }, n.prototype.readData = function(t3) {
        this.checkOffset(t3);
        var e2 = this.data.slice(this.zero + this.index, this.zero + this.index + t3);
        return this.index += t3, e2;
      }, e.exports = n;
    }, { "../utils": 32, "./DataReader": 18 }], 21: [function(t2, e, r) {
      var i = t2("./ArrayReader");
      function n(t3) {
        i.call(this, t3);
      }
      t2("../utils").inherits(n, i), n.prototype.readData = function(t3) {
        if (this.checkOffset(t3), t3 === 0)
          return new Uint8Array(0);
        var e2 = this.data.subarray(this.zero + this.index, this.zero + this.index + t3);
        return this.index += t3, e2;
      }, e.exports = n;
    }, { "../utils": 32, "./ArrayReader": 17 }], 22: [function(t2, e, r) {
      var i = t2("../utils"), n = t2("../support"), s = t2("./ArrayReader"), a = t2("./StringReader"), o = t2("./NodeBufferReader"), h = t2("./Uint8ArrayReader");
      e.exports = function(t3) {
        var e2 = i.getTypeOf(t3);
        return i.checkSupport(e2), e2 !== "string" || n.uint8array ? e2 === "nodebuffer" ? new o(t3) : n.uint8array ? new h(i.transformTo("uint8array", t3)) : new s(i.transformTo("array", t3)) : new a(t3);
      };
    }, { "../support": 30, "../utils": 32, "./ArrayReader": 17, "./NodeBufferReader": 19, "./StringReader": 20, "./Uint8ArrayReader": 21 }], 23: [function(t2, e, r) {
      r.LOCAL_FILE_HEADER = "PK", r.CENTRAL_FILE_HEADER = "PK", r.CENTRAL_DIRECTORY_END = "PK", r.ZIP64_CENTRAL_DIRECTORY_LOCATOR = "PK\x07", r.ZIP64_CENTRAL_DIRECTORY_END = "PK", r.DATA_DESCRIPTOR = "PK\x07\b";
    }, {}], 24: [function(t2, e, r) {
      var i = t2("./GenericWorker"), n = t2("../utils");
      function s(t3) {
        i.call(this, "ConvertWorker to " + t3), this.destType = t3;
      }
      n.inherits(s, i), s.prototype.processChunk = function(t3) {
        this.push({ data: n.transformTo(this.destType, t3.data), meta: t3.meta });
      }, e.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 25: [function(t2, e, r) {
      var i = t2("./GenericWorker"), n = t2("../crc32");
      function s() {
        i.call(this, "Crc32Probe"), this.withStreamInfo("crc32", 0);
      }
      t2("../utils").inherits(s, i), s.prototype.processChunk = function(t3) {
        this.streamInfo.crc32 = n(t3.data, this.streamInfo.crc32 || 0), this.push(t3);
      }, e.exports = s;
    }, { "../crc32": 4, "../utils": 32, "./GenericWorker": 28 }], 26: [function(t2, e, r) {
      var i = t2("../utils"), n = t2("./GenericWorker");
      function s(t3) {
        n.call(this, "DataLengthProbe for " + t3), this.propName = t3, this.withStreamInfo(t3, 0);
      }
      i.inherits(s, n), s.prototype.processChunk = function(t3) {
        if (t3) {
          var e2 = this.streamInfo[this.propName] || 0;
          this.streamInfo[this.propName] = e2 + t3.data.length;
        }
        n.prototype.processChunk.call(this, t3);
      }, e.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 27: [function(t2, e, r) {
      var i = t2("../utils"), n = t2("./GenericWorker");
      function s(t3) {
        n.call(this, "DataWorker");
        var e2 = this;
        this.dataIsReady = false, this.index = 0, this.max = 0, this.data = null, this.type = "", this._tickScheduled = false, t3.then(function(t4) {
          e2.dataIsReady = true, e2.data = t4, e2.max = t4 && t4.length || 0, e2.type = i.getTypeOf(t4), e2.isPaused || e2._tickAndRepeat();
        }, function(t4) {
          e2.error(t4);
        });
      }
      i.inherits(s, n), s.prototype.cleanUp = function() {
        n.prototype.cleanUp.call(this), this.data = null;
      }, s.prototype.resume = function() {
        return !!n.prototype.resume.call(this) && (!this._tickScheduled && this.dataIsReady && (this._tickScheduled = true, i.delay(this._tickAndRepeat, [], this)), true);
      }, s.prototype._tickAndRepeat = function() {
        this._tickScheduled = false, this.isPaused || this.isFinished || (this._tick(), this.isFinished || (i.delay(this._tickAndRepeat, [], this), this._tickScheduled = true));
      }, s.prototype._tick = function() {
        if (this.isPaused || this.isFinished)
          return false;
        var t3 = null, e2 = Math.min(this.max, this.index + 16384);
        if (this.index >= this.max)
          return this.end();
        switch (this.type) {
          case "string":
            t3 = this.data.substring(this.index, e2);
            break;
          case "uint8array":
            t3 = this.data.subarray(this.index, e2);
            break;
          case "array":
          case "nodebuffer":
            t3 = this.data.slice(this.index, e2);
        }
        return this.index = e2, this.push({ data: t3, meta: { percent: this.max ? this.index / this.max * 100 : 0 } });
      }, e.exports = s;
    }, { "../utils": 32, "./GenericWorker": 28 }], 28: [function(t2, e, r) {
      function i(t3) {
        this.name = t3 || "default", this.streamInfo = {}, this.generatedError = null, this.extraStreamInfo = {}, this.isPaused = true, this.isFinished = false, this.isLocked = false, this._listeners = { data: [], end: [], error: [] }, this.previous = null;
      }
      i.prototype = { push: function(t3) {
        this.emit("data", t3);
      }, end: function() {
        if (this.isFinished)
          return false;
        this.flush();
        try {
          this.emit("end"), this.cleanUp(), this.isFinished = true;
        } catch (t3) {
          this.emit("error", t3);
        }
        return true;
      }, error: function(t3) {
        return !this.isFinished && (this.isPaused ? this.generatedError = t3 : (this.isFinished = true, this.emit("error", t3), this.previous && this.previous.error(t3), this.cleanUp()), true);
      }, on: function(t3, e2) {
        return this._listeners[t3].push(e2), this;
      }, cleanUp: function() {
        this.streamInfo = this.generatedError = this.extraStreamInfo = null, this._listeners = [];
      }, emit: function(t3, e2) {
        if (this._listeners[t3])
          for (var r2 = 0; r2 < this._listeners[t3].length; r2++)
            this._listeners[t3][r2].call(this, e2);
      }, pipe: function(t3) {
        return t3.registerPrevious(this);
      }, registerPrevious: function(t3) {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        this.streamInfo = t3.streamInfo, this.mergeStreamInfo(), this.previous = t3;
        var e2 = this;
        return t3.on("data", function(t4) {
          e2.processChunk(t4);
        }), t3.on("end", function() {
          e2.end();
        }), t3.on("error", function(t4) {
          e2.error(t4);
        }), this;
      }, pause: function() {
        return !this.isPaused && !this.isFinished && (this.isPaused = true, this.previous && this.previous.pause(), true);
      }, resume: function() {
        if (!this.isPaused || this.isFinished)
          return false;
        var t3 = this.isPaused = false;
        return this.generatedError && (this.error(this.generatedError), t3 = true), this.previous && this.previous.resume(), !t3;
      }, flush: function() {
      }, processChunk: function(t3) {
        this.push(t3);
      }, withStreamInfo: function(t3, e2) {
        return this.extraStreamInfo[t3] = e2, this.mergeStreamInfo(), this;
      }, mergeStreamInfo: function() {
        for (var t3 in this.extraStreamInfo)
          this.extraStreamInfo.hasOwnProperty(t3) && (this.streamInfo[t3] = this.extraStreamInfo[t3]);
      }, lock: function() {
        if (this.isLocked)
          throw new Error("The stream '" + this + "' has already been used.");
        this.isLocked = true, this.previous && this.previous.lock();
      }, toString: function() {
        var t3 = "Worker " + this.name;
        return this.previous ? this.previous + " -> " + t3 : t3;
      } }, e.exports = i;
    }, {}], 29: [function(t2, e, r) {
      var h = t2("../utils"), n = t2("./ConvertWorker"), s = t2("./GenericWorker"), u = t2("../base64"), i = t2("../support"), a = t2("../external"), o = null;
      if (i.nodestream)
        try {
          o = t2("../nodejs/NodejsStreamOutputAdapter");
        } catch (t3) {
        }
      function l(t3, o2) {
        return new a.Promise(function(e2, r2) {
          var i2 = [], n2 = t3._internalType, s2 = t3._outputType, a2 = t3._mimeType;
          t3.on("data", function(t4, e3) {
            i2.push(t4), o2 && o2(e3);
          }).on("error", function(t4) {
            i2 = [], r2(t4);
          }).on("end", function() {
            try {
              var t4 = function(t5, e3, r3) {
                switch (t5) {
                  case "blob":
                    return h.newBlob(h.transformTo("arraybuffer", e3), r3);
                  case "base64":
                    return u.encode(e3);
                  default:
                    return h.transformTo(t5, e3);
                }
              }(s2, function(t5, e3) {
                var r3, i3 = 0, n3 = null, s3 = 0;
                for (r3 = 0; r3 < e3.length; r3++)
                  s3 += e3[r3].length;
                switch (t5) {
                  case "string":
                    return e3.join("");
                  case "array":
                    return Array.prototype.concat.apply([], e3);
                  case "uint8array":
                    for (n3 = new Uint8Array(s3), r3 = 0; r3 < e3.length; r3++)
                      n3.set(e3[r3], i3), i3 += e3[r3].length;
                    return n3;
                  case "nodebuffer":
                    return Buffer.concat(e3);
                  default:
                    throw new Error("concat : unsupported type '" + t5 + "'");
                }
              }(n2, i2), a2);
              e2(t4);
            } catch (t5) {
              r2(t5);
            }
            i2 = [];
          }).resume();
        });
      }
      function f(t3, e2, r2) {
        var i2 = e2;
        switch (e2) {
          case "blob":
          case "arraybuffer":
            i2 = "uint8array";
            break;
          case "base64":
            i2 = "string";
        }
        try {
          this._internalType = i2, this._outputType = e2, this._mimeType = r2, h.checkSupport(i2), this._worker = t3.pipe(new n(i2)), t3.lock();
        } catch (t4) {
          this._worker = new s("error"), this._worker.error(t4);
        }
      }
      f.prototype = { accumulate: function(t3) {
        return l(this, t3);
      }, on: function(t3, e2) {
        var r2 = this;
        return t3 === "data" ? this._worker.on(t3, function(t4) {
          e2.call(r2, t4.data, t4.meta);
        }) : this._worker.on(t3, function() {
          h.delay(e2, arguments, r2);
        }), this;
      }, resume: function() {
        return h.delay(this._worker.resume, [], this._worker), this;
      }, pause: function() {
        return this._worker.pause(), this;
      }, toNodejsStream: function(t3) {
        if (h.checkSupport("nodestream"), this._outputType !== "nodebuffer")
          throw new Error(this._outputType + " is not supported by this method");
        return new o(this, { objectMode: this._outputType !== "nodebuffer" }, t3);
      } }, e.exports = f;
    }, { "../base64": 1, "../external": 6, "../nodejs/NodejsStreamOutputAdapter": 13, "../support": 30, "../utils": 32, "./ConvertWorker": 24, "./GenericWorker": 28 }], 30: [function(t2, e, r) {
      if (r.base64 = true, r.array = true, r.string = true, r.arraybuffer = typeof ArrayBuffer != "undefined" && typeof Uint8Array != "undefined", r.nodebuffer = typeof Buffer != "undefined", r.uint8array = typeof Uint8Array != "undefined", typeof ArrayBuffer == "undefined")
        r.blob = false;
      else {
        var i = new ArrayBuffer(0);
        try {
          r.blob = new Blob([i], { type: "application/zip" }).size === 0;
        } catch (t3) {
          try {
            var n = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            n.append(i), r.blob = n.getBlob("application/zip").size === 0;
          } catch (t4) {
            r.blob = false;
          }
        }
      }
      try {
        r.nodestream = !!t2("readable-stream").Readable;
      } catch (t3) {
        r.nodestream = false;
      }
    }, { "readable-stream": 16 }], 31: [function(t2, e, s) {
      for (var o = t2("./utils"), h = t2("./support"), r = t2("./nodejsUtils"), i = t2("./stream/GenericWorker"), u = new Array(256), n = 0; n < 256; n++)
        u[n] = 252 <= n ? 6 : 248 <= n ? 5 : 240 <= n ? 4 : 224 <= n ? 3 : 192 <= n ? 2 : 1;
      u[254] = u[254] = 1;
      function a() {
        i.call(this, "utf-8 decode"), this.leftOver = null;
      }
      function l() {
        i.call(this, "utf-8 encode");
      }
      s.utf8encode = function(t3) {
        return h.nodebuffer ? r.newBufferFrom(t3, "utf-8") : function(t4) {
          var e2, r2, i2, n2, s2, a2 = t4.length, o2 = 0;
          for (n2 = 0; n2 < a2; n2++)
            (64512 & (r2 = t4.charCodeAt(n2))) == 55296 && n2 + 1 < a2 && (64512 & (i2 = t4.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), o2 += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
          for (e2 = h.uint8array ? new Uint8Array(o2) : new Array(o2), n2 = s2 = 0; s2 < o2; n2++)
            (64512 & (r2 = t4.charCodeAt(n2))) == 55296 && n2 + 1 < a2 && (64512 & (i2 = t4.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), r2 < 128 ? e2[s2++] = r2 : (r2 < 2048 ? e2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? e2[s2++] = 224 | r2 >>> 12 : (e2[s2++] = 240 | r2 >>> 18, e2[s2++] = 128 | r2 >>> 12 & 63), e2[s2++] = 128 | r2 >>> 6 & 63), e2[s2++] = 128 | 63 & r2);
          return e2;
        }(t3);
      }, s.utf8decode = function(t3) {
        return h.nodebuffer ? o.transformTo("nodebuffer", t3).toString("utf-8") : function(t4) {
          var e2, r2, i2, n2, s2 = t4.length, a2 = new Array(2 * s2);
          for (e2 = r2 = 0; e2 < s2; )
            if ((i2 = t4[e2++]) < 128)
              a2[r2++] = i2;
            else if (4 < (n2 = u[i2]))
              a2[r2++] = 65533, e2 += n2 - 1;
            else {
              for (i2 &= n2 === 2 ? 31 : n2 === 3 ? 15 : 7; 1 < n2 && e2 < s2; )
                i2 = i2 << 6 | 63 & t4[e2++], n2--;
              1 < n2 ? a2[r2++] = 65533 : i2 < 65536 ? a2[r2++] = i2 : (i2 -= 65536, a2[r2++] = 55296 | i2 >> 10 & 1023, a2[r2++] = 56320 | 1023 & i2);
            }
          return a2.length !== r2 && (a2.subarray ? a2 = a2.subarray(0, r2) : a2.length = r2), o.applyFromCharCode(a2);
        }(t3 = o.transformTo(h.uint8array ? "uint8array" : "array", t3));
      }, o.inherits(a, i), a.prototype.processChunk = function(t3) {
        var e2 = o.transformTo(h.uint8array ? "uint8array" : "array", t3.data);
        if (this.leftOver && this.leftOver.length) {
          if (h.uint8array) {
            var r2 = e2;
            (e2 = new Uint8Array(r2.length + this.leftOver.length)).set(this.leftOver, 0), e2.set(r2, this.leftOver.length);
          } else
            e2 = this.leftOver.concat(e2);
          this.leftOver = null;
        }
        var i2 = function(t4, e3) {
          var r3;
          for ((e3 = e3 || t4.length) > t4.length && (e3 = t4.length), r3 = e3 - 1; 0 <= r3 && (192 & t4[r3]) == 128; )
            r3--;
          return r3 < 0 ? e3 : r3 === 0 ? e3 : r3 + u[t4[r3]] > e3 ? r3 : e3;
        }(e2), n2 = e2;
        i2 !== e2.length && (h.uint8array ? (n2 = e2.subarray(0, i2), this.leftOver = e2.subarray(i2, e2.length)) : (n2 = e2.slice(0, i2), this.leftOver = e2.slice(i2, e2.length))), this.push({ data: s.utf8decode(n2), meta: t3.meta });
      }, a.prototype.flush = function() {
        this.leftOver && this.leftOver.length && (this.push({ data: s.utf8decode(this.leftOver), meta: {} }), this.leftOver = null);
      }, s.Utf8DecodeWorker = a, o.inherits(l, i), l.prototype.processChunk = function(t3) {
        this.push({ data: s.utf8encode(t3.data), meta: t3.meta });
      }, s.Utf8EncodeWorker = l;
    }, { "./nodejsUtils": 14, "./stream/GenericWorker": 28, "./support": 30, "./utils": 32 }], 32: [function(t2, e, a) {
      var o = t2("./support"), h = t2("./base64"), r = t2("./nodejsUtils"), i = t2("set-immediate-shim"), u = t2("./external");
      function n(t3) {
        return t3;
      }
      function l(t3, e2) {
        for (var r2 = 0; r2 < t3.length; ++r2)
          e2[r2] = 255 & t3.charCodeAt(r2);
        return e2;
      }
      a.newBlob = function(e2, r2) {
        a.checkSupport("blob");
        try {
          return new Blob([e2], { type: r2 });
        } catch (t3) {
          try {
            var i2 = new (self.BlobBuilder || self.WebKitBlobBuilder || self.MozBlobBuilder || self.MSBlobBuilder)();
            return i2.append(e2), i2.getBlob(r2);
          } catch (t4) {
            throw new Error("Bug : can't construct the Blob.");
          }
        }
      };
      var s = { stringifyByChunk: function(t3, e2, r2) {
        var i2 = [], n2 = 0, s2 = t3.length;
        if (s2 <= r2)
          return String.fromCharCode.apply(null, t3);
        for (; n2 < s2; )
          e2 === "array" || e2 === "nodebuffer" ? i2.push(String.fromCharCode.apply(null, t3.slice(n2, Math.min(n2 + r2, s2)))) : i2.push(String.fromCharCode.apply(null, t3.subarray(n2, Math.min(n2 + r2, s2)))), n2 += r2;
        return i2.join("");
      }, stringifyByChar: function(t3) {
        for (var e2 = "", r2 = 0; r2 < t3.length; r2++)
          e2 += String.fromCharCode(t3[r2]);
        return e2;
      }, applyCanBeUsed: { uint8array: function() {
        try {
          return o.uint8array && String.fromCharCode.apply(null, new Uint8Array(1)).length === 1;
        } catch (t3) {
          return false;
        }
      }(), nodebuffer: function() {
        try {
          return o.nodebuffer && String.fromCharCode.apply(null, r.allocBuffer(1)).length === 1;
        } catch (t3) {
          return false;
        }
      }() } };
      function f(t3) {
        var e2 = 65536, r2 = a.getTypeOf(t3), i2 = true;
        if (r2 === "uint8array" ? i2 = s.applyCanBeUsed.uint8array : r2 === "nodebuffer" && (i2 = s.applyCanBeUsed.nodebuffer), i2)
          for (; 1 < e2; )
            try {
              return s.stringifyByChunk(t3, r2, e2);
            } catch (t4) {
              e2 = Math.floor(e2 / 2);
            }
        return s.stringifyByChar(t3);
      }
      function d(t3, e2) {
        for (var r2 = 0; r2 < t3.length; r2++)
          e2[r2] = t3[r2];
        return e2;
      }
      a.applyFromCharCode = f;
      var c = {};
      c.string = { string: n, array: function(t3) {
        return l(t3, new Array(t3.length));
      }, arraybuffer: function(t3) {
        return c.string.uint8array(t3).buffer;
      }, uint8array: function(t3) {
        return l(t3, new Uint8Array(t3.length));
      }, nodebuffer: function(t3) {
        return l(t3, r.allocBuffer(t3.length));
      } }, c.array = { string: f, array: n, arraybuffer: function(t3) {
        return new Uint8Array(t3).buffer;
      }, uint8array: function(t3) {
        return new Uint8Array(t3);
      }, nodebuffer: function(t3) {
        return r.newBufferFrom(t3);
      } }, c.arraybuffer = { string: function(t3) {
        return f(new Uint8Array(t3));
      }, array: function(t3) {
        return d(new Uint8Array(t3), new Array(t3.byteLength));
      }, arraybuffer: n, uint8array: function(t3) {
        return new Uint8Array(t3);
      }, nodebuffer: function(t3) {
        return r.newBufferFrom(new Uint8Array(t3));
      } }, c.uint8array = { string: f, array: function(t3) {
        return d(t3, new Array(t3.length));
      }, arraybuffer: function(t3) {
        return t3.buffer;
      }, uint8array: n, nodebuffer: function(t3) {
        return r.newBufferFrom(t3);
      } }, c.nodebuffer = { string: f, array: function(t3) {
        return d(t3, new Array(t3.length));
      }, arraybuffer: function(t3) {
        return c.nodebuffer.uint8array(t3).buffer;
      }, uint8array: function(t3) {
        return d(t3, new Uint8Array(t3.length));
      }, nodebuffer: n }, a.transformTo = function(t3, e2) {
        if (e2 = e2 || "", !t3)
          return e2;
        a.checkSupport(t3);
        var r2 = a.getTypeOf(e2);
        return c[r2][t3](e2);
      }, a.getTypeOf = function(t3) {
        return typeof t3 == "string" ? "string" : Object.prototype.toString.call(t3) === "[object Array]" ? "array" : o.nodebuffer && r.isBuffer(t3) ? "nodebuffer" : o.uint8array && t3 instanceof Uint8Array ? "uint8array" : o.arraybuffer && t3 instanceof ArrayBuffer ? "arraybuffer" : void 0;
      }, a.checkSupport = function(t3) {
        if (!o[t3.toLowerCase()])
          throw new Error(t3 + " is not supported by this platform");
      }, a.MAX_VALUE_16BITS = 65535, a.MAX_VALUE_32BITS = -1, a.pretty = function(t3) {
        var e2, r2, i2 = "";
        for (r2 = 0; r2 < (t3 || "").length; r2++)
          i2 += "\\x" + ((e2 = t3.charCodeAt(r2)) < 16 ? "0" : "") + e2.toString(16).toUpperCase();
        return i2;
      }, a.delay = function(t3, e2, r2) {
        i(function() {
          t3.apply(r2 || null, e2 || []);
        });
      }, a.inherits = function(t3, e2) {
        function r2() {
        }
        r2.prototype = e2.prototype, t3.prototype = new r2();
      }, a.extend = function() {
        var t3, e2, r2 = {};
        for (t3 = 0; t3 < arguments.length; t3++)
          for (e2 in arguments[t3])
            arguments[t3].hasOwnProperty(e2) && r2[e2] === void 0 && (r2[e2] = arguments[t3][e2]);
        return r2;
      }, a.prepareContent = function(r2, t3, i2, n2, s2) {
        return u.Promise.resolve(t3).then(function(i3) {
          return o.blob && (i3 instanceof Blob || ["[object File]", "[object Blob]"].indexOf(Object.prototype.toString.call(i3)) !== -1) && typeof FileReader != "undefined" ? new u.Promise(function(e2, r3) {
            var t4 = new FileReader();
            t4.onload = function(t5) {
              e2(t5.target.result);
            }, t4.onerror = function(t5) {
              r3(t5.target.error);
            }, t4.readAsArrayBuffer(i3);
          }) : i3;
        }).then(function(t4) {
          var e2 = a.getTypeOf(t4);
          return e2 ? (e2 === "arraybuffer" ? t4 = a.transformTo("uint8array", t4) : e2 === "string" && (s2 ? t4 = h.decode(t4) : i2 && n2 !== true && (t4 = function(t5) {
            return l(t5, o.uint8array ? new Uint8Array(t5.length) : new Array(t5.length));
          }(t4))), t4) : u.Promise.reject(new Error("Can't read the data of '" + r2 + "'. Is it in a supported JavaScript type (String, Blob, ArrayBuffer, etc) ?"));
        });
      };
    }, { "./base64": 1, "./external": 6, "./nodejsUtils": 14, "./support": 30, "set-immediate-shim": 54 }], 33: [function(t2, e, r) {
      var i = t2("./reader/readerFor"), n = t2("./utils"), s = t2("./signature"), a = t2("./zipEntry"), o = (t2("./utf8"), t2("./support"));
      function h(t3) {
        this.files = [], this.loadOptions = t3;
      }
      h.prototype = { checkSignature: function(t3) {
        if (!this.reader.readAndCheckSignature(t3)) {
          this.reader.index -= 4;
          var e2 = this.reader.readString(4);
          throw new Error("Corrupted zip or bug: unexpected signature (" + n.pretty(e2) + ", expected " + n.pretty(t3) + ")");
        }
      }, isSignature: function(t3, e2) {
        var r2 = this.reader.index;
        this.reader.setIndex(t3);
        var i2 = this.reader.readString(4) === e2;
        return this.reader.setIndex(r2), i2;
      }, readBlockEndOfCentral: function() {
        this.diskNumber = this.reader.readInt(2), this.diskWithCentralDirStart = this.reader.readInt(2), this.centralDirRecordsOnThisDisk = this.reader.readInt(2), this.centralDirRecords = this.reader.readInt(2), this.centralDirSize = this.reader.readInt(4), this.centralDirOffset = this.reader.readInt(4), this.zipCommentLength = this.reader.readInt(2);
        var t3 = this.reader.readData(this.zipCommentLength), e2 = o.uint8array ? "uint8array" : "array", r2 = n.transformTo(e2, t3);
        this.zipComment = this.loadOptions.decodeFileName(r2);
      }, readBlockZip64EndOfCentral: function() {
        this.zip64EndOfCentralSize = this.reader.readInt(8), this.reader.skip(4), this.diskNumber = this.reader.readInt(4), this.diskWithCentralDirStart = this.reader.readInt(4), this.centralDirRecordsOnThisDisk = this.reader.readInt(8), this.centralDirRecords = this.reader.readInt(8), this.centralDirSize = this.reader.readInt(8), this.centralDirOffset = this.reader.readInt(8), this.zip64ExtensibleData = {};
        for (var t3, e2, r2, i2 = this.zip64EndOfCentralSize - 44; 0 < i2; )
          t3 = this.reader.readInt(2), e2 = this.reader.readInt(4), r2 = this.reader.readData(e2), this.zip64ExtensibleData[t3] = { id: t3, length: e2, value: r2 };
      }, readBlockZip64EndOfCentralLocator: function() {
        if (this.diskWithZip64CentralDirStart = this.reader.readInt(4), this.relativeOffsetEndOfZip64CentralDir = this.reader.readInt(8), this.disksCount = this.reader.readInt(4), 1 < this.disksCount)
          throw new Error("Multi-volumes zip are not supported");
      }, readLocalFiles: function() {
        var t3, e2;
        for (t3 = 0; t3 < this.files.length; t3++)
          e2 = this.files[t3], this.reader.setIndex(e2.localHeaderOffset), this.checkSignature(s.LOCAL_FILE_HEADER), e2.readLocalPart(this.reader), e2.handleUTF8(), e2.processAttributes();
      }, readCentralDir: function() {
        var t3;
        for (this.reader.setIndex(this.centralDirOffset); this.reader.readAndCheckSignature(s.CENTRAL_FILE_HEADER); )
          (t3 = new a({ zip64: this.zip64 }, this.loadOptions)).readCentralPart(this.reader), this.files.push(t3);
        if (this.centralDirRecords !== this.files.length && this.centralDirRecords !== 0 && this.files.length === 0)
          throw new Error("Corrupted zip or bug: expected " + this.centralDirRecords + " records in central dir, got " + this.files.length);
      }, readEndOfCentral: function() {
        var t3 = this.reader.lastIndexOfSignature(s.CENTRAL_DIRECTORY_END);
        if (t3 < 0)
          throw !this.isSignature(0, s.LOCAL_FILE_HEADER) ? new Error("Can't find end of central directory : is this a zip file ? If it is, see https://stuk.github.io/jszip/documentation/howto/read_zip.html") : new Error("Corrupted zip: can't find end of central directory");
        this.reader.setIndex(t3);
        var e2 = t3;
        if (this.checkSignature(s.CENTRAL_DIRECTORY_END), this.readBlockEndOfCentral(), this.diskNumber === n.MAX_VALUE_16BITS || this.diskWithCentralDirStart === n.MAX_VALUE_16BITS || this.centralDirRecordsOnThisDisk === n.MAX_VALUE_16BITS || this.centralDirRecords === n.MAX_VALUE_16BITS || this.centralDirSize === n.MAX_VALUE_32BITS || this.centralDirOffset === n.MAX_VALUE_32BITS) {
          if (this.zip64 = true, (t3 = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR)) < 0)
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory locator");
          if (this.reader.setIndex(t3), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_LOCATOR), this.readBlockZip64EndOfCentralLocator(), !this.isSignature(this.relativeOffsetEndOfZip64CentralDir, s.ZIP64_CENTRAL_DIRECTORY_END) && (this.relativeOffsetEndOfZip64CentralDir = this.reader.lastIndexOfSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.relativeOffsetEndOfZip64CentralDir < 0))
            throw new Error("Corrupted zip: can't find the ZIP64 end of central directory");
          this.reader.setIndex(this.relativeOffsetEndOfZip64CentralDir), this.checkSignature(s.ZIP64_CENTRAL_DIRECTORY_END), this.readBlockZip64EndOfCentral();
        }
        var r2 = this.centralDirOffset + this.centralDirSize;
        this.zip64 && (r2 += 20, r2 += 12 + this.zip64EndOfCentralSize);
        var i2 = e2 - r2;
        if (0 < i2)
          this.isSignature(e2, s.CENTRAL_FILE_HEADER) || (this.reader.zero = i2);
        else if (i2 < 0)
          throw new Error("Corrupted zip: missing " + Math.abs(i2) + " bytes.");
      }, prepareReader: function(t3) {
        this.reader = i(t3);
      }, load: function(t3) {
        this.prepareReader(t3), this.readEndOfCentral(), this.readCentralDir(), this.readLocalFiles();
      } }, e.exports = h;
    }, { "./reader/readerFor": 22, "./signature": 23, "./support": 30, "./utf8": 31, "./utils": 32, "./zipEntry": 34 }], 34: [function(t2, e, r) {
      var i = t2("./reader/readerFor"), s = t2("./utils"), n = t2("./compressedObject"), a = t2("./crc32"), o = t2("./utf8"), h = t2("./compressions"), u = t2("./support");
      function l(t3, e2) {
        this.options = t3, this.loadOptions = e2;
      }
      l.prototype = { isEncrypted: function() {
        return (1 & this.bitFlag) == 1;
      }, useUTF8: function() {
        return (2048 & this.bitFlag) == 2048;
      }, readLocalPart: function(t3) {
        var e2, r2;
        if (t3.skip(22), this.fileNameLength = t3.readInt(2), r2 = t3.readInt(2), this.fileName = t3.readData(this.fileNameLength), t3.skip(r2), this.compressedSize === -1 || this.uncompressedSize === -1)
          throw new Error("Bug or corrupted zip : didn't get enough information from the central directory (compressedSize === -1 || uncompressedSize === -1)");
        if ((e2 = function(t4) {
          for (var e3 in h)
            if (h.hasOwnProperty(e3) && h[e3].magic === t4)
              return h[e3];
          return null;
        }(this.compressionMethod)) === null)
          throw new Error("Corrupted zip : compression " + s.pretty(this.compressionMethod) + " unknown (inner file : " + s.transformTo("string", this.fileName) + ")");
        this.decompressed = new n(this.compressedSize, this.uncompressedSize, this.crc32, e2, t3.readData(this.compressedSize));
      }, readCentralPart: function(t3) {
        this.versionMadeBy = t3.readInt(2), t3.skip(2), this.bitFlag = t3.readInt(2), this.compressionMethod = t3.readString(2), this.date = t3.readDate(), this.crc32 = t3.readInt(4), this.compressedSize = t3.readInt(4), this.uncompressedSize = t3.readInt(4);
        var e2 = t3.readInt(2);
        if (this.extraFieldsLength = t3.readInt(2), this.fileCommentLength = t3.readInt(2), this.diskNumberStart = t3.readInt(2), this.internalFileAttributes = t3.readInt(2), this.externalFileAttributes = t3.readInt(4), this.localHeaderOffset = t3.readInt(4), this.isEncrypted())
          throw new Error("Encrypted zip are not supported");
        t3.skip(e2), this.readExtraFields(t3), this.parseZIP64ExtraField(t3), this.fileComment = t3.readData(this.fileCommentLength);
      }, processAttributes: function() {
        this.unixPermissions = null, this.dosPermissions = null;
        var t3 = this.versionMadeBy >> 8;
        this.dir = !!(16 & this.externalFileAttributes), t3 == 0 && (this.dosPermissions = 63 & this.externalFileAttributes), t3 == 3 && (this.unixPermissions = this.externalFileAttributes >> 16 & 65535), this.dir || this.fileNameStr.slice(-1) !== "/" || (this.dir = true);
      }, parseZIP64ExtraField: function(t3) {
        if (this.extraFields[1]) {
          var e2 = i(this.extraFields[1].value);
          this.uncompressedSize === s.MAX_VALUE_32BITS && (this.uncompressedSize = e2.readInt(8)), this.compressedSize === s.MAX_VALUE_32BITS && (this.compressedSize = e2.readInt(8)), this.localHeaderOffset === s.MAX_VALUE_32BITS && (this.localHeaderOffset = e2.readInt(8)), this.diskNumberStart === s.MAX_VALUE_32BITS && (this.diskNumberStart = e2.readInt(4));
        }
      }, readExtraFields: function(t3) {
        var e2, r2, i2, n2 = t3.index + this.extraFieldsLength;
        for (this.extraFields || (this.extraFields = {}); t3.index + 4 < n2; )
          e2 = t3.readInt(2), r2 = t3.readInt(2), i2 = t3.readData(r2), this.extraFields[e2] = { id: e2, length: r2, value: i2 };
        t3.setIndex(n2);
      }, handleUTF8: function() {
        var t3 = u.uint8array ? "uint8array" : "array";
        if (this.useUTF8())
          this.fileNameStr = o.utf8decode(this.fileName), this.fileCommentStr = o.utf8decode(this.fileComment);
        else {
          var e2 = this.findExtraFieldUnicodePath();
          if (e2 !== null)
            this.fileNameStr = e2;
          else {
            var r2 = s.transformTo(t3, this.fileName);
            this.fileNameStr = this.loadOptions.decodeFileName(r2);
          }
          var i2 = this.findExtraFieldUnicodeComment();
          if (i2 !== null)
            this.fileCommentStr = i2;
          else {
            var n2 = s.transformTo(t3, this.fileComment);
            this.fileCommentStr = this.loadOptions.decodeFileName(n2);
          }
        }
      }, findExtraFieldUnicodePath: function() {
        var t3 = this.extraFields[28789];
        if (t3) {
          var e2 = i(t3.value);
          return e2.readInt(1) !== 1 ? null : a(this.fileName) !== e2.readInt(4) ? null : o.utf8decode(e2.readData(t3.length - 5));
        }
        return null;
      }, findExtraFieldUnicodeComment: function() {
        var t3 = this.extraFields[25461];
        if (t3) {
          var e2 = i(t3.value);
          return e2.readInt(1) !== 1 ? null : a(this.fileComment) !== e2.readInt(4) ? null : o.utf8decode(e2.readData(t3.length - 5));
        }
        return null;
      } }, e.exports = l;
    }, { "./compressedObject": 2, "./compressions": 3, "./crc32": 4, "./reader/readerFor": 22, "./support": 30, "./utf8": 31, "./utils": 32 }], 35: [function(t2, e, r) {
      function i(t3, e2, r2) {
        this.name = t3, this.dir = r2.dir, this.date = r2.date, this.comment = r2.comment, this.unixPermissions = r2.unixPermissions, this.dosPermissions = r2.dosPermissions, this._data = e2, this._dataBinary = r2.binary, this.options = { compression: r2.compression, compressionOptions: r2.compressionOptions };
      }
      var s = t2("./stream/StreamHelper"), n = t2("./stream/DataWorker"), a = t2("./utf8"), o = t2("./compressedObject"), h = t2("./stream/GenericWorker");
      i.prototype = { internalStream: function(t3) {
        var e2 = null, r2 = "string";
        try {
          if (!t3)
            throw new Error("No output type specified.");
          var i2 = (r2 = t3.toLowerCase()) === "string" || r2 === "text";
          r2 !== "binarystring" && r2 !== "text" || (r2 = "string"), e2 = this._decompressWorker();
          var n2 = !this._dataBinary;
          n2 && !i2 && (e2 = e2.pipe(new a.Utf8EncodeWorker())), !n2 && i2 && (e2 = e2.pipe(new a.Utf8DecodeWorker()));
        } catch (t4) {
          (e2 = new h("error")).error(t4);
        }
        return new s(e2, r2, "");
      }, async: function(t3, e2) {
        return this.internalStream(t3).accumulate(e2);
      }, nodeStream: function(t3, e2) {
        return this.internalStream(t3 || "nodebuffer").toNodejsStream(e2);
      }, _compressWorker: function(t3, e2) {
        if (this._data instanceof o && this._data.compression.magic === t3.magic)
          return this._data.getCompressedWorker();
        var r2 = this._decompressWorker();
        return this._dataBinary || (r2 = r2.pipe(new a.Utf8EncodeWorker())), o.createWorkerFrom(r2, t3, e2);
      }, _decompressWorker: function() {
        return this._data instanceof o ? this._data.getContentWorker() : this._data instanceof h ? this._data : new n(this._data);
      } };
      for (var u = ["asText", "asBinary", "asNodeBuffer", "asUint8Array", "asArrayBuffer"], l = function() {
        throw new Error("This method has been removed in JSZip 3.0, please check the upgrade guide.");
      }, f = 0; f < u.length; f++)
        i.prototype[u[f]] = l;
      e.exports = i;
    }, { "./compressedObject": 2, "./stream/DataWorker": 27, "./stream/GenericWorker": 28, "./stream/StreamHelper": 29, "./utf8": 31 }], 36: [function(t2, l, e) {
      (function(e2) {
        var r, i, t3 = e2.MutationObserver || e2.WebKitMutationObserver;
        if (t3) {
          var n = 0, s = new t3(u), a = e2.document.createTextNode("");
          s.observe(a, { characterData: true }), r = function() {
            a.data = n = ++n % 2;
          };
        } else if (e2.setImmediate || e2.MessageChannel === void 0)
          r = "document" in e2 && "onreadystatechange" in e2.document.createElement("script") ? function() {
            var t4 = e2.document.createElement("script");
            t4.onreadystatechange = function() {
              u(), t4.onreadystatechange = null, t4.parentNode.removeChild(t4), t4 = null;
            }, e2.document.documentElement.appendChild(t4);
          } : function() {
            setTimeout(u, 0);
          };
        else {
          var o = new e2.MessageChannel();
          o.port1.onmessage = u, r = function() {
            o.port2.postMessage(0);
          };
        }
        var h = [];
        function u() {
          var t4, e3;
          i = true;
          for (var r2 = h.length; r2; ) {
            for (e3 = h, h = [], t4 = -1; ++t4 < r2; )
              e3[t4]();
            r2 = h.length;
          }
          i = false;
        }
        l.exports = function(t4) {
          h.push(t4) !== 1 || i || r();
        };
      }).call(this, typeof commonjsGlobal != "undefined" ? commonjsGlobal : typeof self != "undefined" ? self : typeof window != "undefined" ? window : {});
    }, {}], 37: [function(t2, e, r) {
      var n = t2("immediate");
      function u() {
      }
      var l = {}, s = ["REJECTED"], a = ["FULFILLED"], i = ["PENDING"];
      function o(t3) {
        if (typeof t3 != "function")
          throw new TypeError("resolver must be a function");
        this.state = i, this.queue = [], this.outcome = void 0, t3 !== u && c(this, t3);
      }
      function h(t3, e2, r2) {
        this.promise = t3, typeof e2 == "function" && (this.onFulfilled = e2, this.callFulfilled = this.otherCallFulfilled), typeof r2 == "function" && (this.onRejected = r2, this.callRejected = this.otherCallRejected);
      }
      function f(e2, r2, i2) {
        n(function() {
          var t3;
          try {
            t3 = r2(i2);
          } catch (t4) {
            return l.reject(e2, t4);
          }
          t3 === e2 ? l.reject(e2, new TypeError("Cannot resolve promise with itself")) : l.resolve(e2, t3);
        });
      }
      function d(t3) {
        var e2 = t3 && t3.then;
        if (t3 && (typeof t3 == "object" || typeof t3 == "function") && typeof e2 == "function")
          return function() {
            e2.apply(t3, arguments);
          };
      }
      function c(e2, t3) {
        var r2 = false;
        function i2(t4) {
          r2 || (r2 = true, l.reject(e2, t4));
        }
        function n2(t4) {
          r2 || (r2 = true, l.resolve(e2, t4));
        }
        var s2 = p(function() {
          t3(n2, i2);
        });
        s2.status === "error" && i2(s2.value);
      }
      function p(t3, e2) {
        var r2 = {};
        try {
          r2.value = t3(e2), r2.status = "success";
        } catch (t4) {
          r2.status = "error", r2.value = t4;
        }
        return r2;
      }
      (e.exports = o).prototype.finally = function(e2) {
        if (typeof e2 != "function")
          return this;
        var r2 = this.constructor;
        return this.then(function(t3) {
          return r2.resolve(e2()).then(function() {
            return t3;
          });
        }, function(t3) {
          return r2.resolve(e2()).then(function() {
            throw t3;
          });
        });
      }, o.prototype.catch = function(t3) {
        return this.then(null, t3);
      }, o.prototype.then = function(t3, e2) {
        if (typeof t3 != "function" && this.state === a || typeof e2 != "function" && this.state === s)
          return this;
        var r2 = new this.constructor(u);
        this.state !== i ? f(r2, this.state === a ? t3 : e2, this.outcome) : this.queue.push(new h(r2, t3, e2));
        return r2;
      }, h.prototype.callFulfilled = function(t3) {
        l.resolve(this.promise, t3);
      }, h.prototype.otherCallFulfilled = function(t3) {
        f(this.promise, this.onFulfilled, t3);
      }, h.prototype.callRejected = function(t3) {
        l.reject(this.promise, t3);
      }, h.prototype.otherCallRejected = function(t3) {
        f(this.promise, this.onRejected, t3);
      }, l.resolve = function(t3, e2) {
        var r2 = p(d, e2);
        if (r2.status === "error")
          return l.reject(t3, r2.value);
        var i2 = r2.value;
        if (i2)
          c(t3, i2);
        else {
          t3.state = a, t3.outcome = e2;
          for (var n2 = -1, s2 = t3.queue.length; ++n2 < s2; )
            t3.queue[n2].callFulfilled(e2);
        }
        return t3;
      }, l.reject = function(t3, e2) {
        t3.state = s, t3.outcome = e2;
        for (var r2 = -1, i2 = t3.queue.length; ++r2 < i2; )
          t3.queue[r2].callRejected(e2);
        return t3;
      }, o.resolve = function(t3) {
        if (t3 instanceof this)
          return t3;
        return l.resolve(new this(u), t3);
      }, o.reject = function(t3) {
        var e2 = new this(u);
        return l.reject(e2, t3);
      }, o.all = function(t3) {
        var r2 = this;
        if (Object.prototype.toString.call(t3) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var i2 = t3.length, n2 = false;
        if (!i2)
          return this.resolve([]);
        var s2 = new Array(i2), a2 = 0, e2 = -1, o2 = new this(u);
        for (; ++e2 < i2; )
          h2(t3[e2], e2);
        return o2;
        function h2(t4, e3) {
          r2.resolve(t4).then(function(t5) {
            s2[e3] = t5, ++a2 !== i2 || n2 || (n2 = true, l.resolve(o2, s2));
          }, function(t5) {
            n2 || (n2 = true, l.reject(o2, t5));
          });
        }
      }, o.race = function(t3) {
        var e2 = this;
        if (Object.prototype.toString.call(t3) !== "[object Array]")
          return this.reject(new TypeError("must be an array"));
        var r2 = t3.length, i2 = false;
        if (!r2)
          return this.resolve([]);
        var n2 = -1, s2 = new this(u);
        for (; ++n2 < r2; )
          a2 = t3[n2], e2.resolve(a2).then(function(t4) {
            i2 || (i2 = true, l.resolve(s2, t4));
          }, function(t4) {
            i2 || (i2 = true, l.reject(s2, t4));
          });
        var a2;
        return s2;
      };
    }, { immediate: 36 }], 38: [function(t2, e, r) {
      var i = {};
      (0, t2("./lib/utils/common").assign)(i, t2("./lib/deflate"), t2("./lib/inflate"), t2("./lib/zlib/constants")), e.exports = i;
    }, { "./lib/deflate": 39, "./lib/inflate": 40, "./lib/utils/common": 41, "./lib/zlib/constants": 44 }], 39: [function(t2, e, r) {
      var a = t2("./zlib/deflate"), o = t2("./utils/common"), h = t2("./utils/strings"), n = t2("./zlib/messages"), s = t2("./zlib/zstream"), u = Object.prototype.toString, l = 0, f = -1, d = 0, c = 8;
      function p(t3) {
        if (!(this instanceof p))
          return new p(t3);
        this.options = o.assign({ level: f, method: c, chunkSize: 16384, windowBits: 15, memLevel: 8, strategy: d, to: "" }, t3 || {});
        var e2 = this.options;
        e2.raw && 0 < e2.windowBits ? e2.windowBits = -e2.windowBits : e2.gzip && 0 < e2.windowBits && e2.windowBits < 16 && (e2.windowBits += 16), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new s(), this.strm.avail_out = 0;
        var r2 = a.deflateInit2(this.strm, e2.level, e2.method, e2.windowBits, e2.memLevel, e2.strategy);
        if (r2 !== l)
          throw new Error(n[r2]);
        if (e2.header && a.deflateSetHeader(this.strm, e2.header), e2.dictionary) {
          var i2;
          if (i2 = typeof e2.dictionary == "string" ? h.string2buf(e2.dictionary) : u.call(e2.dictionary) === "[object ArrayBuffer]" ? new Uint8Array(e2.dictionary) : e2.dictionary, (r2 = a.deflateSetDictionary(this.strm, i2)) !== l)
            throw new Error(n[r2]);
          this._dict_set = true;
        }
      }
      function i(t3, e2) {
        var r2 = new p(e2);
        if (r2.push(t3, true), r2.err)
          throw r2.msg || n[r2.err];
        return r2.result;
      }
      p.prototype.push = function(t3, e2) {
        var r2, i2, n2 = this.strm, s2 = this.options.chunkSize;
        if (this.ended)
          return false;
        i2 = e2 === ~~e2 ? e2 : e2 === true ? 4 : 0, typeof t3 == "string" ? n2.input = h.string2buf(t3) : u.call(t3) === "[object ArrayBuffer]" ? n2.input = new Uint8Array(t3) : n2.input = t3, n2.next_in = 0, n2.avail_in = n2.input.length;
        do {
          if (n2.avail_out === 0 && (n2.output = new o.Buf8(s2), n2.next_out = 0, n2.avail_out = s2), (r2 = a.deflate(n2, i2)) !== 1 && r2 !== l)
            return this.onEnd(r2), !(this.ended = true);
          n2.avail_out !== 0 && (n2.avail_in !== 0 || i2 !== 4 && i2 !== 2) || (this.options.to === "string" ? this.onData(h.buf2binstring(o.shrinkBuf(n2.output, n2.next_out))) : this.onData(o.shrinkBuf(n2.output, n2.next_out)));
        } while ((0 < n2.avail_in || n2.avail_out === 0) && r2 !== 1);
        return i2 === 4 ? (r2 = a.deflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === l) : i2 !== 2 || (this.onEnd(l), !(n2.avail_out = 0));
      }, p.prototype.onData = function(t3) {
        this.chunks.push(t3);
      }, p.prototype.onEnd = function(t3) {
        t3 === l && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = o.flattenChunks(this.chunks)), this.chunks = [], this.err = t3, this.msg = this.strm.msg;
      }, r.Deflate = p, r.deflate = i, r.deflateRaw = function(t3, e2) {
        return (e2 = e2 || {}).raw = true, i(t3, e2);
      }, r.gzip = function(t3, e2) {
        return (e2 = e2 || {}).gzip = true, i(t3, e2);
      };
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/deflate": 46, "./zlib/messages": 51, "./zlib/zstream": 53 }], 40: [function(t2, e, r) {
      var d = t2("./zlib/inflate"), c = t2("./utils/common"), p = t2("./utils/strings"), m = t2("./zlib/constants"), i = t2("./zlib/messages"), n = t2("./zlib/zstream"), s = t2("./zlib/gzheader"), _2 = Object.prototype.toString;
      function a(t3) {
        if (!(this instanceof a))
          return new a(t3);
        this.options = c.assign({ chunkSize: 16384, windowBits: 0, to: "" }, t3 || {});
        var e2 = this.options;
        e2.raw && 0 <= e2.windowBits && e2.windowBits < 16 && (e2.windowBits = -e2.windowBits, e2.windowBits === 0 && (e2.windowBits = -15)), !(0 <= e2.windowBits && e2.windowBits < 16) || t3 && t3.windowBits || (e2.windowBits += 32), 15 < e2.windowBits && e2.windowBits < 48 && (15 & e2.windowBits) == 0 && (e2.windowBits |= 15), this.err = 0, this.msg = "", this.ended = false, this.chunks = [], this.strm = new n(), this.strm.avail_out = 0;
        var r2 = d.inflateInit2(this.strm, e2.windowBits);
        if (r2 !== m.Z_OK)
          throw new Error(i[r2]);
        this.header = new s(), d.inflateGetHeader(this.strm, this.header);
      }
      function o(t3, e2) {
        var r2 = new a(e2);
        if (r2.push(t3, true), r2.err)
          throw r2.msg || i[r2.err];
        return r2.result;
      }
      a.prototype.push = function(t3, e2) {
        var r2, i2, n2, s2, a2, o2, h = this.strm, u = this.options.chunkSize, l = this.options.dictionary, f = false;
        if (this.ended)
          return false;
        i2 = e2 === ~~e2 ? e2 : e2 === true ? m.Z_FINISH : m.Z_NO_FLUSH, typeof t3 == "string" ? h.input = p.binstring2buf(t3) : _2.call(t3) === "[object ArrayBuffer]" ? h.input = new Uint8Array(t3) : h.input = t3, h.next_in = 0, h.avail_in = h.input.length;
        do {
          if (h.avail_out === 0 && (h.output = new c.Buf8(u), h.next_out = 0, h.avail_out = u), (r2 = d.inflate(h, m.Z_NO_FLUSH)) === m.Z_NEED_DICT && l && (o2 = typeof l == "string" ? p.string2buf(l) : _2.call(l) === "[object ArrayBuffer]" ? new Uint8Array(l) : l, r2 = d.inflateSetDictionary(this.strm, o2)), r2 === m.Z_BUF_ERROR && f === true && (r2 = m.Z_OK, f = false), r2 !== m.Z_STREAM_END && r2 !== m.Z_OK)
            return this.onEnd(r2), !(this.ended = true);
          h.next_out && (h.avail_out !== 0 && r2 !== m.Z_STREAM_END && (h.avail_in !== 0 || i2 !== m.Z_FINISH && i2 !== m.Z_SYNC_FLUSH) || (this.options.to === "string" ? (n2 = p.utf8border(h.output, h.next_out), s2 = h.next_out - n2, a2 = p.buf2string(h.output, n2), h.next_out = s2, h.avail_out = u - s2, s2 && c.arraySet(h.output, h.output, n2, s2, 0), this.onData(a2)) : this.onData(c.shrinkBuf(h.output, h.next_out)))), h.avail_in === 0 && h.avail_out === 0 && (f = true);
        } while ((0 < h.avail_in || h.avail_out === 0) && r2 !== m.Z_STREAM_END);
        return r2 === m.Z_STREAM_END && (i2 = m.Z_FINISH), i2 === m.Z_FINISH ? (r2 = d.inflateEnd(this.strm), this.onEnd(r2), this.ended = true, r2 === m.Z_OK) : i2 !== m.Z_SYNC_FLUSH || (this.onEnd(m.Z_OK), !(h.avail_out = 0));
      }, a.prototype.onData = function(t3) {
        this.chunks.push(t3);
      }, a.prototype.onEnd = function(t3) {
        t3 === m.Z_OK && (this.options.to === "string" ? this.result = this.chunks.join("") : this.result = c.flattenChunks(this.chunks)), this.chunks = [], this.err = t3, this.msg = this.strm.msg;
      }, r.Inflate = a, r.inflate = o, r.inflateRaw = function(t3, e2) {
        return (e2 = e2 || {}).raw = true, o(t3, e2);
      }, r.ungzip = o;
    }, { "./utils/common": 41, "./utils/strings": 42, "./zlib/constants": 44, "./zlib/gzheader": 47, "./zlib/inflate": 49, "./zlib/messages": 51, "./zlib/zstream": 53 }], 41: [function(t2, e, r) {
      var i = typeof Uint8Array != "undefined" && typeof Uint16Array != "undefined" && typeof Int32Array != "undefined";
      r.assign = function(t3) {
        for (var e2 = Array.prototype.slice.call(arguments, 1); e2.length; ) {
          var r2 = e2.shift();
          if (r2) {
            if (typeof r2 != "object")
              throw new TypeError(r2 + "must be non-object");
            for (var i2 in r2)
              r2.hasOwnProperty(i2) && (t3[i2] = r2[i2]);
          }
        }
        return t3;
      }, r.shrinkBuf = function(t3, e2) {
        return t3.length === e2 ? t3 : t3.subarray ? t3.subarray(0, e2) : (t3.length = e2, t3);
      };
      var n = { arraySet: function(t3, e2, r2, i2, n2) {
        if (e2.subarray && t3.subarray)
          t3.set(e2.subarray(r2, r2 + i2), n2);
        else
          for (var s2 = 0; s2 < i2; s2++)
            t3[n2 + s2] = e2[r2 + s2];
      }, flattenChunks: function(t3) {
        var e2, r2, i2, n2, s2, a;
        for (e2 = i2 = 0, r2 = t3.length; e2 < r2; e2++)
          i2 += t3[e2].length;
        for (a = new Uint8Array(i2), e2 = n2 = 0, r2 = t3.length; e2 < r2; e2++)
          s2 = t3[e2], a.set(s2, n2), n2 += s2.length;
        return a;
      } }, s = { arraySet: function(t3, e2, r2, i2, n2) {
        for (var s2 = 0; s2 < i2; s2++)
          t3[n2 + s2] = e2[r2 + s2];
      }, flattenChunks: function(t3) {
        return [].concat.apply([], t3);
      } };
      r.setTyped = function(t3) {
        t3 ? (r.Buf8 = Uint8Array, r.Buf16 = Uint16Array, r.Buf32 = Int32Array, r.assign(r, n)) : (r.Buf8 = Array, r.Buf16 = Array, r.Buf32 = Array, r.assign(r, s));
      }, r.setTyped(i);
    }, {}], 42: [function(t2, e, r) {
      var h = t2("./common"), n = true, s = true;
      try {
        String.fromCharCode.apply(null, [0]);
      } catch (t3) {
        n = false;
      }
      try {
        String.fromCharCode.apply(null, new Uint8Array(1));
      } catch (t3) {
        s = false;
      }
      for (var u = new h.Buf8(256), i = 0; i < 256; i++)
        u[i] = 252 <= i ? 6 : 248 <= i ? 5 : 240 <= i ? 4 : 224 <= i ? 3 : 192 <= i ? 2 : 1;
      function l(t3, e2) {
        if (e2 < 65537 && (t3.subarray && s || !t3.subarray && n))
          return String.fromCharCode.apply(null, h.shrinkBuf(t3, e2));
        for (var r2 = "", i2 = 0; i2 < e2; i2++)
          r2 += String.fromCharCode(t3[i2]);
        return r2;
      }
      u[254] = u[254] = 1, r.string2buf = function(t3) {
        var e2, r2, i2, n2, s2, a = t3.length, o = 0;
        for (n2 = 0; n2 < a; n2++)
          (64512 & (r2 = t3.charCodeAt(n2))) == 55296 && n2 + 1 < a && (64512 & (i2 = t3.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), o += r2 < 128 ? 1 : r2 < 2048 ? 2 : r2 < 65536 ? 3 : 4;
        for (e2 = new h.Buf8(o), n2 = s2 = 0; s2 < o; n2++)
          (64512 & (r2 = t3.charCodeAt(n2))) == 55296 && n2 + 1 < a && (64512 & (i2 = t3.charCodeAt(n2 + 1))) == 56320 && (r2 = 65536 + (r2 - 55296 << 10) + (i2 - 56320), n2++), r2 < 128 ? e2[s2++] = r2 : (r2 < 2048 ? e2[s2++] = 192 | r2 >>> 6 : (r2 < 65536 ? e2[s2++] = 224 | r2 >>> 12 : (e2[s2++] = 240 | r2 >>> 18, e2[s2++] = 128 | r2 >>> 12 & 63), e2[s2++] = 128 | r2 >>> 6 & 63), e2[s2++] = 128 | 63 & r2);
        return e2;
      }, r.buf2binstring = function(t3) {
        return l(t3, t3.length);
      }, r.binstring2buf = function(t3) {
        for (var e2 = new h.Buf8(t3.length), r2 = 0, i2 = e2.length; r2 < i2; r2++)
          e2[r2] = t3.charCodeAt(r2);
        return e2;
      }, r.buf2string = function(t3, e2) {
        var r2, i2, n2, s2, a = e2 || t3.length, o = new Array(2 * a);
        for (r2 = i2 = 0; r2 < a; )
          if ((n2 = t3[r2++]) < 128)
            o[i2++] = n2;
          else if (4 < (s2 = u[n2]))
            o[i2++] = 65533, r2 += s2 - 1;
          else {
            for (n2 &= s2 === 2 ? 31 : s2 === 3 ? 15 : 7; 1 < s2 && r2 < a; )
              n2 = n2 << 6 | 63 & t3[r2++], s2--;
            1 < s2 ? o[i2++] = 65533 : n2 < 65536 ? o[i2++] = n2 : (n2 -= 65536, o[i2++] = 55296 | n2 >> 10 & 1023, o[i2++] = 56320 | 1023 & n2);
          }
        return l(o, i2);
      }, r.utf8border = function(t3, e2) {
        var r2;
        for ((e2 = e2 || t3.length) > t3.length && (e2 = t3.length), r2 = e2 - 1; 0 <= r2 && (192 & t3[r2]) == 128; )
          r2--;
        return r2 < 0 ? e2 : r2 === 0 ? e2 : r2 + u[t3[r2]] > e2 ? r2 : e2;
      };
    }, { "./common": 41 }], 43: [function(t2, e, r) {
      e.exports = function(t3, e2, r2, i) {
        for (var n = 65535 & t3 | 0, s = t3 >>> 16 & 65535 | 0, a = 0; r2 !== 0; ) {
          for (r2 -= a = 2e3 < r2 ? 2e3 : r2; s = s + (n = n + e2[i++] | 0) | 0, --a; )
            ;
          n %= 65521, s %= 65521;
        }
        return n | s << 16 | 0;
      };
    }, {}], 44: [function(t2, e, r) {
      e.exports = { Z_NO_FLUSH: 0, Z_PARTIAL_FLUSH: 1, Z_SYNC_FLUSH: 2, Z_FULL_FLUSH: 3, Z_FINISH: 4, Z_BLOCK: 5, Z_TREES: 6, Z_OK: 0, Z_STREAM_END: 1, Z_NEED_DICT: 2, Z_ERRNO: -1, Z_STREAM_ERROR: -2, Z_DATA_ERROR: -3, Z_BUF_ERROR: -5, Z_NO_COMPRESSION: 0, Z_BEST_SPEED: 1, Z_BEST_COMPRESSION: 9, Z_DEFAULT_COMPRESSION: -1, Z_FILTERED: 1, Z_HUFFMAN_ONLY: 2, Z_RLE: 3, Z_FIXED: 4, Z_DEFAULT_STRATEGY: 0, Z_BINARY: 0, Z_TEXT: 1, Z_UNKNOWN: 2, Z_DEFLATED: 8 };
    }, {}], 45: [function(t2, e, r) {
      var o = function() {
        for (var t3, e2 = [], r2 = 0; r2 < 256; r2++) {
          t3 = r2;
          for (var i = 0; i < 8; i++)
            t3 = 1 & t3 ? 3988292384 ^ t3 >>> 1 : t3 >>> 1;
          e2[r2] = t3;
        }
        return e2;
      }();
      e.exports = function(t3, e2, r2, i) {
        var n = o, s = i + r2;
        t3 ^= -1;
        for (var a = i; a < s; a++)
          t3 = t3 >>> 8 ^ n[255 & (t3 ^ e2[a])];
        return -1 ^ t3;
      };
    }, {}], 46: [function(t2, e, r) {
      var h, d = t2("../utils/common"), u = t2("./trees"), c = t2("./adler32"), p = t2("./crc32"), i = t2("./messages"), l = 0, f = 4, m = 0, _2 = -2, g = -1, b = 4, n = 2, v = 8, y = 9, s = 286, a = 30, o = 19, w = 2 * s + 1, k = 15, x = 3, S = 258, z = S + x + 1, C = 42, E = 113, A = 1, I = 2, O = 3, B = 4;
      function R(t3, e2) {
        return t3.msg = i[e2], e2;
      }
      function T(t3) {
        return (t3 << 1) - (4 < t3 ? 9 : 0);
      }
      function D(t3) {
        for (var e2 = t3.length; 0 <= --e2; )
          t3[e2] = 0;
      }
      function F(t3) {
        var e2 = t3.state, r2 = e2.pending;
        r2 > t3.avail_out && (r2 = t3.avail_out), r2 !== 0 && (d.arraySet(t3.output, e2.pending_buf, e2.pending_out, r2, t3.next_out), t3.next_out += r2, e2.pending_out += r2, t3.total_out += r2, t3.avail_out -= r2, e2.pending -= r2, e2.pending === 0 && (e2.pending_out = 0));
      }
      function N(t3, e2) {
        u._tr_flush_block(t3, 0 <= t3.block_start ? t3.block_start : -1, t3.strstart - t3.block_start, e2), t3.block_start = t3.strstart, F(t3.strm);
      }
      function U(t3, e2) {
        t3.pending_buf[t3.pending++] = e2;
      }
      function P(t3, e2) {
        t3.pending_buf[t3.pending++] = e2 >>> 8 & 255, t3.pending_buf[t3.pending++] = 255 & e2;
      }
      function L(t3, e2) {
        var r2, i2, n2 = t3.max_chain_length, s2 = t3.strstart, a2 = t3.prev_length, o2 = t3.nice_match, h2 = t3.strstart > t3.w_size - z ? t3.strstart - (t3.w_size - z) : 0, u2 = t3.window, l2 = t3.w_mask, f2 = t3.prev, d2 = t3.strstart + S, c2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
        t3.prev_length >= t3.good_match && (n2 >>= 2), o2 > t3.lookahead && (o2 = t3.lookahead);
        do {
          if (u2[(r2 = e2) + a2] === p2 && u2[r2 + a2 - 1] === c2 && u2[r2] === u2[s2] && u2[++r2] === u2[s2 + 1]) {
            s2 += 2, r2++;
            do {
            } while (u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && u2[++s2] === u2[++r2] && s2 < d2);
            if (i2 = S - (d2 - s2), s2 = d2 - S, a2 < i2) {
              if (t3.match_start = e2, o2 <= (a2 = i2))
                break;
              c2 = u2[s2 + a2 - 1], p2 = u2[s2 + a2];
            }
          }
        } while ((e2 = f2[e2 & l2]) > h2 && --n2 != 0);
        return a2 <= t3.lookahead ? a2 : t3.lookahead;
      }
      function j(t3) {
        var e2, r2, i2, n2, s2, a2, o2, h2, u2, l2, f2 = t3.w_size;
        do {
          if (n2 = t3.window_size - t3.lookahead - t3.strstart, t3.strstart >= f2 + (f2 - z)) {
            for (d.arraySet(t3.window, t3.window, f2, f2, 0), t3.match_start -= f2, t3.strstart -= f2, t3.block_start -= f2, e2 = r2 = t3.hash_size; i2 = t3.head[--e2], t3.head[e2] = f2 <= i2 ? i2 - f2 : 0, --r2; )
              ;
            for (e2 = r2 = f2; i2 = t3.prev[--e2], t3.prev[e2] = f2 <= i2 ? i2 - f2 : 0, --r2; )
              ;
            n2 += f2;
          }
          if (t3.strm.avail_in === 0)
            break;
          if (a2 = t3.strm, o2 = t3.window, h2 = t3.strstart + t3.lookahead, u2 = n2, l2 = void 0, l2 = a2.avail_in, u2 < l2 && (l2 = u2), r2 = l2 === 0 ? 0 : (a2.avail_in -= l2, d.arraySet(o2, a2.input, a2.next_in, l2, h2), a2.state.wrap === 1 ? a2.adler = c(a2.adler, o2, l2, h2) : a2.state.wrap === 2 && (a2.adler = p(a2.adler, o2, l2, h2)), a2.next_in += l2, a2.total_in += l2, l2), t3.lookahead += r2, t3.lookahead + t3.insert >= x)
            for (s2 = t3.strstart - t3.insert, t3.ins_h = t3.window[s2], t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[s2 + 1]) & t3.hash_mask; t3.insert && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[s2 + x - 1]) & t3.hash_mask, t3.prev[s2 & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = s2, s2++, t3.insert--, !(t3.lookahead + t3.insert < x)); )
              ;
        } while (t3.lookahead < z && t3.strm.avail_in !== 0);
      }
      function Z(t3, e2) {
        for (var r2, i2; ; ) {
          if (t3.lookahead < z) {
            if (j(t3), t3.lookahead < z && e2 === l)
              return A;
            if (t3.lookahead === 0)
              break;
          }
          if (r2 = 0, t3.lookahead >= x && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + x - 1]) & t3.hash_mask, r2 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart), r2 !== 0 && t3.strstart - r2 <= t3.w_size - z && (t3.match_length = L(t3, r2)), t3.match_length >= x)
            if (i2 = u._tr_tally(t3, t3.strstart - t3.match_start, t3.match_length - x), t3.lookahead -= t3.match_length, t3.match_length <= t3.max_lazy_match && t3.lookahead >= x) {
              for (t3.match_length--; t3.strstart++, t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + x - 1]) & t3.hash_mask, r2 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart, --t3.match_length != 0; )
                ;
              t3.strstart++;
            } else
              t3.strstart += t3.match_length, t3.match_length = 0, t3.ins_h = t3.window[t3.strstart], t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + 1]) & t3.hash_mask;
          else
            i2 = u._tr_tally(t3, 0, t3.window[t3.strstart]), t3.lookahead--, t3.strstart++;
          if (i2 && (N(t3, false), t3.strm.avail_out === 0))
            return A;
        }
        return t3.insert = t3.strstart < x - 1 ? t3.strstart : x - 1, e2 === f ? (N(t3, true), t3.strm.avail_out === 0 ? O : B) : t3.last_lit && (N(t3, false), t3.strm.avail_out === 0) ? A : I;
      }
      function W(t3, e2) {
        for (var r2, i2, n2; ; ) {
          if (t3.lookahead < z) {
            if (j(t3), t3.lookahead < z && e2 === l)
              return A;
            if (t3.lookahead === 0)
              break;
          }
          if (r2 = 0, t3.lookahead >= x && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + x - 1]) & t3.hash_mask, r2 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart), t3.prev_length = t3.match_length, t3.prev_match = t3.match_start, t3.match_length = x - 1, r2 !== 0 && t3.prev_length < t3.max_lazy_match && t3.strstart - r2 <= t3.w_size - z && (t3.match_length = L(t3, r2), t3.match_length <= 5 && (t3.strategy === 1 || t3.match_length === x && 4096 < t3.strstart - t3.match_start) && (t3.match_length = x - 1)), t3.prev_length >= x && t3.match_length <= t3.prev_length) {
            for (n2 = t3.strstart + t3.lookahead - x, i2 = u._tr_tally(t3, t3.strstart - 1 - t3.prev_match, t3.prev_length - x), t3.lookahead -= t3.prev_length - 1, t3.prev_length -= 2; ++t3.strstart <= n2 && (t3.ins_h = (t3.ins_h << t3.hash_shift ^ t3.window[t3.strstart + x - 1]) & t3.hash_mask, r2 = t3.prev[t3.strstart & t3.w_mask] = t3.head[t3.ins_h], t3.head[t3.ins_h] = t3.strstart), --t3.prev_length != 0; )
              ;
            if (t3.match_available = 0, t3.match_length = x - 1, t3.strstart++, i2 && (N(t3, false), t3.strm.avail_out === 0))
              return A;
          } else if (t3.match_available) {
            if ((i2 = u._tr_tally(t3, 0, t3.window[t3.strstart - 1])) && N(t3, false), t3.strstart++, t3.lookahead--, t3.strm.avail_out === 0)
              return A;
          } else
            t3.match_available = 1, t3.strstart++, t3.lookahead--;
        }
        return t3.match_available && (i2 = u._tr_tally(t3, 0, t3.window[t3.strstart - 1]), t3.match_available = 0), t3.insert = t3.strstart < x - 1 ? t3.strstart : x - 1, e2 === f ? (N(t3, true), t3.strm.avail_out === 0 ? O : B) : t3.last_lit && (N(t3, false), t3.strm.avail_out === 0) ? A : I;
      }
      function M(t3, e2, r2, i2, n2) {
        this.good_length = t3, this.max_lazy = e2, this.nice_length = r2, this.max_chain = i2, this.func = n2;
      }
      function H() {
        this.strm = null, this.status = 0, this.pending_buf = null, this.pending_buf_size = 0, this.pending_out = 0, this.pending = 0, this.wrap = 0, this.gzhead = null, this.gzindex = 0, this.method = v, this.last_flush = -1, this.w_size = 0, this.w_bits = 0, this.w_mask = 0, this.window = null, this.window_size = 0, this.prev = null, this.head = null, this.ins_h = 0, this.hash_size = 0, this.hash_bits = 0, this.hash_mask = 0, this.hash_shift = 0, this.block_start = 0, this.match_length = 0, this.prev_match = 0, this.match_available = 0, this.strstart = 0, this.match_start = 0, this.lookahead = 0, this.prev_length = 0, this.max_chain_length = 0, this.max_lazy_match = 0, this.level = 0, this.strategy = 0, this.good_match = 0, this.nice_match = 0, this.dyn_ltree = new d.Buf16(2 * w), this.dyn_dtree = new d.Buf16(2 * (2 * a + 1)), this.bl_tree = new d.Buf16(2 * (2 * o + 1)), D(this.dyn_ltree), D(this.dyn_dtree), D(this.bl_tree), this.l_desc = null, this.d_desc = null, this.bl_desc = null, this.bl_count = new d.Buf16(k + 1), this.heap = new d.Buf16(2 * s + 1), D(this.heap), this.heap_len = 0, this.heap_max = 0, this.depth = new d.Buf16(2 * s + 1), D(this.depth), this.l_buf = 0, this.lit_bufsize = 0, this.last_lit = 0, this.d_buf = 0, this.opt_len = 0, this.static_len = 0, this.matches = 0, this.insert = 0, this.bi_buf = 0, this.bi_valid = 0;
      }
      function G(t3) {
        var e2;
        return t3 && t3.state ? (t3.total_in = t3.total_out = 0, t3.data_type = n, (e2 = t3.state).pending = 0, e2.pending_out = 0, e2.wrap < 0 && (e2.wrap = -e2.wrap), e2.status = e2.wrap ? C : E, t3.adler = e2.wrap === 2 ? 0 : 1, e2.last_flush = l, u._tr_init(e2), m) : R(t3, _2);
      }
      function K(t3) {
        var e2 = G(t3);
        return e2 === m && function(t4) {
          t4.window_size = 2 * t4.w_size, D(t4.head), t4.max_lazy_match = h[t4.level].max_lazy, t4.good_match = h[t4.level].good_length, t4.nice_match = h[t4.level].nice_length, t4.max_chain_length = h[t4.level].max_chain, t4.strstart = 0, t4.block_start = 0, t4.lookahead = 0, t4.insert = 0, t4.match_length = t4.prev_length = x - 1, t4.match_available = 0, t4.ins_h = 0;
        }(t3.state), e2;
      }
      function Y(t3, e2, r2, i2, n2, s2) {
        if (!t3)
          return _2;
        var a2 = 1;
        if (e2 === g && (e2 = 6), i2 < 0 ? (a2 = 0, i2 = -i2) : 15 < i2 && (a2 = 2, i2 -= 16), n2 < 1 || y < n2 || r2 !== v || i2 < 8 || 15 < i2 || e2 < 0 || 9 < e2 || s2 < 0 || b < s2)
          return R(t3, _2);
        i2 === 8 && (i2 = 9);
        var o2 = new H();
        return (t3.state = o2).strm = t3, o2.wrap = a2, o2.gzhead = null, o2.w_bits = i2, o2.w_size = 1 << o2.w_bits, o2.w_mask = o2.w_size - 1, o2.hash_bits = n2 + 7, o2.hash_size = 1 << o2.hash_bits, o2.hash_mask = o2.hash_size - 1, o2.hash_shift = ~~((o2.hash_bits + x - 1) / x), o2.window = new d.Buf8(2 * o2.w_size), o2.head = new d.Buf16(o2.hash_size), o2.prev = new d.Buf16(o2.w_size), o2.lit_bufsize = 1 << n2 + 6, o2.pending_buf_size = 4 * o2.lit_bufsize, o2.pending_buf = new d.Buf8(o2.pending_buf_size), o2.d_buf = 1 * o2.lit_bufsize, o2.l_buf = 3 * o2.lit_bufsize, o2.level = e2, o2.strategy = s2, o2.method = r2, K(t3);
      }
      h = [new M(0, 0, 0, 0, function(t3, e2) {
        var r2 = 65535;
        for (r2 > t3.pending_buf_size - 5 && (r2 = t3.pending_buf_size - 5); ; ) {
          if (t3.lookahead <= 1) {
            if (j(t3), t3.lookahead === 0 && e2 === l)
              return A;
            if (t3.lookahead === 0)
              break;
          }
          t3.strstart += t3.lookahead, t3.lookahead = 0;
          var i2 = t3.block_start + r2;
          if ((t3.strstart === 0 || t3.strstart >= i2) && (t3.lookahead = t3.strstart - i2, t3.strstart = i2, N(t3, false), t3.strm.avail_out === 0))
            return A;
          if (t3.strstart - t3.block_start >= t3.w_size - z && (N(t3, false), t3.strm.avail_out === 0))
            return A;
        }
        return t3.insert = 0, e2 === f ? (N(t3, true), t3.strm.avail_out === 0 ? O : B) : (t3.strstart > t3.block_start && (N(t3, false), t3.strm.avail_out), A);
      }), new M(4, 4, 8, 4, Z), new M(4, 5, 16, 8, Z), new M(4, 6, 32, 32, Z), new M(4, 4, 16, 16, W), new M(8, 16, 32, 32, W), new M(8, 16, 128, 128, W), new M(8, 32, 128, 256, W), new M(32, 128, 258, 1024, W), new M(32, 258, 258, 4096, W)], r.deflateInit = function(t3, e2) {
        return Y(t3, e2, v, 15, 8, 0);
      }, r.deflateInit2 = Y, r.deflateReset = K, r.deflateResetKeep = G, r.deflateSetHeader = function(t3, e2) {
        return t3 && t3.state ? t3.state.wrap !== 2 ? _2 : (t3.state.gzhead = e2, m) : _2;
      }, r.deflate = function(t3, e2) {
        var r2, i2, n2, s2;
        if (!t3 || !t3.state || 5 < e2 || e2 < 0)
          return t3 ? R(t3, _2) : _2;
        if (i2 = t3.state, !t3.output || !t3.input && t3.avail_in !== 0 || i2.status === 666 && e2 !== f)
          return R(t3, t3.avail_out === 0 ? -5 : _2);
        if (i2.strm = t3, r2 = i2.last_flush, i2.last_flush = e2, i2.status === C)
          if (i2.wrap === 2)
            t3.adler = 0, U(i2, 31), U(i2, 139), U(i2, 8), i2.gzhead ? (U(i2, (i2.gzhead.text ? 1 : 0) + (i2.gzhead.hcrc ? 2 : 0) + (i2.gzhead.extra ? 4 : 0) + (i2.gzhead.name ? 8 : 0) + (i2.gzhead.comment ? 16 : 0)), U(i2, 255 & i2.gzhead.time), U(i2, i2.gzhead.time >> 8 & 255), U(i2, i2.gzhead.time >> 16 & 255), U(i2, i2.gzhead.time >> 24 & 255), U(i2, i2.level === 9 ? 2 : 2 <= i2.strategy || i2.level < 2 ? 4 : 0), U(i2, 255 & i2.gzhead.os), i2.gzhead.extra && i2.gzhead.extra.length && (U(i2, 255 & i2.gzhead.extra.length), U(i2, i2.gzhead.extra.length >> 8 & 255)), i2.gzhead.hcrc && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending, 0)), i2.gzindex = 0, i2.status = 69) : (U(i2, 0), U(i2, 0), U(i2, 0), U(i2, 0), U(i2, 0), U(i2, i2.level === 9 ? 2 : 2 <= i2.strategy || i2.level < 2 ? 4 : 0), U(i2, 3), i2.status = E);
          else {
            var a2 = v + (i2.w_bits - 8 << 4) << 8;
            a2 |= (2 <= i2.strategy || i2.level < 2 ? 0 : i2.level < 6 ? 1 : i2.level === 6 ? 2 : 3) << 6, i2.strstart !== 0 && (a2 |= 32), a2 += 31 - a2 % 31, i2.status = E, P(i2, a2), i2.strstart !== 0 && (P(i2, t3.adler >>> 16), P(i2, 65535 & t3.adler)), t3.adler = 1;
          }
        if (i2.status === 69)
          if (i2.gzhead.extra) {
            for (n2 = i2.pending; i2.gzindex < (65535 & i2.gzhead.extra.length) && (i2.pending !== i2.pending_buf_size || (i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), F(t3), n2 = i2.pending, i2.pending !== i2.pending_buf_size)); )
              U(i2, 255 & i2.gzhead.extra[i2.gzindex]), i2.gzindex++;
            i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), i2.gzindex === i2.gzhead.extra.length && (i2.gzindex = 0, i2.status = 73);
          } else
            i2.status = 73;
        if (i2.status === 73)
          if (i2.gzhead.name) {
            n2 = i2.pending;
            do {
              if (i2.pending === i2.pending_buf_size && (i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), F(t3), n2 = i2.pending, i2.pending === i2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = i2.gzindex < i2.gzhead.name.length ? 255 & i2.gzhead.name.charCodeAt(i2.gzindex++) : 0, U(i2, s2);
            } while (s2 !== 0);
            i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), s2 === 0 && (i2.gzindex = 0, i2.status = 91);
          } else
            i2.status = 91;
        if (i2.status === 91)
          if (i2.gzhead.comment) {
            n2 = i2.pending;
            do {
              if (i2.pending === i2.pending_buf_size && (i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), F(t3), n2 = i2.pending, i2.pending === i2.pending_buf_size)) {
                s2 = 1;
                break;
              }
              s2 = i2.gzindex < i2.gzhead.comment.length ? 255 & i2.gzhead.comment.charCodeAt(i2.gzindex++) : 0, U(i2, s2);
            } while (s2 !== 0);
            i2.gzhead.hcrc && i2.pending > n2 && (t3.adler = p(t3.adler, i2.pending_buf, i2.pending - n2, n2)), s2 === 0 && (i2.status = 103);
          } else
            i2.status = 103;
        if (i2.status === 103 && (i2.gzhead.hcrc ? (i2.pending + 2 > i2.pending_buf_size && F(t3), i2.pending + 2 <= i2.pending_buf_size && (U(i2, 255 & t3.adler), U(i2, t3.adler >> 8 & 255), t3.adler = 0, i2.status = E)) : i2.status = E), i2.pending !== 0) {
          if (F(t3), t3.avail_out === 0)
            return i2.last_flush = -1, m;
        } else if (t3.avail_in === 0 && T(e2) <= T(r2) && e2 !== f)
          return R(t3, -5);
        if (i2.status === 666 && t3.avail_in !== 0)
          return R(t3, -5);
        if (t3.avail_in !== 0 || i2.lookahead !== 0 || e2 !== l && i2.status !== 666) {
          var o2 = i2.strategy === 2 ? function(t4, e3) {
            for (var r3; ; ) {
              if (t4.lookahead === 0 && (j(t4), t4.lookahead === 0)) {
                if (e3 === l)
                  return A;
                break;
              }
              if (t4.match_length = 0, r3 = u._tr_tally(t4, 0, t4.window[t4.strstart]), t4.lookahead--, t4.strstart++, r3 && (N(t4, false), t4.strm.avail_out === 0))
                return A;
            }
            return t4.insert = 0, e3 === f ? (N(t4, true), t4.strm.avail_out === 0 ? O : B) : t4.last_lit && (N(t4, false), t4.strm.avail_out === 0) ? A : I;
          }(i2, e2) : i2.strategy === 3 ? function(t4, e3) {
            for (var r3, i3, n3, s3, a3 = t4.window; ; ) {
              if (t4.lookahead <= S) {
                if (j(t4), t4.lookahead <= S && e3 === l)
                  return A;
                if (t4.lookahead === 0)
                  break;
              }
              if (t4.match_length = 0, t4.lookahead >= x && 0 < t4.strstart && (i3 = a3[n3 = t4.strstart - 1]) === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3]) {
                s3 = t4.strstart + S;
                do {
                } while (i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && i3 === a3[++n3] && n3 < s3);
                t4.match_length = S - (s3 - n3), t4.match_length > t4.lookahead && (t4.match_length = t4.lookahead);
              }
              if (t4.match_length >= x ? (r3 = u._tr_tally(t4, 1, t4.match_length - x), t4.lookahead -= t4.match_length, t4.strstart += t4.match_length, t4.match_length = 0) : (r3 = u._tr_tally(t4, 0, t4.window[t4.strstart]), t4.lookahead--, t4.strstart++), r3 && (N(t4, false), t4.strm.avail_out === 0))
                return A;
            }
            return t4.insert = 0, e3 === f ? (N(t4, true), t4.strm.avail_out === 0 ? O : B) : t4.last_lit && (N(t4, false), t4.strm.avail_out === 0) ? A : I;
          }(i2, e2) : h[i2.level].func(i2, e2);
          if (o2 !== O && o2 !== B || (i2.status = 666), o2 === A || o2 === O)
            return t3.avail_out === 0 && (i2.last_flush = -1), m;
          if (o2 === I && (e2 === 1 ? u._tr_align(i2) : e2 !== 5 && (u._tr_stored_block(i2, 0, 0, false), e2 === 3 && (D(i2.head), i2.lookahead === 0 && (i2.strstart = 0, i2.block_start = 0, i2.insert = 0))), F(t3), t3.avail_out === 0))
            return i2.last_flush = -1, m;
        }
        return e2 !== f ? m : i2.wrap <= 0 ? 1 : (i2.wrap === 2 ? (U(i2, 255 & t3.adler), U(i2, t3.adler >> 8 & 255), U(i2, t3.adler >> 16 & 255), U(i2, t3.adler >> 24 & 255), U(i2, 255 & t3.total_in), U(i2, t3.total_in >> 8 & 255), U(i2, t3.total_in >> 16 & 255), U(i2, t3.total_in >> 24 & 255)) : (P(i2, t3.adler >>> 16), P(i2, 65535 & t3.adler)), F(t3), 0 < i2.wrap && (i2.wrap = -i2.wrap), i2.pending !== 0 ? m : 1);
      }, r.deflateEnd = function(t3) {
        var e2;
        return t3 && t3.state ? (e2 = t3.state.status) !== C && e2 !== 69 && e2 !== 73 && e2 !== 91 && e2 !== 103 && e2 !== E && e2 !== 666 ? R(t3, _2) : (t3.state = null, e2 === E ? R(t3, -3) : m) : _2;
      }, r.deflateSetDictionary = function(t3, e2) {
        var r2, i2, n2, s2, a2, o2, h2, u2, l2 = e2.length;
        if (!t3 || !t3.state)
          return _2;
        if ((s2 = (r2 = t3.state).wrap) === 2 || s2 === 1 && r2.status !== C || r2.lookahead)
          return _2;
        for (s2 === 1 && (t3.adler = c(t3.adler, e2, l2, 0)), r2.wrap = 0, l2 >= r2.w_size && (s2 === 0 && (D(r2.head), r2.strstart = 0, r2.block_start = 0, r2.insert = 0), u2 = new d.Buf8(r2.w_size), d.arraySet(u2, e2, l2 - r2.w_size, r2.w_size, 0), e2 = u2, l2 = r2.w_size), a2 = t3.avail_in, o2 = t3.next_in, h2 = t3.input, t3.avail_in = l2, t3.next_in = 0, t3.input = e2, j(r2); r2.lookahead >= x; ) {
          for (i2 = r2.strstart, n2 = r2.lookahead - (x - 1); r2.ins_h = (r2.ins_h << r2.hash_shift ^ r2.window[i2 + x - 1]) & r2.hash_mask, r2.prev[i2 & r2.w_mask] = r2.head[r2.ins_h], r2.head[r2.ins_h] = i2, i2++, --n2; )
            ;
          r2.strstart = i2, r2.lookahead = x - 1, j(r2);
        }
        return r2.strstart += r2.lookahead, r2.block_start = r2.strstart, r2.insert = r2.lookahead, r2.lookahead = 0, r2.match_length = r2.prev_length = x - 1, r2.match_available = 0, t3.next_in = o2, t3.input = h2, t3.avail_in = a2, r2.wrap = s2, m;
      }, r.deflateInfo = "pako deflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./messages": 51, "./trees": 52 }], 47: [function(t2, e, r) {
      e.exports = function() {
        this.text = 0, this.time = 0, this.xflags = 0, this.os = 0, this.extra = null, this.extra_len = 0, this.name = "", this.comment = "", this.hcrc = 0, this.done = false;
      };
    }, {}], 48: [function(t2, e, r) {
      e.exports = function(t3, e2) {
        var r2, i, n, s, a, o, h, u, l, f, d, c, p, m, _2, g, b, v, y, w, k, x, S, z, C;
        r2 = t3.state, i = t3.next_in, z = t3.input, n = i + (t3.avail_in - 5), s = t3.next_out, C = t3.output, a = s - (e2 - t3.avail_out), o = s + (t3.avail_out - 257), h = r2.dmax, u = r2.wsize, l = r2.whave, f = r2.wnext, d = r2.window, c = r2.hold, p = r2.bits, m = r2.lencode, _2 = r2.distcode, g = (1 << r2.lenbits) - 1, b = (1 << r2.distbits) - 1;
        t:
          do {
            p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = m[c & g];
            e:
              for (; ; ) {
                if (c >>>= y = v >>> 24, p -= y, (y = v >>> 16 & 255) === 0)
                  C[s++] = 65535 & v;
                else {
                  if (!(16 & y)) {
                    if ((64 & y) == 0) {
                      v = m[(65535 & v) + (c & (1 << y) - 1)];
                      continue e;
                    }
                    if (32 & y) {
                      r2.mode = 12;
                      break t;
                    }
                    t3.msg = "invalid literal/length code", r2.mode = 30;
                    break t;
                  }
                  w = 65535 & v, (y &= 15) && (p < y && (c += z[i++] << p, p += 8), w += c & (1 << y) - 1, c >>>= y, p -= y), p < 15 && (c += z[i++] << p, p += 8, c += z[i++] << p, p += 8), v = _2[c & b];
                  r:
                    for (; ; ) {
                      if (c >>>= y = v >>> 24, p -= y, !(16 & (y = v >>> 16 & 255))) {
                        if ((64 & y) == 0) {
                          v = _2[(65535 & v) + (c & (1 << y) - 1)];
                          continue r;
                        }
                        t3.msg = "invalid distance code", r2.mode = 30;
                        break t;
                      }
                      if (k = 65535 & v, p < (y &= 15) && (c += z[i++] << p, (p += 8) < y && (c += z[i++] << p, p += 8)), h < (k += c & (1 << y) - 1)) {
                        t3.msg = "invalid distance too far back", r2.mode = 30;
                        break t;
                      }
                      if (c >>>= y, p -= y, (y = s - a) < k) {
                        if (l < (y = k - y) && r2.sane) {
                          t3.msg = "invalid distance too far back", r2.mode = 30;
                          break t;
                        }
                        if (S = d, (x = 0) === f) {
                          if (x += u - y, y < w) {
                            for (w -= y; C[s++] = d[x++], --y; )
                              ;
                            x = s - k, S = C;
                          }
                        } else if (f < y) {
                          if (x += u + f - y, (y -= f) < w) {
                            for (w -= y; C[s++] = d[x++], --y; )
                              ;
                            if (x = 0, f < w) {
                              for (w -= y = f; C[s++] = d[x++], --y; )
                                ;
                              x = s - k, S = C;
                            }
                          }
                        } else if (x += f - y, y < w) {
                          for (w -= y; C[s++] = d[x++], --y; )
                            ;
                          x = s - k, S = C;
                        }
                        for (; 2 < w; )
                          C[s++] = S[x++], C[s++] = S[x++], C[s++] = S[x++], w -= 3;
                        w && (C[s++] = S[x++], 1 < w && (C[s++] = S[x++]));
                      } else {
                        for (x = s - k; C[s++] = C[x++], C[s++] = C[x++], C[s++] = C[x++], 2 < (w -= 3); )
                          ;
                        w && (C[s++] = C[x++], 1 < w && (C[s++] = C[x++]));
                      }
                      break;
                    }
                }
                break;
              }
          } while (i < n && s < o);
        i -= w = p >> 3, c &= (1 << (p -= w << 3)) - 1, t3.next_in = i, t3.next_out = s, t3.avail_in = i < n ? n - i + 5 : 5 - (i - n), t3.avail_out = s < o ? o - s + 257 : 257 - (s - o), r2.hold = c, r2.bits = p;
      };
    }, {}], 49: [function(t2, e, r) {
      var I = t2("../utils/common"), O = t2("./adler32"), B = t2("./crc32"), R = t2("./inffast"), T = t2("./inftrees"), D = 1, F = 2, N = 0, U = -2, P = 1, i = 852, n = 592;
      function L(t3) {
        return (t3 >>> 24 & 255) + (t3 >>> 8 & 65280) + ((65280 & t3) << 8) + ((255 & t3) << 24);
      }
      function s() {
        this.mode = 0, this.last = false, this.wrap = 0, this.havedict = false, this.flags = 0, this.dmax = 0, this.check = 0, this.total = 0, this.head = null, this.wbits = 0, this.wsize = 0, this.whave = 0, this.wnext = 0, this.window = null, this.hold = 0, this.bits = 0, this.length = 0, this.offset = 0, this.extra = 0, this.lencode = null, this.distcode = null, this.lenbits = 0, this.distbits = 0, this.ncode = 0, this.nlen = 0, this.ndist = 0, this.have = 0, this.next = null, this.lens = new I.Buf16(320), this.work = new I.Buf16(288), this.lendyn = null, this.distdyn = null, this.sane = 0, this.back = 0, this.was = 0;
      }
      function a(t3) {
        var e2;
        return t3 && t3.state ? (e2 = t3.state, t3.total_in = t3.total_out = e2.total = 0, t3.msg = "", e2.wrap && (t3.adler = 1 & e2.wrap), e2.mode = P, e2.last = 0, e2.havedict = 0, e2.dmax = 32768, e2.head = null, e2.hold = 0, e2.bits = 0, e2.lencode = e2.lendyn = new I.Buf32(i), e2.distcode = e2.distdyn = new I.Buf32(n), e2.sane = 1, e2.back = -1, N) : U;
      }
      function o(t3) {
        var e2;
        return t3 && t3.state ? ((e2 = t3.state).wsize = 0, e2.whave = 0, e2.wnext = 0, a(t3)) : U;
      }
      function h(t3, e2) {
        var r2, i2;
        return t3 && t3.state ? (i2 = t3.state, e2 < 0 ? (r2 = 0, e2 = -e2) : (r2 = 1 + (e2 >> 4), e2 < 48 && (e2 &= 15)), e2 && (e2 < 8 || 15 < e2) ? U : (i2.window !== null && i2.wbits !== e2 && (i2.window = null), i2.wrap = r2, i2.wbits = e2, o(t3))) : U;
      }
      function u(t3, e2) {
        var r2, i2;
        return t3 ? (i2 = new s(), (t3.state = i2).window = null, (r2 = h(t3, e2)) !== N && (t3.state = null), r2) : U;
      }
      var l, f, d = true;
      function j(t3) {
        if (d) {
          var e2;
          for (l = new I.Buf32(512), f = new I.Buf32(32), e2 = 0; e2 < 144; )
            t3.lens[e2++] = 8;
          for (; e2 < 256; )
            t3.lens[e2++] = 9;
          for (; e2 < 280; )
            t3.lens[e2++] = 7;
          for (; e2 < 288; )
            t3.lens[e2++] = 8;
          for (T(D, t3.lens, 0, 288, l, 0, t3.work, { bits: 9 }), e2 = 0; e2 < 32; )
            t3.lens[e2++] = 5;
          T(F, t3.lens, 0, 32, f, 0, t3.work, { bits: 5 }), d = false;
        }
        t3.lencode = l, t3.lenbits = 9, t3.distcode = f, t3.distbits = 5;
      }
      function Z(t3, e2, r2, i2) {
        var n2, s2 = t3.state;
        return s2.window === null && (s2.wsize = 1 << s2.wbits, s2.wnext = 0, s2.whave = 0, s2.window = new I.Buf8(s2.wsize)), i2 >= s2.wsize ? (I.arraySet(s2.window, e2, r2 - s2.wsize, s2.wsize, 0), s2.wnext = 0, s2.whave = s2.wsize) : (i2 < (n2 = s2.wsize - s2.wnext) && (n2 = i2), I.arraySet(s2.window, e2, r2 - i2, n2, s2.wnext), (i2 -= n2) ? (I.arraySet(s2.window, e2, r2 - i2, i2, 0), s2.wnext = i2, s2.whave = s2.wsize) : (s2.wnext += n2, s2.wnext === s2.wsize && (s2.wnext = 0), s2.whave < s2.wsize && (s2.whave += n2))), 0;
      }
      r.inflateReset = o, r.inflateReset2 = h, r.inflateResetKeep = a, r.inflateInit = function(t3) {
        return u(t3, 15);
      }, r.inflateInit2 = u, r.inflate = function(t3, e2) {
        var r2, i2, n2, s2, a2, o2, h2, u2, l2, f2, d2, c, p, m, _2, g, b, v, y, w, k, x, S, z, C = 0, E = new I.Buf8(4), A = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
        if (!t3 || !t3.state || !t3.output || !t3.input && t3.avail_in !== 0)
          return U;
        (r2 = t3.state).mode === 12 && (r2.mode = 13), a2 = t3.next_out, n2 = t3.output, h2 = t3.avail_out, s2 = t3.next_in, i2 = t3.input, o2 = t3.avail_in, u2 = r2.hold, l2 = r2.bits, f2 = o2, d2 = h2, x = N;
        t:
          for (; ; )
            switch (r2.mode) {
              case P:
                if (r2.wrap === 0) {
                  r2.mode = 13;
                  break;
                }
                for (; l2 < 16; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if (2 & r2.wrap && u2 === 35615) {
                  E[r2.check = 0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0), l2 = u2 = 0, r2.mode = 2;
                  break;
                }
                if (r2.flags = 0, r2.head && (r2.head.done = false), !(1 & r2.wrap) || (((255 & u2) << 8) + (u2 >> 8)) % 31) {
                  t3.msg = "incorrect header check", r2.mode = 30;
                  break;
                }
                if ((15 & u2) != 8) {
                  t3.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (l2 -= 4, k = 8 + (15 & (u2 >>>= 4)), r2.wbits === 0)
                  r2.wbits = k;
                else if (k > r2.wbits) {
                  t3.msg = "invalid window size", r2.mode = 30;
                  break;
                }
                r2.dmax = 1 << k, t3.adler = r2.check = 1, r2.mode = 512 & u2 ? 10 : 12, l2 = u2 = 0;
                break;
              case 2:
                for (; l2 < 16; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if (r2.flags = u2, (255 & r2.flags) != 8) {
                  t3.msg = "unknown compression method", r2.mode = 30;
                  break;
                }
                if (57344 & r2.flags) {
                  t3.msg = "unknown header flags set", r2.mode = 30;
                  break;
                }
                r2.head && (r2.head.text = u2 >> 8 & 1), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 3;
              case 3:
                for (; l2 < 32; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.time = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, E[2] = u2 >>> 16 & 255, E[3] = u2 >>> 24 & 255, r2.check = B(r2.check, E, 4, 0)), l2 = u2 = 0, r2.mode = 4;
              case 4:
                for (; l2 < 16; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                r2.head && (r2.head.xflags = 255 & u2, r2.head.os = u2 >> 8), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0, r2.mode = 5;
              case 5:
                if (1024 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  r2.length = u2, r2.head && (r2.head.extra_len = u2), 512 & r2.flags && (E[0] = 255 & u2, E[1] = u2 >>> 8 & 255, r2.check = B(r2.check, E, 2, 0)), l2 = u2 = 0;
                } else
                  r2.head && (r2.head.extra = null);
                r2.mode = 6;
              case 6:
                if (1024 & r2.flags && (o2 < (c = r2.length) && (c = o2), c && (r2.head && (k = r2.head.extra_len - r2.length, r2.head.extra || (r2.head.extra = new Array(r2.head.extra_len)), I.arraySet(r2.head.extra, i2, s2, c, k)), 512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, r2.length -= c), r2.length))
                  break t;
                r2.length = 0, r2.mode = 7;
              case 7:
                if (2048 & r2.flags) {
                  if (o2 === 0)
                    break t;
                  for (c = 0; k = i2[s2 + c++], r2.head && k && r2.length < 65536 && (r2.head.name += String.fromCharCode(k)), k && c < o2; )
                    ;
                  if (512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, k)
                    break t;
                } else
                  r2.head && (r2.head.name = null);
                r2.length = 0, r2.mode = 8;
              case 8:
                if (4096 & r2.flags) {
                  if (o2 === 0)
                    break t;
                  for (c = 0; k = i2[s2 + c++], r2.head && k && r2.length < 65536 && (r2.head.comment += String.fromCharCode(k)), k && c < o2; )
                    ;
                  if (512 & r2.flags && (r2.check = B(r2.check, i2, c, s2)), o2 -= c, s2 += c, k)
                    break t;
                } else
                  r2.head && (r2.head.comment = null);
                r2.mode = 9;
              case 9:
                if (512 & r2.flags) {
                  for (; l2 < 16; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (65535 & r2.check)) {
                    t3.msg = "header crc mismatch", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.head && (r2.head.hcrc = r2.flags >> 9 & 1, r2.head.done = true), t3.adler = r2.check = 0, r2.mode = 12;
                break;
              case 10:
                for (; l2 < 32; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                t3.adler = r2.check = L(u2), l2 = u2 = 0, r2.mode = 11;
              case 11:
                if (r2.havedict === 0)
                  return t3.next_out = a2, t3.avail_out = h2, t3.next_in = s2, t3.avail_in = o2, r2.hold = u2, r2.bits = l2, 2;
                t3.adler = r2.check = 1, r2.mode = 12;
              case 12:
                if (e2 === 5 || e2 === 6)
                  break t;
              case 13:
                if (r2.last) {
                  u2 >>>= 7 & l2, l2 -= 7 & l2, r2.mode = 27;
                  break;
                }
                for (; l2 < 3; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                switch (r2.last = 1 & u2, l2 -= 1, 3 & (u2 >>>= 1)) {
                  case 0:
                    r2.mode = 14;
                    break;
                  case 1:
                    if (j(r2), r2.mode = 20, e2 !== 6)
                      break;
                    u2 >>>= 2, l2 -= 2;
                    break t;
                  case 2:
                    r2.mode = 17;
                    break;
                  case 3:
                    t3.msg = "invalid block type", r2.mode = 30;
                }
                u2 >>>= 2, l2 -= 2;
                break;
              case 14:
                for (u2 >>>= 7 & l2, l2 -= 7 & l2; l2 < 32; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if ((65535 & u2) != (u2 >>> 16 ^ 65535)) {
                  t3.msg = "invalid stored block lengths", r2.mode = 30;
                  break;
                }
                if (r2.length = 65535 & u2, l2 = u2 = 0, r2.mode = 15, e2 === 6)
                  break t;
              case 15:
                r2.mode = 16;
              case 16:
                if (c = r2.length) {
                  if (o2 < c && (c = o2), h2 < c && (c = h2), c === 0)
                    break t;
                  I.arraySet(n2, i2, s2, c, a2), o2 -= c, s2 += c, h2 -= c, a2 += c, r2.length -= c;
                  break;
                }
                r2.mode = 12;
                break;
              case 17:
                for (; l2 < 14; ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if (r2.nlen = 257 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ndist = 1 + (31 & u2), u2 >>>= 5, l2 -= 5, r2.ncode = 4 + (15 & u2), u2 >>>= 4, l2 -= 4, 286 < r2.nlen || 30 < r2.ndist) {
                  t3.msg = "too many length or distance symbols", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 18;
              case 18:
                for (; r2.have < r2.ncode; ) {
                  for (; l2 < 3; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  r2.lens[A[r2.have++]] = 7 & u2, u2 >>>= 3, l2 -= 3;
                }
                for (; r2.have < 19; )
                  r2.lens[A[r2.have++]] = 0;
                if (r2.lencode = r2.lendyn, r2.lenbits = 7, S = { bits: r2.lenbits }, x = T(0, r2.lens, 0, 19, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  t3.msg = "invalid code lengths set", r2.mode = 30;
                  break;
                }
                r2.have = 0, r2.mode = 19;
              case 19:
                for (; r2.have < r2.nlen + r2.ndist; ) {
                  for (; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_2 = C >>> 24) <= l2); ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  if (b < 16)
                    u2 >>>= _2, l2 -= _2, r2.lens[r2.have++] = b;
                  else {
                    if (b === 16) {
                      for (z = _2 + 2; l2 < z; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      if (u2 >>>= _2, l2 -= _2, r2.have === 0) {
                        t3.msg = "invalid bit length repeat", r2.mode = 30;
                        break;
                      }
                      k = r2.lens[r2.have - 1], c = 3 + (3 & u2), u2 >>>= 2, l2 -= 2;
                    } else if (b === 17) {
                      for (z = _2 + 3; l2 < z; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _2, k = 0, c = 3 + (7 & (u2 >>>= _2)), u2 >>>= 3, l2 -= 3;
                    } else {
                      for (z = _2 + 7; l2 < z; ) {
                        if (o2 === 0)
                          break t;
                        o2--, u2 += i2[s2++] << l2, l2 += 8;
                      }
                      l2 -= _2, k = 0, c = 11 + (127 & (u2 >>>= _2)), u2 >>>= 7, l2 -= 7;
                    }
                    if (r2.have + c > r2.nlen + r2.ndist) {
                      t3.msg = "invalid bit length repeat", r2.mode = 30;
                      break;
                    }
                    for (; c--; )
                      r2.lens[r2.have++] = k;
                  }
                }
                if (r2.mode === 30)
                  break;
                if (r2.lens[256] === 0) {
                  t3.msg = "invalid code -- missing end-of-block", r2.mode = 30;
                  break;
                }
                if (r2.lenbits = 9, S = { bits: r2.lenbits }, x = T(D, r2.lens, 0, r2.nlen, r2.lencode, 0, r2.work, S), r2.lenbits = S.bits, x) {
                  t3.msg = "invalid literal/lengths set", r2.mode = 30;
                  break;
                }
                if (r2.distbits = 6, r2.distcode = r2.distdyn, S = { bits: r2.distbits }, x = T(F, r2.lens, r2.nlen, r2.ndist, r2.distcode, 0, r2.work, S), r2.distbits = S.bits, x) {
                  t3.msg = "invalid distances set", r2.mode = 30;
                  break;
                }
                if (r2.mode = 20, e2 === 6)
                  break t;
              case 20:
                r2.mode = 21;
              case 21:
                if (6 <= o2 && 258 <= h2) {
                  t3.next_out = a2, t3.avail_out = h2, t3.next_in = s2, t3.avail_in = o2, r2.hold = u2, r2.bits = l2, R(t3, d2), a2 = t3.next_out, n2 = t3.output, h2 = t3.avail_out, s2 = t3.next_in, i2 = t3.input, o2 = t3.avail_in, u2 = r2.hold, l2 = r2.bits, r2.mode === 12 && (r2.back = -1);
                  break;
                }
                for (r2.back = 0; g = (C = r2.lencode[u2 & (1 << r2.lenbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_2 = C >>> 24) <= l2); ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if (g && (240 & g) == 0) {
                  for (v = _2, y = g, w = b; g = (C = r2.lencode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_2 = C >>> 24) <= l2); ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _2, l2 -= _2, r2.back += _2, r2.length = b, g === 0) {
                  r2.mode = 26;
                  break;
                }
                if (32 & g) {
                  r2.back = -1, r2.mode = 12;
                  break;
                }
                if (64 & g) {
                  t3.msg = "invalid literal/length code", r2.mode = 30;
                  break;
                }
                r2.extra = 15 & g, r2.mode = 22;
              case 22:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  r2.length += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                r2.was = r2.length, r2.mode = 23;
              case 23:
                for (; g = (C = r2.distcode[u2 & (1 << r2.distbits) - 1]) >>> 16 & 255, b = 65535 & C, !((_2 = C >>> 24) <= l2); ) {
                  if (o2 === 0)
                    break t;
                  o2--, u2 += i2[s2++] << l2, l2 += 8;
                }
                if ((240 & g) == 0) {
                  for (v = _2, y = g, w = b; g = (C = r2.distcode[w + ((u2 & (1 << v + y) - 1) >> v)]) >>> 16 & 255, b = 65535 & C, !(v + (_2 = C >>> 24) <= l2); ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  u2 >>>= v, l2 -= v, r2.back += v;
                }
                if (u2 >>>= _2, l2 -= _2, r2.back += _2, 64 & g) {
                  t3.msg = "invalid distance code", r2.mode = 30;
                  break;
                }
                r2.offset = b, r2.extra = 15 & g, r2.mode = 24;
              case 24:
                if (r2.extra) {
                  for (z = r2.extra; l2 < z; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  r2.offset += u2 & (1 << r2.extra) - 1, u2 >>>= r2.extra, l2 -= r2.extra, r2.back += r2.extra;
                }
                if (r2.offset > r2.dmax) {
                  t3.msg = "invalid distance too far back", r2.mode = 30;
                  break;
                }
                r2.mode = 25;
              case 25:
                if (h2 === 0)
                  break t;
                if (c = d2 - h2, r2.offset > c) {
                  if ((c = r2.offset - c) > r2.whave && r2.sane) {
                    t3.msg = "invalid distance too far back", r2.mode = 30;
                    break;
                  }
                  p = c > r2.wnext ? (c -= r2.wnext, r2.wsize - c) : r2.wnext - c, c > r2.length && (c = r2.length), m = r2.window;
                } else
                  m = n2, p = a2 - r2.offset, c = r2.length;
                for (h2 < c && (c = h2), h2 -= c, r2.length -= c; n2[a2++] = m[p++], --c; )
                  ;
                r2.length === 0 && (r2.mode = 21);
                break;
              case 26:
                if (h2 === 0)
                  break t;
                n2[a2++] = r2.length, h2--, r2.mode = 21;
                break;
              case 27:
                if (r2.wrap) {
                  for (; l2 < 32; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 |= i2[s2++] << l2, l2 += 8;
                  }
                  if (d2 -= h2, t3.total_out += d2, r2.total += d2, d2 && (t3.adler = r2.check = r2.flags ? B(r2.check, n2, d2, a2 - d2) : O(r2.check, n2, d2, a2 - d2)), d2 = h2, (r2.flags ? u2 : L(u2)) !== r2.check) {
                    t3.msg = "incorrect data check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 28;
              case 28:
                if (r2.wrap && r2.flags) {
                  for (; l2 < 32; ) {
                    if (o2 === 0)
                      break t;
                    o2--, u2 += i2[s2++] << l2, l2 += 8;
                  }
                  if (u2 !== (4294967295 & r2.total)) {
                    t3.msg = "incorrect length check", r2.mode = 30;
                    break;
                  }
                  l2 = u2 = 0;
                }
                r2.mode = 29;
              case 29:
                x = 1;
                break t;
              case 30:
                x = -3;
                break t;
              case 31:
                return -4;
              case 32:
              default:
                return U;
            }
        return t3.next_out = a2, t3.avail_out = h2, t3.next_in = s2, t3.avail_in = o2, r2.hold = u2, r2.bits = l2, (r2.wsize || d2 !== t3.avail_out && r2.mode < 30 && (r2.mode < 27 || e2 !== 4)) && Z(t3, t3.output, t3.next_out, d2 - t3.avail_out) ? (r2.mode = 31, -4) : (f2 -= t3.avail_in, d2 -= t3.avail_out, t3.total_in += f2, t3.total_out += d2, r2.total += d2, r2.wrap && d2 && (t3.adler = r2.check = r2.flags ? B(r2.check, n2, d2, t3.next_out - d2) : O(r2.check, n2, d2, t3.next_out - d2)), t3.data_type = r2.bits + (r2.last ? 64 : 0) + (r2.mode === 12 ? 128 : 0) + (r2.mode === 20 || r2.mode === 15 ? 256 : 0), (f2 == 0 && d2 === 0 || e2 === 4) && x === N && (x = -5), x);
      }, r.inflateEnd = function(t3) {
        if (!t3 || !t3.state)
          return U;
        var e2 = t3.state;
        return e2.window && (e2.window = null), t3.state = null, N;
      }, r.inflateGetHeader = function(t3, e2) {
        var r2;
        return t3 && t3.state ? (2 & (r2 = t3.state).wrap) == 0 ? U : ((r2.head = e2).done = false, N) : U;
      }, r.inflateSetDictionary = function(t3, e2) {
        var r2, i2 = e2.length;
        return t3 && t3.state ? (r2 = t3.state).wrap !== 0 && r2.mode !== 11 ? U : r2.mode === 11 && O(1, e2, i2, 0) !== r2.check ? -3 : Z(t3, e2, i2, i2) ? (r2.mode = 31, -4) : (r2.havedict = 1, N) : U;
      }, r.inflateInfo = "pako inflate (from Nodeca project)";
    }, { "../utils/common": 41, "./adler32": 43, "./crc32": 45, "./inffast": 48, "./inftrees": 50 }], 50: [function(t2, e, r) {
      var D = t2("../utils/common"), F = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0], N = [16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18, 19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78], U = [1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193, 257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145, 8193, 12289, 16385, 24577, 0, 0], P = [16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22, 23, 23, 24, 24, 25, 25, 26, 26, 27, 27, 28, 28, 29, 29, 64, 64];
      e.exports = function(t3, e2, r2, i, n, s, a, o) {
        var h, u, l, f, d, c, p, m, _2, g = o.bits, b = 0, v = 0, y = 0, w = 0, k = 0, x = 0, S = 0, z = 0, C = 0, E = 0, A = null, I = 0, O = new D.Buf16(16), B = new D.Buf16(16), R = null, T = 0;
        for (b = 0; b <= 15; b++)
          O[b] = 0;
        for (v = 0; v < i; v++)
          O[e2[r2 + v]]++;
        for (k = g, w = 15; 1 <= w && O[w] === 0; w--)
          ;
        if (w < k && (k = w), w === 0)
          return n[s++] = 20971520, n[s++] = 20971520, o.bits = 1, 0;
        for (y = 1; y < w && O[y] === 0; y++)
          ;
        for (k < y && (k = y), b = z = 1; b <= 15; b++)
          if (z <<= 1, (z -= O[b]) < 0)
            return -1;
        if (0 < z && (t3 === 0 || w !== 1))
          return -1;
        for (B[1] = 0, b = 1; b < 15; b++)
          B[b + 1] = B[b] + O[b];
        for (v = 0; v < i; v++)
          e2[r2 + v] !== 0 && (a[B[e2[r2 + v]]++] = v);
        if (c = t3 === 0 ? (A = R = a, 19) : t3 === 1 ? (A = F, I -= 257, R = N, T -= 257, 256) : (A = U, R = P, -1), b = y, d = s, S = v = E = 0, l = -1, f = (C = 1 << (x = k)) - 1, t3 === 1 && 852 < C || t3 === 2 && 592 < C)
          return 1;
        for (; ; ) {
          for (p = b - S, _2 = a[v] < c ? (m = 0, a[v]) : a[v] > c ? (m = R[T + a[v]], A[I + a[v]]) : (m = 96, 0), h = 1 << b - S, y = u = 1 << x; n[d + (E >> S) + (u -= h)] = p << 24 | m << 16 | _2 | 0, u !== 0; )
            ;
          for (h = 1 << b - 1; E & h; )
            h >>= 1;
          if (h !== 0 ? (E &= h - 1, E += h) : E = 0, v++, --O[b] == 0) {
            if (b === w)
              break;
            b = e2[r2 + a[v]];
          }
          if (k < b && (E & f) !== l) {
            for (S === 0 && (S = k), d += y, z = 1 << (x = b - S); x + S < w && !((z -= O[x + S]) <= 0); )
              x++, z <<= 1;
            if (C += 1 << x, t3 === 1 && 852 < C || t3 === 2 && 592 < C)
              return 1;
            n[l = E & f] = k << 24 | x << 16 | d - s | 0;
          }
        }
        return E !== 0 && (n[d + E] = b - S << 24 | 64 << 16 | 0), o.bits = k, 0;
      };
    }, { "../utils/common": 41 }], 51: [function(t2, e, r) {
      e.exports = { 2: "need dictionary", 1: "stream end", 0: "", "-1": "file error", "-2": "stream error", "-3": "data error", "-4": "insufficient memory", "-5": "buffer error", "-6": "incompatible version" };
    }, {}], 52: [function(t2, e, r) {
      var n = t2("../utils/common"), o = 0, h = 1;
      function i(t3) {
        for (var e2 = t3.length; 0 <= --e2; )
          t3[e2] = 0;
      }
      var s = 0, a = 29, u = 256, l = u + 1 + a, f = 30, d = 19, _2 = 2 * l + 1, g = 15, c = 16, p = 7, m = 256, b = 16, v = 17, y = 18, w = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0], k = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13], x = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 7], S = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15], z = new Array(2 * (l + 2));
      i(z);
      var C = new Array(2 * f);
      i(C);
      var E = new Array(512);
      i(E);
      var A = new Array(256);
      i(A);
      var I = new Array(a);
      i(I);
      var O, B, R, T = new Array(f);
      function D(t3, e2, r2, i2, n2) {
        this.static_tree = t3, this.extra_bits = e2, this.extra_base = r2, this.elems = i2, this.max_length = n2, this.has_stree = t3 && t3.length;
      }
      function F(t3, e2) {
        this.dyn_tree = t3, this.max_code = 0, this.stat_desc = e2;
      }
      function N(t3) {
        return t3 < 256 ? E[t3] : E[256 + (t3 >>> 7)];
      }
      function U(t3, e2) {
        t3.pending_buf[t3.pending++] = 255 & e2, t3.pending_buf[t3.pending++] = e2 >>> 8 & 255;
      }
      function P(t3, e2, r2) {
        t3.bi_valid > c - r2 ? (t3.bi_buf |= e2 << t3.bi_valid & 65535, U(t3, t3.bi_buf), t3.bi_buf = e2 >> c - t3.bi_valid, t3.bi_valid += r2 - c) : (t3.bi_buf |= e2 << t3.bi_valid & 65535, t3.bi_valid += r2);
      }
      function L(t3, e2, r2) {
        P(t3, r2[2 * e2], r2[2 * e2 + 1]);
      }
      function j(t3, e2) {
        for (var r2 = 0; r2 |= 1 & t3, t3 >>>= 1, r2 <<= 1, 0 < --e2; )
          ;
        return r2 >>> 1;
      }
      function Z(t3, e2, r2) {
        var i2, n2, s2 = new Array(g + 1), a2 = 0;
        for (i2 = 1; i2 <= g; i2++)
          s2[i2] = a2 = a2 + r2[i2 - 1] << 1;
        for (n2 = 0; n2 <= e2; n2++) {
          var o2 = t3[2 * n2 + 1];
          o2 !== 0 && (t3[2 * n2] = j(s2[o2]++, o2));
        }
      }
      function W(t3) {
        var e2;
        for (e2 = 0; e2 < l; e2++)
          t3.dyn_ltree[2 * e2] = 0;
        for (e2 = 0; e2 < f; e2++)
          t3.dyn_dtree[2 * e2] = 0;
        for (e2 = 0; e2 < d; e2++)
          t3.bl_tree[2 * e2] = 0;
        t3.dyn_ltree[2 * m] = 1, t3.opt_len = t3.static_len = 0, t3.last_lit = t3.matches = 0;
      }
      function M(t3) {
        8 < t3.bi_valid ? U(t3, t3.bi_buf) : 0 < t3.bi_valid && (t3.pending_buf[t3.pending++] = t3.bi_buf), t3.bi_buf = 0, t3.bi_valid = 0;
      }
      function H(t3, e2, r2, i2) {
        var n2 = 2 * e2, s2 = 2 * r2;
        return t3[n2] < t3[s2] || t3[n2] === t3[s2] && i2[e2] <= i2[r2];
      }
      function G(t3, e2, r2) {
        for (var i2 = t3.heap[r2], n2 = r2 << 1; n2 <= t3.heap_len && (n2 < t3.heap_len && H(e2, t3.heap[n2 + 1], t3.heap[n2], t3.depth) && n2++, !H(e2, i2, t3.heap[n2], t3.depth)); )
          t3.heap[r2] = t3.heap[n2], r2 = n2, n2 <<= 1;
        t3.heap[r2] = i2;
      }
      function K(t3, e2, r2) {
        var i2, n2, s2, a2, o2 = 0;
        if (t3.last_lit !== 0)
          for (; i2 = t3.pending_buf[t3.d_buf + 2 * o2] << 8 | t3.pending_buf[t3.d_buf + 2 * o2 + 1], n2 = t3.pending_buf[t3.l_buf + o2], o2++, i2 === 0 ? L(t3, n2, e2) : (L(t3, (s2 = A[n2]) + u + 1, e2), (a2 = w[s2]) !== 0 && P(t3, n2 -= I[s2], a2), L(t3, s2 = N(--i2), r2), (a2 = k[s2]) !== 0 && P(t3, i2 -= T[s2], a2)), o2 < t3.last_lit; )
            ;
        L(t3, m, e2);
      }
      function Y(t3, e2) {
        var r2, i2, n2, s2 = e2.dyn_tree, a2 = e2.stat_desc.static_tree, o2 = e2.stat_desc.has_stree, h2 = e2.stat_desc.elems, u2 = -1;
        for (t3.heap_len = 0, t3.heap_max = _2, r2 = 0; r2 < h2; r2++)
          s2[2 * r2] !== 0 ? (t3.heap[++t3.heap_len] = u2 = r2, t3.depth[r2] = 0) : s2[2 * r2 + 1] = 0;
        for (; t3.heap_len < 2; )
          s2[2 * (n2 = t3.heap[++t3.heap_len] = u2 < 2 ? ++u2 : 0)] = 1, t3.depth[n2] = 0, t3.opt_len--, o2 && (t3.static_len -= a2[2 * n2 + 1]);
        for (e2.max_code = u2, r2 = t3.heap_len >> 1; 1 <= r2; r2--)
          G(t3, s2, r2);
        for (n2 = h2; r2 = t3.heap[1], t3.heap[1] = t3.heap[t3.heap_len--], G(t3, s2, 1), i2 = t3.heap[1], t3.heap[--t3.heap_max] = r2, t3.heap[--t3.heap_max] = i2, s2[2 * n2] = s2[2 * r2] + s2[2 * i2], t3.depth[n2] = (t3.depth[r2] >= t3.depth[i2] ? t3.depth[r2] : t3.depth[i2]) + 1, s2[2 * r2 + 1] = s2[2 * i2 + 1] = n2, t3.heap[1] = n2++, G(t3, s2, 1), 2 <= t3.heap_len; )
          ;
        t3.heap[--t3.heap_max] = t3.heap[1], function(t4, e3) {
          var r3, i3, n3, s3, a3, o3, h3 = e3.dyn_tree, u3 = e3.max_code, l2 = e3.stat_desc.static_tree, f2 = e3.stat_desc.has_stree, d2 = e3.stat_desc.extra_bits, c2 = e3.stat_desc.extra_base, p2 = e3.stat_desc.max_length, m2 = 0;
          for (s3 = 0; s3 <= g; s3++)
            t4.bl_count[s3] = 0;
          for (h3[2 * t4.heap[t4.heap_max] + 1] = 0, r3 = t4.heap_max + 1; r3 < _2; r3++)
            p2 < (s3 = h3[2 * h3[2 * (i3 = t4.heap[r3]) + 1] + 1] + 1) && (s3 = p2, m2++), h3[2 * i3 + 1] = s3, u3 < i3 || (t4.bl_count[s3]++, a3 = 0, c2 <= i3 && (a3 = d2[i3 - c2]), o3 = h3[2 * i3], t4.opt_len += o3 * (s3 + a3), f2 && (t4.static_len += o3 * (l2[2 * i3 + 1] + a3)));
          if (m2 !== 0) {
            do {
              for (s3 = p2 - 1; t4.bl_count[s3] === 0; )
                s3--;
              t4.bl_count[s3]--, t4.bl_count[s3 + 1] += 2, t4.bl_count[p2]--, m2 -= 2;
            } while (0 < m2);
            for (s3 = p2; s3 !== 0; s3--)
              for (i3 = t4.bl_count[s3]; i3 !== 0; )
                u3 < (n3 = t4.heap[--r3]) || (h3[2 * n3 + 1] !== s3 && (t4.opt_len += (s3 - h3[2 * n3 + 1]) * h3[2 * n3], h3[2 * n3 + 1] = s3), i3--);
          }
        }(t3, e2), Z(s2, u2, t3.bl_count);
      }
      function X(t3, e2, r2) {
        var i2, n2, s2 = -1, a2 = e2[1], o2 = 0, h2 = 7, u2 = 4;
        for (a2 === 0 && (h2 = 138, u2 = 3), e2[2 * (r2 + 1) + 1] = 65535, i2 = 0; i2 <= r2; i2++)
          n2 = a2, a2 = e2[2 * (i2 + 1) + 1], ++o2 < h2 && n2 === a2 || (o2 < u2 ? t3.bl_tree[2 * n2] += o2 : n2 !== 0 ? (n2 !== s2 && t3.bl_tree[2 * n2]++, t3.bl_tree[2 * b]++) : o2 <= 10 ? t3.bl_tree[2 * v]++ : t3.bl_tree[2 * y]++, s2 = n2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : n2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4));
      }
      function V(t3, e2, r2) {
        var i2, n2, s2 = -1, a2 = e2[1], o2 = 0, h2 = 7, u2 = 4;
        for (a2 === 0 && (h2 = 138, u2 = 3), i2 = 0; i2 <= r2; i2++)
          if (n2 = a2, a2 = e2[2 * (i2 + 1) + 1], !(++o2 < h2 && n2 === a2)) {
            if (o2 < u2)
              for (; L(t3, n2, t3.bl_tree), --o2 != 0; )
                ;
            else
              n2 !== 0 ? (n2 !== s2 && (L(t3, n2, t3.bl_tree), o2--), L(t3, b, t3.bl_tree), P(t3, o2 - 3, 2)) : o2 <= 10 ? (L(t3, v, t3.bl_tree), P(t3, o2 - 3, 3)) : (L(t3, y, t3.bl_tree), P(t3, o2 - 11, 7));
            s2 = n2, u2 = (o2 = 0) === a2 ? (h2 = 138, 3) : n2 === a2 ? (h2 = 6, 3) : (h2 = 7, 4);
          }
      }
      i(T);
      var q = false;
      function J(t3, e2, r2, i2) {
        P(t3, (s << 1) + (i2 ? 1 : 0), 3), function(t4, e3, r3, i3) {
          M(t4), i3 && (U(t4, r3), U(t4, ~r3)), n.arraySet(t4.pending_buf, t4.window, e3, r3, t4.pending), t4.pending += r3;
        }(t3, e2, r2, true);
      }
      r._tr_init = function(t3) {
        q || (function() {
          var t4, e2, r2, i2, n2, s2 = new Array(g + 1);
          for (i2 = r2 = 0; i2 < a - 1; i2++)
            for (I[i2] = r2, t4 = 0; t4 < 1 << w[i2]; t4++)
              A[r2++] = i2;
          for (A[r2 - 1] = i2, i2 = n2 = 0; i2 < 16; i2++)
            for (T[i2] = n2, t4 = 0; t4 < 1 << k[i2]; t4++)
              E[n2++] = i2;
          for (n2 >>= 7; i2 < f; i2++)
            for (T[i2] = n2 << 7, t4 = 0; t4 < 1 << k[i2] - 7; t4++)
              E[256 + n2++] = i2;
          for (e2 = 0; e2 <= g; e2++)
            s2[e2] = 0;
          for (t4 = 0; t4 <= 143; )
            z[2 * t4 + 1] = 8, t4++, s2[8]++;
          for (; t4 <= 255; )
            z[2 * t4 + 1] = 9, t4++, s2[9]++;
          for (; t4 <= 279; )
            z[2 * t4 + 1] = 7, t4++, s2[7]++;
          for (; t4 <= 287; )
            z[2 * t4 + 1] = 8, t4++, s2[8]++;
          for (Z(z, l + 1, s2), t4 = 0; t4 < f; t4++)
            C[2 * t4 + 1] = 5, C[2 * t4] = j(t4, 5);
          O = new D(z, w, u + 1, l, g), B = new D(C, k, 0, f, g), R = new D(new Array(0), x, 0, d, p);
        }(), q = true), t3.l_desc = new F(t3.dyn_ltree, O), t3.d_desc = new F(t3.dyn_dtree, B), t3.bl_desc = new F(t3.bl_tree, R), t3.bi_buf = 0, t3.bi_valid = 0, W(t3);
      }, r._tr_stored_block = J, r._tr_flush_block = function(t3, e2, r2, i2) {
        var n2, s2, a2 = 0;
        0 < t3.level ? (t3.strm.data_type === 2 && (t3.strm.data_type = function(t4) {
          var e3, r3 = 4093624447;
          for (e3 = 0; e3 <= 31; e3++, r3 >>>= 1)
            if (1 & r3 && t4.dyn_ltree[2 * e3] !== 0)
              return o;
          if (t4.dyn_ltree[18] !== 0 || t4.dyn_ltree[20] !== 0 || t4.dyn_ltree[26] !== 0)
            return h;
          for (e3 = 32; e3 < u; e3++)
            if (t4.dyn_ltree[2 * e3] !== 0)
              return h;
          return o;
        }(t3)), Y(t3, t3.l_desc), Y(t3, t3.d_desc), a2 = function(t4) {
          var e3;
          for (X(t4, t4.dyn_ltree, t4.l_desc.max_code), X(t4, t4.dyn_dtree, t4.d_desc.max_code), Y(t4, t4.bl_desc), e3 = d - 1; 3 <= e3 && t4.bl_tree[2 * S[e3] + 1] === 0; e3--)
            ;
          return t4.opt_len += 3 * (e3 + 1) + 5 + 5 + 4, e3;
        }(t3), n2 = t3.opt_len + 3 + 7 >>> 3, (s2 = t3.static_len + 3 + 7 >>> 3) <= n2 && (n2 = s2)) : n2 = s2 = r2 + 5, r2 + 4 <= n2 && e2 !== -1 ? J(t3, e2, r2, i2) : t3.strategy === 4 || s2 === n2 ? (P(t3, 2 + (i2 ? 1 : 0), 3), K(t3, z, C)) : (P(t3, 4 + (i2 ? 1 : 0), 3), function(t4, e3, r3, i3) {
          var n3;
          for (P(t4, e3 - 257, 5), P(t4, r3 - 1, 5), P(t4, i3 - 4, 4), n3 = 0; n3 < i3; n3++)
            P(t4, t4.bl_tree[2 * S[n3] + 1], 3);
          V(t4, t4.dyn_ltree, e3 - 1), V(t4, t4.dyn_dtree, r3 - 1);
        }(t3, t3.l_desc.max_code + 1, t3.d_desc.max_code + 1, a2 + 1), K(t3, t3.dyn_ltree, t3.dyn_dtree)), W(t3), i2 && M(t3);
      }, r._tr_tally = function(t3, e2, r2) {
        return t3.pending_buf[t3.d_buf + 2 * t3.last_lit] = e2 >>> 8 & 255, t3.pending_buf[t3.d_buf + 2 * t3.last_lit + 1] = 255 & e2, t3.pending_buf[t3.l_buf + t3.last_lit] = 255 & r2, t3.last_lit++, e2 === 0 ? t3.dyn_ltree[2 * r2]++ : (t3.matches++, e2--, t3.dyn_ltree[2 * (A[r2] + u + 1)]++, t3.dyn_dtree[2 * N(e2)]++), t3.last_lit === t3.lit_bufsize - 1;
      }, r._tr_align = function(t3) {
        P(t3, 2, 3), L(t3, m, z), function(t4) {
          t4.bi_valid === 16 ? (U(t4, t4.bi_buf), t4.bi_buf = 0, t4.bi_valid = 0) : 8 <= t4.bi_valid && (t4.pending_buf[t4.pending++] = 255 & t4.bi_buf, t4.bi_buf >>= 8, t4.bi_valid -= 8);
        }(t3);
      };
    }, { "../utils/common": 41 }], 53: [function(t2, e, r) {
      e.exports = function() {
        this.input = null, this.next_in = 0, this.avail_in = 0, this.total_in = 0, this.output = null, this.next_out = 0, this.avail_out = 0, this.total_out = 0, this.msg = "", this.state = null, this.data_type = 2, this.adler = 0;
      };
    }, {}], 54: [function(t2, e, r) {
      e.exports = typeof setImmediate == "function" ? setImmediate : function() {
        var t3 = [].slice.apply(arguments);
        t3.splice(1, 0, 0), setTimeout.apply(null, t3);
      };
    }, {}] }, {}, [10])(10);
  });
})(jszip_min);
var path$3 = require$$0__default$1["default"];
var fs$3 = require$$0__default["default"];
var _0777 = parseInt("0777", 8);
var mkdirp$1 = mkdirP.mkdirp = mkdirP.mkdirP = mkdirP;
function mkdirP(p, opts2, f, made) {
  if (typeof opts2 === "function") {
    f = opts2;
    opts2 = {};
  } else if (!opts2 || typeof opts2 !== "object") {
    opts2 = { mode: opts2 };
  }
  var mode = opts2.mode;
  var xfs = opts2.fs || fs$3;
  if (mode === void 0) {
    mode = _0777;
  }
  if (!made)
    made = null;
  var cb = f || function() {
  };
  p = path$3.resolve(p);
  xfs.mkdir(p, mode, function(er) {
    if (!er) {
      made = made || p;
      return cb(null, made);
    }
    switch (er.code) {
      case "ENOENT":
        if (path$3.dirname(p) === p)
          return cb(er);
        mkdirP(path$3.dirname(p), opts2, function(er2, made2) {
          if (er2)
            cb(er2, made2);
          else
            mkdirP(p, opts2, cb, made2);
        });
        break;
      default:
        xfs.stat(p, function(er2, stat) {
          if (er2 || !stat.isDirectory())
            cb(er, made);
          else
            cb(null, made);
        });
        break;
    }
  });
}
mkdirP.sync = function sync(p, opts2, made) {
  if (!opts2 || typeof opts2 !== "object") {
    opts2 = { mode: opts2 };
  }
  var mode = opts2.mode;
  var xfs = opts2.fs || fs$3;
  if (mode === void 0) {
    mode = _0777;
  }
  if (!made)
    made = null;
  p = path$3.resolve(p);
  try {
    xfs.mkdirSync(p, mode);
    made = made || p;
  } catch (err0) {
    switch (err0.code) {
      case "ENOENT":
        made = sync(path$3.dirname(p), opts2, made);
        sync(p, opts2, made);
        break;
      default:
        var stat;
        try {
          stat = xfs.statSync(p);
        } catch (err1) {
          throw err0;
        }
        if (!stat.isDirectory())
          throw err0;
        break;
    }
  }
  return made;
};
var yaku = { exports: {} };
(function() {
  var $undefined, $null = null, root = typeof window === "object" ? window : commonjsGlobal, isLongStackTrace = false, process2 = root.process, Arr = Array, Err = Error, $rejected = 0, $resolved = 1, $pending = 2, $Symbol = "Symbol", $iterator = "iterator", $species = "species", $speciesKey = $Symbol + "(" + $species + ")", $return = "return", $unhandled = "_uh", $promiseTrace = "_pt", $settlerTrace = "_st", $invalidThis = "Invalid this", $invalidArgument = "Invalid argument", $fromPrevious = "\nFrom previous ", $promiseCircularChain = "Chaining cycle detected for promise", $unhandledRejectionMsg = "Uncaught (in promise)", $rejectionHandled = "rejectionHandled", $unhandledRejection = "unhandledRejection", $tryCatchFn, $tryCatchThis, $tryErr = { e: $null }, $noop = function() {
  }, $cleanStackReg = /^.+\/node_modules\/yaku\/.+\n?/mg;
  var Yaku = yaku.exports = function Promise2(executor) {
    var self2 = this, err;
    if (!isObject(self2) || self2._s !== $undefined)
      throw genTypeError($invalidThis);
    self2._s = $pending;
    if (isLongStackTrace)
      self2[$promiseTrace] = genTraceInfo();
    if (executor !== $noop) {
      if (!isFunction(executor))
        throw genTypeError($invalidArgument);
      err = genTryCatcher(executor)(genSettler(self2, $resolved), genSettler(self2, $rejected));
      if (err === $tryErr)
        settlePromise(self2, $rejected, err.e);
    }
  };
  Yaku["default"] = Yaku;
  extendPrototype(Yaku, {
    then: function then(onFulfilled, onRejected) {
      if (this._s === void 0)
        throw genTypeError();
      return addHandler(this, newCapablePromise(Yaku.speciesConstructor(this, Yaku)), onFulfilled, onRejected);
    },
    "catch": function(onRejected) {
      return this.then($undefined, onRejected);
    },
    _pCount: 0,
    _pre: $null,
    _Yaku: 1
  });
  Yaku.resolve = function resolve2(val) {
    return isYaku(val) ? val : settleWithX(newCapablePromise(this), val);
  };
  Yaku.reject = function reject(reason) {
    return settlePromise(newCapablePromise(this), $rejected, reason);
  };
  Yaku.race = function race(iterable) {
    var self2 = this, p = newCapablePromise(self2), resolve2 = function(val) {
      settlePromise(p, $resolved, val);
    }, reject = function(val) {
      settlePromise(p, $rejected, val);
    }, ret = genTryCatcher(each)(iterable, function(v) {
      self2.resolve(v).then(resolve2, reject);
    });
    if (ret === $tryErr)
      return self2.reject(ret.e);
    return p;
  };
  Yaku.all = function all(iterable) {
    var self2 = this, p1 = newCapablePromise(self2), res = [], ret;
    function reject(reason) {
      settlePromise(p1, $rejected, reason);
    }
    ret = genTryCatcher(each)(iterable, function(item, i) {
      self2.resolve(item).then(function(value) {
        res[i] = value;
        if (!--ret)
          settlePromise(p1, $resolved, res);
      }, reject);
    });
    if (ret === $tryErr)
      return self2.reject(ret.e);
    if (!ret)
      settlePromise(p1, $resolved, []);
    return p1;
  };
  Yaku.Symbol = root[$Symbol] || {};
  genTryCatcher(function() {
    Object.defineProperty(Yaku, getSpecies(), {
      get: function() {
        return this;
      }
    });
  })();
  Yaku.speciesConstructor = function(O, D) {
    var C = O.constructor;
    return C ? C[getSpecies()] || D : D;
  };
  Yaku.unhandledRejection = function(reason, p) {
    try {
      root.console.error($unhandledRejectionMsg, isLongStackTrace ? p.longStack : genStackInfo(reason, p));
    } catch (e) {
    }
  };
  Yaku.rejectionHandled = $noop;
  Yaku.enableLongStackTrace = function() {
    isLongStackTrace = true;
  };
  Yaku.nextTick = process2 ? process2.nextTick : function(fn) {
    setTimeout(fn);
  };
  Yaku._Yaku = 1;
  function getSpecies() {
    return Yaku[$Symbol][$species] || $speciesKey;
  }
  function extendPrototype(src, target) {
    for (var k in target) {
      src.prototype[k] = target[k];
    }
    return src;
  }
  function isObject(obj) {
    return obj && typeof obj === "object";
  }
  function isFunction(obj) {
    return typeof obj === "function";
  }
  function isInstanceOf(a, b) {
    return a instanceof b;
  }
  function isError(obj) {
    return isInstanceOf(obj, Err);
  }
  function ensureType(obj, fn, msg) {
    if (!fn(obj))
      throw genTypeError(msg);
  }
  function tryCatcher() {
    try {
      return $tryCatchFn.apply($tryCatchThis, arguments);
    } catch (e) {
      $tryErr.e = e;
      return $tryErr;
    }
  }
  function genTryCatcher(fn, self2) {
    $tryCatchFn = fn;
    $tryCatchThis = self2;
    return tryCatcher;
  }
  function genScheduler(initQueueSize, fn) {
    var fnQueue = Arr(initQueueSize), fnQueueLen = 0;
    function flush() {
      var i = 0;
      while (i < fnQueueLen) {
        fn(fnQueue[i], fnQueue[i + 1]);
        fnQueue[i++] = $undefined;
        fnQueue[i++] = $undefined;
      }
      fnQueueLen = 0;
      if (fnQueue.length > initQueueSize)
        fnQueue.length = initQueueSize;
    }
    return function(v, arg) {
      fnQueue[fnQueueLen++] = v;
      fnQueue[fnQueueLen++] = arg;
      if (fnQueueLen === 2)
        Yaku.nextTick(flush);
    };
  }
  function each(iterable, fn) {
    var len, i = 0, iter, item, ret;
    if (!iterable)
      throw genTypeError($invalidArgument);
    var gen = iterable[Yaku[$Symbol][$iterator]];
    if (isFunction(gen))
      iter = gen.call(iterable);
    else if (isFunction(iterable.next)) {
      iter = iterable;
    } else if (isInstanceOf(iterable, Arr)) {
      len = iterable.length;
      while (i < len) {
        fn(iterable[i], i++);
      }
      return i;
    } else
      throw genTypeError($invalidArgument);
    while (!(item = iter.next()).done) {
      ret = genTryCatcher(fn)(item.value, i++);
      if (ret === $tryErr) {
        isFunction(iter[$return]) && iter[$return]();
        throw ret.e;
      }
    }
    return i;
  }
  function genTypeError(msg) {
    return new TypeError(msg);
  }
  function genTraceInfo(noTitle) {
    return (noTitle ? "" : $fromPrevious) + new Err().stack;
  }
  var scheduleHandler = genScheduler(999, function(p1, p2) {
    var x, handler;
    handler = p1._s ? p2._onFulfilled : p2._onRejected;
    if (handler === $undefined) {
      settlePromise(p2, p1._s, p1._v);
      return;
    }
    x = genTryCatcher(callHanler)(handler, p1._v);
    if (x === $tryErr) {
      settlePromise(p2, $rejected, x.e);
      return;
    }
    settleWithX(p2, x);
  });
  var scheduleUnhandledRejection = genScheduler(9, function(p) {
    if (!hashOnRejected(p)) {
      p[$unhandled] = 1;
      emitEvent($unhandledRejection, p);
    }
  });
  function emitEvent(name, p) {
    var browserEventName = "on" + name.toLowerCase(), browserHandler = root[browserEventName];
    if (process2 && process2.listeners(name).length)
      name === $unhandledRejection ? process2.emit(name, p._v, p) : process2.emit(name, p);
    else if (browserHandler)
      browserHandler({ reason: p._v, promise: p });
    else
      Yaku[name](p._v, p);
  }
  function isYaku(val) {
    return val && val._Yaku;
  }
  function newCapablePromise(Constructor) {
    if (isYaku(Constructor))
      return new Constructor($noop);
    var p, r, j;
    p = new Constructor(function(resolve2, reject) {
      if (p)
        throw genTypeError();
      r = resolve2;
      j = reject;
    });
    ensureType(r, isFunction);
    ensureType(j, isFunction);
    return p;
  }
  function genSettler(self2, state) {
    return function(value) {
      if (isLongStackTrace)
        self2[$settlerTrace] = genTraceInfo(true);
      if (state === $resolved)
        settleWithX(self2, value);
      else
        settlePromise(self2, state, value);
    };
  }
  function addHandler(p1, p2, onFulfilled, onRejected) {
    if (isFunction(onFulfilled))
      p2._onFulfilled = onFulfilled;
    if (isFunction(onRejected)) {
      if (p1[$unhandled])
        emitEvent($rejectionHandled, p1);
      p2._onRejected = onRejected;
    }
    if (isLongStackTrace)
      p2._pre = p1;
    p1[p1._pCount++] = p2;
    if (p1._s !== $pending)
      scheduleHandler(p1, p2);
    return p2;
  }
  function hashOnRejected(node) {
    if (node._umark)
      return true;
    else
      node._umark = true;
    var i = 0, len = node._pCount, child;
    while (i < len) {
      child = node[i++];
      if (child._onRejected || hashOnRejected(child))
        return true;
    }
  }
  function genStackInfo(reason, p) {
    var stackInfo = [];
    function push2(trace) {
      return stackInfo.push(trace.replace(/^\s+|\s+$/g, ""));
    }
    if (isLongStackTrace) {
      if (p[$settlerTrace])
        push2(p[$settlerTrace]);
      (function iter(node) {
        if (node && $promiseTrace in node) {
          iter(node._next);
          push2(node[$promiseTrace] + "");
          iter(node._pre);
        }
      })(p);
    }
    return (reason && reason.stack ? reason.stack : reason) + ("\n" + stackInfo.join("\n")).replace($cleanStackReg, "");
  }
  function callHanler(handler, value) {
    return handler(value);
  }
  function settlePromise(p, state, value) {
    var i = 0, len = p._pCount;
    if (p._s === $pending) {
      p._s = state;
      p._v = value;
      if (state === $rejected) {
        if (isLongStackTrace && isError(value)) {
          value.longStack = genStackInfo(value, p);
        }
        scheduleUnhandledRejection(p);
      }
      while (i < len) {
        scheduleHandler(p, p[i++]);
      }
    }
    return p;
  }
  function settleWithX(p, x) {
    if (x === p && x) {
      settlePromise(p, $rejected, genTypeError($promiseCircularChain));
      return p;
    }
    if (x !== $null && (isFunction(x) || isObject(x))) {
      var xthen = genTryCatcher(getThen)(x);
      if (xthen === $tryErr) {
        settlePromise(p, $rejected, xthen.e);
        return p;
      }
      if (isFunction(xthen)) {
        if (isLongStackTrace && isYaku(x))
          p._next = x;
        if (isYaku(x))
          settleXthen(p, x, xthen);
        else
          Yaku.nextTick(function() {
            settleXthen(p, x, xthen);
          });
      } else
        settlePromise(p, $resolved, x);
    } else
      settlePromise(p, $resolved, x);
    return p;
  }
  function getThen(x) {
    return x.then;
  }
  function settleXthen(p, x, xthen) {
    var err = genTryCatcher(xthen, x)(function(y) {
      x && (x = $null, settleWithX(p, y));
    }, function(r) {
      x && (x = $null, settlePromise(p, $rejected, r));
    });
    if (err === $tryErr && x) {
      settlePromise(p, $rejected, err.e);
      x = $null;
    }
  }
})();
var Promise$1 = yaku.exports;
var _$1 = {
  extendPrototype: function(src, target) {
    for (var k in target) {
      src.prototype[k] = target[k];
    }
    return src;
  },
  isFunction: function(obj) {
    return typeof obj === "function";
  },
  isNumber: function(obj) {
    return typeof obj === "number";
  },
  Promise: Promise$1,
  slice: [].slice
};
var _ = _$1;
var isFn = _.isFunction;
var promisify$1 = function(fn, self2) {
  return function(a, b, c, d, e) {
    var len = arguments.length, args, promise, resolve2, reject;
    promise = new _.Promise(function(r, rj) {
      resolve2 = r;
      reject = rj;
    });
    function cb(err, val) {
      err == null ? resolve2(val) : reject(err);
    }
    switch (len) {
      case 0:
        fn.call(self2, cb);
        break;
      case 1:
        isFn(a) ? fn.call(self2, a) : fn.call(self2, a, cb);
        break;
      case 2:
        isFn(b) ? fn.call(self2, a, b) : fn.call(self2, a, b, cb);
        break;
      case 3:
        isFn(c) ? fn.call(self2, a, b, c) : fn.call(self2, a, b, c, cb);
        break;
      case 4:
        isFn(d) ? fn.call(self2, a, b, c, d) : fn.call(self2, a, b, c, d, cb);
        break;
      case 5:
        isFn(e) ? fn.call(self2, a, b, c, d, e) : fn.call(self2, a, b, c, d, e, cb);
        break;
      default:
        args = new Array(len);
        for (var i = 0; i < len; i++) {
          args[i] = arguments[i];
        }
        if (isFn(args[len - 1])) {
          return fn.apply(self2, args);
        }
        args[i] = cb;
        fn.apply(self2, args);
    }
    return promise;
  };
};
var fs$2 = require$$0__default["default"];
var path$2 = require$$0__default$1["default"];
var jszip = jszip_min.exports;
var mkdirp = mkdirp$1;
var promisify = promisify$1;
var writeFile = promisify(fs$2.writeFile);
var readFile = promisify(fs$2.readFile);
var mkdir = promisify(mkdirp);
function crxToZip(buf) {
  function calcLength(a, b, c, d) {
    var length = 0;
    length += a;
    length += b << 8;
    length += c << 16;
    length += d << 24;
    return length;
  }
  if (buf[0] === 80 && buf[1] === 75 && buf[2] === 3 && buf[3] === 4) {
    return buf;
  }
  if (buf[0] !== 67 || buf[1] !== 114 || buf[2] !== 50 || buf[3] !== 52) {
    throw new Error("Invalid header: Does not start with Cr24");
  }
  var isV3 = buf[4] === 3;
  var isV2 = buf[4] === 2;
  if (!isV2 && !isV3 || buf[5] || buf[6] || buf[7]) {
    throw new Error("Unexpected crx format version number.");
  }
  if (isV2) {
    var publicKeyLength = calcLength(buf[8], buf[9], buf[10], buf[11]);
    var signatureLength = calcLength(buf[12], buf[13], buf[14], buf[15]);
    var _zipStartOffset = 16 + publicKeyLength + signatureLength;
    return buf.slice(_zipStartOffset, buf.length);
  }
  var headerSize = calcLength(buf[8], buf[9], buf[10], buf[11]);
  var zipStartOffset = 12 + headerSize;
  return buf.slice(zipStartOffset, buf.length);
}
function unzip$1(crxFilePath, destination) {
  var filePath = path$2.resolve(crxFilePath);
  var extname = path$2.extname(crxFilePath);
  var basename = path$2.basename(crxFilePath, extname);
  var dirname = path$2.dirname(crxFilePath);
  destination = destination || path$2.resolve(dirname, basename);
  return readFile(filePath).then(function(buf) {
    return jszip.loadAsync(crxToZip(buf));
  }).then(function(zip) {
    var zipFileKeys = Object.keys(zip.files);
    return Promise.all(zipFileKeys.map(function(filename) {
      var isFile = !zip.files[filename].dir;
      var fullPath = path$2.join(destination, filename);
      var directory = isFile && path$2.dirname(fullPath) || fullPath;
      var content = zip.files[filename].async("nodebuffer");
      return mkdir(directory).then(function() {
        return isFile ? content : false;
      }).then(function(data) {
        return data ? writeFile(fullPath, data) : true;
      });
    }));
  });
}
var dist = unzip$1;
Object.defineProperty(downloadChromeExtension$1, "__esModule", { value: true });
const fs$1 = require$$0__default["default"];
const path$1 = require$$0__default$1["default"];
const rimraf = rimraf_1;
const utils_1$1 = utils;
const unzip = dist;
const downloadChromeExtension = (chromeStoreID, forceDownload, attempts = 5) => {
  const extensionsStore = utils_1$1.getPath();
  if (!fs$1.existsSync(extensionsStore)) {
    fs$1.mkdirSync(extensionsStore, { recursive: true });
  }
  const extensionFolder = path$1.resolve(`${extensionsStore}/${chromeStoreID}`);
  return new Promise((resolve2, reject) => {
    if (!fs$1.existsSync(extensionFolder) || forceDownload) {
      if (fs$1.existsSync(extensionFolder)) {
        rimraf.sync(extensionFolder);
      }
      const fileURL = `https://clients2.google.com/service/update2/crx?response=redirect&acceptformat=crx2,crx3&x=id%3D${chromeStoreID}%26uc&prodversion=32`;
      const filePath = path$1.resolve(`${extensionFolder}.crx`);
      utils_1$1.downloadFile(fileURL, filePath).then(() => {
        unzip(filePath, extensionFolder).then(() => {
          utils_1$1.changePermissions(extensionFolder, 755);
          resolve2(extensionFolder);
        }).catch((err) => {
          if (!fs$1.existsSync(path$1.resolve(extensionFolder, "manifest.json"))) {
            return reject(err);
          }
        });
      }).catch((err) => {
        console.log(`Failed to fetch extension, trying ${attempts - 1} more times`);
        if (attempts <= 1) {
          return reject(err);
        }
        setTimeout(() => {
          downloadChromeExtension(chromeStoreID, forceDownload, attempts - 1).then(resolve2).catch(reject);
        }, 200);
      });
    } else {
      resolve2(extensionFolder);
    }
  });
};
downloadChromeExtension$1.default = downloadChromeExtension;
Object.defineProperty(dist$1, "__esModule", { value: true });
dist$1.MOBX_DEVTOOLS = dist$1.APOLLO_DEVELOPER_TOOLS = dist$1.CYCLEJS_DEVTOOL = dist$1.REDUX_DEVTOOLS = dist$1.VUEJS3_DEVTOOLS = dist$1.VUEJS_DEVTOOLS = dist$1.ANGULARJS_BATARANG = dist$1.JQUERY_DEBUGGER = dist$1.BACKBONE_DEBUGGER = REACT_DEVELOPER_TOOLS = dist$1.REACT_DEVELOPER_TOOLS = dist$1.EMBER_INSPECTOR = void 0;
const electron_1 = require$$0__default$2["default"];
const fs = require$$0__default["default"];
const path = require$$0__default$1["default"];
const semver = semver$1;
const downloadChromeExtension_1 = downloadChromeExtension$1;
const utils_1 = utils;
let IDMap = {};
const getIDMapPath = () => path.resolve(utils_1.getPath(), "IDMap.json");
if (fs.existsSync(getIDMapPath())) {
  try {
    IDMap = JSON.parse(fs.readFileSync(getIDMapPath(), "utf8"));
  } catch (err) {
    console.error("electron-devtools-installer: Invalid JSON present in the IDMap file");
  }
}
const install = (extensionReference, options = {}) => {
  if (typeof options === "boolean") {
    options = { forceDownload: options };
  }
  const { forceDownload, loadExtensionOptions } = options;
  if (process.type !== "browser") {
    return Promise.reject(new Error("electron-devtools-installer can only be used from the main process"));
  }
  if (Array.isArray(extensionReference)) {
    return extensionReference.reduce((accum, extension) => accum.then(() => install(extension, options)), Promise.resolve(""));
  }
  let chromeStoreID;
  if (typeof extensionReference === "object" && extensionReference.id) {
    chromeStoreID = extensionReference.id;
    const electronVersion = process.versions.electron.split("-")[0];
    if (!semver.satisfies(electronVersion, extensionReference.electron)) {
      return Promise.reject(new Error(`Version of Electron: ${electronVersion} does not match required range ${extensionReference.electron} for extension ${chromeStoreID}`));
    }
  } else if (typeof extensionReference === "string") {
    chromeStoreID = extensionReference;
  } else {
    return Promise.reject(new Error(`Invalid extensionReference passed in: "${extensionReference}"`));
  }
  const extensionName = IDMap[chromeStoreID];
  let extensionInstalled;
  if (electron_1.session.defaultSession.getExtension) {
    extensionInstalled = !!extensionName && electron_1.session.defaultSession.getAllExtensions().find((e) => e.name === extensionName);
  } else {
    extensionInstalled = !!extensionName && electron_1.BrowserWindow.getDevToolsExtensions && electron_1.BrowserWindow.getDevToolsExtensions().hasOwnProperty(extensionName);
  }
  if (!forceDownload && extensionInstalled) {
    return Promise.resolve(IDMap[chromeStoreID]);
  }
  return downloadChromeExtension_1.default(chromeStoreID, forceDownload || false).then((extensionFolder) => {
    if (extensionInstalled) {
      if (electron_1.session.defaultSession.removeExtension) {
        const extensionId = electron_1.session.defaultSession.getAllExtensions().find((e) => e.name).id;
        electron_1.session.defaultSession.removeExtension(extensionId);
      } else {
        electron_1.BrowserWindow.removeDevToolsExtension(extensionName);
      }
    }
    if (electron_1.session.defaultSession.loadExtension) {
      return electron_1.session.defaultSession.loadExtension(extensionFolder, loadExtensionOptions).then((ext) => {
        return Promise.resolve(ext.name);
      });
    }
    const name = electron_1.BrowserWindow.addDevToolsExtension(extensionFolder);
    fs.writeFileSync(getIDMapPath(), JSON.stringify(Object.assign(IDMap, {
      [chromeStoreID]: name
    })));
    return Promise.resolve(name);
  });
};
var _default = dist$1.default = install;
dist$1.EMBER_INSPECTOR = {
  id: "bmdblncegkenkacieihfhpjfppoconhi",
  electron: ">=1.2.1"
};
var REACT_DEVELOPER_TOOLS = dist$1.REACT_DEVELOPER_TOOLS = {
  id: "fmkadmapgofadopljbjfkapdkoienihi",
  electron: ">=1.2.1"
};
dist$1.BACKBONE_DEBUGGER = {
  id: "bhljhndlimiafopmmhjlgfpnnchjjbhd",
  electron: ">=1.2.1"
};
dist$1.JQUERY_DEBUGGER = {
  id: "dbhhnnnpaeobfddmlalhnehgclcmjimi",
  electron: ">=1.2.1"
};
dist$1.ANGULARJS_BATARANG = {
  id: "ighdmehidhipcmcojjgiloacoafjmpfk",
  electron: ">=1.2.1"
};
dist$1.VUEJS_DEVTOOLS = {
  id: "nhdogjmejiglipccpnnnanhbledajbpd",
  electron: ">=1.2.1"
};
dist$1.VUEJS3_DEVTOOLS = {
  id: "ljjemllljcmogpfapbkkighbhhppjdbg",
  electron: ">=1.2.1"
};
dist$1.REDUX_DEVTOOLS = {
  id: "lmhkpmbekcpmknklioeibfkpmmfibljd",
  electron: ">=1.2.1"
};
dist$1.CYCLEJS_DEVTOOL = {
  id: "dfgplfmhhmdekalbpejekgfegkonjpfp",
  electron: ">=1.2.1"
};
dist$1.APOLLO_DEVELOPER_TOOLS = {
  id: "jdkknkkbebbapilgoeccciglkfbmbnfm",
  electron: ">=1.2.1"
};
dist$1.MOBX_DEVTOOLS = {
  id: "pfgnfdagidkfgccljigdamigbcnndkod",
  electron: ">=1.2.1"
};
const isWin7 = require$$1__default["default"].release().startsWith("6.1");
if (isWin7)
  require$$0$2.app.disableHardwareAcceleration();
if (!require$$0$2.app.requestSingleInstanceLock()) {
  require$$0$2.app.quit();
  process.exit(0);
}
let win = null;
async function createWindow() {
  win = new require$$0$2.BrowserWindow(__spreadValues({}, DEFAULT_WINDOW_OPTIONS));
  win.setTitle("Leetecho");
  win.removeMenu();
  if (require$$0$2.app.isPackaged) {
    win.loadFile(require$$0$1.join(__dirname, "../renderer/index.html"));
  } else {
    const pkg = await Promise.resolve().then(function() {
      return require("./package.js");
    });
    const url = `http://${pkg.env.HOST || "127.0.0.1"}:${pkg.env.PORT}`;
    win.loadURL(url);
    win.webContents.openDevTools();
  }
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", new Date().toLocaleString());
  });
  require$$0$2.ipcMain.on("get-path", (event, args) => {
    event.returnValue = require$$0$2.app.getPath(args);
  });
}
require$$0$2.app.whenReady().then(() => {
  {
    _default(REACT_DEVELOPER_TOOLS.id).then((name) => console.log(`Added Extension:  ${name}`)).catch((err) => console.log("An error occurred: ", err));
  }
});
require$$0$2.app.on("window-all-closed", () => {
  win = null;
  if (process.platform !== "darwin") {
    require$$0$2.app.quit();
  }
});
require$$0$2.app.on("second-instance", () => {
  if (win) {
    if (win.isMinimized())
      win.restore();
    win.focus();
  }
});
require$$0$2.app.on("activate", () => {
  const allWindows = require$$0$2.BrowserWindow.getAllWindows();
  if (allWindows.length) {
    allWindows[0].focus();
  } else {
    createWindow();
  }
});
