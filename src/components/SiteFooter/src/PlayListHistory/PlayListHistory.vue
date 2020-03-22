<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/3/12
-------------------------------------- --->
<template>
  <el-container class="playlist-histroy">
    <el-header flex="cross:center main:center" height="45px">
      <el-button-group>
        <el-button
          v-for="{ name, title } in tabList"
          :key="name"
          :type="activeTab === name ? 'info' : ''"
          @click="tabClick(name)"
          >{{ title }}</el-button
        >
      </el-button-group>
    </el-header>
    <el-footer height="30px" flex="main:justify  cross:center">
      <span>总{{ tableDate.length || 0 }}首</span>
      <div>
        <span v-show="activeTab == 'playList'">
          <el-button type="text" icon="iconfont icon-icon-test"
            >收藏全部</el-button
          >
          <el-divider direction="vertical"></el-divider>
        </span>
        <el-button type="text" icon="iconfont icon-shanchu" @click="handleClear"
          >清空</el-button
        >
      </div>
    </el-footer>
    <el-main>
      <el-scrollbar>
        <el-table
          :show-header="false"
          :data="tableDate"
          stripe
          @row-dblclick="handleRowDBClick"
        >
          <el-table-column
            label="状态"
            width="30px"
            class-name="paly-status-column"
            align="center"
          >
            <template slot-scope="{ row: { id } }">
              <el-button type="text" v-if="audio.id === id">
                <!-- 暂停中 -->
                <i v-if="audio.paused" class="iconfont icon-zanting"></i>
                <i v-else class="iconfont icon-bofang playing"></i>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="音乐标题">
            <template slot-scope="{ row: track }">
              <div class="text-ellipsis">
                <!-- 歌曲名 -->
                <span class="song-name">{{ track.name }}</span>
                <span v-if="track.alia.length" class="song-alia">
                  ({{ track.alia.join('/') }})
                </span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="歌手名" width="80px">
            <template slot-scope="{ row: track }">
              <a
                class="artist-name text-ellipsis"
                :href="`#/artist?id=${track.ar[0].id}`"
                @click="close"
              >
                {{ track.ar[0].name }}
              </a>
            </template>
          </el-table-column>
          <el-table-column label="歌单" width="40px">
            <template slot-scope="{ row: track }">
              <a :href="`#/playlist?id=${track.playlistId}`" @click="close">
                <i class="iconfont icon-link"></i>
              </a>
            </template>
          </el-table-column>
          <el-table-column
            label="时长"
            width="80px"
            v-if="activeTab === 'playList'"
          >
            <template slot-scope="{ row: track }">
              <span class="song-dt">{{ track.dt | formatTime }}</span>
            </template>
          </el-table-column>
          <el-table-column label="播放时间" width="100px" v-else>
            <template slot-scope="{ row: track }">
              <span class="play-date">{{ formatDate(track.playDate) }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { Track, Audio, HistoryTrack, HistoryList, PlayList } from '@/types'
import { formatDate } from '@/utils'

@Component({
  components: {}
})
export default class PlayListHistory extends Vue {
  private activeTab: string = 'playList'
  private tabList = [
    {
      name: 'playList',
      title: '播放列表'
    },
    {
      name: 'historyList',
      title: '播放记录'
    }
  ]

  // vuex
  @State('playList') playList!: PlayList
  @State('historyList') historyList!: HistoryList
  @State('audio') audio!: Audio
  @Mutation('UPDATE_playList')
  updatePlayList!: (data: Map<number, Track>) => void
  @Mutation('UPDATE_historyList')
  updateHistoryList!: (data: Map<number, HistoryTrack>) => void

  get tableDate(): PlayList | HistoryList {
    if (this.activeTab === 'playList') {
      return this.playList
    } else {
      return this.historyList
    }
  }

  // methods
  private formatDate(date: string) {
    return formatDate(date, 'yyyy-MM-dd')
  }
  private tabClick(name: string) {
    this.activeTab = name
  }

  private close() {
    this.$emit('close')
  }

  private handleRowDBClick(row: Track | HistoryTrack) {
    this.$bus.$emit('play-music', row)
  }

  private handleClear() {
    if (this.activeTab === 'playList') {
      this.updatePlayList(new Map())
      this.$bus.$emit('play-music', { id: 0, msg: '清空' })
    } else {
      this.updateHistoryList(new Map())
    }
  }
}
</script>

<style lang="scss">
.playlist-histroy {
  background: #f9f9f9;
  height: 100%;
  .el-header {
    border-bottom: 1px solid #e1e1e2;
    background: #f0f0f2;
  }
  .el-footer {
    border-bottom: 1px solid #e1e1e2;
    .el-button {
      color: #666;
      vertical-align: middle;
      &:hover {
        color: #000;
      }
      i {
        margin-right: 4px;
      }
    }
  }
  .el-main {
    padding: 0;
  }
  .el-table {
    color: #888;
  }
  .el-table__row:hover {
    .song-name,
    .artist-name {
      color: #111;
    }
    .play-date,
    .song-dt {
      color: #333;
    }
  }
  .play-date,
  .song-dt {
    color: #555;
  }
  .artist-name {
    color: #888;
    &:hover {
      color: #000;
    }
  }
  // 播放状态
  .paly-status-column {
    .cell {
      padding: 0;
    }
    .el-button {
      margin: 0;
      padding: 0;
    }
    i {
      font-size: 14px;
    }
    .playing {
      font-size: 12px;
    }
  }
}
</style>
