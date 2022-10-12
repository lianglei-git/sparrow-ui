const path = require('path');
const isDev = process.env.NODE_ENV === 'development';
const themeConfig = require('./themeConfig')
const { ESBuildMinifyPlugin } = require('esbuild-loader');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const WorkboxPlugin = require('workbox-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin')

// 2022-10-11 把pwa弄完 manifest还没有弄

module.exports = {
  source: {
    components: './components',
    docs: './docs',
  },
  hash: false,
  theme: './site/theme',
  port: 8000,
  root: '/',
  htmlTemplate: './site/theme/static/index.html',
  themeConfig,
  webpackConfig(config) {
    config.resolve.alias = {
      'sparrow-ui': path.resolve('./', 'components'),
      'sparrow-ui/es': path.resolve(process.cwd(), 'components'),
      'site': path.resolve(process.cwd(), 'site'),
      'react-router': 'react-router/umd/ReactRouter'
    }
    config.resolve.modules.push(path.resolve('./', 'components'),'node_modules')
    config.externals = {
      'react-router-dom': 'ReactRouterDom'
    }
    // 请详细参考文档 https://webpack.docschina.org/guides/progressive-web-application/
    const SW = new WorkboxPlugin.GenerateSW({
      clientsClaim: true,
      skipWaiting: true,
      additionalManifestEntries: ['index.js', 'index.html'],
      // include: [/index\.js$/]
      // manifestEntries: [path.resolve(__dirname, './site/theme/static/manifest.json')]
    })
    config.plugins.push(SW)


    // config.module.rules.push({
    //     test: /\.(png|jpg|gif|eot|woff|ttf|svg|webp|PNG)(\?\S*)?$/,
    //     use: [
    //       { loader: "file-loader", options: { esModule: false, limit: 10240 } },
    //     ],
    // });
    if (isDev) {
      config.devtool = 'source-map'
      config.resolve.alias = {
        ...config.resolve.alias,
        'react': require.resolve('react')
      }
    } else /** if (process.env.ESBUILD) */ {
      config.optimization.minimizer = [
        new ESBuildMinifyPlugin({
          target: 'es2015',
          css: true
        }),
        new TerserPlugin(),
        // new OptimizeCssAssetsPlugin({ // 压缩css
        //   assetNameRegExp: /\.css$/g,
        //   cssProcessor: require('cssnano'),
        //   cssProcessorPluginOptions: {
        //     preset: ['default', { discardComments: { removeAll: true } }],
        //   },
        //   canPrint: true
        // })
      ];
      config.plugins.push(new CopyPlugin(
      {patterns : [
        {
          from: path.resolve(__dirname, './site/theme/static/img'),
          to: path.resolve(__dirname, './_site/')
        },
        {
          from: path.resolve(__dirname, './site/theme/static/manifest.json'),
          to: path.resolve(__dirname, './_site/manifest.json')
        },
      ]}
      ))
    }


    config.optimization.splitChunks =
    {
      chunks: 'async', 
      minSize: 20000,
      minRemainingSize: 0, 
      minChunks: 1, 
      maxAsyncRequests: 30, 
      maxInitialRequests: 30, 
      enforceSizeThreshold: 50000,
      cacheGroups: { 
        defaultVendors: {
          test: /[\/]node_modules[\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    }
    return config
  },
  devServerConfig: {
    public: process.env.DEV_HOST || 'localhost',
    disableHostCheck: !!process.env.DEV_HOST,
  },

  htmlTemplateExtraData: {
    isDev,
  },
};