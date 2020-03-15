<!-- --------------------------------------
 * 独家发送
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <ul>
    <li v-for="item in list" :key="item.id">
      <router-link :to="`/mv?id=${item.id}`">
        <el-image :src="item.picUrl" fit="fill"></el-image>
      </router-link>
      <el-button type="text" class="video-button">
        <i class="icon-video icon"></i>
      </el-button>

      <router-link :to="`/mv?id=${item.id}`" class="footer-name">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPrivateContent } from '@/api'

@Component({})
export default class PrivateContent extends Vue {
  private list: Array<Object> = []

  created() {
    this.getPrivateContent()
  }

  /** 获取独家放送 */
  private async getPrivateContent(): Promise<void> {
    const res = await getPrivateContent()
    // @ts-ignore
    this.list = res.result
  }
}
</script>

<style lang="scss" scoped>
li {
  width: 33.33%;
  padding: 0 10px 30px;
  vertical-align: top;
  position: relative;
  height: 210px;
  display: inline-block;
  .el-image {
    height: 100%;
    width: 100%;
  }
}
.video-button {
  position: absolute;
  top: 5px;
  left: 15px;
  color: #fff;
  border: 1px solid #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  padding: 0px;
  text-align: center;
  background: rgba($color: #000000, $alpha: 0.3);
  &:hover {
    color: #fff;
    border: 1px solid #fff;
  }
  .icon {
    font-size: 12px;
    line-height: 20px;
  }
}
a {
  margin-bottom: 4px;
}
.footer-name {
  cursor: pointer;
  line-height: 1.4;
}
</style>
