import Vue from 'vue'
// import { http } from './utils'
import { AxiosStatic } from 'axios'
import { IPCRenderer } from './utils/electron'

interface Emit {
  (eventName: string, data: any): void
}

interface Callbcak {
  (data: any): void
}

interface On {
  (eventName: string, callback: Callbcak): void
}
interface Off {
  (eventName?: string): void
}
interface EventBus {
  /** 触发 event-bus */
  $emit: Emit
  /** 监听 event-bus */
  $on: On
  /** 移除监听 event-bus */
  $off: Off
}

declare module '*.vue' {
  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosStatic
    $send: IPCRenderer
    $bus: EventBus
  }
}
