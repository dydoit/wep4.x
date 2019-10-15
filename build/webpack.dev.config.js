const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
module.exports = merge(baseConfig,{
  devtool: '#cheap-eval-source-map',
  devServer: {
    hot: true,
    compress: true
  }
})
