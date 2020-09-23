<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/9/21
-------------------------------------- --->
<template>
  <div>
    <div class="mv-comment">
      <h3 class="title">
        评论<span class="comment-count">({{ mv.commentCount }})</span>
      </h3>
      <el-divider></el-divider>
      <!-- {/* 评论框 */} -->
      <div class="comment-frame">
        <el-input
          class="comment-input"
          show-word-limit
          type="textarea"
          maxlength="{140}"
          value="{this.commentContent}"
          on-change="{this.onCommentChange}"
          resize="none"
        ></el-input>

        <div class="frame-footer" flex="main:justify">
          <span class="comment-face">
            <i class="iconfont icon-biaoqing-xue"></i>
            <i class="iconfont icon-zuichun"></i>
          </span>
          <el-button onClick="{this.handleComment}">评论</el-button>
        </div>
      </div>

      <!-- {/* 精彩评论 */} -->
      <div class="comment-type wonderful-comment">
        <p>精彩评论</p>
        <el-divider></el-divider>
        <ul clas="comment-list">
          <li clas="comment-item"></li>
        </ul>
      </div>

      <!-- {/* 最新评论 */} -->
      <div class="comment-type comment-latest">
        <p>最新评论</p>
        <el-divider></el-divider>
        <ul clas="comment-list">
          <li clas="comment-item"></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { getHotComment } from '@/api'

@Component
export default class Comment extends Vue {
  @Prop({ required: true }) id!: number
  /** 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 */
  @Prop({ required: true }) type!: number

  async getHotComment() {
    const params = {}
    await getHotComment({ id: this.id, type: this.type })
  }
}
</script>
