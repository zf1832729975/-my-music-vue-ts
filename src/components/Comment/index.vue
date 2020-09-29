<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/9/21
-------------------------------------- --->
<template>
  <div class="comment">
    <!-- <el-divider></el-divider> -->
    <!-- {/* 评论框 */} -->
    <div class="comment-frame">
      <el-input
        class="comment-input"
        show-word-limit
        type="textarea"
        maxlength="140"
        v-model="commentCotent"
        resize="none"
        :autofocus="true"
      ></el-input>

      <div class="frame-footer" flex="main:justify">
        <span class="comment-face">
          <i class="iconfont icon-biaoqing-xue"></i>
          <i class="iconfont icon-zuichun"></i>
          <i class="icon">#</i>
        </span>
        <el-button onClick="{this.handleComment}">评论</el-button>
      </div>
    </div>

    <div ref="scrollToTopPonit"></div>

    <div class="comment-none" v-if="commentData.total === 0">
      还没有评论，快来抢沙发~
    </div>

    <!-- {/* 精彩评论 */} -->
    <div
      class="comment-type wonderful-comment"
      v-if="commentData.hotComments && commentData.hotComments.length"
    >
      <p class="comment-type-name">精彩评论</p>
      <ul clas="comment-list">
        <CommentItem
          v-for="comment in commentData.hotComments"
          :key="comment.commentId"
          :comment="comment"
        ></CommentItem>
      </ul>

      <div class="hot-comment-more" v-if="commentData.moreHot">
        <router-link :to="`/hot-comment?id=${id}&type=${type}`"
          >查看更多精彩评论<i class="el-icon-arrow-right"></i
        ></router-link>
      </div>
    </div>

    <!-- {/* 最新评论 */} -->
    <div
      class="comment-type comment-latest"
      v-if="commentData.comments && commentData.comments.length"
    >
      <p class="comment-type-name">
        最新评论<span>({{ commentData.total }})</span>
      </p>
      <ul class="comment-list">
        <CommentItem
          v-for="comment in commentData.comments"
          :key="comment.commentId"
          :comment="comment"
        ></CommentItem>
      </ul>
    </div>

    <el-pagination
      v-if="commentData.total > page.size"
      :current-page.sync="page.current"
      :page-size="page.size"
      class="comment-pagination"
      layout="prev, pager, next"
      @current-change="onCurrentPageChange"
      :total="commentData.total"
    >
    </el-pagination>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { getHotComment } from '@/api'
import CommentItem from './CommentItem.vue'
const types = {
  music: 0,
  mv: 1,
  playlist: 2,
  album: 3,
  dj: 4,
  video: 5
}

@Component({
  components: { CommentItem }
})
export default class Comment extends Vue {
  @Prop({ required: true }) id!: number
  /** 资源类型 0: 歌曲 1: mv 2: 歌单 3: 专辑 4: 电台 5: 视频 */
  @Prop({
    required: true,
    validator(val) {
      // @ts-ignore
      return types[val] !== undefined
    }
  })
  type!: 'music' | 'mv' | 'playlist' | 'album' | 'dj' | 'video'

  private commentData: object = {}
  commentCotent: string = ''
  private page = {
    size: 20,
    current: 1
  }

  created() {
    this.getComment()
  }

  @Watch('id')
  idChange() {
    this.getComment()
  }

  async getHotComment() {
    const params = {}
    await getHotComment({ id: this.id, type: types[this.type] })
  }

  // 获取评论
  async getComment() {
    //   **可选参数 :** `limit`: 取出评论数量 , 默认为 20
    // 3
    // `offset`: 偏移数量 , 用于分页 , 如 :( 评论页数 -1)*20, 其中 20 为 limit 的值
    // `before`: 分页参数,取上一页最后一项的 `time` 获取下一页数据(获取超过5000条评论的时候需要用到)
    const { page } = this
    const data = await this.$http.get(`/comment/${this.type}?id=${this.id}`, {
      params: {
        limit: page.size,
        offset: (page.current - 1) * page.size
      }
    })

    // console.log('获取评论 data: ', data)
    this.commentData = data
  }

  async onCurrentPageChange() {
    await this.getComment()
    this.scrollToCommentTop()
  }

  // 找到滚动的容器
  findScrollEl(): Element | null {
    let parent = this.$parent
    while (parent) {
      if (parent.$options.name === 'ElScrollbar') {
        const elScroll = parent.$el
        return elScroll.querySelector('.el-scrollbar__wrap')
      }
      parent = parent.$parent
    }
    return null
  }
  // 滚动到评论顶部
  scrollToCommentTop() {
    const scrollToTopPonitEl = this.$refs.scrollToTopPonit
    const scrollEl = this.findScrollEl()
    if (scrollEl && scrollToTopPonitEl instanceof Element) {
      const scrollTop = scrollToTopPonitEl.offsetTop
      console.log('滚动距离之前 scrollEl.scrollTop: ', scrollEl.scrollTop)
      console.log('滚动距离之后 scrollTop: ', scrollTop)
      scrollEl.scrollTop = scrollTop
    }
  }
}
</script>

<style lang="scss">
.comment {
  &-list {
    margin-bottom: 20px;
  }
}
.hot-comment-more {
  text-align: center;
  font-size: 16px;
  color: #757575;
  margin: 16px 0;
  &:hover {
    color: #333;
  }
}
// 评论框
.comment-frame {
  padding: 10px;
  background: #f0f0f2;
  margin-bottom: 20px;
  .frame-footer {
    padding-top: 8px;
  }
  .iconfont {
    vertical-align: middle;
    cursor: pointer;
    font-size: 20px;
    margin: 2px 4px;
  }
}
.comment-pagination {
  text-align: center;
  margin-bottom: 20px;
  &.el-pagination {
    .btn-prev,
    .btn-next,
    li {
      color: #777;
      background-color: transparent;
    }
  }
  .number {
    font-weight: normal;
    &.active {
      text-decoration: underline;
    }
  }
}
.comment-type-name {
  color: #333;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}
.comment-none {
  text-align: center;
  color: #999;
  margin: 20px;
}
</style>
