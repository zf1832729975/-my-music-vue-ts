<!-- --------------------------------------
 * 播放列表
 * @author zhoufei
 * @date 2020/1/22
-------------------------------------- --->
<template>
  <div>
    播放列表
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  components: {}
})
export default class PlayList extends Vue {
  created() {
    console.log('this.$route', this.$route)
  }
}
</script>
