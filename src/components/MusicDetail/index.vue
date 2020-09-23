<!-- --------------------------------------
 * 点击【左下角音乐卡片信息】出来的界面
 * @author zhoufei
 * @date 2020/3/13
-------------------------------------- --->
<template>
  <div class="music-detail">
    <div class="musicDt_header">
      <div class="musicDt_media musicDt_w">
        <div class="musicDt_action">
          <img :src="music.al.picUrl" alt class="musicDt_action_pic" />
          <div class="musicDt_action_btns">
            <el-button class="musicDt_action_btn" icon>喜欢</el-button>
            <el-button class="musicDt_action_btn" icon>收藏</el-button>
            <el-button class="musicDt_action_btn" icon>&nbsp;VIP下载</el-button>
            <el-button class="musicDt_action_btn" icon>分享</el-button>
          </div>
        </div>
        <div class="musicDt_song">
          <h1 class="musicDt_song_name">
            {{ music.name }}
            <a href class="tag-link">MV</a>
            <a href class="tag-link">标准音质</a>
          </h1>
          <div class="musicDt_song_intro" flex="main:justify cross:center">
            <span>
              专辑：
              <a href>{{ music.al.name }}</a>
            </span>
            <div>
              <span>
                歌手：
                <span v-for="(ar, index) in music.ar" :key="ar.id">
                  {{ index === 0 ? '' : '/' }}
                  <a href>{{ ar.name }}</a>
                </span>
              </span>
              <span>
                来源：
                <a href>搜索页</a>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <el-button class="musicDt_shrinkbtn" @click="handleShrink" type="text"
      >收缩</el-button
    >
    <!-- 评论 -->
    <div class="musicDt_w musicDt_comment">
      <h3>
        听友评论
        <span>（已有112576条评论）</span>
      </h3>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Getter } from 'vuex-class'
import { Track } from '@/types'

@Component
export default class MusicDetail extends Vue {
  /** 缩小、关闭 */
  handleShrink() {
    this.$emit('shrink')
  }

  @Getter('currentMusic') music!: Track | object
}
</script>

<style lang="scss">
.music-detail {
  &__container {
    width: 900px;
    margin: 0 auto;
  }
}
.musicDt {
  &_header {
    background: #eee;
  }
  &_w {
    width: 900px;
    margin: 0 auto;
  }
  &_shrinkbtn {
    position: absolute;
    top: 20px;
    right: 50px;
  }
  &_media {
    display: flex;
  }
  &_action {
    width: 480px;
    &_pic {
      $width: 300px;
      width: $width;
      height: $width;
      border-radius: 50%;
    }
  }
  &_song {
    flex-shrink: 1;
    flex-grow: 1;
    &_name {
      font-size: 24px;
      margin-bottom: 12px;
      text-align: left;
      font-weight: 500;
      color: #333;
      .tag-link {
        margin-left: 8px;
        font-size: 12px;
        line-height: 12px;
        color: #cc4949;
        border: 1px solid #cc4949;
        border-radius: 2px;
        padding: 0 2px;
      }
    }
    &_intro {
      font-size: 13px;
      a {
        color: royalblue;
        // &:hover {
        //   color:;
        // }
      }
    }
  }
}
</style>
