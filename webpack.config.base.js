const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const webpackBaseConfig = {
  // 入口
  entry: {
    // 多页面多入口
    index: [
      path.resolve(__dirname, './app/typescript/index.ts'),
      path.resolve(__dirname, './app/scss/index.scss')
    ],
    login: [
      path.resolve(__dirname, './app/typescript/login.ts'),
      path.resolve(__dirname, './app/scss/login.scss')
    ],
    registry: [
      path.resolve(__dirname, './app/typescript/registry.ts'),
      path.resolve(__dirname, './app/scss/registry.scss')
    ],
    detail: [
      path.resolve(__dirname, './app/typescript/detail.ts'),
      path.resolve(__dirname, './app/scss/detail.scss')
    ],
  },
  // 出口
  output: {
    // 输出文件的路径
    path: path.resolve(__dirname, './dist'),
    // 输出文件名
    filename: 'js/[name].js', // 可以定义js文件路径
    // 代码分离：异步导入模块的文件名
    chunkFilename: '[name].bundle.js',
  },
  optimization: {
    // 代码分离: 抽离公共依赖部分(第三方库/框架)
    splitChunks: {
      chunks: 'all',
      // 缓存组
      cacheGroups: {
        // 抽离第三方库
        vendors: {
            // 指定是node_modules下的第三方包
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            // 可以定义第三方库文件路径
            filename: 'js/[name].bundle.js',
            // 抽取优先级
            priority: -10
        },
        // utilCommon: {   // 抽离自定义工具库
        //     name: "common",
        //     minSize: 0,     // 将引用模块分离成新代码文件的最小体积
        //     minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
        //     priority: -20
        // }
      }
    }
  },
  // 配置解析
  resolve: {
    // 查找模块
    extensions: ['.ts', '.scss', '.js', '.json']
  },
  // loader列表
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.ts$/,
        // 排除转译node_modules目录，加快转译速度
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'ts-loader'
        ]
      }
    ]
  },
  // 插件列表
  plugins: [
    // 清除输出文件目录
    new CleanWebpackPlugin(),
    // 从bundle中分离css文件
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: '[id].css',
    }),
    // 插入css和js到模板
    new HtmlWebpackPlugin({
      // 指定哪些入口被插入到模板中
      chunks: ['vendors', 'index'],
      // 配置输出的文件名
      filename: 'index.html',
      // 配置文件模板
      template: path.resolve(__dirname, './app/views/index.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['vendors', 'login'],
      filename: 'login.html',
      template: path.resolve(__dirname, './app/views/login.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['vendors', 'registry'],
      filename: 'registry.html',
      template: path.resolve(__dirname, './app/views/registry.html')
    }),
    new HtmlWebpackPlugin({
      chunks: ['vendors', 'detail'],
      filename: 'detail.html',
      template: path.resolve(__dirname, './app/views/detail.html')
    }),
  ]
}

module.exports = webpackBaseConfig