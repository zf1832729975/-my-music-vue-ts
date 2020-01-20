<template>
  <el-container class="site-container">
    <SiteHeader />
    <el-container class="site-container__body">
      <SiteAside />
      <el-main class="site-main">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
    <el-footer class="site-footer" height="70px">Footer</el-footer>
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import { personalized } from '@/api'

import SiteHeader from '@/components/SiteHeader/index.vue'
import SiteAside from '@/components/SiteAside/index.vue'

@Component({
  components: {
    SiteHeader,
    SiteAside
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
