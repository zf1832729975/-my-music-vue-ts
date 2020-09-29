<!-- --------------------------------------
 * 头部搜索组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div class="search no-drag">
    <el-popover
      placement="top-start"
      :width="424"
      trigger="focus"
      v-model="popoverVisible"
      popper-class="header-search-popper"
    >
      <el-input
        slot="reference"
        size="mini"
        v-model="keywords"
        @focus="onInputFocus"
        placeholder="搜索音乐，视频，歌词，电台"
      >
        <i class="el-icon-search" slot="suffix" @click="handleSearch"></i>
      </el-input>

      <!-- 热搜榜 -->
      <el-scrollbar class="header-search-scrollbar">
        <p style="padding-left:16px;padding-top:14px;">热搜榜</p>
        <ul class="search-hot-list">
          <li
            v-for="(search, index) in searchHotList"
            :key="index"
            flex="cross:center"
            class="search-hot-item"
            :class="{ front: index < 3 }"
            @click="handleSearchHotClick(search)"
          >
            <span class="search-index">{{ index + 1 }}</span>
            <span>
              <p>
                <span class="search-word">{{ search.searchWord }}</span>
                <span class="search-score">{{ search.score }}</span>
                <!-- iconType 1：hot、 5：上升  -->
                <!-- <span class="search-iconType">{{search.iconType}}</span> -->
              </p>
              <p class="search-content">{{ search.content }}</p>
            </span>
          </li>
        </ul>
      </el-scrollbar>
    </el-popover>
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

  private keywords: string = ''

  private popoverVisible: boolean = false
  private searchHotList: Array<Object> = []

  mounted() {
    console.log(' this.formData: ', this.formData)
    this.getSearchHot()
  }

  async onInputFocus() {
    await this.getSearchHot()
    this.popoverVisible = true
  }

  // 搜索
  handleSearch() {}

  // 热搜
  getSearchHot() {
    // this.$http.get('/search/hot').then(res => {
    //   console.log('热搜列表(简略) res: ', res)
    // })
    return this.$http.get('/search/hot/detail').then(res => {
      console.log('热搜列表(详细) res: ', res)
      this.searchHotList = res.data
    })
  }

  handleSearchHotClick(search) {
    this.keywords = search.searchWord
  }
}
</script>

<style lang="scss">
.header-search-scrollbar.el-scrollbar {
  // max-height: 499px;
  height: 499px;
  // overflow-y: scroll;
  // overflow-x: hidden;
  .el-scrollbar__bar.is-vertical {
    right: 0;
    width: 8px;
  }
  .el-scrollbar__wrap {
    overflow-y: scroll;
  }
  .el-scrollbar__view {
    padding-bottom: 10px;
  }
}
.header-search-popper {
  &.el-popper {
    padding: 0;
  }
  .popper__arrow {
    // 424 / 2
    margin-left: -160px;
  }
}

// /*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
// ::-webkit-scrollbar {
//   width: 8px;
//   height: 8px;
//   background-color: transparent;
// }

// /*定义滚动条轨道 内阴影+圆角*/
// ::-webkit-scrollbar-track {
//   background-color: transparent;
// }

// /*定义滑块 内阴影+圆角*/
// ::-webkit-scrollbar-thumb {
//   border-radius: 8px;
//   background-color: #e1e1e2;
// }

.search-hot-item {
  cursor: pointer;
  padding: 6px 0;
  &:hover {
    background-color: #eeeeee;
  }
  &.front {
    .search-index {
      color: red;
    }
    .search-word {
      font-weight: bold;
    }
  }
  .search-index {
    color: #9a9a9a;
    padding-left: 20px;
    width: 55px;
    font-size: 16px;
  }
  .search-word {
    display: inline-block;
    margin-right: 10px;
    color: #111;
  }
  .search-score {
    color: #bbb;
    font-size: 10px;
    vertical-align: bottom;
  }
  .search-content {
    padding-top: 2px;
    color: #999;
    font-size: 12px;
  }
}
</style>
