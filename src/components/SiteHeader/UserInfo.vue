<!-- --------------------------------------
 * 头部用户姓名展示、注意，用户详细的的 Popver 组件不在这里做
 * @author zhoufei
 * @date 2020/1/20
-------------------------------------- --->
<template>
  <div class="user-info h-full" flex="cross:center">
    <!-- 用信息 -->
    <div flex="cross:center" v-if="profile">
      <el-avatar :size="22" :src="profile.avatarUrl"></el-avatar>
      <!-- 用户信息 Popover -->
      <el-popover popper-class="userinfo-popover" v-model="popoverVisible">
        <p class="ml-2 user-name" slot="reference">
          {{ profile.nickname }}
          <i class="arrow-down el-icon-caret-bottom"></i>
        </p>

        <!-- 用户信息详细面板 -->
        <div style="width:280px;">
          <div style="padding:16px;">
            <div flex="cross:center main:justify">
              <span flex="cross:center">
                <router-link
                  :to="`/user/${profile.userId}`"
                  @click.native="hiddenPopover"
                >
                  <el-avatar :size="44" :src="profile.avatarUrl"></el-avatar>
                </router-link>
                <router-link
                  :to="`/user/${profile.userId}`"
                  @click.native="hiddenPopover"
                >
                  <span>{{ profile.nickname }}</span>
                </router-link>
              </span>
              <el-button size="mini">签到</el-button>
            </div>
            <div flex="cross:center main:justify" class="text-center tc">
              <span>
                <strong>{{ profile.eventCount }}</strong>
                <p>动态</p>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                <strong>{{ profile.follows }}</strong>
                <p>关注</p>
              </span>
              <el-divider direction="vertical"></el-divider>
              <span>
                <strong>{{ profile.followeds }}</strong>
                <p>粉丝</p>
              </span>
            </div>
          </div>

          <ul>
            <div></div>
            <li class="menu border" flex="cross:center main:justify">
              <span> <i class="el-icon-bangzhu"></i>会员中心 </span>
              <span class="menu-right">
                未认购
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>

            <li class="menu" flex="cross:center main:justify">
              <span> <i class="el-icon-medal"></i>等级 </span>
              <span class="menu-right">
                <strong>
                  <em>LV.{{ userInfo.level }}</em>
                </strong>
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>

            <li class="menu" flex="cross:center main:justify">
              <span> <i class="el-icon-shopping-cart-1"></i>商城 </span>
              <span class="menu-right">
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>

            <li class="menu border" flex="cross:center main:justify">
              <span> <i class="iconfont icon-setting"></i>个人信息设置 </span>
              <span class="menu-right">
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>

            <li class="menu" flex="cross:center main:justify">
              <span> <i class="iconfont icon-shouji"></i>绑定社交账号 </span>
              <span class="menu-right">
                <i class="icon-weibo"></i>
                <i class="icon-weixin"></i>
                <i class="el-icon-arrow-right"></i>
              </span>
            </li>

            <li
              class="menu border"
              flex="cross:center main:justify"
              style="padding-top:6px;padding-bottom:6px;"
              @click="handleLogout"
            >
              <span> <i class="el-icon-switch-button"></i>退出登录 </span>
            </li>
          </ul>
        </div>
      </el-popover>
    </div>

    <div flex="cross:center" v-else>
      <el-avatar :size="22" :src="require('@/assets/img/logo.jpg')"></el-avatar>
      <!-- 用户信息 Popover -->
      <p class="ml-2 user-name" @click="loginVisible = true">
        未登陆
        <i class="arrow-down el-icon-caret-bottom"></i>
      </p>
    </div>

    <el-button
      type="text"
      style="font-size:14px;"
      v-if="profile && profile.vipType === 0"
      >开通VIP</el-button
    >
    <!-- 皮肤 -->
    <Skin />
    <!-- 邮箱 -->
    <el-badge :value="2">
      <el-button type="text" icon="icon-youxiang iconfont"></el-button>
    </el-badge>
    <!-- 设置 -->
    <router-link to="/setting">
      <el-button
        type="text"
        class="icon-setting iconfont"
        title="设置"
      ></el-button>
    </router-link>
    <Login v-if="loginVisible" @close="loginVisible = false" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
// import UserInfo from '@/components/UserInfo/index.vue'
import Skin from './Skin.vue'
import Login from '@/components/Login/index.vue'
import { Profile, UserInfo } from '@/types'
import { clearLoginInfo } from '@/utils'

@Component({
  components: {
    // UserInfo,
    Skin,
    Login
  }
})
export default class HeaderUserInfo extends Vue {
  private loginVisible: boolean = false
  private popoverVisible: boolean = false

  get userInfo(): UserInfo | null {
    return this.$store.state.userInfo
  }

  get profile(): Profile | null {
    return this.userInfo ? this.userInfo.profile : null
  }

  created() {
    const { profile } = this
    if (profile) this.getUserInfo()
  }

  async getUserInfo() {
    const userInfo = await this.$http.get(
      '/user/detail?uid=' + this.userInfo.profile.userId + '&_t=' + Date.now()
    )

    this.$store.commit('UPDAE_userInfo', userInfo)
  }

  handleLogout() {
    this.$http.get('/logout').then(res => {
      clearLoginInfo()
      this.$store.commit('UPDAE_userInfo', null)
      setTimeout(() => {
        window.location.reload()
      })
    })
  }

  hiddenPopover() {
    this.popoverVisible = false
  }
}
</script>

<style lang="scss">
.userinfo-popover {
  &.el-popover {
    background: #fafafa;
    padding: 0;
  }

  .menu {
    height: 36px;
    line-height: 36px;
    padding-left: 16px;
    padding-right: 0;
    box-sizing: content-box;
    cursor: pointer;
    color: #333;
    i {
      margin-right: 14px;
      color: #999;
    }
    &-right {
      color: #999;
      i {
        margin-right: 6px;
        color: #ccc;
      }
    }
    &.border {
      border-top: 1px solid #ddd;
    }
    &:hover {
      background: #ebeced;
      border-top-color: #ebeced;
    }
  }
}
</style>
