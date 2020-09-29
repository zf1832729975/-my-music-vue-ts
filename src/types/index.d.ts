export * from './mv'
export * from './video'
export * from './cookie'

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
  /**  */
  picUrl: string
}

/** 专辑 */
export interface Album {
  id: number
  /** 专辑名 */
  name: string
  /** 公司名 */
  company: string
  /** 专辑图 */
  picUrl: string
  // tns: Array
  pic: number
  /** 出版时间 */
  publishTime: string
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

export interface PlayListTrack extends Track {
  /** 歌单的 id */
  playlistId: number
}

export interface HistoryTrack extends PlayListTrack {
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
  /** 当前时间 67.080431 */
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
  /** 当前播放音乐在播放列表中的 index */
  index: number
  /** 播放模式 index */
  modeIndex: number
  /** 品质 index */
  qualityIndex: number
}

/***
 * 播放信息
 * ==============================
 */

/** 播放列表 */
export type PlayList = Array<PlayListTrack>
export type HistoryList = Array<HistoryTrack>

export interface State {
  /** 当前主题 */
  currentThemeConfig: Theme | object
  /** 播放列表 */
  // playList: Map<number, Track>
  playList: PlayList
  /** 当前播放音乐的id */
  currentPlayId: number
  /** 当前选择的音乐的音频信息 */
  audio: Audio
  /** 播放历史列表、0代表最新的 index 越大代表以前的、 */
  historyList: HistoryList
  userInfo: UserInfo | null
}

export interface UserInfo {
  /** 等级  */
  level: number
  /**  */
  listenSongs: number
  userPoint: Object
  mobileSign: boolean
  pcSign: boolean
  profile: Profile
  createTime: number | Date
  createDays: number
  bindings: Array<Object>
}

/** 账号 */
export interface Account {
  //   id: 1691455179
  // userName: "1_18385328739"
  // type: 1
  // status: 0
  // whitelistAuthority: 0
  // createTime: 1543878734817
  // salt: "[B@28e9eb25"
  // tokenVersion: 1
  // ban: 0
  // baoyueVersion: 0
  // donateVersion: 0
  // vipType: 0
  // viptypeVersion: 0
  // anonimousUser: false
  id: number
  userName: string
  createTime: number
  // vipType
}

/**  */
export interface Profile {
  /** 描述 */
  description: string
  // avatarImgIdStr: string
  // backgroundImgIdStr: string
  // experts: {}
  // backgroundImgId: 109951162868128400
  userType: 0
  // avatarUrl: "https://p3.music.126.net/ma8NC_MpYqC-dK_L81FWXQ==/109951163250233892.jpg"
  /** 头像 */
  avatarUrl: string
  defaultAvatar: boolean
  // province: 520000
  // vipType: 0
  /** 性别 */
  gender: 1 | 2
  // mutual: false
  // remarkName: null
  // expertTags: null
  // authStatus: 0
  // accountStatus: 0
  // avatarImgId: 109951163250233890
  // nickname: "__阿飞哥__"
  /** 昵称 */
  nickname: string
  // birthday: -2209017600000
  // djStatus: 0
  // city: 520100
  // userId: 1691455179
  /** 用户id */
  userId: number
  // detailDescription: ""
  // followed: false
  // backgroundUrl: "http://p3.music.126.net/2zSNIqTcpHL2jIvU6hG0EA==/109951162868128395.jpg"
  backgroundUrl: string
  // signature: ""
  // authority: 0
  // avatarImgId_str: "109951163250233892"
  /** 被关注、粉丝 */
  followeds: number
  /** 关注 */
  follows: number
  /** 动态 */
  eventCount: number
  /** 歌单 */
  playlistCount: number
  /** 被收藏 */
  playlistBeSubscribedCount: 0
}

/**
 * 最新音乐、专辑
 */

export interface Song {
  mp3Url: string
  /** 歌曲名 */
  name: string
  /** 歌曲id */
  id: number
  /** 别名列表 */
  alias: number
  /** 歌手列表 */
  artists: Array<Artist>
  album: Album
}
