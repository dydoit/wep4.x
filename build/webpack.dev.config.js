const baseConfig = require('./webpack.base.config')
const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const portfinder = require('portfinder')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
const devWebpackConfig = merge(baseConfig, {
  mode: 'development',
  devtool: '#cheap-eval-source-map',
  devServer: {
    hot: true,
    compress: true,
    host: HOST || 'localhost',
    port: PORT || 8080,
    quiet: true, // 表示开启friendly 的打印提示
    publicPath: '/',
    proxy: {}, // 此处填接口地址重定向
    overlay: { warnings: false, errors: true },
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test:/\.styl(us)?$/,
        use: ['vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.(scss|sass|css)$/,
        use: ['vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.less$/,
        use: ['vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'less-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      inject: true
    }),
    new webpack.HotModuleReplacementPlugin()
  ]
})
module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || 8080
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        }
      }))
      resolve(devWebpackConfig)
    }
  })
})

