<template>
  <el-header class="site-header">
    <el-row :gutter="20" class="h-full" flex="cross:center">
      <!-- 左边区域 -->
      <el-col :span="12" flex="cross:center">
        <!-- logo  -->
        <div flex="crosss:center" style="min-width:150px">
          <el-avatar :size="22" :src="logoSrc"></el-avatar>
          <h1 class="system-name">网易云音乐</h1>
        </div>

        <!-- 按钮 -->
        <div class="dir-btn-group">
          <el-button icon="el-icon-arrow-left" type="text"></el-button>
          <el-button icon="el-icon-arrow-right" type="text"></el-button>
        </div>

        <!-- 搜索框 -->
        <Search />
      </el-col>

      <!-- 右边区域 -->
      <el-col :span="12" flex="cross:center main:right">
        <!-- 用户信息 -->
        <UserInfo />
        <el-divider direction="vertical"></el-divider>
        <!-- 操作按钮 -->
        <div class="opt-btn-group">
          <!-- mini模式 -->
          <!-- <el-button type="text" icon="el-icon-arrow-left" title="mini模式"></el-button> -->
          <!-- 最小化 -->
          <el-button
            type="text"
            icon="el-icon-minus"
            title="最小化"
          ></el-button>
          <!-- 缩放 -->
          <el-button
            type="text"
            icon="el-icon-full-screen"
            title="最大化"
          ></el-button>
          <!-- <el-button type="text" icon="el-icon-full-screen" title="向下还原"></el-button> -->
          <!-- 关闭 -->
          <el-button type="text" icon="el-icon-close" title="关闭"></el-button>
        </div>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Search from './Search.vue'
import UserInfo from './UserInfo.vue'

@Component({
  components: { Search, UserInfo }
})
export default class SiteHeader extends Vue {
  private logoSrc: string = require('@/assets/img/logo.jpg')
}
</script>
