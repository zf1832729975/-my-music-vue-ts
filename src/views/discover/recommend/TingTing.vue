<!-- --------------------------------------
 * 发现音乐=》个性推荐==》听听
 * @author zhoufei
 * @date 2020/9/17
-------------------------------------- --->
<template>
  <div class="disTT">
    <div class="zh-row">
      <div v-for="item in 5" class="zh-col-5">
        <a href="#" target="_blank">
          <div class="disTT-image-box">
            <span class="disTT-tag">流行</span>
            <span class="disTT-playcounts">100</span>
            <div
              class="disTT-pic"
              style="background-image:url('xx.png');"
            ></div>
          </div>
          <p class="disTT-desc text-ell">会让你单曲</p>
          <div class="disTT-user text-ell">
            <el-avatar :size="16" src></el-avatar>
            <span>好呢好呢</span>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Template extends Vue {}
</script>

<style lang="scss">
.disTT {
  line-height: 1.5;
  &-image-box {
    height: 190px;
    position: relative;
    overflow: hidden;
  }
  &-pic {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.2);
    }
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-tag {
    top: 0;
    position: absolute;
    background: #ff2c55;
    color: #fff;
    font-size: 12px;
    padding: 0 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
    box-shadow: 4px 2px 2px rgba(0, 0, 0, 0.3);
  }

  &-playcounts {
    z-index: 2;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 4px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 10px;
  }
  &-desc {
    text-overflow: ellipsis;
  }
  &-user {
    .el-avatar {
      margin-right: 6px;
    }
  }
}
</style>
