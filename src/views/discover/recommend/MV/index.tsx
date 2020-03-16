/**
 * 推荐MV
 * @author zhoufei
 * @date 2020/3/15
 */

import { Component, Vue } from 'vue-property-decorator'
import { MV } from '@/types'
import { Row, Col } from 'element-ui'
import { getRecommendMV } from '@/api'
import { formatCount } from '@/utils'
import './index.scss'

@Component
export default class RecommendMV extends Vue {
  private list: MV[] = []

  protected created() {
    this.getRecommendMV()
  }

  private getRecommendMV() {
    getRecommendMV().then(res => {
      console.log(' res: ', res)
      this.list = res.result
    })
  }

  protected render() {
    return (
      <Row class="home-mv" gutter={16}>
        {this.list.map(mv => {
          return (
            <Col span={6}>
              <a href={'#/mv?id=' + mv.id}>
                <div class="home-mv__pic">
                  <el-image src={mv.picUrl}></el-image>
                  <p class="home-mv__play-count">
                    <i class="icon-video"></i>
                    <span>{formatCount(mv.playCount)}</span>
                  </p>
                  <p class="home-mv__copywriter">{mv.copywriter}</p>
                </div>
              </a>
              <p class="home-mv__name text-ellipsis">
                <a href={'#/mv?id=' + mv.id}>{mv.name}</a>
              </p>
              <a calss="home-mv__artist-name" href={'#/song?id=' + mv.artistId}>
                {mv.artistName}
              </a>
            </Col>
          )
        })}
      </Row>
    )
  }
}
