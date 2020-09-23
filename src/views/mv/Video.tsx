import { Component, Vue, Prop } from 'vue-property-decorator'
import { Dropdown, DropdownMenu, DropdownItem } from 'element-ui'
import { MVDetail } from '@/types'

// require videojs style
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

@Component
export default class Video extends Vue {
  public $refs!: {
    /** video 视频播放 ref */
    video: HTMLVideoElement
  }
  @Prop({ required: true }) mv!: MVDetail

  private quality: number = 480

  private playerOptions = {
    playbackRates: [0.7, 1.0, 1.5, 2.0], // 播放速度
    autoplay: false, // 如果true,浏览器准备好时开始回放。
    muted: false, //  默认情况下将会消除任何音频。
    loop: false, //  导致视频一结束就重新开始。
    preload: 'auto', //  建议浏览器在<video>加载元素后是否应该开始下载视频数据。auto浏览器选择最佳行为,立即开始加载视频（如果浏览器支持）
    language: 'zh-CN',
    aspectRatio: '16:9', //  将播放器置于流畅模式，并在计算播放器的动态大小时使用该值。值应该代表一个比例 - 用冒号分隔的两个数字（例如"16:9"或"4:3"）
    fluid: true, //  当true时，Video.js player将拥有流体大小。换句话说，它将按比例缩放以适应其容器。
    sources: [
      {
        type: 'video/mp4', // 这里的种类支持很多种：基本视频格式、直播、流媒体等，具体可以参看git网址项目
        src:
          'http://vodkgeyttp8.vod.126.net/cloudmusic/obj/core/1691395073/f662c419eee69f5139a69069f4ebc596.mp4?wsSecret=50be257780fe8adb1f67760e5609c20b&wsTime=1584289632' // url地址
      }
    ],
    poster:
      'http://p1.music.126.net/MmM3lmiYh-YTir5m3UIBQQ==/109951164802040042.jpg', // 你的封面地址
    //  width: document.documentElement.clientWidth, // 播放器宽度
    notSupportedMessage: '此视频暂无法播放，请稍后再试', // 允许覆盖Video.js无法播放媒体源时显示的默认信息。
    controlBar: {
      timeDivider: true,
      durationDisplay: true,
      remainingTimeDisplay: false,
      fullscreenToggle: true // 全屏按钮
    }
  }

  //  hook
  created() {}

  // methods
  private handleResourceChange(quality: string|number) {
    this.quality = Number(quality)
    // console.log(' this: ', this)
    console.log(' this.$refs: ', this.$refs)
  }

  protected render() {
    const mv = this.mv
    const resources = mv.brs
    return (
      <div>
        <video
          autoplay={false}
          controls
          src={mv.brs[this.quality]}
          style="width:100%;"
          poster={mv.cover}
          ref="video"
        ></video>

        <Dropdown on-command={this.handleResourceChange}>
          <span>{this.quality}P</span>
          <DropdownMenu>
            {Object.keys(resources).map(key => {
              return <DropdownItem command={key}>{key}</DropdownItem>
            })}
          </DropdownMenu>
        </Dropdown>
      </div>
    )
  }
}
