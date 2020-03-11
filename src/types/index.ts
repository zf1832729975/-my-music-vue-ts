/** 歌手信息 */
export interface Iartist {
  id: number
  /** 歌手名 */
  name: string
}

/** 专辑 */
export interface Album {
  id: number
  name: string
  /** 专辑图 */
  picUrl: string
  // tns: Array
  pic: number
}

/** 歌曲信息 */
export interface Itrack {
  /** 歌曲名 */
  name: string
  id: number
  /** 歌手列表 */
  ar: Array<Iartist>
  /** alia 别名、综艺列表 */
  alia: Array<string>
  /** album 专辑 */
  al: Album
  /** 时长 */
  dt: number
}

/** 歌单详情 */
export interface Iplaylist {
  /** 订阅列表 */
  subscribers: Array<object>
  /** 是否被订阅 */
  subscribed: boolean

  /** 创建者 */
  creator: object
  /** 歌曲列表 */
  tracks: Array<Itrack>
  trackIds: Array<object>
  // 歌曲数
  trackCount: number
  /** 描述 */
  description: string
  /** 标签 */
  tags: Array<string>

  /** 封面 */
  coverImgUrl: string
  /** 歌单名 */
  name: string
}

/** audio  */
export interface IAudio {
  /** 音乐地址 */
  src: string
  /** 当前时间 */
  currentTime: number
  /** 持续时间、总长 */
  duration: number
  /** 是否暂停 */
  paused: boolean
  /** 音量 0~1 */
  volume: number
  /** 是否静音 */
  muted: boolean
}

/** 主题配置 */
export interface Theme {
  /** 主题名、en */
  name: string
  /** 主题标题、zh */
  title?: string
  /** 主题色 */
  themeColor: string
  /** 背景图 */
  backgroundImage?: string
}
