<!-- --------------------------------------
 * 发现音乐=》个性推荐==》主播电台
 * @author zhoufei
 * @date 2020/9/17
-------------------------------------- --->
<template>
  <div class="discHS">
    <el-row :gutter="16">
      <el-col v-for="item in list" :span="4" :key="item.id">
        <router-link :to="'/djradio/' + item.id">
          <div class="discHS-image-box">
            <div
              class="discHS-pic"
              :style="`background-image:url(${item.picUrl});`"
            ></div>
            <span class="discHS-tag">{{ item.copywriter }}</span>
          </div>
          <p class="discHS-desc">{{ item.name }}</p>
        </router-link>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Template extends Vue {
  private list = []
  created() {
    this.$http.get('/personalized/djprogram').then(res => {
      this.list = res.result
    })
  }
}
</script>

<style lang="scss">
.discHS {
  line-height: 1.5;
  &-image-box {
    height: 150px;
    position: relative;
    overflow: hidden;
  }
  &-pic {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3);
  }
  &-tag {
    bottom: 0;
    position: absolute;
    color: #fff;
    font-size: 12px;
    padding: 0 4px;
    z-index: 2;
  }
}
</style>
