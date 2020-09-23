import { Component, Vue } from 'vue-property-decorator'
import { getMVDetail } from '@/api'
// import { videoPlayer } from 'vue-video-player'
import { MVDetail } from '@/types'
import VideoPage from './Video'

import { Row, Col, Tag, Button, Divider, Input, Avatar } from 'element-ui'
import { formatDate, formatCount } from '@/utils'

// @Component
// export default class Comment extends Vue {

//   render() {
//     return (<div>
//       <div flex="cross:center main:justify">
//         <div>
//           <Avatar size={60} src></Avatar>
//         </div>
//         <div>

//         </div>
//       </div>
//     </div>)
//   }
// }

@Component
export default class MV extends Vue {
  private mvId: number = 0
  private mv: MVDetail = {
    id: 0,
    name: '',
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
    isReward: false,
    artists: [],
    /** 出版时间 "1997-10-01" */
    publishTime: '',
    /** 歌手名 */
    artistName: '',
    /** 歌手id */
    artistId: 0
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
      this.getCommentList()
    })
  }
  private async getCommentList() {
    const res = await this.$http.get(`/comment/mv?id=${this.mvId}`)
    // const hotComment = await this.$http.get()
    console.log('mv 评论 res: ', res)
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
            <h2 class="mv-title" >
              <span class="back-row" onClick={() => this.$router.go(-1)}>
                <i
                  class="el-icon-arrow-left back-arrow"
                ></i>
                {/* <i class="icon-borer"></i> */}
                <Tag effect="plain" class="v-middle">
                MV
                </Tag>
                <span class="mv-name">{mv.name}</span>
              </span>
              <router-link to={'/artist/' + mv.artistId} class="artist-name">
                {mv.artistName}
              </router-link>
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
            <comment id={mv.id} type="mv"></comment>

            <div class="mv-comment" style="display:none">
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
                  on-change={this.onCommentChange}
                  resize="none"
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
            {/* MV介绍 */}
            <div class="mv-js">
              <h3 class="js-title">MV介绍</h3>
              <Divider></Divider>
              <p class="">
                <span>
                  发布时间： {formatDate(mv.publishTime, 'yyyy-MM-dd')}
                </span>
                <span>播放次数： {formatCount(mv.playCount)}次</span>
              </p>
              <p>简介：{mv.desc}</p>
            </div>
            {/* 相关推荐 */}
            <div>
              <h3>相关推荐</h3>
              <Divider></Divider>
            </div>
          </Col>
        </Row>
      </div>
    )
  }
}
