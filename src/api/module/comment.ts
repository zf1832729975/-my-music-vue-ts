/**
 * 评论
 *
 */
import http from '@/utils/http'

/**
 * 热门评论
 * @params id 资源 id
 * @params type 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频
 * @params `limit` 取出评论数量 , 默认为 20
 * @params `offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)\*20, 其中 20 为 limit 的值
 * @params `before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)
 */
export function getHotComment(params = {}) {
  return http.get('/comment/hot', params)
}
