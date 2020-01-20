<template>
  <el-header class="site-header" height="50px">
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
          <!-- <el-button type="text" icon="el-icon-arrow-left"></el-button> -->
          <!-- 最小化 -->
          <el-button type="text" icon="el-icon-minus"></el-button>
          <!-- 缩放 -->
          <el-button type="text" icon="el-icon-full-screen"></el-button>
          <!-- 关闭 -->
          <el-button type="text" icon="el-icon-close"></el-button>
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

<style lang="scss">
.system-name {
  font-size: 18px;
  color: #fff;
  margin: 0;
  font-weight: 400;
  margin-left: 10px;
}
.site-header {
  // color: #fefefe;
  color: #e0e0e0;
  font-size: 14px;
  padding: 0 2px 0 16px !important;
  // 方向
  .dir-btn-group {
    flex-shrink: 0;
    margin-right: 15px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 2px;
    .el-button {
      padding: 2px;
      margin: 1px 4px;
      font-size: 14px;
      font-weight: bold;
      color: #fff;
    }
  }
  // 操作按钮
  .opt-btn-group {
    display: flex;
    align-items: center;
    padding: 2px 4px;
    flex-shrink: 0;
    .el-button {
      padding: 2px;
      margin: 0 4px;
      font-size: 16px;
      color: #e0e0e0;
      &:hover {
        color: #fff;
      }
    }
  }
  .el-divider {
    height: 1.2em;
    background-color: #999;
    margin: 0 20px;
  }
}
</style>
