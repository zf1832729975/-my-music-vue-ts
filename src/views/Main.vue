<template>
  <el-container>
    <SiteHeader />
    <el-container>
      <el-aside width="200px">Aside</el-aside>
      <el-main>
        <el-button @click="getBanner">/banner</el-button>
      </el-main>
    </el-container>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { personalized } from '@/api'

import SiteHeader from '@/components/SiteHeader/index.vue'

@Component({
  components: {
    SiteHeader
  }
})
export default class Home extends Vue {
  created() {
    this.getBanner()
  }

  getBanner() {
    // @ts-ignore
    this.$http('/banner').then(res => {
      console.log(' res: ', res)
    })

    personalized().then(res => {
      console.log('推荐歌单 res: ', res)
    })
  }
}
</script>

<style lang="scss">
.el-container {
  height: 100%;
}
</style>
