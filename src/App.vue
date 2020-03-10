<template>
  <div id="app">
    <router-view />
  </div>
</template>
<style lang="scss">
@import '~@/assets/css/flex.css';
@import '~@/assets/css/base.scss';
.icon-loading2,
.icon-loading {
  animation: loading-rotate 2s linear infinite;
  &.big {
    font-size: 32px;
    line-height: 1.5;
    animation-duration: 1.2s;
  }
}
body .el-button--text {
  // color: #606266;
}
#app .el-table--mini td {
  padding: 3px 0;
}
#app .el-table--mini td {
  padding: 0;
}
</style>
