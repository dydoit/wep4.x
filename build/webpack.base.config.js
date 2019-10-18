const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const resolve = (dir) => {
  return path.join(__dirname, '..', dir)
}
module.exports = {
  entry: {
    app: './src/main.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename:'static/js/[name].[hash:6].js'
    // publicPath: ''  //可用来配置cdn地址
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
        include: [resolve('src')],
        use: ['babel-loader']
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
    new VueLoaderPlugin()
  ],
  optimization: {
    usedExports: true
  }
}
