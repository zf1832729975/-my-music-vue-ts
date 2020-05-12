import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// @ts-ignore
import VueCookie from 'vue-cookie' // api: https://github.com/alfhen/vue-cookie
import './plugins'
import { http, noop, formatCount, formatTime, zeroize } from './utils'

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$bus = new Vue()

if (!$process.IS_WEB) {
  require('./utils/electron')
} else {
  Vue.prototype.$send = noop
}

Vue.use(VueCookie)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('zeroize', zeroize)
Vue.filter('formatTime', formatTime)
Vue.filter('formatCount', formatCount)
