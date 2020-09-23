import Vue from 'vue'
import store from '@/store'
import { ICookie } from '@/types'
import JsCookies from 'js-cookie'

const Cookies: ICookie = JsCookies

const ACCESS_TOKEN_SK = 'token'

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  Cookies.remove(ACCESS_TOKEN_SK)
  // store.commit('resetStore')
  // router.options.isAddDynamicMenuRoutes = false
  // router.options.isAddDynamicMenuRoutes = false
}

/** 设置 token */
export function setAuthCookie(val: string) {
  Cookies.set(ACCESS_TOKEN_SK, val)
}

/** 获取 toekn  */
export function getAuthCookie(): string | undefined {
  return Cookies.get(ACCESS_TOKEN_SK) || ''
}
