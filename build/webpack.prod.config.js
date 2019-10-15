const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ora = require('ora')
const chalk = require('chalk')
const webpack = require('webpack')
process.env.NODE_ENV = 'development'
const spinner = ora('building for production...')
spinner.start()
const webpackConfig = merge(baseConfig, {
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[hash].css'
    }),
    new OptimizeCSSPlugin()
  ]
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
