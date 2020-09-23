<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/3/15
-------------------------------------- --->
<template>
  <div class="comment-item" flex>
    <el-avatar :src="comment.user.avatarUrl" :size="34"></el-avatar>
    <div flex-box="1">
      <div class="content">
        <router-link class="nickname" :to="`/user-info/${comment.user.userId}`"
          >{{ comment.user.nickname }}:</router-link
        >
        <span>{{ comment.content }}</span>
      </div>
      <div flex="cross:center main:justify">
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
            |
          </span>
          <!-- 赞 -->
          <a href="javascript:;">
            <i class="iconfont icon-zan"></i>
            {{ comment.likedCount > 0 ? `(${comment.likedCount})` : '' }}</a
          >
          |
          <a href="javascript:;">分享</a>
          |
          <a href="javascript:;" @click="handleReply">回复</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Template extends Vue {
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
  position: absolute;
  &:hover {
    .op-report {
      display: inline;
    }
  }
  .el-avatar {
    margin-right: 12px;
  }
  .content {
    line-height: 1.4;
    margin-bottom: 16px;
    .nickname {
      cursor: pointer;
      color: #499df1;
    }
  }
  .op {
    a {
      cursor: pointer;
      margin: 0 4px;
    }
    &-report {
      display: none;
    }
  }
}
</style>
