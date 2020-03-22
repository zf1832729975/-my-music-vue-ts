<!-- --------------------------------------
 * footer
 * @author zhoufei
 * @date 2020/1/28
-------------------------------------- --->
<template>
  <el-footer class="site-footer" height="70px" flex="cross:center">
    <!-- 播放按钮组 -->
    <div class="play-btn-group" flex-box="0">
      <el-button
        type="text"
        icon="iconfont icon-shangyishou1"
        @click="handlePreClick"
      >
      </el-button>
      <el-button type="text" @click="handlePlayBtnClick">
        <!-- 暂停中 -->
        <i v-if="audio.paused" class="iconfont icon-bofang" title="播放"></i>
        <!-- 播放中 -->
        <i v-else class="iconfont icon-iconstop" title="暂停"></i>
      </el-button>
      <el-button
        type="text"
        icon="iconfont icon-xiayishou1"
        @click="handleNextClick"
      >
      </el-button>
    </div>
    <!-- 进度条  -->
    <div class="progress" flex-box="1" flex="cross:center">
      <span class="progress-time">{{
        (audio.currentTime * 1000) | formatTime
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
        :disabled="audio.id <= 0"
      >
      </el-slider>
      <span class="progress-duration">{{
        (audio.duration * 1000) | formatTime
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
        <i
          v-if="audio.muted"
          class="iconfont icon-jingyin1"
          title="恢复音量"
        ></i>
        <i v-else class="iconfont icon-shengyin" title="静音"></i>
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
        @change="handleDragVolumeChange"
      >
      </el-slider>
    </div>

    <!-- 操作按钮组 -->
    <div class="opt-btn-group" flex="cross:center">
      <!-- 播放模式 -->
      <el-button
        type="text"
        @click="handleModeClick"
        :icon="'iconfont ' + palyMode[audio.modeIndex].icon"
        :title="palyMode[audio.modeIndex].title"
      >
      </el-button>

      <!-- -品质 -->
      <el-dropdown
        @command="audio.qualityIndex = $event"
        size="medium"
        placement="top"
      >
        <span class="el-dropdown-link">
          <el-button type="text" class="border">
            {{ qualityList[audio.qualityIndex].name }}
          </el-button>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item
            v-for="(item, index) in qualityList"
            :key="item.value"
            :disabled="qualityList[audio.qualityIndex].value === item.value"
            :command="index"
          >
            {{ item.name }}</el-dropdown-item
          >
        </el-dropdown-menu>
      </el-dropdown>

      <el-button type="text" icon="iconfont icon-suijibofang"> </el-button>

      <el-button type="text" class="border">
        词
      </el-button>
      <!-- 播放列表 -->
      <PlayListHistory />
    </div>
  </el-footer>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'
import { Slider } from 'element-ui'

// import PlayListHistory from './PlayListHistory.vue'
import PlayListHistory from './PlayListHistory/index.vue'
import { Track, Audio, HistoryTrack, PlayList, HistoryList } from '@/types'

let vm: Footer | null = null

@Component({
  components: {
    PlayListHistory
  },
  watch: {}
})
export default class Footer extends Vue {
  // @ts-ignore
  $refs: {
    audio: HTMLAudioElement
    playProgress: Slider
  }

  // data
  // 定时器
  private timer: any = null
  /** 播放模式 */
  private palyMode = [
    {
      icon: 'icon-icon-1',
      title: '顺序播放',
      name: 'XH',
      pre(vm: Footer) {
        vm.playIncrementMusic(-1)
      },
      next: function(vm: Footer) {
        vm.playIncrementMusic(+1)
      }
    },
    {
      icon: 'icon-suijibofang',
      title: '随机播放',
      name: 'SJ',
      pre(vm: Footer) {
        // 0~100 - 50
        // 比如 size 100 增量 0 ~ 100
        const len = vm.playList.length + 2
        const increment = parseInt(Math.random() * len + '')
        vm.playIncrementMusic(increment)
      },
      next: function(vm: Footer) {
        // 0~100 - 50
        const len = vm.playList.length + 2
        const increment = parseInt(Math.random() * len + '')
        vm.playIncrementMusic(increment)
      }
    },
    {
      icon: 'icon-danquxunhuan',
      title: '单曲循环',
      name: 'DQ',
      pre(vm: Footer) {
        vm.playIncrementMusic(0)
      },
      next: function(vm: Footer) {
        vm.playIncrementMusic(0)
      }
    }
  ]
  /** 品质 */
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
  /** 音频 */
  private audio: Audio = {
    // 音乐地址
    src: 'https://music.163.com/song/media/outer/url?id=557583031.mp3',
    // 当前时间
    currentTime: 0,
    // 持续时间、总长
    duration: 0,
    // 是否暂停
    paused: true,
    // 音量 0~1
    volume: 1,
    // 是否静音
    muted: false,
    id: 0,
    index: 0,
    modeIndex: 0,
    qualityIndex: 0
  }

  // vuex
  /** 获取默认的/存储的 audio，只第一次加载用 */
  @State('audio') getInitAudio!: Audio
  @State('playList') playList!: PlayList
  @State('currentPlayId') currentPlayId!: number
  @State('historyList') historyList!: HistoryList
  @Getter('currentMusic') currentMusic!: Track | object
  @Mutation('UPDATE_audio') updateAudio!: (audio: Audio) => void
  @Mutation('UPDATE_historyList')
  updateHistoryList!: (historyList: HistoryList) => void

  // watch
  @Watch('audio', { immediate: false, deep: true })
  audioChange(data: Audio) {
    this.updateAudio(data)
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
    this.$refs.audio.volume = val
  }
  @Watch('audio.muted')
  mutedChange(val: boolean) {
    this.$refs.audio.muted = val
  }

  // hook
  created() {
    vm = this
    this.audio = this.getInitAudio

    // 播放音乐、当传入 id <= 0 时停止播放
    this.$bus.$on('play-music', (song: Track) => {
      this.audio.id = song.id
      this.audio.currentTime = 0
      if (song.id <= 0) {
        this.audio.src = ''
        this.$nextTick(() => {
          this.pauseMusic()
        })
      } else {
        this.audio.src = `https://music.163.com/song/media/outer/url?id=${song.id}.mp3`
        // 确保 this.$refs.audio 变化
        this.$nextTick(() => {
          this.playMusic()
        })
      }
    })
    // 清空播放列表
    this.$bus.$on('clear-play-list', () => {})

    // 清空历史
    this.$bus.$on('clear-history-list', () => {})
  }

  destroyed() {
    this.$bus.$off('play-music')
  }

  //  methods

  /** 模式点击 */
  handleModeClick() {
    this.audio.modeIndex = (this.audio.modeIndex + 1) % this.palyMode.length
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
    console.log(' this.$refs: ', this.$refs)
    if (!this.audio.src) {
      return
    }
    this.timer && clearInterval(this.timer)
    this.$refs.audio.currentTime = this.audio.currentTime
    this.$refs.audio.play()

    const curId = this.audio.id
    const curIndex = this.audio.index
    const curTrack: Track | undefined = this.playList[curIndex]
    // 就是存在了也要重新存，确保是最新的排列
    if (curTrack) {
      const historyList = this.historyList.slice()
      // 就是在第一项，不用更改
      if (historyList[0] && historyList[0].id === curId) {
      } else {
        // 删除原来的
        let oldIndex: number = historyList.findIndex(
          item => item.id === curTrack.id
        )
        historyList.splice(oldIndex, 1)
        // 把最新的插入在前面
        historyList.unshift({
          ...curTrack,
          playDate: new Date()
        })
        this.updateHistoryList(historyList)
      }
    }
    if (this.audio.paused === true) {
      this.audio.paused = false
    }

    this.timer = setInterval(() => {
      const buffered = this.$refs.audio.buffered
      const arr = []
      for (let i = 0; i < buffered.length; i++) {
        arr.push([buffered.start(i), buffered.end(i)])
      }
      console.log(' arr: ', arr)
      console.log(' buffered: ', buffered)

      // 拖动的时候不能赋值 dragging
      // @ts-ignore
      if (this.$refs.playProgress && !this.$refs.playProgress.dragging) {
        this.audio.currentTime = this.$refs.audio.currentTime
      }
    }, 1000)
  }

  /** 暂停音乐 */
  private pauseMusic(): void {
    this.$refs.audio.pause()
    // 保存当前时间，播放的时候使用
    this.audio.currentTime = this.$refs.audio.currentTime

    this.timer && clearInterval(this.timer)
    if (this.audio.paused === false) {
      this.audio.paused = true
    }
  }

  /** 播放结束 */
  onended() {
    this.handlePreClick()
  }

  /** 操作当前时间播放时间改变 */
  handleCurrentTimeChange(val: number) {
    console.log('xxx val: ', val)
    this.$refs.audio.currentTime = +val
  }

  /** 播放失败 */
  onerror(event: Event) {
    console.log('音乐加载失败 event: ', event)
    if (this.audio.src) {
      this.$message.error('音乐加载失败，请检查你的网络！')
    }
    this.pauseMusic()
  }

  /** 播放一个 增量的 index */
  playIncrementMusic(increment: number = 0) {
    if (increment !== 0) {
      const index = this.playList.length + increment
      const newId = ids[newIndex]
      this.audio.id = newId
      this.audio.src = `https://music.163.com/song/media/outer/url?id=${newId}.mp3`
    }
    this.$nextTick(() => {
      this.audio.currentTime = 0
      this.playMusic()
    })
  }

  handlePreClick() {
    if (this.playList.length) this.palyMode[this.audio.modeIndex].pre(this)
  }

  handleNextClick() {
    if (this.playList.length) this.palyMode[this.audio.modeIndex].next(this)
  }
  /** 拖动声音改变 */
  handleDragVolumeChange(val: number) {
    this.audio.muted = !val
  }
}
</script>
