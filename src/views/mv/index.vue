<!-- --------------------------------------
 * MV视频页面
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<script lang="tsx">
import { Component, Vue } from 'vue-property-decorator'
import MVPage from './MV'

@Component
export default class MV extends Vue {
  render() {
    return <MVPage />
  }
}
</script>

<style lang="scss">
.mv {
  padding: 8px;
  margin: 0 auto;
  max-width: 1120px;
  .mv-title {
    font-weight: normal;
    vertical-align: middle;
    margin: 10px 0;
  }
  .mv-name {
    font-size: 18px;
    margin: 0 6px;
    vertical-align: middle;
  }
  .artist-name {
    font-size: 14px;
    vertical-align: bottom;
  }
  .mv-btn-group {
    margin: 8px 0;
  }
}
// 评论
.mv-comment {
  margin-top: 20px;
  .title {
    font-weight: normal;
  }
  .comment-count {
    font-size: 12px;
    color: #555;
  }

  // 评论框
  .comment-frame {
    padding: 10px;
    background: #f0f0f2;
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
}
</style>
