import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import { http, noop } from './utils'

Vue.config.productionTip = false
Vue.prototype.$http = http

console.log(' $process: ', $process)

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

function zeroize(n: string | number) {
  return Number(n) >= 10 ? n : '0' + n
}

Vue.filter('zeroize', function(n: string | number) {
  return Number(n) >= 10 ? n : '0' + n
})

Vue.filter('toTime', function(val: number) {
  let s = Math.floor(val / 1000)
  let m = zeroize(Math.floor(s / 60))
  return m + ':' + zeroize(s % 60)
})
