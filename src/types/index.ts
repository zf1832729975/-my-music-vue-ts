/** 单个主题配置 */
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

/** 主题列表 */
export interface Themes {
  [key: string]: Theme
}

/** 歌手信息 */
export interface Artist {
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
export interface Track {
  /** 歌曲名 */
  name: string
  id: number
  /** 歌手列表 */
  ar: Array<Artist>
  /** alia 别名、综艺列表 */
  alia: Array<string>
  /** album 专辑 */
  al: Album
  /** 时长 */
  dt: number
  /** 歌单id */
  playlistId?: number
}

export interface HistoryTrack extends Track {
  /** 播放时间, JSON.stringify(playDate)=>Date */
  playDate: Date | string
}

/** 歌单详情 */
export interface Playlist {
  /** 订阅列表 */
  subscribers: Array<object>
  /** 是否被订阅 */
  subscribed: boolean

  /** 创建者 */
  creator: object
  /** 歌曲列表 */
  tracks: Array<Track>
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
  /** 歌单 id */
  id: number
}

/** audio  */
export interface Audio {
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
  /** 音乐的 id、id <= 0 表示空、不会播放 */
  id: number
  /** 播放模式 index */
  modeIndex: number
  /** 品质 index */
  qualityIndex: number
}

/***
 * 播放信息
 * ==============================
 */

export interface State {
  /** 当前主题 */
  currentThemeConfig: Theme | object
  /** 播放列表 */
  playList: Map<number, Track>
  /** 当前播放音乐的id */
  currentPlayId: number
  /** 当前选择的音乐的音频信息 */
  audio: Audio
  /** 播放历史列表 */
  historyList: Map<number, HistoryTrack>
}
