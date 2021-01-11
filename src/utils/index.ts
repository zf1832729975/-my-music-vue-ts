import http from './http'
export { http }

export function noop() {}

export function zeroize(n: string | number) {
  return Number(n) >= 10 ? n : '0' + n
}

export * from './date'

export * from './cache'

export * from './filters'

export * from './user'

/**
 * URL地址
 * @param {*} s
 */
export function isURL(s) {
  return /^http[s]?:\/\/.*/.test(s)
}

/*
 * 防抖
 * @param {function} fn
 * @param {number} delay 延迟
 */
export function debounce(fn: Function, delay = 300) {
  let timeout: any = null
  return function() {
    // @ts-ignore
    let context = this
    let args = arguments

    if (timeout) clearTimeout(timeout)

    timeout = setTimeout(function() {
      fn.apply(context, args)
    }, delay)
  }
}
