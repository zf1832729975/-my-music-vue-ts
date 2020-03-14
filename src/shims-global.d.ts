/** 全局变量 */

import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
  interface Window {
    /** 改变主题 */
    changeTheme: { (themeName: string): boolean }
    /** 主题名、在生产环境 中生效 */
    $theme: string
  }

  /** webpack 注入的变量 */
  interface IProcess {
    /** 是否是在浏览器中 */
    IS_WEB: boolean
    /** 当前主题、 开发环境中生效 */
    THEME: string
  }
}

declare var $process: IProcess
