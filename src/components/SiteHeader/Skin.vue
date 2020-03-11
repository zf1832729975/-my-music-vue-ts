<!-- --------------------------------------
 * 皮肤
 * @author zhoufei
 * @date 2020/3/11
-------------------------------------- --->
<template>
  <el-popover
    placement="top"
    trigger="click"
    popper-class="skin"
    @show="popoverShow"
  >
    <el-button slot="reference" class="icon-pifu" type="text"></el-button>
    <el-tabs v-model="tabActive">
      <el-tab-pane name="theme" label="主题">
        <ul class="theme-list" flex style="flex-wrap:wrap">
          <li
            v-for="theme in themes"
            class="theme-item"
            :class="{
              'is-active': currentThemeConfig.name === theme.name
            }"
            :key="theme.name"
            :style="{
              'border-color': theme.themeColor
            }"
          >
            <div class="theme-inner" @click="changeTheme(theme)">
              <el-image fit="fill" :src="theme.backgroundImage"></el-image>
              <p class="theme-title">{{ theme.title }}</p>
              <i class="flag-dot icon-xialajiantou"></i>
            </div>
          </li>
        </ul>
      </el-tab-pane>
      <el-tab-pane name="color" label="纯色">
        <ul class="theme-list" flex style="flex-wrap:wrap">
          <li
            v-for="color in customColorList"
            class="theme-item theme-item--small"
            :class="{
              'is-active': currentThemeConfig.themeColor === color
            }"
            :key="color"
            :style="{
              'border-color': color
            }"
          >
            <div
              class="theme-inner"
              @click="changeTheme(theme)"
              :style="{
                background: color
              }"
            >
              <i class="flag-dot icon-xialajiantou"></i>
            </div>
          </li>
        </ul>
        <div>
          <p>自定义颜色</p>
          <el-color-picker
            v-model="customColorValue"
            :predefine="customColorList"
          >
          </el-color-picker>
        </div>
      </el-tab-pane>
    </el-tabs>
  </el-popover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Theme } from '@/types'
// @ts-ignore
import themeConfig from '@/assets/themes/config'

@Component({
  components: {}
})
export default class Skin extends Vue {
  /** 主题 */
  private themes: object = themeConfig
  /** custom 列表 */
  private customColorList: Array<string> = [
    '#FF5C8A',
    '#FF7A9E',
    '#FE76C8',
    '#717FF9',
    '#4791EB',
    '#39AFEA',
    '#2BB669',
    '#6ACC19',
    '#E2AB12',
    '#FF8F57',
    '#FD726D',
    '#FD544E'
  ]
  /** 自定义颜色值 */
  private customColorValue: string = '#FF5C8A'
  /** 激活的 tab */
  private tabActive: string = 'theme'
  /** 当前主题配置 */
  get currentThemeConfig(): Theme {
    return this.$store.state.currentThemeConfig
  }
  set currentThemeConfig(val: Theme) {
    this.$store.commit('UPDAE_currentThemeConfig', val)
  }

  created() {
    this.customColorValue = this.currentThemeConfig.themeColor
  }

  private changeTheme(theme: Theme): void {
    // @ts-ignore
    let res = window.changeTheme(theme.name)

    if (res) {
      // @ts-ignore
      this.currentThemeConfig = themeConfig[theme.name]
    }
  }
  private popoverShow(): void {
    this.tabActive = 'theme'
    this.customColorValue = this.currentThemeConfig.themeColor
  }
}
</script>

<style lang="scss">
.skin.el-popover {
  background: #fafafa;
  font-size: 12px;
}
.skin {
  .el-tabs__item {
    padding: 0 8px;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #666;
    &.is-active {
      color: #333;
    }
  }
  .el-tabs__nav-wrap::after {
    height: 1px;
  }
  .el-tabs__active-bar {
    background-color: #888888;
    height: 2px;
  }
}
.skin {
  .theme-list {
    margin: 0 -5px;
    width: 288px;
  }
  .theme-item {
    height: 90px;
    width: 90px;
    // padding: 5px;
    margin: 3px;
    padding: 2px;
    &--small {
      $w: 42px;
      width: $w;
      height: $w;
    }
    &:hover {
      border: 1px solid;
    }
    .flag-dot {
      display: none;
    }
    &.is-active {
      .flag-dot {
        display: block;
        position: absolute;
        $height: 20px;
        height: $height;
        width: $height;
        line-height: $height;
        text-align: center;
        bottom: -6px;
        right: -6px;
        border-radius: 50%;
        border: 2px solid #fafafa;
        background-color: #cd2929;
        color: #fff;
        font-size: 14px;
      }
    }
  }
  .theme-inner {
    position: relative;
    width: 100%;
    height: 100%;
    cursor: pointer;
    // padding: 6px;
  }
  .theme-title {
    width: 100%;
    position: absolute;
    bottom: 0;
    color: #fff;
    background-color: rgba(0, 0, 0, 0.3);
    font-size: 14px;
    padding-left: 4px;
  }
}
</style>
