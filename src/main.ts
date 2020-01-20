import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins'
import http from './utils/http'
// import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/theme.scss'
import '@/assets/css/index.scss'

Vue.config.productionTip = false
Vue.prototype.$http = http

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
