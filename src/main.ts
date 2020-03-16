import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
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

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

Vue.filter('zeroize', zeroize)
Vue.filter('formatTime', formatTime)
Vue.filter('formatCount', formatCount)
