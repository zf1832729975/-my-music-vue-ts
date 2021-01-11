<!-- --------------------------------------
 * 搜索页面
 * @author zhoufei
 * @date 2021/1/11
-------------------------------------- --->
<template>
  <div class="search">
    <h3 class="find">
      找到 <em>{{ result[navObj.key + 'Count'] || 0 }}</em> {{ navObj.suffix }}
    </h3>
    <ul class="nav">
      <li
        v-for="item in navList"
        :key="item.title"
        :class="{ active: item.value === navValue }"
        @click="handleNav(item.value)"
      >
        {{ item.title }}
      </li>
    </ul>
    <div style="min-height: 100px" v-loading="loading">
      <!-- <SearchSongs :songs="result.songs || []" :keyword="keyword"></SearchSongs> -->
      <component
        :is="componentName"
        :data="result[navObj.key + 's']"
        v-if="componentName"
      ></component>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import SearchSongs from './SearchSongs'
import Template from './Template'

@Component({
  components: { SearchSongs, Template }
})
export default class Search extends Vue {
  private navValue = '1'
  private loading = false
  // private componentName = 'SearchSongs'

  //  1: 单曲, 10: 专辑, 100: 歌手,
  //  1000: 歌单, 1002: 用户, 1004: MV, 1006: 歌词, 1009: 电台, 1014: 视频
  private navList = Object.freeze([
    {
      title: '单曲',
      value: '1',
      key: 'song',
      suffix: '首单曲',
      componentName: 'SearchSongs'
    },
    {
      title: '歌手',
      value: '100',
      key: 'artist',
      suffix: '位歌手',
      componentName: 'Template'
    },
    {
      title: '专辑',
      value: '10',
      key: 'album',
      suffix: '张专辑',
      componentName: 'Template'
    },
    {
      title: '视频',
      value: '1014',
      key: 'video',
      suffix: '个视频',
      componentName: 'Template'
    },
    {
      title: '歌单',
      value: '1000',
      key: 'playlist',
      suffix: '个歌单',
      componentName: 'Template'
    },
    {
      title: '歌词',
      value: '1006',
      key: 'song',
      suffix: '首歌词',
      componentName: 'Template'
    },
    {
      title: '主播电台',
      value: '1009',
      key: 'djRadio',
      suffix: '个电台',
      componentName: 'Template'
    },
    {
      title: '用户',
      value: '1002',
      key: 'userprofile',
      suffix: '位用户',
      componentName: 'Template'
    }
  ])

  private result = {}

  get keyword() {
    return this.$route.query.keyword
  }

  get navObj() {
    return this.navList.find(item => item.value === this.navValue) || {}
  }

  get componentName() {
    return this.navObj.componentName
  }

  handleNav(newValue: string) {
    if (this.navValue !== newValue) {
      this.navValue = newValue
      this.handleSearch()
    }
  }

  @Watch('keyword', { immediate: true })
  async handleSearch() {
    this.loading = true

    try {
      const { result } = await this.$http.get(
        `/search?keywords=${this.keyword}&type=${this.navValue}&limit=100`
      )
      console.log(' result: ', result)
      if (result.djRadiosCount) {
        result.djRadioCount = result.djRadiosCount
      }
      this.result = result
    } catch {
    } finally {
      this.loading = false
    }
  }
}
</script>

<style lang="scss" scoped>
.search {
}
.find {
  font-size: 18px;
  color: #333;
  margin-bottom: 20px;
  margin-left: 16px;
  em {
    font-style: normal;
  }
}
.nav {
  border-bottom: 1px solid #eee;
  li {
    font-size: 14px;
    line-height: 40px;
    padding: 0 16px;
    color: #555;
    display: inline-block;
    cursor: pointer;
    &.active {
      font-weight: bold;
    }
    &:hover {
      color: #000;
    }
  }
}
</style>
