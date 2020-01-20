<!-- --------------------------------------
 * home 主页文件、发现音乐组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div class="home">
    <el-tabs v-model="tabsActive">
      <el-tab-pane label="个性推荐" name="recommend">
        <Recommend />
      </el-tab-pane>
      <el-tab-pane label="歌单" name="songList"></el-tab-pane>
      <el-tab-pane label="主播电台" name="hostStation"></el-tab-pane>
      <el-tab-pane label="排行榜" name="ranking"></el-tab-pane>
      <el-tab-pane label="歌手" name="singer"></el-tab-pane>
      <el-tab-pane label="最新音乐" name=" latestMusic"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Recommend from './Recommend/index.vue'
@Component({
  components: {
    Recommend
  }
})
export default class Template extends Vue {
  /** 激活的tabs */
  private tabsActive: string = 'recommend'
}
</script>
