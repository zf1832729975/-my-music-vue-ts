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
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class NetworkError extends Vue {
  @Prop({ default: '网络不给力哦，请检查你的网络设置-' }) message!: string
}
</script>

<style lang="scss">
.network-error {
  text-align: center;
  font-size: 16px;
  color: #333;
  font-weight: normal;
  margin-top: 10%;
  img,
  p {
    margin: 30px 0;
  }
}
</style>
