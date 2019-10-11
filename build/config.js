const path = require('path')
module.exports = {
  dev: {
    host: 'localhost',
    port: 8080,
    proxy: {
      
    }
  },
  build: {
    assetsRoot: path.resolve(__dirname, '../dist')
  }
}