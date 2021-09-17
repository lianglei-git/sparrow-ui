// serve 服务文件
const DevServer = require('webpack-dev-server')
const {merge} = require('webpack-merge')
const baseConfig = require('../config/webpack.config.js')
const {resolve} = require('path')

module.exports = merge(baseConfig('development'), {
    devServer: {
        static: {
            directory: resolve( __dirname, '../site/theme/static'),
            watch: true,
          },
        compress: true,
        hot: true,
        open:true,
        // transportMode: 'ws',
        port: 8080,
        proxy: {
            '/': { target: 'http://localhost:8080/',secure: false,
            bypass: function (req:any) {//, res:any, proxyOptions:any
                if (req.headers.accept.indexOf('html') !== -1) {
                  console.log('Skipping proxy for browser request.');
                  return '/index.html';
                }
              },
        }
        }
    }
})

// var server = new DevServer()

