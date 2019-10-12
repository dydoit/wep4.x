const path = require('path')
const config = require('./config')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: './src/main.js'
  },
  output: {
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
        use: []
      },
      {
        test: /\.(scss|sass|css)$/,
      //   use: ExtractTextPlugin.extract({
      //     fallback: 'style-loader',
      //     use: [
      //       {
      //         loader: 'css-loader'
      //       },
      //       {
      //         loader: 'postcss-loader'
      //       },
      //       {
      //         loader: 'sass-loader'
      //       }
      //     ],
      //  })
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {

            }
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
    // new ExtractTextPlugin({
    //   filename: 'static/css/[name].[hash].css',
    //   allChunks: true
    // }),
    new OptimizeCSSPlugin()
  ]
}
