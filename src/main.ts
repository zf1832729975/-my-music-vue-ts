import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import { http, noop } from './utils'

Vue.config.productionTip = false
Vue.prototype.$http = http

if (!$process.IS_WEB) {
  require('./utils/electron')
} else {
  Vue.prototype.$send = noop
}

Vue.prototype.$send = noop

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
