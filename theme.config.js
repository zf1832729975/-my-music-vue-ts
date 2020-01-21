/**
 * 主题配置文件
 * @author zhoufei
 * @date 2020/1/21
 */

/* @example 导出示例
module.exports = {
  // 主题名(对应的主题目录的目录名)： 入口路径
  red: './src/assets/themes/red/theme.less',
  //red: ['./src/assets/themes/red/theme.less'],
  blue: ['./src/assets/themes/blue/theme.less', './src/assets/themes/blue/theme.less']
}
*/

const fs = require('fs')
const path = require('path')

const defaultTheme = 'red' // 默认主题
const themesPath = './src/assets/themes' // 主题路径
const themes = {}
const themesEntry = {}

function resolveTheme(...dir) {
  return path.resolve(__dirname, themesPath, ...dir)
}

readThemesConfig()

function readThemesConfig() {
  let themeNames = fs.readdirSync(themesPath)
  themeNames.forEach(themeName => {
    _getThemeConfig(themeName, 'element-ui.scss') // 先加载 element-ui 主题、这样有些同级的样式好覆盖
    _getThemeConfig(themeName, 'index.scss')

  })
}

function _getThemeConfig(themeName, fileName) {
  let lessPath = resolveTheme(themeName, `${fileName}`)
  if (fs.existsSync(lessPath)) {
    if (!(themes[themeName] instanceof Array)) themes[themeName] = []
    themes[themeName].push(lessPath)
  } else {
    throw new Error(`主题 “${themeName}” 没有${fileName}文件，没有找到 ${lessPath} `)
  }
}

if (process.env.NODE_ENV === 'production') {
  // 生产环境
  const arr = (process.env.THEMES || defaultTheme).split(',')
  arr.forEach(themeName => {
    if (themes[themeName]) {
      themesEntry[themeName] = themes[themeName]
    }
  })
} else {
  let devThemeName = process.env.THEME || defaultTheme
  if (!themes[devThemeName])
    throw new Error(`没有找到主题 “${devThemeName}”，通过修改环境变量来改当前调试主题`)

  // 开发环境 element-ui 入口和自己写的样式文件入口分离、加快编译速度
  themesEntry['element-ui'] = themes[devThemeName][0]
  themesEntry[devThemeName] = themes[devThemeName][1]
}
console.log('主题')
console.log('--------------------------------------------')
console.log(themesEntry)
console.log('--------------------------------------------')
module.exports = themesEntry
