<!-- --------------------------------------
 * footer
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <el-footer class="site-footer" height="70px" flex="cross:center">
    <!-- 播放按钮组 -->
    <div class="play-btn-group" flex-box="0">
      <el-button type="text" icon="icon-shangyishou1"> </el-button>
      <el-button type="text" icon="icon-bofang"> </el-button>
      <el-button type="text" icon="icon-xiayishou1"> </el-button>
    </div>
    <!-- 进度条  -->
    <div class="progress" flex-box="1" flex="cross:center">
      <span class="progress-time">01:09</span>
      <el-slider
        class="progress-bar"
        v-model="palyTime"
        :max="120"
        flex-box="1"
      >
      </el-slider>
      <span class="progress-duration">02:30</span>
    </div>

    <!-- 声音 -->
    <div flex="cross:center" class="voice">
      <el-button type="text" icon="icon-shengyin"></el-button>
      <el-slider
        class="progress-bar"
        v-model="palyTime"
        :max="120"
        style="width:100px;"
        flex-box="1"
      >
      </el-slider>
    </div>

    <!-- 操作按钮组 -->
    <div class="opt-btn-group" flex="cross:center">
      <!-- 播放模式 -->
      <el-button
        type="text"
        @click="handleModeClick"
        :icon="palyMode[palyModeIndex].icon"
        :title="palyMode[palyModeIndex].name"
      >
      </el-button>

      <!-- -品质 -->
      <el-dropdown
        @command="qualityIndex = $event"
        size="medium"
        placement="top"
      >
        <span class="el-dropdown-link">
          <el-button type="text" class="border">
            {{ qualityList[qualityIndex].name }}
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in qualityList"
            :key="item.value"
            :disabled="qualityList[qualityIndex].value === item.value"
            :command="index"
          >
            {{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-button type="text" icon="icon-suijibofang"> </el-button>

      <el-button type="text" class="border">
        词
      </el-button>
      <!-- 播放列表 -->
      <el-popover
        placement="top"
        popper-class="palylist-popper"
        :visible-arrow="false"
      >
        <PlayListHistory />
        <el-button type="text" icon="icon-yinleliebiao" slot="reference">
        </el-button>
      </el-popover>
    </div>
  </el-footer>
</template>
<style>
.el-popover.palylist-popper {
  width: 500px;
  padding: 0 !important;
  top: 150px !important;
  left: auto !important;
  bottom: 50px;
  right: 0 !important;
  margin: 0 !important;
  border-right: none !important;
  border-bottom: none !important;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  box-shadow: -10px -10px 12px 0 rgba(0, 0, 0, 0.1) !important;
  /* box-shadow: h-shadow v-shadow blur spread color inset; */
}
</style>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import PlayListHistory from './PlayListHistory.vue'

@Component({
  components: {
    PlayListHistory
  }
})
export default class Footer extends Vue {
  private palyTime: number = 0

  private palyModeIndex: number = 0
  private palyMode = [
    {
      icon: 'icon-liebiaoxunhuan',
      name: '列表循环'
    },
    {
      icon: 'icon-suijibofang',
      name: '随机播放'
    },
    {
      icon: 'icon-danquxunhuan',
      name: '单曲循环'
    }
  ]

  private qualityIndex: number = 0
  private qualityList = [
    {
      name: '标准品质',
      value: 1
    },
    {
      name: '较高品质',
      value: 2
    },
    {
      name: '极高品质',
      value: 3
    }
  ]

  /** 模式点击 */
  handleModeClick() {
    this.palyModeIndex = (this.palyModeIndex + 1) % this.palyMode.length
  }
}
</script>
