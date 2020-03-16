import { Component, Vue } from 'vue-property-decorator'
import { getMVDetail } from '@/api'
// import { videoPlayer } from 'vue-video-player'
import { MVDetail } from '@/types'
import VideoPage from './Video'

import { Row, Col, Tag, Button, Divider, Input } from 'element-ui'
import { formatDate, formatCount } from '@/utils'
// require videojs style
// import 'video.js/dist/video-js.css'
// import 'vue-video-player/src/custom-theme.css'

@Component
export default class MV extends Vue {
  private mvId: number = 0
  private mv: MVDetail = {
    /** 简介 */
    desc: '',
    /** 封面 */
    cover: '',
    // cover: "http://p1.music.126.net/ijUg7s_2S8GMbTNsYiepJA==/18676304511774727.jpg"
    /** 封面 id */
    coverId: 0,
    /** 播放量 */
    playCount: 0,
    /** 收藏量 */
    subCount: 0,
    /** 分享量 */
    shareCount: 0,
    /** 喜欢量 */
    likeCount: 0,
    /** 评论数 */
    commentCount: 0,
    /** 时长 */
    duration: 0,
    // nType: number
    /** 视频、 */
    brs: {
      // 240: 'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/bf2750483ed02d4c6263dffefa5959d7.mp4?wsSecret=8d18a325105993fe2df480ce549ef013&wsTime=1584287892'
      // 480: 'http://vodkgeyttp8.vod.126.net/cloudmusic/MjQ3NDQ3MjUw/89a6a279dc2acfcd068b45ce72b1f560/533e4183a709699d566180ed0cd9abe9.mp4?wsSecret=2fc7d603cc5ef4923fa6452b73649caf&wsTime=1584287892'
      // /** 240p */
      // 240: string
      480: ''
    },
    isReward: false
  }
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

  private commentContent: string = '333'

  private created() {
    this.mvId = +this.$route.query.id
    this.getMVDetail()
  }

  /** 获取MV详情 */
  private getMVDetail() {
    if (!this.mvId) return
    getMVDetail(this.mvId).then(res => {
      console.log('获取MV详情 res: ', res)
      const mv = (this.mv = res.data)
      // this.playerOptions.poster = mv
    })
  }

  /** comment change */
  private onCommentChange(val: string) {
    this.commentContent = val
  }

  private handleComment() {}

  protected render() {
    const { mv } = this
    return (
      <div class="mv">
        <Row gutter={25}>
          <Col span={16}>
            {/*  */}
            <h2 class="mv-title">
              <i class="el-icon-arrow-left v-middle"></i>
              {/* <i class="icon-borer"></i> */}
              <Tag effect="plain" class="v-middle">
                MV
              </Tag>
              <span class="mv-name">{mv.name}</span>
              <span class="artist-name">{mv.artistName}</span>
            </h2>
            <VideoPage clas="mv-video" mv={mv}></VideoPage>

            {/* buttonGroup */}
            <div class="mv-btn-group">
              <Button icon="icon-zan iconfont">赞({mv.playCount})</Button>
              <Button icon="icon-wodeshoucang iconfont">
                收藏({mv.subCount})
              </Button>
              <Button icon="icon-fenxiang iconfont">
                分享({mv.shareCount})
              </Button>
              <Button icon="icon-xiazai iconfont">下载MV</Button>
            </div>

            {/* 评论 */}
            <div class="mv-comment">
              <h3 class="title">
                评论<span class="comment-count">({mv.commentCount})</span>
              </h3>
              <Divider></Divider>
              {/* 评论框 */}
              <div class="comment-frame">
                <Input
                  class="comment-input"
                  show-word-limit
                  type="textarea"
                  maxlength={140}
                  value={this.commentContent}
                  onChange={this.onCommentChange}
                  resize={false}
                ></Input>

                <div class="frame-footer" flex="main:justify">
                  <span class="comment-face">
                    <i class="iconfont icon-biaoqing-xue"></i>
                    <i class="iconfont icon-zuichun"></i>
                  </span>
                  <Button onClick={this.handleComment}>评论</Button>
                </div>
              </div>

              {/* 精彩评论 */}
              <div class="comment-type wonderful-comment">
                <p>精彩评论</p>
                <Divider></Divider>
                <ul clas="comment-list">
                  <li clas="comment-item"></li>
                </ul>
              </div>

              {/* 最新评论 */}
              <div class="comment-type comment-latest">
                <p>最新评论</p>
                <Divider></Divider>
                <ul clas="comment-list">
                  <li clas="comment-item"></li>
                </ul>
              </div>
            </div>
          </Col>
          <Col span={8}>
            <h3>MV介绍</h3>
            <Divider></Divider>
            <p>
              <span>发布时间： {formatDate(mv.publishTime, 'yyyy-MM-dd')}</span>
              <span>播放次数： {formatCount(mv.playCount)}次</span>
            </p>
            <p>简介：{mv.desc}</p>
          </Col>
        </Row>
      </div>
    )
  }
}
