export interface MVBase {
  id: number
  /** MV 名 */
  name: string
  /** MV时长 */
  duration: number
  /** 播放量 */
  playCount: number
  /** 歌手列表 */
  artists: Array<{ id: number; name: string }>
  /** 出版时间 "1997-10-01" */
  publishTime: string
  /** 歌手名 */
  artistName: string
  /** 歌手id */
  artistId: number
}

/** 最新音乐/个性化推荐下的最新音乐 */
export interface MV extends MVBase {
  /** 类型、暂时不知道功能 */
  type: number
  /** 编辑推荐 xxx  */
  copywriter: string
  /** 封面图片 */
  picUrl: string
  // canDislike: false
  // trackNumberUpdateTime: null
  // subed: false
  // alg: "featured"
}

/** MV详情 */
export interface MVDetail extends MVBase {
  // briefDesc: ""
  // desc: null
  /** 封面 */
  cover: string
  // cover: "http://p1.music.126.net/ijUg7s_2S8GMbTNsYiepJA==/18676304511774727.jpg"
  /** 封面 id */
  coverId: number
  /** 播放量 */
  playCount: number
  /** 收藏量 */
  subCount: number
  /** 分享量 */
  shareCount: number
  /** 喜欢量 */
  likeCount: number
  /** 评论数 */
  commentCount: number
  /** 时长 */
  duration: number
  // nType: number
  /** 视频、 */
  brs: {
    // 240: 'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/bf2750483ed02d4c6263dffefa5959d7.mp4?wsSecret=8d18a325105993fe2df480ce549ef013&wsTime=1584287892'
    // 480: 'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=2fc7d603cc5ef4923fa6452b73649caf&wsTime=1584287892'
    /** 240p */
    240: string
    480: string
  }
  isReward: boolean
  // commentThreadId: 'R_MV_5_5436712'
}
