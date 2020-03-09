<!-- --------------------------------------
 * 网络错误组件
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <div class="network-error">
    <img src="~@/assets/img/network-error.png" />
    <p>{{ message }}</p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
  props: {
    message: {
      type: String,
      default: '网络不给力哦，请检查你的网络设置-'
    }
  }
})
export default class NetworkError extends Vue {}
</script>

<style lang="scss">
.network-error {
  text-align: center;
  font-size: 16px;
  color: #333;
  font-weight: normal;
  img,
  p {
    margin: 30px 0;
  }
}
</style>
