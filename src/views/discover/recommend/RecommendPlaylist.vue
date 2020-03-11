<!-- --------------------------------------
 * 个性推荐==>推荐歌单
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <ul class="playlist">
    <li class="playlist-item" v-for="item in list" :key="item.id">
      <!-- 顶部图片区域部分 -->
      <div class="body" @click="handleClick(item)">
        <router-link :to="`/playlist?id=${item.id}`">
          <!-- 图片 -->
          <el-image :src="item.picUrl" fit="fit">
            <img slot="placeholder" :src="placeholderImage" />
          </el-image>

          <!-- 播放量 -->
          <p class="play-count">
            <i class="icon-erji1 iconfont"></i>
            <span class="text">{{ item.playCount }}</span>
          </p>
          <p class="copy-writer">{{ item.copywriter }}</p>
        </router-link>

        <!-- 播放按钮 -->
        <el-button
          icon="icon-bofang2 iconfont play-button"
          type="text"
          @click.stop="handlePlayClick(item)"
        ></el-button>
      </div>
      <!-- 底部文字部分 -->
      <router-link class="footer-name" :to="`/playlist?id=${item.id}`">{{
        item.name
      }}</router-link>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { getPersonalized } from '@/api'
// @ts-ignore
import placeholderImage from '@/assets/img/placeholder.jpg'

@Component({})
export default class RecommendSongList extends Vue {
  private placeholderImage: string = placeholderImage
  private list: Array<Object> = []

  created() {
    this.getPersonalized()
  }

  /** 获取推荐歌单 */
  private async getPersonalized(): Promise<void> {
    const res = await getPersonalized(30)

    console.log('推荐歌单 res: ', res)
    // @ts-ignore
    this.list = res.result
  }

  private handleClick(item: object) {
    // @ts-ignore
    this.$router.push(`/playlist?id=${item.id}`)
  }

  private handlePlayClick(item: object) {
    console.log(' item: ', item)
  }
}
</script>

<style lang="scss">
$space: 10px;
.playlist {
  margin: 0 #{-$space};
}
.playlist-item {
  position: relative;
  padding: 0 $space 30px;
  display: inline-block;
  width: 20%;
  vertical-align: top;
  .body {
    height: 180px;
    position: relative;
    color: #fff;
    cursor: pointer;
    overflow: hidden;
    margin-bottom: 4px;
    &:hover {
      .play-count {
        display: none;
      }
      .copy-writer {
        top: 0px;
      }
      .play-button {
        display: block;
      }
    }
  }
  .el-image,
  img {
    width: 100%;
    height: 100%;
  }

  .play-count {
    display: block;
    position: absolute;
    top: 0;
    left: 10px;
    right: 0;
    z-index: 2;
    width: normal;
    text-align: right;
    padding-right: 4px;
    background: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.7));
    .iconfont {
      font-size: 12px;
      vertical-align: middle;
      margin-right: 5px;
    }
    .text {
      vertical-align: middle;
    }
  }
  .copy-writer {
    position: absolute;
    top: -50px;
    z-index: 2;
    width: 100%;
    background: rgba($color: #000000, $alpha: 0.5);
    line-height: 1.5;
    padding: 4px;
    transition: top 0.5s ease-in-out;
  }
  .footer-name {
    cursor: pointer;
    line-height: 1.4;
    &:hover {
      text-decoration: underline;
    }
  }

  .play-button {
    display: none;
    position: absolute;
    right: 6px;
    bottom: 6px;
    padding: 0;
    border-radius: 50%;
    overflow: hidden;
    color: #fff;
    background: rgba($color: #000000, $alpha: 0.3);
    font-size: 20px;
    transition: all 0.3s;
  }
}
</style>
