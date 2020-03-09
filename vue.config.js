const HtmlWebpackPlugin = require('html-webpack-plugin')
const themesEntry = require('./theme.config')
const webpack = require('webpack')

console.log(' process.env.IS_WEB: ', process.env.IS_WEB)

module.exports = {
  baseUrl: process.env.NODE_ENV === 'production' ? './' : '/', // 部署应用包时的基本 URL
  // webpack配置
  configureWebpack: {
    entry: {
      app: './src/main.ts',
      ...themesEntry
      // theme: ['./src/assets/themes/red/index.scss']
    },
    plugins: [
      process.env.NODE_ENV === 'production'
        ? new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/prod.html',
            inject: false, // 是否注入，默认值为true
            // minify: {
            //   // 默认值为 false, 不压缩
            //   removeAttributeQuotes: true, // 去掉双引号
            //   removeComments: true, // 去掉注释
            //   collapseWhitespace: true, // 去掉空白
            //   minifyJS: true // 压缩js
            // }
            minify: {
              removeAttributeQuotes: false, // 去掉双引号
              removeComments: true, // 去掉注释
              collapseWhitespace: false, // 去掉空白
              minifyJS: false // 压缩js
            }
          })
        : new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/dev.html',
            inject: true
          }),

      new webpack.DefinePlugin({
        '$process': JSON.stringify({
          IS_WEB: !!process.env.IS_WEB
        })
      })
    ]
  },

  css: {
    sourceMap: true // 开启 CSS source maps
  }
}
