<template>
  <el-container class="site-container is-vertical">
    <SiteHeader />
    <el-container class="site-container__body">
      <SiteAside />
      <el-main class="site-main">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
    </el-container>
    <SiteFooter />
  </el-container>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import SiteHeader from '@/components/SiteHeader/index.vue'
import SiteAside from '@/components/SiteAside/index.vue'
import SiteFooter from '@/components/SiteFooter'

@Component({
  components: {
    SiteHeader,
    SiteAside,
    SiteFooter
  }
})
export default class Home extends Vue {}
</script>
