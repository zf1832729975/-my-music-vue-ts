/**
 * electron.js的一些操作方法
 */

import Vue from 'vue'
import { ipcRenderer } from 'electron'

Vue.prototype.$send = function _send(name: string) {
  console.log(' name: ', name)
  ipcRenderer.send(name)
}

interface IPCRenderer {
  (name: string): void
}

export { IPCRenderer }
