<!-- --------------------------------------
 * 模板文件
 * @author zhoufei
 * @date 2020/3/12
-------------------------------------- --->
<template>
  <el-popover
    placement="top"
    popper-class="palylist-popper"
    :visible-arrow="false"
    v-model="visible"
    :close-delay="200"
    @after-leave="afterLeave"
    @show="show"
  >
    <!-- 减少加载、关闭了就不渲染了，页面中渲染过多会卡 -->
    <PlayListHistory @close="handleClose" v-if="listVisible" />
    <el-button type="text" icon="iconfont icon-yinleliebiao" slot="reference">
    </el-button>
  </el-popover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import PlayListHistory from './PlayListHistory.vue'
@Component({
  components: {
    PlayListHistory
  }
})
export default class PlayListHistoryMain extends Vue {
  private visible: boolean = false
  private listVisible: boolean = false

  private handleClose() {
    this.visible = false
  }
  show() {
    this.listVisible = true
  }
  afterLeave() {
    setTimeout(() => {
      this.listVisible = false
    }, 100)
  }
}
</script>

<style lang="scss">
.el-popover.palylist-popper {
  width: 570px;
  padding: 0 !important;
  top: 150px !important;
  left: auto !important;
  bottom: 50px;
  right: 0 !important;
  margin: 0 !important;
  border-right: none !important;
  border-bottom: none !important;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  // box-shadow: -10px -10px 10px 0 rgba(0, 0, 0, 0.1) !important;
  box-shadow: -4px -4px 6px 0 rgba(0, 0, 0, 0.2) !important;
  /* box-shadow: h-shadow v-shadow blur spread color inset; */
}
</style>
