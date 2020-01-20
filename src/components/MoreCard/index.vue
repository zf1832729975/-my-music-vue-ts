<!-- --------------------------------------
 * 更多组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div class="more-card">
    <div class="more-view">
      <div class="more-view__content">
        <h3 class="more-view__title">{{ title }}</h3>
        <div class="more-btn">
          <span>更多</span>
          <i class="el-icon-arrow-right"></i>
        </div>
      </div>
      <el-divider></el-divider>
    </div>
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {},
  props: {
    title: {
      type: String
      // required: true
    }
  }
})
export default class Template extends Vue {
  // title: string = '推荐歌单'
}
</script>
<style lang="scss">
.more-card {
  margin-bottom: 30px;
}
.more-view {
  margin: 6px 0;
  &__content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__title {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    line-height: 1.6;
  }
  .more-btn {
    padding: 2px;
    cursor: pointer;
    color: #666666;
    &:hover {
      color: #333;
    }
  }
  .el-divider {
    margin: 5px 0;
  }
}
</style>
