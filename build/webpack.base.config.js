const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename:'[name].[hash:6].js',
    publicPath: '/'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options:{
            compilerOptions: {
              preserveWhitespace: false
            }
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use:{
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options:{
            limit:10000,
            name: '[name]_[hash:7].[ext]',
            outputPath: 'static/img'
          }
        }
      },
      {
        test: /\.(scss|sass|css)$/,
        use: [isProd? MiniCssExtractPlugin.loader: 'vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2 // 详见webpack官网
          }
        }, 'postcss-loader', 'sass-loader']
      },
      {
        test:/\.styl(us)?$/,
        use: [isProd? MiniCssExtractPlugin.loader: 'vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'stylus-loader']
      },
      {
        test: /\.less$/,
        use: [isProd? MiniCssExtractPlugin.loader: 'vue-style-loader', {
          loader: 'css-loader',
          options: {
            importLoaders: 2
          }
        }, 'postcss-loader', 'less-loader']
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options:{
              limit: 10000,
              name: '[name]_[hash:7].[ext]',
              outputPath: 'static/media'
            }
          }
        ]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: '[name]_[hash:7].[ext]',
          outputPath: 'static/fonts'
        }
      },

    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
      chunks: ['app']
    })
  ]
}
