<template>
  <div class="search">
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

@Component({
  components: {}
})
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

<style lang="scss">
.search {
  flex-grow: 1;
  .el-input {
    $height: 22px;
    min-width: 200px;
    max-width: 300px;
    .el-input__inner {
      background-color: #a82828;
      border: none;
      border-radius: $height;
      color: #fff;
      height: $height !important;
      padding: 0 #{$height / 2};
      padding-right: #{$height / 2 + 12px};
    }
    .el-input__suffix {
      display: flex;
      align-items: center;
      cursor: pointer;
      margin-right: 5px;
      &:hover {
        color: #fff;
      }
    }
  }
}
</style>
