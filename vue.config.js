/*
 * @Descripttion: vue配置文件
 * @version:
 * @Author: TJ
 * @Date: 2021-03-24 13:44:33
 * @LastEditors: XJ
 * @LastEditTime: 2022-03-29 17:07:57
 */
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const __production =
  process.env.NODE_ENV == 'production' ||
  process.env.NODE_ENV == 'foreign' ||
  process.env.NODE_ENV == 'renpan' ||
  process.env.NODE_ENV == 'jinfu_use'
// const __production = false
// const __test = process.env.NODE_ENV === 'test'
const __timeStamp = new Date().getTime()
module.exports = {
  // 应用的架设路径，CLI默认你的项目部署在域名的根目录下所以publicPath默认为/
  publicPath: '/',
  //配置二级目录
  // 当运行 vue-cli-service build 时生成的生产环境构建文件的目录
  outputDir: 'dist',
  // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  assetsDir: 'assets',
  // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。
  indexPath: 'index.html',
  // 默认情况下，生成的静态资源在它们的文件名中包含了 hash 以便更好的控制缓存。
  filenameHashing: true,
  // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建
  productionSourceMap: false,
  // 如果你需要基于环境有条件地配置行为，或者想要直接修改配置，那就换成一个函数 (该函数会在环境变量被设置之后懒执行)。
  // 删除无效的插件 减小体积，避免加载多余的资源
  chainWebpack: config => {
    config.plugins.delete('prefetch-admin')
  },
  configureWebpack: config => {
    // 生产环境相关配置
    if (__production) {
      // 代码压缩
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            //生产环境自动删除 console
            warnings: false,
            compress: {
              // warnings: false, // 若打包错误，则注释这行
              drop_debugger: true, //默认为 true（清除 debugger 语句）
              drop_console: true, //drop_console 默认为 false（不清除console语句）
              pure_funcs: ['console.log']
            }
          },
          sourceMap: false,
          //使用多进程并行运行来提高构建速度
          parallel: true
        })
      )
      // 配置gzip压缩   "compression-webpack-plugin": "^5.0.1",
      // config.plugins.push(
      // 	...[
      // 		new CompressionWebpackPlugin({
      // 			filename: `[path].gz[query]`,
      // 			algorithm: 'gzip',
      // 			test: /\.(js|css|html|svg)$/i,
      // 			threshold: 10240, //大于10240才压缩
      // 			minRatio: 0.8,
      // 			deleteOriginalAssets: true,
      // 		}),
      // 	]
      // )
    }
    config.output.filename = `js[name].${__timeStamp}.js`
    config.output.chunkFilename = `js[name].${__timeStamp}.js`
    // config.resolve.alias.set('vue-i18n', 'vue-i18n/dist/vue-i18n.cjs.js')//并没有解决报错
  },
  // configureWebpack: config => {
  // 	// 打包编译后修改 js 文件名
  // },
  devServer: {
    open: false,
    disableHostCheck: false,
    host: 'localhost',
    port: 8080,
    https: false,
    hotOnly: false,
    proxy: {
      [process.env.VUE_APP_QIHONG_URL]: {
        target: process.env.VUE_APP_QIHONG_TARGET_URL, // 对应自己的 跨域地址 即请求的后端地址
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          [`^${process.env.VUE_APP_QIHONG_URL}`]: '/'
        }
      }
    }
  }
}
