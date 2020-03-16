<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import '~@/assets/css/flex.css';
@import '~@/assets/fonts/index.css';
@import '~@/assets/css/base.scss';
.icon-jiazaizhong,
.icon-jiazaizhong1,
.icon-loading2,
.icon-loading {
  animation: loading-rotate 2s linear infinite;
  &.big {
    font-size: 32px;
    line-height: 1.5;
    animation-duration: 1.2s;
  }
}
/*
.icon-jiazaizhong1:before {
  content: "\e6af";
}

.icon-jiazaizhong:before {
  content: "\e6ac";
}
.icon-loading:before {
  content: "\e6ab";
}

.icon-loading2:before {
  content: "\e6ae";
}
*/
/* .site-footer .progress .el-slider__button {
  border: none;
  // padding: 1px;
  border: 1px solid #ddd;
  height: auto;
  width: auto;
  font-family: "iconfont" !important;
  animation: loading-rotate 1s linear infinite;
  font-size: 12px;
  font-weight: 100;
  width: 14px;
  height: 14px;
  text-align: center;
  box-sizing: content-box;
  &:before {
    // content: "\e6ac";
    // content: "\e6ae";
    content: "\e6af";
  }
} */
#app .el-table--mini td {
  padding: 3px 0;
}
#app .el-table--mini td {
  padding: 0;
}
</style>
