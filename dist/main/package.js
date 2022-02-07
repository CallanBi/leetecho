"use strict";
exports[Symbol.toStringTag] = "Module";
const name = "Leetecho";
const version = "0.0.1";
const description = "Leetecho is a tool that automatically generates LeetCode solutions and notes and publishes them to a personal repository.";
const author = "CallanBi <mcbihv@126.com>";
const license = "MIT";
const main = "dist/main/index.cjs";
const scripts = {
  dev: "node scripts/watch.mjs",
  build: "node scripts/build.mjs && electron-builder",
  lint: "eslint --fix --ext .ts,.tsx src"
};
const engines = {
  node: ">=14.17.0"
};
const devDependencies = {
  "@types/lodash": "^4.14.178",
  "@types/react": "^17.0.33",
  "@types/react-dom": "^17.0.10",
  "@types/react-router-dom": "^5.3.3",
  "@typescript-eslint/eslint-plugin": "^5.10.0",
  "@typescript-eslint/parser": "^5.10.0",
  "@vitejs/plugin-react": "^1.0.7",
  antd: "^4.18.5",
  electron: "^15.3.0",
  "electron-builder": "^22.13.1",
  "electron-store": "^8.0.1",
  eslint: "^8.7.0",
  "eslint-plugin-react": "^7.28.0",
  less: "^4.1.2",
  "less-loader": "^7.3.0",
  react: "^17.0.2",
  "react-dom": "^17.0.2",
  typescript: "^4.4.4",
  vite: "^2.6.13",
  "vite-plugin-svgr": "^1.0.1"
};
const env = {
  "//": "Used in build scripts",
  HOST: "127.0.0.1",
  PORT: 3344
};
const dependencies = {
  "@ant-design/icons": "^4.7.0",
  "@ant-design/pro-layout": "^6.32.7",
  "@douyinfe/semi-icons": "^2.3.1",
  "@emotion/react": "^11.7.1",
  icons: "link:@types/ant-design/icons",
  lodash: "^4.17.21",
  "query-string": "^7.1.1",
  "react-router-dom": "5.2.0"
};
var _package = {
  name,
  version,
  description,
  author,
  license,
  main,
  scripts,
  engines,
  devDependencies,
  env,
  dependencies
};
exports.author = author;
exports["default"] = _package;
exports.dependencies = dependencies;
exports.description = description;
exports.devDependencies = devDependencies;
exports.engines = engines;
exports.env = env;
exports.license = license;
exports.main = main;
exports.name = name;
exports.scripts = scripts;
exports.version = version;
