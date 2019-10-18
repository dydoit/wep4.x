const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
const path = require('path')
const fs = require('fs')
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const spinner = ora('building for production...')
const plugins = [
  new CleanWebpackPlugin(),
  new MiniCssExtractPlugin({
    filename: 'static/css/[name].[contenthash].css'
  }),
  new OptimizeCSSPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: './index.html',
    inject: true,
    minify:{
      removeComments: true,
      collapseWhitespace: true,
      removeAttributeQuotes: true
    }
  }),
  new webpack.HashedModuleIdsPlugin()
]
const files = fs.readdirSync(path.resolve(__dirname, '../dll'))
files.forEach(file => {
  if(/.*\.dll.js/.test(file)) {
    plugins.push(
      new AddAssetHtmlPlugin({ // 把dll里的文件copy过来，同时在html文件上生成script
        filepath: path.resolve(__dirname, '../dll', file),
        outputPath: 'static/js',
        publicPath: 'static/js' 
      })
    )
  }
  if(/.*\.manifest.json/.test(file)) {

    plugins.push(
      new webpack.DllReferencePlugin({ // 用来把import进来的第三方库路径导到已经打包好了的dll库，避免再次编译打包
        manifest: path.resolve(__dirname, '../dll', file)
      })
    )
  }
})
spinner.start()
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  module: {
    rules: [
      {
        test:/\.styl(us)?$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins,
  optimization: {
    runtimeChunk: {
      "name": "manifest"
    },
    splitChunks: { // 开启代码分割可以分割同步引入的第三方js，异步加载的第三方库即使不设置这个也会自动分割打包
      chunks: 'all'
    }
  }
})
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
