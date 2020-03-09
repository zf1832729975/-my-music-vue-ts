import Vue from 'vue'
// import { http } from './utils'
import { AxiosStatic } from 'axios'

import { IPCRenderer } from './utils/electron'

declare module '*.vue' {
  export default Vue
}
declare module 'vue/types/vue' {
  interface Vue {
    $http: AxiosStatic
    $send: IPCRenderer
  }
}
