<!-- --------------------------------------
 * 发现音乐==>歌单
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <div class="playlist">
    <!-- 筛选 -->
    <el-popover
      placement="right-start"
      popper-class="select-playlist-popover"
      :width="600"
    >
      <el-button slot="reference" class="select-button"
        >摇滚<i class="icon icon-xialajiantou iconfont"></i
      ></el-button>

      <!--  popover 内容 -->
      <p class="title">添加标签</p>
      <el-divider></el-divider>
      <div class="scrollbar">
        <el-scrollbar>
          <div class="body">
            <div class="all-playlist">全部歌单</div>
            <el-row
              :gutter="0"
              v-for="(catArr, key) in listObj"
              :key="key"
              class="categories-item"
            >
              <el-col :span="5" class="categories-item-title">
                <i class="iconfont icon-chengyuan-shanchu"></i>
                <span class="text">{{ categories[key] }}</span>
              </el-col>
              <el-col :span="19">
                <div class="playlist-item__wrap">
                  <span
                    class="playlist-item"
                    v-for="item in catArr"
                    :key="item.id"
                    :class="{
                      'is-active': activeId === item.id
                    }"
                    >{{ item.name }}
                    <i class="is-hot" v-if="item.hot">HOT</i>
                  </span>
                </div>
              </el-col>
            </el-row>
          </div>
        </el-scrollbar>
      </div>
    </el-popover>

    <!-- 热门标签 -->
    <p class="hot-tags">
      热门标签:&nbsp;&nbsp;
      <span class="hot-tag-item" v-for="item in hotTags" :key="item.id">
        {{ item.name }}
        <el-divider direction="vertical"></el-divider>
      </span>
    </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPlaylistCatlist, getPlaylistHot } from '@/api'

@Component
export default class PlayList extends Vue {
  /** 分类 */
  private categories: Object = {}
  /** 整理好的数据列表 */
  private listObj: Array<Object> = []
  /** 热门标签 */
  private hotTags: Array<Object> = []
  /** 激活的id */
  private activeId: number = 0
  created() {
    this.getPlaylistCatlist()
    this.getPlaylistHot()
  }

  /** 获取歌单分类 */
  getPlaylistCatlist() {
    getPlaylistCatlist().then(res => {
      console.log('歌单分类 res: ', res)
      // @ts-ignore
      this.categories = res.categories
      // @ts-ignore
      const obj = (this.listObj = {})
      // @ts-ignore
      for (let key in res.categories) {
        // @ts-ignore
        obj[key] = []
      }
      // @ts-ignore
      res.sub.forEach(item => {
        // @ts-ignore
        obj[item.category].push(item)
      })
    })
  }

  /** 获取热门歌单分类 */
  getPlaylistHot() {
    getPlaylistHot().then(res => {
      // console.log('获取热门歌单分类 res: ', res)
      // @ts-ignore
      this.hotTags = res.tags
    })
  }
}
</script>

<style lang="scss"></style>
