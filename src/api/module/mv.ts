/**
 * MV
 */

import { http } from '@/utils'

/**
 * 全部 mv
 */
export function getAllMV(params?: {
  /** 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部 type: 类型,可选值为全部,官方版,原生,现场版,网易出品,不填则为全部  */
  area: string
  /** 排序,可选值为上升最快,最热,最新,不填则为上升最快 */
  order: string
  /** 取出数量 , 默认为 30 */
  limit: number
  /** 偏移数量 , 用于分页 , 如 :( 页数 -1)*50, 其中 50 为 limit 的值 , 默认 为 0 */
  offset: number
}) {
  return http.get('/mv/all', { params: params })
}

/** 最新 mv
 * 可选参数 : area: 地区,可选值为全部,内地,港台,欧美,日本,韩国,不填则为全部
 * 可选参数 : limit: 取出数量 , 默认为 30
 */
export function getLatestMV(area?: string, limit: number = 30) {
  return http.get('/mv/first', { params: { area, limit } })
}

/**
 * 推荐 mv、个性化推荐下的
 */
export function getRecommendMV() {
  return http.get('/personalized/mv')
}

/**
 * 获取 mv 数据
 */
export function getMVDetail(mvid: number) {
  return http.get('/mv/detail', { params: { mvid } })
  // return http.get('/mv/detail?mvid=5436712')
}
