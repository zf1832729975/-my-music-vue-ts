// 声明全局的 window ，不然使用 window.XX 时会报错
// declare var window: Window

interface IProcess {
  IS_WEB: boolean
  THEME: string
}

interface Iwindow {
  $theme: string
}

declare let $process: IProcess
