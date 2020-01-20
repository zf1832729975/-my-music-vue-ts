<!-- --------------------------------------
 * 侧边栏组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <el-aside class="site-aside" width="210px">
    <el-scrollbar>
      <!-- 每一个卡片 推荐  -->
      <dl>
        <dt class="text">推荐</dt>
        <dd class="is-active">
          <i class="icon el-icon-eleme"></i>
          <span class="text">发现音乐</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">私人FM</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">视频</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">朋友</span>
        </dd>
      </dl>

      <!-- 每一个卡片 我的音乐 -->
      <dl>
        <dt class="text">我的音乐</dt>
        <dd>
          <i class="icon el-icon-eleme"></i>
          <span class="text">本地音乐</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">下载管理</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">我的音乐云盘</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">我的收藏</span>
        </dd>
      </dl>

      <!-- 每一个卡片 创建的歌单 -->
      <dl>
        <dt class="text">创建的歌单</dt>
        <dd>
          <i class="icon el-icon-eleme"></i>
          <span class="text">我喜欢的音乐</span>
        </dd>
        <dd>
          <i class="icon el-icon-s-promotion"></i>
          <span class="text">古风</span>
        </dd>
      </dl>
    </el-scrollbar>
  </el-aside>
</template>

<script>
export default {}
</script>
