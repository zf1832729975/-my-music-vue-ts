<!-- --------------------------------------
 * 个性推荐走马灯组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <el-carousel
    indicator-position="outside"
    :interval="10000"
    type="card"
    height="250px"
    v-loading="loading"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0, 0, 0, 0)"
  >
    <el-carousel-item v-for="item in list" :key="item.id">
      <el-image :src="item.picUrl" fit="fill"></el-image>
    </el-carousel-item>
  </el-carousel>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { banner } from '@/api/index'

@Component
export default class Carousel extends Vue {
  /** banner列表 */
  private list: Array<any> = []
  /** 是否加载中 */
  private loading: boolean = false
  created() {
    this.getBannerList()
  }

  /** 获取 banner 列表 */
  private getBannerList() {
    this.loading = true
    banner()
      .then(res => {
        console.log('获取 banner 列表 res: ', res)
        // @ts-ignore
        this.list = res.banners
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
