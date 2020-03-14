<!-- --------------------------------------
 * 歌曲列表
 * @author zhoufei
 * @date 2020/3/12
-------------------------------------- --->
<template>
  <el-table
    class="tracks"
    :data="playlist.tracks"
    stripe
    border
    @row-dblclick="handleRowDBClick"
  >
    <el-table-column label="" width="50px" :resizable="false" align="right">
      <template slot-scope="scope">
        <!-- 激活了 -->
        <span v-if="audio.id === scope.row.id">
          <!-- 播放中 -->
          <i v-if="!audio.paused" class="paly-btn icon-shengyin"></i>
          <!-- 暂停 -->
          <i v-else class="paly-btn icon-jingyin1"></i>
        </span>
        <span v-else>{{ (scope.$index + 1) | zeroize }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="80px" :resizable="false">
      <template>
        <el-button class="opt-btn" type="text" icon="icon-xihuan"></el-button>
        <el-button class="opt-btn" type="text" icon="icon-xiazai"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="音乐标题" prop="name" sortable></el-table-column>
    <el-table-column label="歌手" prop="ar[0].name">
      <template slot-scope="{ row }">
        {{ row.ar | artistJoin }}
      </template>
    </el-table-column>
    <el-table-column label="专辑" prop="al.name" sortable> </el-table-column>
    <el-table-column label="时长" prop="dt" width="80px" sortable>
      <template slot-scope="{ row }">
        {{ row.dt | formatTime }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { Playlist, Artist, Track, Audio } from '@/types'

@Component({
  name: 'Tracks',
  filters: {
    artistJoin(arr: Array<Artist>) {
      return arr.map(item => item.name).join('/')
    }
  }
})
export default class Tracks extends Vue {
  @Prop({}) playlist!: Playlist

  // vuex
  @State('playList') getPlayList!: Map<number, Track>
  @State('audio') audio!: Audio
  // 设置播放列表
  @Mutation('UPDATE_playList') setPlayList!: Map<number, Track>

  /** 某一行被双击 */
  handleRowDBClick(row: Track, column: object, event: Event) {
    const map: Map<number, Track> = new Map<number, Track>()
    const list = this.playlist.tracks
    list.forEach(item => {
      map.set(item.id, item)
    })
    this.setPlayList(map)

    this.$bus.$emit('play-music', row)
  }
}
</script>

<style lang="scss">
.tracks {
  .opt-btn {
    i {
      color: #666;
      font-size: 14px;
    }
  }
}
</style>
