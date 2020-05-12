/** 和用户信息相关的接口 */

import { http } from '@/utils'

/**
 * 手机登录
 *  必选参数 : phone: 手机号码 password: 密码
 * @param phone
 * @param password
 */
export function phoneLogin(phone: string, password: string) {
  return http.get('/login/cellphone', {
    params: {
      phone,
      password
    }
  })
}
