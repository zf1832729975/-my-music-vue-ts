import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Main from './views/Main.vue'

// function import2(file: string) {
//   return import('@/views/' + file + '.vue')
// }

// @ts-ignore
const _import = file => () => import('@/views/' + file + '.vue')

console.log(' _import: ', _import)

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: Home
    // },
    {
      path: '/',
      name: 'main',
      component: Main
      // redirect: { name: 'home' }
    },
    {
      path: '/home',
      name: 'home',
      component: Main
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
