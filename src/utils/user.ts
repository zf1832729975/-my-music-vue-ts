// @ts-nocheck
import Vue from 'vue'
import store from '@/store'
import { IVueCookie } from '@/types'
import router from '@/router'

const ACCESS_TOKEN_SK = 'token'

/**
 * 清除登录信息
 */
export function clearLoginInfo() {
  ;(Vue.cookie as IVueCookie).delete(ACCESS_TOKEN_SK)
  // store.commit('resetStore')
  // router.options.isAddDynamicMenuRoutes = false
  // router.options.isAddDynamicMenuRoutes = false
}

/** 设置 token */
export function setAccessToken(val: string) {
  ;(Vue.cookie as IVueCookie).set(ACCESS_TOKEN_SK, val)
}

/** 获取 toekn  */
export function getAccessToken(): string | undefined {
  return (Vue.cookie as IVueCookie).get(ACCESS_TOKEN_SK) || ''
}
