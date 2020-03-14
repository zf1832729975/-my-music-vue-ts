<!-- --------------------------------------
 * 歌单详情页面
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <NetworkError v-if="!loading && !playlist.id" />
  <div class="playlist" v-loading="loading" v-else>
    <!-- 封面  start-->
    <Cover :playlist="playlist" />
    <!-- 封面 end-->

    <el-tabs value="track">
      <el-tab-pane name="track" label="歌曲列表">
        <!-- 歌曲列表 -->
        <Tracks :playlist="playlist" />
      </el-tab-pane>
      <el-tab-pane
        name="comment"
        :label="`评论(${playlist.commentCount})`"
        lazy
      ></el-tab-pane>
      <el-tab-pane name="collect" label="收藏者" lazy></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlaylistDetail } from '@/api'
import { Playlist, Artist, Track } from '@/types'
import Tracks from './Tracks.vue'
import Cover from './Cover.vue'

@Component({
  components: { Tracks, Cover }
})
export default class PlayList extends Vue {
  /** 歌单id */
  private playlistId: number = 0
  /** 加载中 */
  private loading: boolean = false
  private playlist: Playlist = {
    subscribers: [],
    subscribed: false,
    creator: {},
    tracks: [],
    trackIds: [],
    /** 描述 */
    description: '',
    tags: [],
    // 歌曲数
    trackCount: 0,
    /** 封面 */
    coverImgUrl: '',
    /** 歌单名 */
    name: '',
    id: 0
  }

  created() {
    this.playlistId = +this.$route.query.id
    this.getPlaylistDetail()
  }

  /** 获取歌单详情 */
  getPlaylistDetail() {
    this.loading = true
    getPlaylistDetail(this.playlistId)
      .then(res => {
        console.log('获取歌单详情 res: ', res)
        // @ts-ignore
        this.playlist = res.playlist
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>

<style lang="scss">
.playlist {
  min-height: 50vh;
  .el-table {
    border-top: none;
    .cell {
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
  .el-table--border td {
    // border-right: none !important;
    border-right: 1px solid transparent;
  }

  .el-tabs {
    &__header {
      padding: 0 50px;
      margin: 0;
      border-bottom: 1px solid #ddd;
    }
  }
  .el-tabs__nav-wrap::after {
    display: none;
  }
  .el-tabs__active-bar {
    height: 3px;
  }
  .el-tabs__item {
    font-size: 14px;
  }
}
</style>
