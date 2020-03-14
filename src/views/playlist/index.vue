<!-- --------------------------------------
 * 歌单详情页面
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <NetworkError v-if="!loading && !playlist.id" />
  <div class="playlist" v-loading="loading" v-else>
    <!-- 封面  start-->
    <div flex class="cover">
      <el-image
        class="cover-image"
        :src="playlist.coverImgUrl"
        flex-box="0"
      ></el-image>
      <div flex-box="1">
        <!-- 顶部 -->
        <div flex>
          <div flex-box="1">
            <h2 class="playlist-name" flex="cross:center">
              <el-tag effect="plain">歌单</el-tag>
              {{ playlist.name }}
            </h2>
            <div flex="cross:center" class="row text-gray creator">
              <el-avatar
                :size="26"
                :src="playlist.creator.avatarUrl"
              ></el-avatar>
              <span class="creator-name">{{ playlist.creator.nickname }}</span>
              <span class="ml-2"
                >{{ playlist.createTime | formatDate }}创建
              </span>
            </div>
          </div>
          <div class="tr right-info" flex-box="0">
            <div flex-box="0" flex>
              <div class="track-count">
                <p>歌曲数</p>
                <p>{{ playlist.trackCount }}</p>
              </div>
              <div class="play-count">
                <p>播放数</p>
                <p>{{ playlist.playCount }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- 操作按钮 -->
        <div class="row opt-btn-group">
          <el-button-group>
            <el-button type="primary" icon="icon-bofang2">
              播放全部
            </el-button>
            <el-button
              type="primary"
              icon="icon-icon-test1"
              title="添加全部到播放列表"
            ></el-button>
          </el-button-group>

          <el-button icon="icon-icon-test"
            >收藏({{ playlist.subscribedCount }})</el-button
          >
          <el-button icon="icon-fenxiang"
            >分享({{ playlist.shareCount }})</el-button
          >

          <el-button icon="icon-xiazai">下载全部</el-button>
        </div>
        <p>
          标签：
          <span v-for="(tag, index) in playlist.tags" :key="index">
            <span v-if="index !== 0" class="text-gray" style="margin:0 2px"
              >/</span
            >
            <el-button type="text" style="margin: 0">
              {{ tag }}
            </el-button>
          </span>
        </p>
        <!-- 简介 -->
        <p class="jianjie" v-if="playlist.description">
          <el-input
            type="textarea"
            :value="`简介：${playlist.description}`"
            autosize
            readonly
            resize="none"
          ></el-input>
        </p>
      </div>
    </div>
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
import { formatDate } from '@/utils'
import { Playlist, Artist, Track } from '@/types'
import Tracks from './Tracks.vue'

@Component({
  components: { Tracks },
  filters: {
    formatDate(data: Date) {
      return formatDate(data, 'yyyy-MM-dd')
    }
  }
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
.playlist-name {
  margin: 2px 0;
  font-weight: normal;
  font-size: 22px;
  .el-tag {
    border-radius: 2px;
    margin-right: 8px;
  }
}

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
  .cover {
    color: #333;
    margin: 20px;
    &-image {
      width: 200px;
      height: 200px;
      flex-shrink: 0;
      margin-right: 20px;
    }
    .el-avatar {
      margin-right: 8px;
    }
    .row {
      padding: 8px 0;
    }
    .opt-btn-group {
      .el-button-group {
        margin-right: 10px;
      }
      .el-button {
        padding: 6px 8px;
        i {
          font-size: 14px;
          vertical-align: middle;
        }
      }
    }
    // 简介
    .jianjie {
    }
    .el-textarea__inner {
      padding: 0;
      color: #333;
      border: none;
      background: none;
      line-height: 1.3;
      font-size: 13px;
      font-style: normal;
      font-family: '微软雅黑', 'Helvetica Neue', Helvetica, 'PingFang SC',
        'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
    }
  }
  .right-info {
    color: #999;
    p {
      padding: 2px 4px;
      margin: 0;
    }
    .track-count {
      padding-right: 12px;
      border-right: 1px solid #eee;
    }
    .play-count {
      margin-left: 10px;
    }
  }

  .creator-name {
    font-size: 16px;
    color: #777;
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
