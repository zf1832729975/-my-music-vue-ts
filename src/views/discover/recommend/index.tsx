/**
 * 个性推荐组件
 * @author zhoufei
 * @date 2020/1/17
 */

import { Component, Vue } from 'vue-property-decorator'
import NetworkError from '@/components/NetworkError/index.vue'
import Carousel from './Carousel.vue'
import RecommendPlaylist from './RecommendPlaylist.vue'
import PrivateContent from './PrivateContent.vue' // 独家放送
import NewSong from './NewSong'
import MV from './MV'

@Component
export default class Recommend extends Vue {
  private loadError: boolean = false
  private onLoadError(): void {
    this.loadError = true
  }

  render() {
    return this.loadError ? (
      <NetworkError />
    ) : (
      <div v-else>
        {/* <!-- 走马灯组件 --> */}
        <Carousel on-load-error={this.onLoadError} />
        {/* <!-- 推荐歌单 --> */}
        <more-card title="推荐歌单" url="/discover/playlist">
          <RecommendPlaylist />
        </more-card>
        <more-card title="独家放送" url="/discover/playlist">
          <PrivateContent />
        </more-card>
        <more-card title="最新音乐" url="/discover/album">
          <NewSong />
        </more-card>
        <more-card title="推荐MV" url="/mv"></more-card>
        <more-card title="主播电台" url="/discover/djradio"></more-card>
        <more-card title="听听" url="/discover/playlist"></more-card>
        <more-card title="看看" url="/discover/playlist"></more-card>
      </div>
    )
  }
}
