/**
 * 歌单
 */

import http from '@/utils/http'

/**
 * 歌单分类
 */
export function getPlaylistCatlist() {
  return http.get('/playlist/catlist')
}

/**
 * 热门歌单分类
 */
export function getPlaylistHot() {
  return http.get('/playlist/hot')
}

/**
 * 推荐歌单
 * 说明 : 调用此接口 , 可获取推荐歌单
 * @param { number } limit 可选参数 : limit: 取出数量 , 默认为 30 (不支持 offset)
 */

export function getPersonalized(limit: number = 30) {
  return http.get(`/personalized?limit=${limit}`)
}
