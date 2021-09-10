var path = require('path');

module.exports = {
    mode: "development",
    entry:  path.join(__dirname, './build.js'),
    output: {
        path: path.join(__dirname, '../dist'),
    },
  //...
  devServer: {
    // contentBase: path.join(__dirname, '../site'),
    static: {
        directory: path.join(__dirname, '../public'),
    },
    client: {
        progress: true,
      },
    compress: true,
    port: 9000,
  },
};