<!-- --------------------------------------
 * 侧边栏组件
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <el-aside class="site-aside" :width="width">
    <el-scrollbar>
      <!-- 每一个卡片 推荐  -->
      <dl>
        <dt class="text">推荐</dt>
        <dd class="is-active">
          <i class="icon iconfont icon-yiliao"></i>
          <span class="text">发现音乐</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-VIP"></i>
          <span class="text">私人FM</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-zhibo-"></i>
          <span class="text">LOOK直播</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-video"></i>
          <span class="text">视频</span>
        </dd>
        <dd>
          <i
            class="icon iconfont icon-dilanxianxingiconyihuifu_huabanfuben"
          ></i>
          <span class="text">朋友</span>
        </dd>
      </dl>

      <!-- 每一个卡片 我的音乐 -->
      <dl>
        <dt class="text">我的音乐</dt>
        <dd>
          <i class="icon iconfont icon-yinlemusic214"></i>
          <span class="text">本地音乐</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-xiazai"></i>
          <span class="text">下载管理</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-yun"></i>
          <span class="text">我的音乐云盘</span>
        </dd>
        <dd>
          <i class="icon iconfont icon-shoucang"></i>
          <span class="text">我的收藏</span>
        </dd>
      </dl>

      <!-- 每一个卡片 创建的歌单 -->
      <dl>
        <dt class="text">
          <span class="fr right-btn">
            <!-- 新建歌单 -->
            <CreatePlaylist @change="getPlaylist" />
            <i
              class="el-icon-arrow-right arrow-icon"
              :class="{ folded: foldStatus.subscribed }"
              @click="foldStatus.subscribed = !foldStatus.subscribed"
            ></i>
          </span>
          创建的歌单
        </dt>
        <div v-show="!foldStatus.subscribed">
          <dd
            v-for="(playlist, index) in createPlaylist"
            :key="playlist.id"
            @click="handlePlaylistClick(playlist)"
            :class="{
              'is-active':
                $route.name === 'playlist' && playlist.id == $route.query.id
            }"
          >
            <template v-if="index === 0">
              <i class="icon iconfont icon-xihuan"></i>
              <span class="text">我喜欢的音乐</span>
            </template>
            <template v-else>
              <i
                class="icon iconfont"
                :class="
                  playlist.privacy === 10 ? 'icon-mima' : 'icon-yinleliebiao'
                "
              ></i>
              <span class="text">{{ playlist.name }}</span>
            </template>
          </dd>
        </div>
      </dl>

      <dl>
        <dt class="text">
          <span class="fr right-btn">
            <i
              class="el-icon-arrow-right arrow-icon"
              :class="{ folded: foldStatus.created }"
              @click="foldStatus.created = !foldStatus.created"
            ></i>
          </span>
          收藏的歌单
        </dt>
        <div v-show="!foldStatus.created">
          <dd
            v-for="playlist in subscribedPlaylist"
            :key="playlist.id"
            @click="handlePlaylistClick(playlist)"
            :class="{
              'is-active':
                $route.name === 'playlist' && playlist.id == $route.query.id
            }"
          >
            <i class="icon iconfont icon-yinleliebiao"></i>
            <span class="text">{{ playlist.name }}</span>
          </dd>
        </div>
      </dl>
    </el-scrollbar>
  </el-aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { State, Getter, Action, Mutation } from 'vuex-class'
import { UserInfo, Playlist } from '@/types'
import CreatePlaylist from './CreatePlaylist.vue'

@Component({
  components: { CreatePlaylist }
})
export default class SiteAside extends Vue {
  @Prop({ default: '200px' }) width!: string

  private playlist: Array<Playlist> = []
  /** 订阅/收藏的歌单 */
  private subscribedPlaylist: Array<Playlist> = []
  /** 创建的歌单 */
  private createPlaylist: Array<Playlist> = []
  get userInfo(): UserInfo {
    return this.$store.state.userInfo
  }

  // 折叠状态
  private foldStatus = {
    subscribed: false,
    created: false
  }

  created() {
    this.getPlaylist()
    // this.getUserInfo()
  }

  // 获取用户信息 , 歌单，收藏，mv, dj 数量
  async getUserInfo() {
    const res = await this.$http.get('/user/subcount')
    // console.log('获取用户信息 , 歌单，收藏，mv, dj 数量 res: ', res)
  }

  /** 获取歌单 */
  public async getPlaylist() {
    if (this.userInfo && this.userInfo.profile) {
      const res = await this.$http({
        url: '/user/playlist',
        params: {
          uid: this.userInfo.profile.userId,
          _t: Date.now() /* 取消缓存 */
        }
      })

      console.log('获取用户歌单 res: ', res)
      const playlist: Array<Playlist> = res.playlist
      const subscribedPlaylist: Array<Playlist> = (this.subscribedPlaylist = [])
      const createPlaylist: Array<Playlist> = (this.createPlaylist = [])
      playlist.map((item: Playlist) => {
        if (item.subscribed) {
          subscribedPlaylist.push(item)
        } else {
          createPlaylist.push(item)
        }
      })
    }
  }

  // 歌单click
  handlePlaylistClick(playlist: Playlist) {
    this.$router.push({ name: 'playlist', query: { id: playlist.id } })
  }
}
</script>
