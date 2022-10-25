// babel.config.js
module.exports = {
    presets: [
      ['@babel/preset-env', {targets: {node: 'current'}}],
      '@babel/preset-typescript',
      ['@babel/preset-react',{ "modules": 'cjs',  extensions: ['.js', '.jsx', '.ts', '.tsx']}],
      // ["latest", {
      //   "es2015": {
      //     "modules": false
      //   }
      // }]
      // ["es2015", { "modules": false }]
    ],
    // filename: './'
    // "plugins": ["@babel/transform-runtime"]
  };
  