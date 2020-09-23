/**
 * 我自己的组件
 */

import Vue from 'vue'
// import MoreCard from '@/components/MoreCard/index.vue'
// import NetworkError from '@/components/NetworkError/index.vue'
// import Comment from '@/components/Comment/index.vue'

// Vue.component('MoreCard', MoreCard)
// Vue.component('NetworkError', NetworkError)
// Vue.component('Comment', Comment)

function install(Vue) {
  const fileRE = /^\.\/([a-zA-Z0-9]+)\/index.vue$/

  // 批量注册公用组件
  const components = require.context(
    '@/components/',
    true,
    /^\.\/([a-zA-Z0-9]+)\/index.vue$/
  )
  components.keys().map(path => {
    const fileName = path.replace(fileRE, '$1') // 获取组件文件名
    Vue.component(fileName, components(path).default || components(path))
  })
}

install(Vue)
