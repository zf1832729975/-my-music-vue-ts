<!-- --------------------------------------
 * 歌曲列表
 * @author zhoufei
 * @date 2020/3/12
-------------------------------------- --->
<template>
  <el-table
    :data="playlist.tracks"
    stripe
    border
    @row-dblclick="handleRowDBClick"
  >
    <el-table-column label="" width="50px" :resizable="false" align="right">
      <template slot-scope="scope">
        {{ (scope.$index + 1) | zeroize }}
      </template>
    </el-table-column>

    <el-table-column label="操作" width="80px" :resizable="false">
      <template>
        <el-button type="text" icon="icon-xihuan"></el-button>
        <el-button type="text" icon="icon-xiazai"></el-button>
      </template>
    </el-table-column>
    <el-table-column label="音乐标题" prop="name" sortable></el-table-column>
    <el-table-column label="歌手" prop="ar[0].name">
      <template slot-scope="{ row }">
        {{ row.ar | artistJoin }}
      </template>
    </el-table-column>
    <el-table-column label="专辑" prop="al.name" sortable> </el-table-column>
    <el-table-column label="时长" prop="dt" width="80px" sortable>
      <template slot-scope="{ row }">
        {{ row.dt | toTime }}
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { Iplaylist, Iartist, Itrack } from '@/types'

@Component({
  filters: {
    artistJoin(arr: Array<Iartist>) {
      return arr.map(item => item.name).join('/')
    }
  }
})
export default class Template extends Vue {
  @Prop({}) playlist!: Iplaylist

  /** 某一行被双击 */
  handleRowDBClick(row: Itrack, column: object, event: Event) {
    console.log(' row: ', row)
    this.$bus.$emit('play-music', row)
  }
}
</script>
