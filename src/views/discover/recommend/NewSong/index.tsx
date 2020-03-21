/**
 * 最新音乐、绑定的专辑
 * @author zhoufei
 * @date 2020/3/15
 */
import { Component, Vue } from 'vue-property-decorator'
import { State } from 'vuex-class'
import { Image, Row, Col } from 'element-ui'
import { Audio, Song } from '@/types'
import { getNewSongs } from '@/api'
import { zeroize } from '@/utils'

import './index.scss'

@Component
export default class NewSong extends Vue {
  private list: Song[] = []

  // vuex
  @State('audio') audio!: Audio

  created() {
    this.getNewSongs()
  }

  // methods
  private getNewSongs() {
    getNewSongs().then(res => {
      if (Array.isArray(res.data)) {
        // 多余的不要，减小内存开销
        this.list = res.data.slice(0, 10)
      }
    })
  }

  private handlePlayMusic(song: Song) {
    this.$bus.$emit('play-music', song)
  }

  protected render() {
    const getColumn = function(vm: NewSong, list: Song[], initIndex: number = 0) {
      return list.map((item, index) => {
        return (
          <li
            flex
            flex="cross:center"
            on-dbclick={() => vm.handlePlayMusic(item)}
            class={{
              'song-item': true,
              'is-active': vm.audio.id === item.id
            }}
          >
            <div class="index">
              {vm.audio.id === item.id ? (
                <el-button type="text">
                  {/* 暂停中 */
                    vm.audio.paused ? (
                      <i class="iconfont icon-jingyin1"></i>
                    ) : (
                    /* 在播放中 */
                      <i class="iconfont icon-shengyin"></i>
                    )}
                </el-button>
              ) : (
                <span>{zeroize(initIndex + index)}</span>
              )}
            </div>
            <div class="song-image" on-click={() => vm.handlePlayMusic(item)}>
              <Image src={item.album.picUrl}></Image>
              <i class="play-btn iconfont icon-bofang2"></i>
            </div>
            <div>
              <p class="song-name">{item.name}</p>
              <p>
                <i>SQ</i>
                <a
                  class="artist-name"
                  href={'#/artist?id=' + item.artists[0].id}
                >
                  {item.artists[0].name}
                </a>
              </p>
            </div>
          </li>
        )
      })
    }

    return (
      <div class="home-new-music">
        <Row class="song-list-row">
          <Col span={12}>{getColumn(this, this.list.slice(0, 5), 1)}</Col>
          <Col span={12}>{getColumn(this, this.list.slice(5, 10), 6)}</Col>
        </Row>
      </div>
    )
  }
}
