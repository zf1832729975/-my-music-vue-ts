<template>
  <div class="user-info h-full" flex="cross:center">
    <!-- 用信息 -->
    <div flex="cross:center">
      <el-avatar :size="22" :src="user.imgSrc"></el-avatar>
      <p class="ml-2">{{ user.name }}</p>
    </div>
    <div class="m1-2">开通VIP</div>
    <!-- 皮肤 -->
    <i class="m1-2"></i>
    <!-- 邮箱 -->
    <i class="m1-2"></i>
    <i class="m1-2">设置</i>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// user interface
interface IUser {
  name: string
  imgSrc: string
}

@Component({})
export default class Template extends Vue {
  private user: IUser = {
    name: '咫尺天涯_飞',
    imgSrc: require('@/assets/img/logo.jpg')
  }
}
</script>

<style lang="scss">
.user-info {
}
</style>
