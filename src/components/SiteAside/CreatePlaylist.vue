<!-- --------------------------------------
 * 创建歌单
 * @author zhoufei
 * @date 2020/9/18
-------------------------------------- --->
<template>
  <el-popover
    placement="right"
    width="265"
    title="新建歌单"
    trigger="click"
    v-model="visible"
  >
    <div style="padding:14px 8px 6px;">
      <el-input placeholder="请输入新建歌单标题" v-model="name"></el-input>
      <p style="margin-top:10px;margin-bottom:50px;">
        <el-checkbox v-model="isPrivacy"></el-checkbox>&nbsp;设置为隐私歌单
      </p>
      <div class="tc">
        <el-button type="primary" :disabled="!name" @click="handleConfirm">
          创建
        </el-button>
        <el-button @click="close">取消</el-button>
      </div>
    </div>

    <i class="el-icon-circle-plus-outline" slot="reference"></i>
  </el-popover>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class CreatePlaylist extends Vue {
  private name: string = ''
  private isPrivacy: boolean = false
  private visible: boolean = false

  handleConfirm() {
    this.createPlaylistSubmit(this.name, this.isPrivacy)
  }

  close() {
    this.name = ''
    this.isPrivacy = false
    this.visible = false
  }

  /**
   * 创建歌单
   * name: 歌单名、
   * isPrivacy：设置成隐私歌单
   */
  async createPlaylistSubmit(name: string, isPrivacy: boolean) {
    const privacy = isPrivacy ? '10' : undefined
    await this.$http({
      url: '/playlist/create',
      params: { privacy, name }
    })
    setTimeout(() => {
      this.close()
      this.$emit('change')
    }, 100)
  }
}
</script>
