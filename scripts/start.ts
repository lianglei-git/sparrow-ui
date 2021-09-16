// serve 服务文件
const DevServer = require('webpack-dev-server')
const {merge} = require('webpack-merge')
const baseConfig = require('../config/webpack.config.js')


module.exports = merge(baseConfig('development'), {
    devServer: {
        static: {
            directory: '../site/index.html',
          },
        compress: true,
        // clientLogLevel: 'none',
        // contentBase: '../site',
        // watchContentBase: true,
        hot: true,
        // transportMode: 'ws',
        port: 9000,
    }
})

// var server = new DevServer()

