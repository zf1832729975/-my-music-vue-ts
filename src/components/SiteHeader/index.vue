<!-- --------------------------------------
 * 网站头部
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <el-header
    class="site-header drag"
    @dragend.native="dragend"
    @dblclick.native="dblclick"
    flex
  >
    <!-- logo  -->
    <div class="logo" :style="{ width: asideWidth }" flex="cross:center">
      <router-link
        class="no-drag"
        to="/"
        flex="crosss:center"
        style="min-width:150px"
      >
        <el-avatar :size="22" :src="logoSrc"></el-avatar>
        <h1 class="system-name">网易云音乐</h1>
      </router-link>
    </div>

    <el-row :gutter="20" class="h-full" flex="cross:center" flex-box="1">
      <el-col :span="12" flex="cross:center">
        <!-- 按钮 -->
        <div class="dir-btn-group" flex="cross:center">
          <el-button
            icon="el-icon-arrow-left"
            type="text"
            @click="back"
          ></el-button>
          <el-button
            icon="el-icon-arrow-right"
            type="text"
            @click="forward"
          ></el-button>
          <el-divider direction="vertical"></el-divider>
          <el-button
            icon="el-icon-refresh"
            type="text"
            @click="handleRefresh"
          ></el-button>
        </div>

        <!-- 搜索框 -->
        <Search />
      </el-col>

      <!-- 右边区域 -->
      <el-col :span="12" flex="cross:center main:right">
        <!-- 用户信息 -->
        <UserInfo />
        <el-divider direction="vertical" v-if="!IS_WEB"></el-divider>
        <!-- 操作按钮 -->
        <div class="opt-btn-group" v-if="!IS_WEB" @click.stop>
          <!-- mini模式 -->
          <!-- <el-button type="text" icon="el-icon-arrow-left" title="mini模式"></el-button> -->
          <!-- 最小化 -->
          <el-button
            type="text"
            icon="icon-zuixiaohua iconfont"
            title="最小化"
            @click="minimize"
          ></el-button>
          <!-- 缩放 -->
          <el-button type="text" @click="maximize">
            <i
              v-if="isMaximize"
              class="iconfont icon-zuidahua"
              title="向下还原"
            ></i>
            <i v-else class="el-icon-full-screen" title="最大化"></i>
          </el-button>
          <!-- 关闭 -->
          <el-button
            type="text"
            icon="icon-close iconfont"
            title="关闭"
            @click="close"
          ></el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import Search from './Search.vue'
import UserInfo from './UserInfo.vue'

@Component({
  components: { Search, UserInfo }
})
export default class SiteHeader extends Vue {
  @Prop({ default: '200px' }) asideWidth!: string
  private logoSrc: string = require('@/assets/img/logo @128x128.jpg')
  private isMaximize: boolean = false

  public IS_WEB = $process.IS_WEB

  /** 前进 */
  forward() {
    this.$router.go(1)
  }
  /** 后退 */
  back() {
    this.$router.go(-1)
  }

  handleRefresh() {
    this.$emit('refresh')
  }

  minimize() {
    console.log('xxx')
    console.log(' this.$send: ', this.$send)
    this.$send('minimize')
  }
  close() {
    this.$send('close')
    // this.$http('ajx')
  }
  maximize() {
    this.$send('maximize')
    this.$nextTick(() => {
      this.isMaximize = !this.isMaximize
    })
  }

  test() {
    console.log(' document: ', document)
  }

  dragend() {
    console.log('dragend')
    this.isMaximize = false
  }

  dblclick() {
    console.log('dblclick')
    this.isMaximize = !this.isMaximize
  }
}
</script>
