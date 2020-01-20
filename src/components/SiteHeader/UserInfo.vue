<template>
  <div class="user-info h-full" flex="cross:center">
    <!-- 用信息 -->
    <div flex="cross:center">
      <el-avatar :size="22" :src="user.imgSrc"></el-avatar>
      <!-- 用户信息 Popover -->
      <el-popover>
        <!-- 用户信息详细面板 -->
        <UserInfo />
        <p class="ml-2 user-name" slot="reference">
          {{ user.name }}
          <i class="arrow-down el-icon-arrow-down"></i>
        </p>
      </el-popover>
    </div>
    <el-button type="text" style="font-size:14px;">开通VIP</el-button>
    <!-- 皮肤 -->
    <el-button class="el-icon-star-off" type="text"></el-button>
    <!-- 邮箱 -->
    <el-badge :value="2" type="warning">
      <el-button type="text" icon="el-icon-ice-cream"></el-button>
    </el-badge>
    <!-- 设置 -->
    <el-button type="text" class="el-icon-setting" title="设置"></el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UserInfo from '@/components/UserInfo/index.vue'

// user interface
interface IUser {
  name: string
  imgSrc: string
}

@Component({
  components: {
    UserInfo
  }
})
export default class HeaderUserInfo extends Vue {
  private user: IUser = {
    name: '咫尺天涯_飞',
    imgSrc: require('@/assets/img/logo.jpg')
  }
}
</script>
