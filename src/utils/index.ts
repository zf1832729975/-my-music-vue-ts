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
