/**
 * 发现音乐
 */

import http from '@/utils/http'

/**
 * 获取 banner
 */
export function banner() {
  return http.get('/banner')
}

/**
 * 获取歌单
 */
