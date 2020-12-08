<!-- --------------------------------------
 * 发现音乐=》个性推荐==》看看
 * @author zhoufei
 * @date 2020/9/17
-------------------------------------- --->
<template>
  <div class="disKK">
    <div class="zh-row">
      <div v-for="(item, index) in 5" class="zh-col-5" :key="index">
        <a href="#" target="_blank">
          <div class="disKK-image-box">
            <div
              class="disKK-pic"
              style="background-image:url('xx.png');"
            ></div>
            <span class="disKK-playbtn">
              <i class="el-icon-remove-outline disKK-playbtn-icon"></i>
            </span>

            <div class="disKK-boxbottom">
              <div class="disKK-user text-ell">
                <el-avatar :size="20" src></el-avatar>
                <span>好呢好呢</span>
              </div>
              <span class="disKK-playcounts">100</span>
            </div>

            <span class="disKK-playcounts">100</span>
          </div>
          <div class="disKK-des">哈哈哈</div>
        </a>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class KanKan extends Vue {}
</script>

<style lang="scss">
.disKK {
  line-height: 1.5;
  &-image-box {
    height: 250px;
    position: relative;
    overflow: hidden;
    &:hover {
      .disKK-playbtn {
        opacity: 1;
      }
    }
  }
  &-pic {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
    &:hover {
      transform: scale(1.5);
    }
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-playbtn {
    position: absolute;
    opacity: 0;
    transition: all 0.3s;
    top: 50%;
    left: 50%;
    width: 40px;
    height: 40px;
    text-align: center;
    transform: translate(-50%, -50%);
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    border-radius: 50%;
    border: 1px solid #f0f0f0;
    overflow: hidden;
    &-icon {
      font-size: 24px;
      line-height: 38px;
    }
  }

  &-boxbottom {
    z-index: 2;
    position: absolute;
    line-height: 30px;
    bottom: 0;
    width: 100%;
    padding: 6px 12px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffffff;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .el-avatar {
      margin-right: 8px;
      vertical-align: middle;
    }
  }
  &-desc {
    &:hover {
      color: #000;
    }
  }
}
</style>
