const path = require('path')
const config = require('./config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const ExtractTextPlugin = require('extract-text-webpack-plugin') webpack4不推荐使用这个去打包样式文件
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
process.env.NODE_ENV = 'development'
const spinner = ora('building for production...')
spinner.start()
const webpackConfig = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/main.js'
  },
  output: {
    publicPath: 'http://www.cdn.cn', // 如果静态文件放在cdn的话
    path: config.build.assetsRoot,
    filename: '[name].[hash:8].js'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader'
          },
          {
            loader: 'sass-loader'
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit:10000,
              name: '[name].[hash:6].[ext]',
              outputPath: 'static/img'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['app']
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css'
    }),
    new OptimizeCSSPlugin()
  ]
}
webpack(webpackConfig, (err, stats) => {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false, // If you are using ts-loader, setting this to true will make TypeScript errors show up during build.
    chunks: false,
    chunkModules: false
  }) + '\n\n')
  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit()
  }
  console.log(chalk.cyan('  Build complete.\n'))
  process.exit()
})
