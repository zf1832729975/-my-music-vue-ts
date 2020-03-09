/**
 * 发现音乐
 */

import http from '@/utils/http'

/**
 * 获取 banner
 * @params {} type:资源类型,对应以下类型,默认为 0 即PC
 * 0: pc
1: android

2: iphone

3: ipad
 */
export function banner(type: number = 0) {
  return http.get(`/banner?type=${type}`)
}

/**
 * 获取歌单
 */

/**
 * 独家放送
 */
export function getPrivateContent() {
  return http.get('/personalized/privatecontent')
}

/**
 * 获取最新专辑
 */
export function getAlbumNewest() {
  return http.get('/album/newest')
}
