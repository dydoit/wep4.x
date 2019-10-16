const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const isProd = process.env.NODE_ENV === 'production'
const resolve = (dir) => {
    return path.join(__dirname, '..', dir)
}
module.exports = {
    mode: 'development',
    devtool: "source-map",
    devServer: {
        hot: true
    },
    entry: {
        app: './src/test.js'
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: '[name].js'
    },
    resolve: {
        extensions: ['.js', '.vue', '.json']
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
                include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
                loader: 'babel-loader',
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
                test:/\.styl(us)?$/,
                use: [isProd? MiniCssExtractPlugin.loader: 'vue-style-loader', {
                  loader: 'css-loader',
                  options: {
                    importLoaders: 2
                  }
                }, 'postcss-loader', 'stylus-loader']
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


