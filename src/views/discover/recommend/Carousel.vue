<!-- --------------------------------------
 * 个性推荐走马灯组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div>
    <el-carousel
      indicator-position="outside"
      :interval="10000"
      type="card"
      height="220px"
      v-loading="loading"
      element-loading-text="拼命加载中"
      element-loading-spinner="icon-loading big"
      element-loading-background="rgba(0, 0, 0, 0)"
    >
      <el-carousel-item v-for="item in list" :key="item.id">
        <a
          :href="
            item.url || `#/${targetTypes[item.targetType]}?id=${item.targetId}`
          "
        >
          <el-image :src="item.imageUrl" fit="fill"></el-image>
        </a>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { banner } from '@/api/index'
// "1.music-homepage.homepage_banner_force.banner.645137.-1754212816.null"
// 10 == 专辑
// 1=== 直接播放
// 1004 == mv

@Component
export default class Carousel extends Vue {
  /** banner列表 */
  private list: Array<any> = []
  /** 加载错误 */
  // private loadError: boolean = false
  /** 是否加载中 */
  private loading: boolean = false
  private targetTypes = {
    10: 'album',
    1: 'song',
    1004: 'mv'
  }
  created() {
    this.getBannerList()
  }

  /** 获取 banner 列表 */
  private getBannerList() {
    this.loading = true
    banner(0)
      .then(res => {
        // this.loadError = false
        console.log('获取 banner 列表 res: ', res)
        // @ts-ignore
        this.list = res.banners
      })
      .catch(err => {
        // this.loadError = true
        this.$emit('load-error', err)
      })
      .finally(() => {
        this.loading = false
      })
  }
}
</script>
<style>
.el-carousel__item .el-image {
  width: 100%;
  height: 100%;
}
.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}</style
>>
