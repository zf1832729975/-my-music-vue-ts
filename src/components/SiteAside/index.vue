<!-- --------------------------------------
 * 侧边栏组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <el-aside class="site-aside" :width="width">
    <el-scrollbar>
      <!-- 每一个卡片 推荐  -->
      <dl>
        <dt class="text">推荐</dt>
        <dd class="is-active">
          <i class="icon iconfont icon-yiliao"></i>
          <span class="text">发现音乐</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-VIP"></i>
          <span class="text">私人FM</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-zhibo-"></i>
          <span class="text">LOOK直播</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-video"></i>
          <span class="text">视频</span>
        </dd>
        <dd>
          <i
            class="icon iconfont icon-dilanxianxingiconyihuifu_huabanfuben"
          ></i>
          <span class="text">朋友</span>
        </dd>
      </dl>

      <!-- 每一个卡片 我的音乐 -->
      <dl>
        <dt class="text">我的音乐</dt>
        <dd>
          <i class="icon iconfont icon-yinlemusic214"></i>
          <span class="text">本地音乐</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-xiazai"></i>
          <span class="text">下载管理</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-yun"></i>
          <span class="text">我的音乐云盘</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-shoucang"></i>
          <span class="text">我的收藏</span>
        </dd>
      </dl>

      <!-- 每一个卡片 创建的歌单 -->
      <dl>
        <dt class="text">创建的歌单</dt>
        <dd>
          <i class="icon iconfont icon-xihuan"></i>
          <span class="text">我喜欢的音乐</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-yinleliebiao"></i>
          <span class="text">古风</span>
        </dd>
      </dl>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component({})
export default class SiteAside extends Vue {
  @Prop({ default: '200px' }) width!: string
}
</script>
