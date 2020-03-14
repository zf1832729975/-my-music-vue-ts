import Vue from 'vue'
import Vuex from 'vuex'
// @ts-ignore
import themeConfig from '@/assets/themes/config'
import { Track, Theme, State, Audio } from '@/types'
import { loadCache, putCache } from '@/utils'
Vue.use(Vuex)

// 生产环境、和开发环境用的不同，开发环境是通过 webpack 注入
let currentThemeConfig =
  process.env.NODE_ENV === 'production'
    ? themeConfig[window.$theme]
    : themeConfig[$process.THEME]

const audioStoryKey = 'audio_attribute'
const playListStoryKey = 'playList'

const defaultAudio: Audio = {
  // 音乐地址
  src: '',
  // 当前时间
  currentTime: 0,
  // 持续时间、总长
  duration: 0,
  // 是否暂停
  paused: true,
  // 音量 0~1
  volume: 1,
  // 是否静音
  muted: false,
  id: 0,
  modeIndex: 0,
  qualityIndex: 0
}

const state: State = {
  currentThemeConfig: currentThemeConfig || {},
  playList: new Map(loadCache(playListStoryKey, [])),
  currentPlayId: -1,
  audio: {
    ...defaultAudio /** 防止存储的少一些字段 */,
    ...loadCache(audioStoryKey, defaultAudio),
    // 是否暂停
    paused: true
  }
}

export default new Vuex.Store({
  state: state,
  mutations: {
    UPDAE_currentThemeConfig(state: State, data: Theme | object) {
      state.currentThemeConfig = data
    },
    UPDATE_playList(state: State, data: Map<number, Track>) {
      state.playList = data
      putCache(playListStoryKey, data)
    },
    UPDATE_audio(state: State, data: Audio) {
      state.audio = data
      putCache(audioStoryKey, data)
    }
  },
  getters: {
    /** 当前播放音乐 */
    currentMusic(state: State): Track {
      const map = state.playList
      const res = map.get(state.audio.id)
      if (res) {
        return res
      } else {
        return {
          /** 歌曲名 */
          name: '',
          id: 0,
          /** 歌手列表 */
          ar: [],
          /** alia 别名、综艺列表 */
          alia: [],
          /** album 专辑 */
          al: {
            id: 0,
            name: '',
            /** 专辑图 */
            picUrl: '',
            // tns: Array,
            pic: 0
          },
          /** 时长, ms */
          dt: 0
        }
      }
    }
  },
  actions: {}
})
