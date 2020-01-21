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

@Component({
  components: {}
})
export default class Setting extends Vue {
  // @ts-ignore
  private themes: Object = window.themes || {}
  /** 选择的主题 */
  // @ts-ignore
  private selectedTheme: string = window.currentTheme || ''

  private handleThemeChange(theme: string) {
    // @ts-ignore
    window.changeTheme(theme)
  }
}
</script>
