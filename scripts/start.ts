const WebpackDevServer = require('webpack-dev-server')

const baseConfig = require('../config/webpack.config.js')

const { resolve } = require('path')

const Webpack = require('webpack')

const compiler = Webpack(baseConfig('development'))

const devServerOptions = {
    static: {
        directory: resolve(__dirname, '../','site/theme/static'),
        watch: true,
    },
    compress: true,
    hot: true,
    open: true,
    client: {
        progress: true,
      },
    port: 8080,
    proxy: {
        '/': {
            target: 'http://localhost:8080/', secure: false,
            bypass: function (req: any) {//, res:any, proxyOptions:any
                if (req.headers.accept.indexOf('html') !== -1) {
                    console.log('Skipping proxy for browser request.');
                    return '/index.html';
                }
            },
        }
    }
}

const server = new WebpackDevServer(devServerOptions, compiler)

// module.exports = merge(baseConfig('development'), {
//     devServer: {
//         static: {
//             directory: resolve(__dirname, '../site/theme/static'),
//             watch: true,
//         },
//         compress: true,
//         hot: true,
//         open: true,
//         // transportMode: 'ws',
//         port: 8080,
//         proxy: {
//             '/': {
//                 target: 'http://localhost:8080/', secure: false,
//                 bypass: function (req: any) {//, res:any, proxyOptions:any
//                     if (req.headers.accept.indexOf('html') !== -1) {
//                         console.log('Skipping proxy for browser request.');
//                         return '/index.html';
//                     }
//                 },
//             }
//         }
//     }
// })


server.startCallback(() => {
    console.log("Starting server on http://localhost:8080");
  });
