const webpackBaseConfig = require('./webpack.config.base')

const webpackDevConfig = Object.assign({
  // 开发模式
  // mode: 'development',
  // 开发服务器
  devServer: {
    contentBase: './dist',
    index: 'index.html',
    open: true,
    openPage: 'index.html',
    port: 9000
  },
}, webpackBaseConfig)

module.exports = webpackDevConfig