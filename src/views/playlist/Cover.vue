<!-- --------------------------------------
 * 封面、歌单顶部
 * @author zhoufei
 * @date 2020/3/13
-------------------------------------- --->
<template>
  <div class="playlist-cover" flex>
    <el-image
      class="cover-image"
      :src="playlist.coverImgUrl"
      flex-box="0"
    ></el-image>
    <div flex-box="1">
      <!-- 顶部标题区域 -->
      <div flex>
        <div flex-box="1">
          <h2 class="playlist-name" flex="cross:center">
            <el-tag effect="plain">歌单</el-tag>
            {{ playlist.name }}
          </h2>
          <div flex="cross:center" class="row text-gray creator">
            <el-avatar :size="26" :src="playlist.creator.avatarUrl"></el-avatar>
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
            icon="icon-icon-test1 iconfont"
            title="添加全部到播放列表"
          ></el-button>
        </el-button-group>

        <el-button icon="icon-icon-test iconfont"
          >收藏({{ playlist.subscribedCount }})</el-button
        >
        <el-button icon="icon-fenxiang iconfont"
          >分享({{ playlist.shareCount }})</el-button
        >

        <el-button icon="icon-xiazai iconfont">下载全部</el-button>
      </div>

      <!-- 标签 -->
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
      <div
        class="intro"
        v-if="playlist.description"
        :class="{
          'can-fold': isCanFold,
          'is-fold': isCanFold && !isExpand,
          'is-expand': isCanFold && isExpand
        }"
        ref="intro"
      >
        <div
          class="content"
          v-html="computedIntro(playlist.description)"
          :class="{
            'is-fold': isCanFold && !isExpand
          }"
        ></div>
        <i
          v-if="isCanFold"
          class="opt-arrow iconfont icon-xialajiantou"
          @click="handleExpand"
        ></i>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Playlist } from '@/types'
import { formatDate } from '@/utils'
@Component({
  components: {},
  filters: {
    formatDate(data: Date | string | number) {
      return formatDate(data, 'yyyy-MM-dd')
    }
  }
})
export default class Cover extends Vue {
  @Prop({ required: true }) playlist!: Playlist

  private isExpand: boolean = false
  private isCanFold: boolean = false
  private introHTML: string = ''

  private handleExpand() {
    this.isExpand = !this.isExpand
  }

  $refs: {
    intro: HTMLElement
  }

  private computedIntro(str: string): string {
    if (this.introHTML) {
      return this.introHTML
    }
    let res = '简介：'
    const len = str.length
    let curW = ''
    for (let i = 0; i < len; i++) {
      curW = str[i]
      if (curW === '\n') {
        res += '<br />'
      } else if (curW === ' ' || curW === '　') {
        res += '&nbsp;'
      } else {
        res += curW
      }
    }

    if (!this.isCanFold) {
      this.computedIsCanFold()
    }
    this.introHTML = res
    return res
  }

  computedIsCanFold() {
    // 模板渲染好了之后，比mounted 还晚
    this.$nextTick(() => {
      // 正常 32 两行
      this.isCanFold = this.$refs.intro.clientHeight > 40
    })
  }
}
</script>

<style lang="scss">
// 顶部、歌单名
.playlist-name {
  margin: 2px 0;
  font-weight: normal;
  font-size: 22px;
  .el-tag {
    border-radius: 2px;
    margin-right: 8px;
  }
}
.playlist-cover {
  color: #333;
  margin: 20px;
  .cover-image {
    width: 200px;
    height: 200px;
    flex-shrink: 0;
    margin-right: 20px;
  }
  // 右边区域、右上角
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
  // 头像
  .el-avatar {
    margin-right: 8px;
  }
  .row {
    padding: 8px 0;
  }

  // 操作按钮
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
  .intro {
    position: relative;
    overflow: hidden;
    margin-right: 10px;
    .opt-arrow {
      position: absolute;
      top: 0;
      right: 0;
      cursor: pointer;
      font-weight: 600;
    }
    .content {
      color: #333;
      border: none;
      background: none;
      line-height: 16px;
      font-size: 13px;
      font-style: normal;
      padding-right: 30px;
    }
    max-height: 100px;
    &.can-fold {
      max-height: max-content;
    }
    &.is-fold {
      .content {
        display: -webkit-box;
        -webkit-line-clamp: 2; //行数
        -webkit-box-orient: vertical;
        text-overflow: ellipsis;
        height: 32px;
      }
    }
    &.is-expand {
      .opt-arrow {
        transform: rotateZ(180deg);
      }
    }
  }

  // 创建者
  .creator-name {
    font-size: 16px;
    color: #777;
  }
}
</style>
