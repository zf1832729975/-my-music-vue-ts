<template>
  <el-header>
    <el-row :gutter="20" class="h-full" flex="cross:center">
      <el-col :span="12" flex="cross:center">
        <el-avatar :size="20" :src="logoSrc"></el-avatar>
        <h1 class="system-name">网易云音乐</h1>
      </el-col>
      <el-col :span="12">
        <ul>
          <li></li>
        </ul>
      </el-col>
    </el-row>
  </el-header>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class SiteHeader extends Vue {
  private logoSrc: string = require('@/assets/img/logo.jpg')
}
</script>
