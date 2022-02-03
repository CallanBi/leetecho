"use strict";var d=require("fs"),c=require("path"),r=require("electron");function i(e){return e&&typeof e=="object"&&"default"in e?e:{default:e}}var s=i(d),p=i(c);function u(e=["complete","interactive"]){return new Promise(a=>{e.includes(document.readyState)?a(!0):document.addEventListener("readystatechange",()=>{e.includes(document.readyState)&&a(!0)})})}function l(){const e="loaders-css__square-spin",a=`
@keyframes square-spin {
  25% { transform: perspective(100px) rotateX(180deg) rotateY(0); }
  50% { transform: perspective(100px) rotateX(180deg) rotateY(180deg); }
  75% { transform: perspective(100px) rotateX(0) rotateY(180deg); }
  100% { transform: perspective(100px) rotateX(0) rotateY(0); }
}
.${e} > div {
  animation-fill-mode: both;
  width: 50px;
  height: 50px;
  background: #fff;
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
  background: #282c34;
  z-index: 9;
}
    `,t=document.createElement("style"),n=document.createElement("div");return t.id="app-loading-style",t.innerHTML=a,n.className="app-loading-wrap",n.innerHTML=`<div class="${e}"><div></div></div>`,{appendLoading(){document.head.appendChild(t),document.body.appendChild(n)},removeLoading(){document.head.removeChild(t),document.body.removeChild(n)}}}const{appendLoading:f,removeLoading:m}=l();(async()=>{await u(),f()})();r.contextBridge.exposeInMainWorld("bridge",{__dirname,__filename,fs:s.default,path:p.default,ipcRenderer:v(r.ipcRenderer),removeLoading:m});function v(e){const a=Object.getPrototypeOf(e);for(const[t,n]of Object.entries(a))Object.prototype.hasOwnProperty.call(e,t)||(typeof n=="function"?e[t]=function(...o){return n.call(e,...o)}:e[t]=n);return e}
