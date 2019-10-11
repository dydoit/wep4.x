const path = require('path')
const config = require('./config')
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
    filename: '[name].js'
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

    ]
  },
  plugins: [
    
  ]
}