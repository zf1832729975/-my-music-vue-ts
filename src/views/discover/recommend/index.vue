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
    <more-card title="推荐歌单">
      <RecommendSongList />
    </more-card>
    <more-card title="独家放送"></more-card>
    <more-card title="最新音乐"></more-card>
    <more-card title="推荐MV"></more-card>
    <more-card title="主播电台"></more-card>
    <more-card title="听听"></more-card>
    <more-card title="看看"></more-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Carousel from './Carousel.vue'
import RecommendSongList from './RecommendSongList.vue'

@Component({
  components: {
    Carousel,
    RecommendSongList
  }
})
export default class Recommend extends Vue {}
</script>
