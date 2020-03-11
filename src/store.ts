import Vue from 'vue'
import Vuex from 'vuex'
// @ts-ignore
import themeConfig from '@/assets/themes/config'

Vue.use(Vuex)

// 生产环境、和开发环境用的不同，开发环境是通过 webpack 注入
// @ts-ignore
let currentThemeConfig =
  process.env.NODE_ENV === 'production'
    ? themeConfig[window.$theme]
    : themeConfig[$process.THEME]

export default new Vuex.Store({
  state: {
    currentThemeConfig: currentThemeConfig || {}
  },
  mutations: {
    UPDAE_currentThemeConfig(state, data) {
      state.currentThemeConfig = data
    }
  },
  actions: {}
})
