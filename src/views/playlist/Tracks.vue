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
          <i v-if="!audio.paused" class="paly-btn iconfont icon-shengyin"></i>
          <!-- 暂停 -->
          <i v-else class="paly-btn iconfont icon-jingyin1"></i>
        </span>
        <span v-else>{{ (scope.$index + 1) | zeroize }}</span>
      </template>
    </el-table-column>

    <el-table-column label="操作" width="80px" :resizable="false">
      <template>
        <el-button
          class="opt-btn"
          type="text"
          icon="iconfont icon-xihuan"
        ></el-button>
        <el-button
          class="opt-btn"
          type="text"
          icon="iconfont icon-xiazai"
        ></el-button>
      </template>
    </el-table-column>
    <el-table-column label="音乐标题" prop="name" sortable>
      <template slot-scope="{ row }">
        <span class="song-name">{{ row.name }}</span>
        <span v-if="row.alia.length" class="song-alia"
          >({{ row.alia.join('/') }})</span
        >
      </template>
    </el-table-column>
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
import { Playlist, Artist, Track, Audio, PlayList } from '@/types'

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
  @State('playList') getPlayList!: PlayList
  @State('audio') audio!: Audio
  // 设置播放列表
  @Mutation('UPDATE_playList') setPlayList!: (data: PlayList) => void

  /** 某一行被双击 */
  handleRowDBClick(row: Track, column: object, event: Event) {
    const list: PlayList = this.playlist.tracks.map(item => {
      return {
        ...item,
        playlistId: this.playlist.id
      }
    })
    console.log(' list: ', list)
    this.setPlayList(list)

    this.$bus.$emit('play-music', {
      ...row,
      playlistId: this.playlist.id
    })
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
