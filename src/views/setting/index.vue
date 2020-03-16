<!-- --------------------------------------
 * 主题
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <div>
    <el-radio
      v-for="(item, key) in themes"
      :key="item"
      v-model="selectedTheme"
      :label="key"
      @change="handleThemeChange"
    ></el-radio>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Setting extends Vue {
  // @ts-ignore
  private themes: Object = window.themes || {}
  /** 选择的主题 */
  private selectedTheme: string = window.$theme || ''

  private handleThemeChange(theme: string) {
    window.changeTheme(theme)
  }
}
</script>
