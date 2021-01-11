<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/9/25
-------------------------------------- --->
<template>
  <div>
    <el-table :data="data" class="tracks" @row-dblclick="handleRowDBClick">
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
          <span v-if="row.alias.length" class="song-alia"
            >({{ row.alias.join('/') }})</span
          >
        </template>
      </el-table-column>
      <el-table-column label="歌手">
        <template slot-scope="{ row }">
          {{ row.artists | artistJoin }}
        </template>
      </el-table-column>

      <el-table-column label="专辑" prop="album.name" sortable>
      </el-table-column>
      <el-table-column label="时长" prop="dt" width="80px" sortable>
        <template slot-scope="{ row }">
          {{ row.duration | formatTime }}
        </template>
      </el-table-column>
      <el-table-column label="热度" width="300">
        <template slot-scope="{ row }">
          <!-- 100 /  8  = 12.5-->
          <el-progress
            :percentage="row.fee * 12.5"
            :show-text="false"
            style="width: 150px"
            color="#b8b8b8"
          ></el-progress>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation, namespace } from 'vuex-class'
import { Playlist, Artist, Track, Audio, PlayList } from '@/types'

@Component({
  filters: {
    artistJoin(arr: Array<Artist>) {
      return arr.map(item => item.name).join('/')
    }
  }
})
export default class SearchSongs extends Vue {
  @Prop({ type: Array, default: () => [] }) data
  @Prop() keyword!: string

  // vuex
  @State('playList') playList!: PlayList
  @State('audio') audio!: Audio

  // 设置播放列表
  @Mutation('UPDATE_playList') setPlayList!: (data: PlayList) => void

  /** 某一行被双击 */
  async handleRowDBClick(row: Object, column: object, event: Event) {
    // const list: PlayList = this.playlist.tracks.map(item => {
    //   return {
    //     ...item,
    //     playlistId: this.playlist.id
    //   }
    // })
    // console.log(' list: ', list)
    // this.setPlayList(list)
    const find = this.playList.find(item => item.id === row.id)

    if (!find) {
      // 获取歌曲详情
      const { songs } = await this.$http.get(`/song/detail?ids=${row.id}`)
      const result = songs && songs[0]
      console.log('获取歌曲详情 result: ', result)

      const item = {
        ...row,
        al: row.album,
        alia: row.alias,
        dt: row.duration,
        ar: row.artists,
        playlistId: 0,
        ...result,
        keyword: this.keyword
      }
      console.log(' item: ', item)
      this.$store.commit('playListUnshift', item)
      this.$bus.$emit('play-music', find)
    } else {
      this.$bus.$emit('play-music', find)
    }
  }
}
</script>
