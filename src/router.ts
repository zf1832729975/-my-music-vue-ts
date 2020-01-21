import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/index.vue'
import Main from './views/Main.vue'

// function import2(file: string) {
//   return import('@/views/' + file + '.vue')
// }

// @ts-ignore
const _import = file => () => import('@/views/' + file + '.vue')

// console.log(' _import: ', _import)

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: { name: 'home' },
      children: [
        {
          path: '/home',
          name: 'home',
          component: Home
        },
        {
          path: '/setting',
          name: 'setting',
          component: () => import('@/views/setting/index.vue')
        }
      ]
    }
  ]
})
