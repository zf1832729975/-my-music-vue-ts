<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/3/15
-------------------------------------- --->
<template>
  <li class="comment-item" flex>
    <el-avatar
      :src="comment.user.avatarUrl"
      :size="34"
      flex-box="0"
    ></el-avatar>
    <div flex-box="1">
      <div class="content">
        <router-link class="nickname" :to="`/user/${comment.user.userId}`"
          >{{ comment.user.nickname }}：</router-link
        >{{ comment.content }}
      </div>

      <!-- 回复的\被回复 -->
      <ul class="replied" v-if="comment.beReplied && comment.beReplied.length">
        <li
          class="replied-item"
          v-for="beReplied in comment.beReplied"
          :key="beReplied.beRepliedCommentId"
        >
          <router-link class="nickname" :to="`/user/${beReplied.user.userId}`"
            >@{{ beReplied.user.nickname }}：</router-link
          >{{ beReplied.content }}
        </li>
      </ul>

      <!-- 底部 -->
      <div flex="cross:center main:justify" class="comment-bottom">
        <span
          class="date"
          v-if="
            new Date(comment.time).getFullYear() !== new Date().getFullYear()
          "
        >
          {{ comment.time | formatDate('yyyy年MM月dd日 HH:mm') }}
        </span>
        <span class="date" v-else>{{
          comment.time | formatDate('MM月dd日 HH:mm')
        }}</span>

        <div class="op">
          <span class="op-report">
            <a href="javascript:;">举报</a>
            <i class="divider"></i>
          </span>
          <!-- 赞 -->
          <a href="javascript:;">
            <i class="iconfont icon-zan"></i>
            {{ comment.likedCount > 0 ? `(${comment.likedCount})` : '' }}</a
          >
          <i class="divider"></i>
          <a href="javascript:;">分享</a>
          <i class="divider"></i>
          <a href="javascript:;" @click="handleReply">回复</a>
        </div>
      </div>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class CommentItem extends Vue {
  /** 评论数据 */
  @Prop({ required: true }) comment!: Object

  handleReply() {
    // this.$http.get('')
  }
}
</script>

<style lang="scss">
.comment-item {
  padding-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #f0f0f0;
  position: relative;
  width: 100%;
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    .op-report {
      display: inline;
    }
  }
  .el-avatar {
    margin-right: 12px;
  }
  .nickname {
    cursor: pointer;
    color: #499df1;
  }
  .content {
    color: #333;
    line-height: 1.4;
    margin-bottom: 12px;
  }
  .replied {
    margin-bottom: 12px;
    background-color: #f1f1f4;
    padding: 6px 8px;
    color: #666;
    &-item {
      & + .replied-item {
        margin-bottom: 6px;
      }
    }
  }
  .comment-bottom {
    color: #999;
  }
  .op {
    height: 18px;
    line-height: 18px;
    a {
      cursor: pointer;
      padding: 0 2px;
      display: inline-block;
      vertical-align: middle;
    }
    &-report {
      display: none;
    }
    .divider {
      height: 12px;
      width: 1px;
      display: inline-block;
      background-color: #ccc;
      margin: 0 8px;
      vertical-align: middle;
    }
  }
}
</style>
