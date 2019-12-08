const webpackBaseConfig = require('./webpack.config.base')

const webpackProdConfig = Object.assign({
  // 开发模式
  mode: 'production'
}, webpackBaseConfig)

module.exports = webpackProdConfig