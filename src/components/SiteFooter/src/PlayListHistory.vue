<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <el-container class="playlist-histroy">
    <el-header flex="cross:center main:center" height="45px">
      <el-button-group>
        <el-button type="info">播放列表</el-button>
        <el-button type="">历史记录</el-button>
      </el-button-group>
    </el-header>
    <el-footer height="30px" flex="main:justify  cross:center">
      <span>总100首</span>
      <div>
        <el-button type="text" icon="xx">清空</el-button>
        <el-button type="text" icon="xx">删除</el-button>
      </div>
    </el-footer>
    <el-main>
      <el-scrollbar>
        <!-- <el-table :show-header="false" :data="playlist">
          <el-table-pane></el-table-pane>
          <el-table-pane></el-table-pane>
          <el-table-pane></el-table-pane>
        </el-table> -->
      </el-scrollbar>
    </el-main>
  </el-container>
</template>

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
  }
  .el-main {
    padding: 0;
  }
}
</style>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class PlayListHistory extends Vue {
  /** 播放列表 */
  private playlist: Array<Object> = []
}
</script>
