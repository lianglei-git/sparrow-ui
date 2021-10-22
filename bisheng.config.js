const path = require('path');
const isDev = process.env.NODE_ENV === 'development';

const {ESBuildMinifyPlugin} = require('esbuild-loader');
const TerserPlugin = require('terser-webpack-plugin');
module.exports = {
  source: './components',
  hash: true,
  theme: './site/theme',
  port: 8000,
  htmlTemplate: './site/theme/static/index.html',
  themeConfig: {},
  webpack(config) {
    config.resolve.alias = {
      'sparrow-ui': path.resolve('./', 'components'),
      'sparrow-ui/es': path.resolve(process.cwd(), 'components'),
      'site': path.resolve(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter'
    }
    config.externals = {
      'react-router-dom': 'ReactRouterDom'
    }
    if (isDev) {
      config.devtool = 'source-map'
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': require.resolve('react')
      }
    }else if (process.env.ESBUILD) {
      config.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true
        }),
        new TerserPlugin()
      ]
     
    } 
    console.log(path.resolve('./', 'components'))
    return config
  }
};