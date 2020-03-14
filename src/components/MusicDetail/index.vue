<!-- --------------------------------------
 * 点击【左下角音乐卡片信息】出来的界面
 * @author zhoufei
 * @date 2020/3/13
-------------------------------------- --->
<template>
  <div class="music-detail tc">
    <h3>点击【左下角音乐卡片信息】出来的界面</h3>
    <el-button @click="handleShrink" type="text">收缩</el-button>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class MusicDetail extends Vue {
  /** 缩小、关闭 */
  handleShrink() {
    this.$emit('shrink')
  }
}
</script>
