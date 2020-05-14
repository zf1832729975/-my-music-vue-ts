<!-- --------------------------------------
 * 扫码登录
 * @author zhoufei
 * @date 2020/5/14
-------------------------------------- --->
<template>
  <div class="scan-code-login">
    <h3 class="title">扫码登录</h3>
    <div class="image-box">
      <img src="~@/assets/img/login_OR_code.png" alt="" />
    </div>
    <p class="subtext">
      使用<a href="https://music.163.com/#/download">网易云音乐APP</a>扫码登录
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Template extends Vue {}
</script>
