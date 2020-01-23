import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'

Vue.use(Router)

function _import(file: string) {
  return function() {
    return import('@/views/' + file + '/index.vue')
  }
}

// 主路由
const mainRoutes = [
  /** 指定home指向地址 */
  {
    path: '/',
    name: 'home',
    component: _import('discover'),
    children: [
      {
        path: '',
        name: 'homeRecommend',
        component: _import('discover/recommend')
      }
    ]
  },
  /** 发现音乐 */
  {
    path: '/discover',
    name: 'discover',
    component: _import('discover'),
    children: [
      /** 推荐 */
      {
        path: '',
        component: _import('discover/recommend')
      },
      /** 每日歌单推荐 */
      {
        path: 'recommend/taste',
        component: _import('discover/recommend/taste')
      },
      /** 歌单 */
      {
        path: 'playlist',
        component: _import('discover/playlist')
      },
      /** 主播电台 */
      {
        path: 'djradio',
        component: _import('discover/djradio')
      },
      /** 排行榜 */
      {
        path: 'toplist',
        component: _import('discover/toplist')
      },
      /** 歌手 */
      {
        path: 'artist',
        component: _import('discover/artist')
      },
      /** 最新音乐 */
      {
        path: 'album',
        component: _import('discover/album')
      }
    ]
  },
  /** 专辑页面  */
  {
    path: 'album',
    name: 'album',
    component: _import('album')
  },
  /** mv  */
  {
    path: 'mv',
    name: 'mv',
    component: _import('mv')
  },
  /** 播放列表页面  */
  {
    path: 'playlist',
    name: 'playlist',
    component: _import('playlist')
  },
  /** 歌曲详情页面  */
  {
    path: 'song',
    name: 'song',
    component: _import('song')
  },
  {
    path: '/setting',
    name: 'setting',
    component: _import('setting')
  }
]

export default new Router({
  routes: [
    {
      path: '/',
      name: 'main',
      component: Main,
      redirect: { name: 'home' },
      children: mainRoutes
    },
    {
      path: '*',
      name: '404',
      component: () => import('@/views/common/404.vue')
    }
  ]
})
