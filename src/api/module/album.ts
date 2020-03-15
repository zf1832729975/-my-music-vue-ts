/**
 * album 专辑\最新音乐
 */
import http from '@/utils/http'

/**
 * 获取最新专辑
 * 说明 : 调用此接口 ，获取云音乐首页新碟上架数据
 */
export function getAlbumNewest() {
  return http.get('/album/newest')
}

/** 获取专辑内容\详情
 *说明 : 调用此接口 , 传入专辑 id, 可获得专辑内容
 */
export function getAlbumDetail(id: number) {
  return http.get('/album?id=' + id)
}

/**
 * 专辑动态信息
 * 说明 : 调用此接口 , 传入专辑 id, 可获得专辑动态信息,如是否收藏,收藏数,评论数,分享数
 */
export function getAlbumDetailDynamic(/** 专辑id */ id: number) {
  return http.get('/album/detail/dynamic?id=' + id)
}

/**
 * 收藏/取消收藏专辑
 * 说明 : 调用此接口,可收藏/取消收藏专辑
 * id : 专辑 id
 * t : 1 为收藏,其他为取消收藏
 */
export function updateAlbumCollect(
  /** id : 专辑 id */
  id: number,

  /** 1 为收藏,其他为取消收藏 */
  t: number
) {
  return http.get('/album/sub', { params: { id, t } })
}

/**
 * 获取已收藏专辑列表
 * limit?: 取出数量 , 默认为 25
 * offset?: 偏移数量 , 用于分页 , 如 :( 页数 -1)*25, 其中 25 为 limit 的值 , 默认 为 0
 */
export function getCollectedAlbum(limit: number = 25, offset: number = 0) {
  return http.get('/album/sublist', { params: { limit, offset } })
}

/**
 * ===================================================================
 * 新歌速递
 * ===================================================================
 */

/**
 * 新歌速递
 * type: 地区类型 id,对应以下:
  全部:0
  华语:7
  欧美:96
  日本:8
  韩国:16
 */
export function getNewSongs(type: number = 0) {
  return http.get('/top/song', { params: { type } })
}
