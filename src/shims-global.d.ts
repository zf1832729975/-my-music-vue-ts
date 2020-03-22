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

/**
 * 但是此时可能会遇到一个tslint的错误提示，Type '{ msg: string; }' is not assignable to type 'ComponentOptions<Vue, DefaultData<Vue>, DefaultMethods<Vue>, DefaultComputed, PropsDefinition<Record<string, any>>, Record<string, any>>'，说你的key在组件上根本找不到，这个就很蛋疼了，如果把传值的方式改为 <Xxx props={{msg:'传值'}}/>的话，报错就会消失，这是因为vue官方设定的属性中就有props这个属性值，具体文件位置在 node_modules/vue/types/options 的ComponentOptions中可以看到，如果直接修改源码的话可以添加支持任意属性，但是这种方式显然不够完美，那么如何做呢？实际上应该是在项目的声明文件中，将对应的interface接口扩展一下就OK了，修改或创建shims-tsx.d.ts文件，在其中添加如下内容：
 */
declare module 'vue/types/options' {
  interface ComponentOptions<V extends Vue> {
    [propName: string]: any

    ref?: string
    /** 类名 */
    class?: string // 方便提示
  }
}
