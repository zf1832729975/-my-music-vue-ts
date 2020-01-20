import http from '@/utils/http'

// 手机登录
export function login(phone: number | string, password: string) {
  return http.get('/login/cellphone?phone=' + phone + '&password=' + password)
}

/**
 * 获取 banner
 */
export function banner() {
  return http.get('/banner')
}

// 获取推荐歌单
export function personalized() {
  return http.get('/personalized')
}

export function getPlaylistDetail(id: number | string) {
  return http.get('/playlist/detail?id=' + id)
}

export function getPlaylistHot() {
  return http.get('/playlist/hot')
}

export function getTopPlaylistHighquality(cat = '全部', limit = 30) {
  return http.get('/top/playlist/highquality?cat=' + cat + '&limit=' + limit)
}

export function like(id: number | string) {
  return http.get('/like?id=' + id)
}

export function toplist(idx: number) {
  return http.get('/top/list?idx=' + idx)
}

export function singerlist(cat: number, offset: number) {
  if (cat === 0) {
    return http.get('/top/artists?offset=0')
  }
  return http.get('/artist/list?cat=' + cat + '&offset=' + offset)
}

export function getSongDetail(ids: number | string) {
  return http.get('/song/detail?ids=' + ids)
}

export function getMusicUrl(id: number, br = 999000) {
  return http.get('/music/url?id=' + id + '&br=' + br)
}

export function djlist(catid: number) {
  if (catid === 0) {
    return http.get('/dj/recommend')
  } else {
    return http.get('/dj/recommend/type?type=' + catid)
  }
}
export function djcat() {
  return http.get('/dj/catelist')
}

// keywords

interface Isearch {
  keywords: string
  limit?: number
  offset?: number
  type: number
}

export function search(params: {
  keywords: string
  type: number
  limit?: number
  offset?: number
}) {
  return http.get('/search', {
    params: params
  })
}

// 热门搜索列表
export function searchHot() {
  return http.get('/search/hot')
}

export function searchHotDetail() {
  return http.get('/search/hot/detail')
}
// 搜索建议 /search/suggest?keywords= 海阔天空 /search/suggest?keywords= 海阔天空&type=mobile
export function searchSuggest(keywords: string) {
  return http.get('/search/suggest?keywords=' + keywords)
}
