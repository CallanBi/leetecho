"use strict";
var fs = require("fs");
var path = require("path");
var electron = require("electron");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var fs__default = /* @__PURE__ */ _interopDefaultLegacy(fs);
var path__default = /* @__PURE__ */ _interopDefaultLegacy(path);
function domReady(condition = ["complete", "interactive"]) {
  return new Promise((resolve) => {
    if (condition.includes(document.readyState)) {
      resolve(true);
    } else {
      document.addEventListener("readystatechange", () => {
        if (condition.includes(document.readyState)) {
          resolve(true);
        }
      });
    }
  });
}
var COLOR_PALETTE;
(function(COLOR_PALETTE2) {
  COLOR_PALETTE2["LEETECHO_BLUE"] = "#2688f0";
  COLOR_PALETTE2["LEETECHO_BLACK"] = "#0d0d0d";
  COLOR_PALETTE2["LEETECHO_WHITE"] = "#fffffe";
  COLOR_PALETTE2["LEETECHO_LIGHT_BLUE"] = "#56a2f3";
  COLOR_PALETTE2["LEETECHO_DARK_BLUE"] = "0f6fd4";
  COLOR_PALETTE2["LEETECHO_LIGHT_BLACK"] = "#262626";
})(COLOR_PALETTE || (COLOR_PALETTE = {}));
function useLoading() {
  const className = "loaders-css__square-spin";
  const styleContent = `
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${className} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: ${COLOR_PALETTE.LEETECHO_BLUE};
  animation: square-spin 3s 0s cubic-bezier(0.09, 0.57, 0.49, 0.9) infinite;
}
.app-loading-wrap {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${COLOR_PALETTE.LEETECHO_WHITE};
  z-index: 9;
}
    `;
  const oStyle = document.createElement("style");
  const oDiv = document.createElement("div");
  oStyle.id = "app-loading-style";
  oStyle.innerHTML = styleContent;
  oDiv.className = "app-loading-wrap";
  oDiv.innerHTML = `<div class="${className}"><div></div></div>`;
  return {
    appendLoading() {
      document.head.appendChild(oStyle);
      document.body.appendChild(oDiv);
    },
    removeLoading() {
      document.head.removeChild(oStyle);
      document.body.removeChild(oDiv);
    }
  };
}
const isDev = true;
const { appendLoading, removeLoading } = useLoading();
(async () => {
  await domReady();
  appendLoading();
})();
electron.contextBridge.exposeInMainWorld("bridge", {
  __dirname,
  __filename,
  fs: fs__default["default"],
  path: path__default["default"],
  ipcRenderer: withPrototype(electron.ipcRenderer),
  removeLoading,
  isDev
});
function withPrototype(obj) {
  const protos = Object.getPrototypeOf(obj);
  for (const [key, value] of Object.entries(protos)) {
    if (Object.prototype.hasOwnProperty.call(obj, key))
      continue;
    if (typeof value === "function") {
      obj[key] = function(...args) {
        return value.call(obj, ...args);
      };
    } else {
      obj[key] = value;
    }
  }
  return obj;
}
