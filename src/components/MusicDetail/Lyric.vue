<!-- --------------------------------------
 * 播放页面歌词
 * @author zhoufei
 * @date 2020/9/25
-------------------------------------- --->
<template>
  <el-scrollbar class="lyric" id="js_lyric" ref="scrollbar">
    <ul class="lyric-list">
      <li
        class="lyric-item"
        v-for="(item, index) in lyricList"
        :key="index"
        :class="{ 'is-active': lyricActiveIndex === index }"
        :id="LYRIC_ITEM_ID_PREFIX + index"
        :aria-time="item.time"
      >
        {{ item.lyric }}
      </li>
    </ul>
  </el-scrollbar>
</template>

<script lang="ts">
import { Component, Vue, Prop, Watch } from 'vue-property-decorator'
import { Audio } from '@/types'

interface LyricItem {
  /** 开始时间 */
  time: number
  /** 歌词 */
  lyric: string
  /** 原文本 */
  originText: string
}

@Component
export default class Lyric extends Vue {
  @Prop({ required: true }) lyric!: string
  // [02:34.525]
  // 2 * 60 + 34 ==> 154.525 s

  private lyricList: Array<LyricItem> = []
  private lyricActiveIndex: Number = -1

  private LYRIC_ITEM_ID_PREFIX = 'js_lyric-'

  get audio(): Audio {
    return this.$store.state.audio
  }

  // 解析歌词
  @Watch('lyric', { immediate: true })
  converLyric() {
    const lyricText = this.lyric
    const lyricLines = lyricText.split('\n') // Array<string> ['[00:00.000] 作曲 : 谢馨哲/吴萌']
    const arr: Array<LyricItem> = []
    lyricLines.map(line => {
      line = line.trim()
      const index = line.indexOf(']')
      const timeText = line.substring(1, index)
      const lyricText = line.substring(index + 1).trim()
      const time = this.getAnalysisTime(timeText)
      arr.push({
        time: time,
        lyric: lyricText,
        originText: line
      })
    })
    this.lyricList = arr
    this.lyricActiveIndex = -1
  }

  @Watch('audio.currentTime', { immediate: true })
  currentTimeChange(currentTime: number) {
    const lyricList = this.lyricList
    this.lyricActiveIndex = lyricList.findIndex(
      item => item.time >= currentTime
    )
  }

  @Watch('lyricActiveIndex', { immediate: true })
  // 激活index改变、设置滚动条滚动
  lyricActiveIndexCahnge(index: number) {
    this.$nextTick(() => {
      const activeEl: Element | null = document.getElementById(
        this.LYRIC_ITEM_ID_PREFIX + index
      )
      if (activeEl) {
        const scrollEl: Element | null = document.querySelector(
          '#js_lyric .el-scrollbar__wrap'
        )
        if (scrollEl) {
          const startTop = scrollEl.scrollTop
          let endTop = activeEl.offsetTop - 100
          endTop < 0 && (endTop = 0)

          const everyLen = (endTop - startTop) / 40
          let i = 0
          const timer = setInterval(() => {
            if (i > 40) {
              clearInterval(timer)
            } else {
              scrollEl.scrollTop += everyLen
            }
            i++
          }, 10)
        }
      }
    })
  }

  // 解析时间
  // 02:34.525 ==> 154.525 (s)
  getAnalysisTime(text: string): number {
    return Number(
      text.replace(/(\d+):(\d+)\.(\d+)/, function(a, $1, $2, $3) {
        return Number($1 * 60) + Number($2) + '.' + $3
      })
    )
  }
}
</script>
<style lang="scss">
.lyric {
  height: 300px;
  margin-top: 20px;
  margin-bottom: 20px;
  .el-scrollbar__bar.is-vertical {
    // 总是显示
    opacity: 1;
    width: 7px;
    border-right: 1px solid #c3c4c7;
  }
  &-list {
    padding-bottom: 40px;
  }
  &-item {
    transition: color 0.3s;
    color: #111;
    font-size: 14px;
    line-height: 18px;
    padding: 8px 0;
    font-size: 16px;
    &.is-active {
      // color: #fff;
      color: red;
    }
  }
}
</style>
