<!-- --------------------------------------
 * footer
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <el-footer class="site-footer" height="70px" flex="cross:center">
    <!-- 播放按钮组 -->
    <div class="play-btn-group" flex-box="0">
      <el-button type="text" icon="icon-shangyishou1"> </el-button>
      <el-button type="text" @click="handlePlayBtnClick">
        <!-- 暂停中 -->
        <i v-if="audio.paused" class="icon-bofang" title="播放"></i>
        <!-- 播放中 -->
        <i v-else class="icon-iconstop" title="暂停"></i>
      </el-button>
      <el-button type="text" icon="icon-xiayishou1"> </el-button>
    </div>
    <!-- 进度条  -->
    <div class="progress" flex-box="1" flex="cross:center">
      <span class="progress-time">{{
        (audio.currentTime * 1000) | toTime
      }}</span>
      <!-- 播放进度条滑块 -->
      <el-slider
        ref="playProgress"
        class="progress-bar"
        v-model="audio.currentTime"
        :max="parseInt(audio.duration)"
        flex-box="1"
        :show-tooltip="false"
        @change="handleCurrentTimeChange"
      >
      </el-slider>
      <span class="progress-duration">{{
        (audio.duration * 1000) | toTime
      }}</span>
    </div>

    <!-- 现在的 autoplay 不会自动播放，点击下一首切换会自动播放 -->
    <audio
      preload
      ref="audio"
      hidden
      :src="audio.src"
      @durationchange="audio.duration = $event.target.duration"
      @ended="onended"
      @error="onerror"
    ></audio>

    <!-- 声音 -->
    <div flex="cross:center" class="voice">
      <el-button type="text" @click="audio.muted = !audio.muted">
        <!-- 静音是 -->
        <i v-if="audio.muted" class="icon-jingyin1" title="恢复音量"></i>
        <i v-else class="icon-shengyin" title="静音"></i>
      </el-button>

      <!-- 声音滑块 -->
      <el-slider
        class="progress-bar"
        v-model="audio.volume"
        :min="0"
        :max="1"
        style="width:100px;"
        flex-box="1"
        :step="0.01"
        :format-tooltip="formatTooltipVolume"
      >
      </el-slider>
    </div>

    <!-- 操作按钮组 -->
    <div class="opt-btn-group" flex="cross:center">
      <!-- 播放模式 -->
      <el-button
        type="text"
        @click="handleModeClick"
        :icon="palyMode[palyModeIndex].icon"
        :title="palyMode[palyModeIndex].name"
      >
      </el-button>

      <!-- -品质 -->
      <el-dropdown
        @command="qualityIndex = $event"
        size="medium"
        placement="top"
      >
        <span class="el-dropdown-link">
          <el-button type="text" class="border">
            {{ qualityList[qualityIndex].name }}
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in qualityList"
            :key="item.value"
            :disabled="qualityList[qualityIndex].value === item.value"
            :command="index"
          >
            {{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-button type="text" icon="icon-suijibofang"> </el-button>

      <el-button type="text" class="border">
        词
      </el-button>
      <!-- 播放列表 -->
      <el-popover
        placement="top"
        popper-class="palylist-popper"
        :visible-arrow="false"
      >
        <PlayListHistory />
        <el-button type="text" icon="icon-yinleliebiao" slot="reference">
        </el-button>
      </el-popover>
    </div>
  </el-footer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import PlayListHistory from './PlayListHistory.vue'
import { Itrack, IAudio } from '@/types'

@Component({
  components: {
    PlayListHistory
  },
  watch: {}
})
export default class Footer extends Vue {
  // 播放模式
  private palyModeIndex: number = 0
  private palyMode = [
    {
      icon: 'icon-liebiaoxunhuan',
      name: '列表循环'
    },
    {
      icon: 'icon-suijibofang',
      name: '随机播放'
    },
    {
      icon: 'icon-danquxunhuan',
      name: '单曲循环'
    }
  ]
  // 品质
  private qualityIndex: number = 0
  private qualityList = [
    {
      name: '标准品质',
      value: 1
    },
    {
      name: '较高品质',
      value: 2
    },
    {
      name: '极高品质',
      value: 3
    }
  ]
  // 定时器
  private timer: any = null
  /** 音量存储key */
  private volumeStoreKey: string = 'volume'
  private initVolume: number | string | null = localStorage.getItem(
    this.volumeStoreKey
  )
  /** 音频 */
  private audio: IAudio = {
    // 音乐地址
    src: 'https://music.163.com/song/media/outer/url?id=557583031.mp3',
    // 当前时间
    currentTime: 0,
    // 持续时间、总长
    duration: 0,
    // 是否暂停
    paused: true,
    // 音量 0~1
    volume: this.initVolume !== null ? +this.initVolume : 1,
    // 是否静音
    muted: false
  }

  @Watch('audio.paused')
  pausedChange(val: boolean): void {
    // 暂停
    if (val) {
      this.pauseMusic()
    } else {
      this.playMusic()
    }
  }
  @Watch('audio.volume')
  volumeChange(val: number) {
    // @ts-ignore
    this.$refs.audio.volume = val
    this.audio.muted = !val
    localStorage.setItem(this.volumeStoreKey, val + '')
  }
  @Watch('audio.muted')
  mutedChange(val: boolean) {
    // @ts-ignore
    this.$refs.audio.muted = val
  }

  created() {
    this.$bus.$on('play-music', (song: Itrack) => {
      this.audio.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
      // 确保 this.$refs.audio 变化
      this.$nextTick(() => {
        this.playMusic()
      })
    })
  }

  destroyed() {
    this.$bus.$off('play-music')
  }

  /** 模式点击 */
  handleModeClick() {
    this.palyModeIndex = (this.palyModeIndex + 1) % this.palyMode.length
  }

  /** 播放按钮点击 */
  handlePlayBtnClick() {
    if (this.audio.src) {
      this.audio.paused = !this.audio.paused
    }
  }

  /** 格式化 tooltip 声音 */
  formatTooltipVolume(value: number) {
    return parseInt(value * 100 + '')
  }

  /** 播放音乐  */
  playMusic() {
    this.timer && clearInterval(this.timer)

    // @ts-ignore
    this.$refs.audio.play()

    this.timer = setInterval(() => {
      // 拖动的时候不能赋值
      // @ts-ignore
      if (!this.$refs.playProgress.dragging) {
        // @ts-ignore
        this.audio.currentTime = this.$refs.audio.currentTime
      }
    }, 1000)
    // @ts-ignore
    this.audio.currentTime = this.$refs.audio.currentTime

    if (this.audio.paused === true) {
      this.audio.paused = false
    }
  }

  /** 暂停音乐 */
  private pauseMusic(): void {
    // @ts-ignore
    this.$refs.audio.pause()
    this.timer && clearInterval(this.timer)
    if (this.audio.paused === false) {
      this.audio.paused = true
    }
  }

  /** 播放结束 */
  onended() {}

  /** 操作当前时间播放时间改变 */
  handleCurrentTimeChange(val: number) {
    console.log('xxx val: ', val)
    // @ts-ignore
    this.$refs.audio.currentTime = +val
  }

  /** 播放失败 */
  onerror() {
    this.$message.error('加载失败，请重试！')
    this.pauseMusic()
  }
}
</script>

<style>
.el-popover.palylist-popper {
  width: 500px;
  padding: 0 !important;
  top: 150px !important;
  left: auto !important;
  bottom: 50px;
  right: 0 !important;
  margin: 0 !important;
  border-right: none !important;
  border-bottom: none !important;
  /* box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1); */
  box-shadow: -10px -10px 12px 0 rgba(0, 0, 0, 0.1) !important;
  /* box-shadow: h-shadow v-shadow blur spread color inset; */
}
</style>
