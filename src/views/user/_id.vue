<!-- --------------------------------------
 * 用户信息
 * @author zhoufei
 * @date 2020/3/15
-------------------------------------- --->
<template>
  <div class="user" v-if="userInfo">
    <div class="clearfix user-top-pane">
      <img class="user-avatar-pic fl" :src="profile.avatarUrl" />
      <div class="user-top-pane-right">
        <div class="user-title-row" flex="cross:center main:justify">
          <h1 class="user-nickname" flex="cross:center">
            {{ profile.nickname }}&nbsp;

            <!-- gender: 1男 | 2女 -->
            <i
              class="user-gender-icon iconfont icon-xingbienan"
              v-if="profile.gender === 1"
              style="color:#3080cc"
            ></i>
            <i
              class="user-gender-icon iconfont icon-229yonghu_xingbienv"
              style="color:#e494d2;transform: rotate(45deg);"
              v-else
            ></i>
            &nbsp;
            <em class="user-grade">Lv.{{ userInfo.level }}</em>
          </h1>
          <div>
            <el-button icon="iconfont icon-youxiang1">发私信</el-button>
            <el-button icon="el-icon-plus">关注</el-button>
            <el-button icon="el-icon-more"> </el-button>
          </div>
        </div>

        <div class="user-count" flex="cross:center">
          <span>
            <p>{{ profile.eventCount }}</p>
            动态
          </span>
          <span>
            <p>{{ profile.follows }}</p>
            关注
          </span>
          <span>
            <p>{{ profile.followeds }}</p>
            粉丝
          </span>
        </div>

        <div>
          <!-- <p>社交网络：{{}}</p> -->
          <!-- <p>所在地区：{{profile.xx}}</p> -->
          <p>个人介绍：{{ profile.signature }}</p>
        </div>
      </div>
    </div>

    <!-- 歌单 -->
    <div>
      <hr color="#e1e1e2" />
      <p>歌单</p>
      <hr color="#e1e1e2" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { UserInfo } from '@/types'
@Component
export default class User extends Vue {
  private userInfo: UserInfo = null

  get userId() {
    return this.$route.params.id
  }

  get profile() {
    return this.userInfo && this.userInfo.profile
  }

  @Watch('userId', { immediate: true })
  // 获取用户详情
  async getUserInfo() {
    const userInfo: UserInfo = await this.$http.get(
      '/user/detail?uid=' + this.userId + '&_t=' + Date.now()
    )
    console.log('获取用户详情 userInfo: ', userInfo)
    this.userInfo = userInfo
  }
}
</script>

<style lang="scss">
.user {
  &-top-pane {
    padding: 20px 24px;
    &-right {
      margin-left: 220px;
    }
  }
  &-avatar-pic {
    $w: 200px;
    height: $w;
    width: $w;
    border: 1px solid #ccc;
  }
  &-title-row {
    padding-bottom: 10px;
    border-bottom: 1px solid #ddd;
  }
  &-nickname {
    font-size: 18px;
    font-weight: 500;
    color: #333;
  }
  &-gender-icon {
    font-size: inherit;
  }
  &-grade {
    font-size: 12px;
    border-radius: 16px;
    line-height: 1;
    display: inline-block;
    padding: 2px 6px;
    color: #c62f2f;
    border: 1px solid #c62f2f;
    font-weight: bold;
  }
}
</style>
