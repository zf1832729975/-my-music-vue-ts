<template>
  <el-container class="site-container is-vertical">
    <SiteHeader />
    <el-container class="site-container__body">
      <SiteAside :width="asideWidth + 'px'" />
      <el-main class="site-main">
        <el-scrollbar>
          <router-view></router-view>
        </el-scrollbar>
      </el-main>
      <MusicCard
        v-if="!isExpand"
        @expand="handleExpand"
        :style="{
          width: asideWidth + 'px'
        }"
      />
      <MusicDetail v-else @shrink="handleShrink" />

      <!-- 拖动条蒙版、让鼠标变成箭头形状，防止来回更改作用 -->
      <!-- <div class="drag-mark" v-if="dragging"></div> -->
      <!-- 拖动条 -->
      <div
        class="drag-bar"
        :style="{
          left: asideWidth + 'px'
        }"
        @mousedown="handleDown"
      ></div>
    </el-container>
    <SiteFooter />
  </el-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'

import SiteHeader from '@/components/SiteHeader/index.vue'
import SiteAside from '@/components/SiteAside/index.vue'
import SiteFooter from '@/components/SiteFooter'
import MusicCard from '@/components/MusicCard/index.vue'
import MusicDetail from '@/components/MusicDetail/index.vue'

// const LEFT_MIN_WIDTH: number = 200
// const RIGHT_MIN_WIDTH: number = 800

@Component({
  components: {
    SiteHeader,
    SiteAside,
    SiteFooter,
    MusicCard,
    MusicDetail
  }
})
export default class Home extends Vue {
  private isExpand: boolean = false
  public asideWidth: number = 200
  public dragging: boolean = false
  private disabled: boolean = false
  private range: Array<number> = [200, 700]
  @Watch('$route.path')
  routerPathChange() {
    if (this.isExpand) this.isExpand = false
  }

  /** 展开 */
  private handleExpand() {
    this.isExpand = true
  }
  /** 缩小、关闭 */
  private handleShrink() {
    this.isExpand = false
  }

  handleDown(event: Event) {
    if (this.disabled) return
    event.preventDefault()
    this.onDragStart(event)
    window.addEventListener('mousemove', this.onDragging)
    window.addEventListener('touchmove', this.onDragging)
    window.addEventListener('mouseup', this.onDragEnd)
    window.addEventListener('touchend', this.onDragEnd)
    window.addEventListener('contextmenu', this.onDragEnd)
  }
  onDragStart(event: Event) {
    this.dragging = true
    const x = event.clientX
    if (this.range[0] <= x && x <= this.range[1]) this.asideWidth = x
    // const x = event.clientX
    // const max = document.body.clientWidth - RIGHT_MIN_WIDTH
    // if (LEFT_MIN_WIDTH <= x && x <= max) this.asideWidth = x
  }

  onDragEnd() {
    if (this.dragging) {
      /*
       * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
       * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
       */
      setTimeout(() => {
        this.dragging = false
      }, 0)
      window.removeEventListener('mousemove', this.onDragging)
      window.removeEventListener('touchmove', this.onDragging)
      window.removeEventListener('mouseup', this.onDragEnd)
      window.removeEventListener('touchend', this.onDragEnd)
      window.removeEventListener('contextmenu', this.onDragEnd)
    }
  }
  onDragging(event: Event) {
    const x = event.clientX
    if (this.range[0] <= x && x <= this.range[1]) this.asideWidth = x
    // const x = event.clientX
    // const max = document.body.clientWidth - RIGHT_MIN_WIDTH
    // if (LEFT_MIN_WIDTH <= x && x <= max) this.asideWidth = x
  }
}
</script>

<style lang="scss"></style>
