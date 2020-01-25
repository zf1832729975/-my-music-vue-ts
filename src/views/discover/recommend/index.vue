<!-- --------------------------------------
 * 个性推荐组件
 * @author zhoufei
 * @date 2020/1/17
-------------------------------------- --->
<template>
  <div>
    <!-- 走马灯组件 -->
    <Carousel />
    <!-- 推荐歌单 -->
    <more-card title="推荐歌单" url="/discover/playlist">
      <RecommendPlaylist />
    </more-card>
    <more-card title="独家放送" url="/discover/playlist"></more-card>
    <more-card title="最新音乐" url="/discover/album"></more-card>
    <more-card title="推荐MV" url="/mv"></more-card>
    <more-card title="主播电台" url="/discover/djradio"></more-card>
    <more-card title="听听" url="/discover/playlist"></more-card>
    <more-card title="看看" url="/discover/playlist"></more-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Carousel from './Carousel.vue'
import RecommendPlaylist from './RecommendPlaylist.vue'

@Component({
  components: {
    Carousel,
    RecommendPlaylist
  }
})
export default class Recommend extends Vue {}
</script>
