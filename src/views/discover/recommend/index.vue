<!-- --------------------------------------
 * 个性推荐组件
 * @author zhoufei
 * @date 2020/1/17
-------------------------------------- --->
<template>
  <NetworkError v-if="loadError" />
  <div v-else>
    <!-- 走马灯组件 -->
    <Carousel @load-error="onLoadError" />
    <!-- 推荐歌单 -->
    <more-card title="推荐歌单" url="/discover/playlist">
      <RecommendPlaylist />
    </more-card>
    <more-card title="独家放送" url="/discover/playlist">
      <PrivateContent />
    </more-card>
    <more-card title="最新音乐" url="/discover/album"> <NewSong /> </more-card>
    <more-card title="推荐MV" url="/mv"> <MV /> </more-card>
    <more-card title="主播电台" url="/discover/djradio">
      <HostStation />
    </more-card>
    <more-card title="听听" url="https://look.163.com/hot?livetype=2">
      <TingTing />
    </more-card>
    <more-card title="看看" url="https://look.163.com/hot">
      <KanKan />
    </more-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Carousel from './Carousel.vue'
import RecommendPlaylist from './RecommendPlaylist.vue'
import PrivateContent from './PrivateContent.vue' // 独家放送
import NewSong from './NewSong'
import MV from './MV'
import HostStation from './HostStation.vue'
import TingTing from './TingTing.vue'
import KanKan from './KanKan.vue'
@Component({
  components: {
    Carousel,
    RecommendPlaylist,
    PrivateContent,
    NewSong,
    MV,
    HostStation,
    TingTing,
    KanKan
  }
})
export default class Recommend extends Vue {
  private loadError: boolean = false
  private onLoadError(): void {
    this.loadError = true
  }
}
</script>
