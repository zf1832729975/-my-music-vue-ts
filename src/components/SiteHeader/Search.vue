<!-- --------------------------------------
 * 头部搜索组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div class="search no-drag">
    <el-input
      size="mini"
      v-model="formData.keywords"
      placeholder="搜索音乐，视频，歌词，电台"
    >
      <i class="el-icon-search" slot="suffix" @click="handleSearch"></i>
    </el-input>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

// form data interface
interface IFormData {
  keywords: string
}

@Component
export default class Search extends Vue {
  private formData: IFormData = {
    keywords: ''
  }

  mounted() {
    console.log(' this.formData: ', this.formData)
  }

  // 搜索
  handleSearch() {}
}
</script>
