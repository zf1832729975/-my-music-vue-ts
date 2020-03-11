<!-- --------------------------------------
 * discover： 发现、发现音乐页面
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <div class="home discover">
    <el-tabs v-model="tabsActive" @tab-click="tabClick">
      <el-tab-pane label="个性推荐" name="/discover"></el-tab-pane>
      <el-tab-pane label="歌单" name="/discover/playlist"></el-tab-pane>
      <el-tab-pane label="主播电台" name="/discover/djradio"></el-tab-pane>
      <el-tab-pane label="排行榜" name="/discover/toplist"></el-tab-pane>
      <el-tab-pane label="歌手" name="/discover/artist"></el-tab-pane>
      <el-tab-pane label="最新音乐" name="/discover/album"></el-tab-pane>
    </el-tabs>
    <!-- 用路由来进行懒加载、不过多的加载组件 -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

@Component({})
export default class Discover extends Vue {
  private tabsActive: string = '/discover'

  // watch
  @Watch('$route.path', {
    immediate: true
  })
  routerChange(path: string): void {
    this.tabsActive = path === '/' ? '/discover' : path
  }

  private tabClick(tab: Object): void {
    // @ts-ignore
    this.$router.push(tab.name)
  }
}
</script>

<style lang="scss">
.discover {
  max-width: 1120px;
  min-width: 760px;
  margin: 0 auto;
}
</style>
