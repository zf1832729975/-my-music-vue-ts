export interface ICookieOpt {
  /** 过期时间 */
  expires?: number | string
  /** 存储域名 */
  domain?: string
}

export interface IVueCookie {
  /** 获取 cookie 值 */
  get: (key: string) => string
  /** 设置 cookie 值 */
  set: (key: string, val: any, opt?: ICookieOpt) => void
  /** 删除 cookie 值 */
  delete: (key: string) => void
}
