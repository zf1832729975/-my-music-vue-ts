# music-vue-ts--2

> Typescript + vue + axios + vuex + sass 

## Project setup
```
yarn install
```

### Compiles and hot-reloads for development
```
yarn serve
```

### Compiles and minifies for production
```
yarn build
```

### Lints and fixes files
```
yarn lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## electron 中安装的包
> yarn add -S express apicache crypto big-integer

## 代码规范、提交
> 不要分号，使用单引号，函数定义时括号前面不要空格
> 必须符合eslint规范才能提交、和standard规范差不多
> prettier husky lint-staged eslint

## 项目结构
```
|--_vue-ts-template 模板文件
  |--index.vue Vue模板文件（typescript）
|--src
  |--api 请求
  |--assets 静态文件、
      |--css css文件存放目录
      |--img 图片文件存放目录
      |--themes 主题配置文件目录
          |--red 红色主题
              |--_varibale.scss 变量文件、
              |--element-ui.scss element-ui 样式文件
              |--index.scss 自己写的样式文件
          |--blue 蓝色主题
  |--components 公共组件目录
  |--plugins 插件目录
  |--proxy 后端代理
  |--utis 工具库
  |--views 视图（页面）
      |--album 专辑页面
      |--common 公共页面
      |--discover 发现音乐页面
          |--album 发现音乐、专辑（最新音乐、新碟上架）
          |--artist 发现音乐==>歌手
          |--djradio 发现音乐==>主播电台、dj
          |--playlist 发现音乐==>歌单
          |--recommend 发现音乐==>推荐
          |--toplist    发现音乐==>排行榜
      |--mv MV视频页面
      |--playlist 播放列表页面
      |--song 歌曲页面、歌曲的详情
  |--App.vue
  |--background.ts electron.js 运行文件
  |--main.js Vue主入口
  |--router.ts 路由
|--.prettierrc.js  prettier 代码格式件配置文件
|--theme.config.js 主题配置文件

```