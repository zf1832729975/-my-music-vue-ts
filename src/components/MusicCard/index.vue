<!-- --------------------------------------
 * 左下角音乐卡片信息
 * @author zhoufei
 * @date 2020/3/13
-------------------------------------- --->
<template>
  <div class="music-card" flex="cross:center" v-if="music.id">
    <div flex-box="0" class="image-wrap">
      <el-image :src="music.al.picUrl" fit="fill"></el-image>
      <i class="unfold-arrow icon-iconset0441" @click="handleExpand"></i>
    </div>
    <div flex-box="1" class="info">
      <p class="text-ellipsis">
        <!-- 歌名 -->
        <span class="song-name">{{ music.name }}</span>
        <!-- alia 别名 -->
        <span v-if="music.alia.length" class="song-alia"
          >({{ music.alia.join('/') }})</span
        >
      </p>
      <p class="artist-name" v-if="music.ar.length">{{ music.ar[0].name }}</p>
    </div>
    <div class="opt-btn-group" flex-box="0">
      <i class="opt-btn icon-xihuan"></i>
      <i class="opt-btn icon-fenxiang"></i>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { Track } from '@/types'

@Component({
  components: {}
})
export default class MusicCard extends Vue {
  // vuex
  @Getter('currentMusic') music!: Track | object

  /** 展开 */
  handleExpand() {
    this.$emit('expand')
  }
}
</script>
