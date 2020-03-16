export interface VideoAttr {
  /** 返回表示可用音频轨道的 AudioTrackList 对象。 */
  audioTracks: AudioTrackList
  /** 设置或返回是否在就绪（加载完成）后随即播放视频。 */
  autoplay: boolean
  /** 返回表示视频已缓冲部分的 TimeRanges 对象。 */
  buffered: TimeRanges
  /** 返回表示视频当前媒体控制器的 MediaController 对象 */
  // controller ：MediaController
  /** 设置或返回视频是否应该显示控件（比如播放/暂停等） */
  controls: boolean
  /** 设置或返回视频的 CORS 设置。 */
  crossOrigin: null | string
  /** 返回当前视频的 URL。 */
  currentSrc: string
  /** 设置或返回视频中的当前播放位置（以秒计）。 */
  currentTime: number
  /** 设置或返回视频默认是否静音。 */
  defaultMuted: boolean
  /** 设置或返回视频的默认播放速度。1 */
  defaultPlaybackRate: number
  /** 返回视频的长度（以秒计）。 */
  duration: number
  /** 返回视频的播放是否已结束。 */
  ended: boolean
  /** 返回表示视频错误状态的 MediaError 对象。 */
  error: MediaError
  /** 设置或返回视频的 height 属性的值。 */
  height: number
  /** 设置或返回视频是否应在结束时再次播放。 */
  loop: boolean
  /** 设置或返回视频所属媒介组合的名称。 */
  // mediaGroup:
  /** 设置或返回是否关闭声音。 */
  muted: boolean
  /** 返回视频的当前网络状态。 */
  networkState: number
  /** 设置或返回视频是否暂停。 */
  paused: boolean
  /** 设置或返回视频播放的速度。 */
  playbackRate: number
  /** 返回表示视频已播放部分的 TimeRanges 对象。 */
  played: TimeRanges
  /**  封面、 设置或返回视频的 poster 属性的值。 */
  poster: string
  /** 预加载、 设置或返回视频的 preload 属性的值。 */
  preload: boolean
  /** 返回视频当前的就绪状态。1~4 */
  readyState: number
  /** 返回表示视频可寻址部分的 TimeRanges 对象。 */
  seekable: TimeRanges
  /** 返回用户当前是否正在视频中进行查找。 */
  // seeking:
  /** 设置或返回视频的 src 属性的值。 */
  src: string
  /** 返回表示当前时间偏移的 Date 对象。 */
  // startDate:
  // textTracks返回表示可用文本轨道的 TextTrackList 对象。
  // videoTracks返回表示可用视频轨道的 VideoTrackList 对象。
  /** 设置或返回视频的音量。 */
  volume: number
  /** 设置或返回视频的 width 属性的值。 */
  width: number
}
