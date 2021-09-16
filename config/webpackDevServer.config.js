const path = require('path')
// module.exports = {
//     devServer: {
//         // contentBase: path.join(__dirname, '../site'),
//         static: {
//             directory: path.join(__dirname, '../public'),
//         },
//         client: {
//             progress: true,
//         },
//         compress: true,
//         port: 9000,
//     },
// }


module.exports = function() {
    return {
        compress: true,
        clientLogLevel: 'none',
        contentBase: '../site',
        watchContentBase: true,
        hot: true,
        transportMode: 'ws',
    }
}