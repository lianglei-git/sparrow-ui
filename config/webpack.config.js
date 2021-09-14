const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

// 1. 单独打包components -- rollup 
// 2. 打包文档（React）然后把ui组件打包进去
// 3. 在文档里面启动调试服务
module.exports = function (webpackEnv) {
    const isEnvDevelopment = webpackEnv === 'development';
    const isEnvProduction = webpackEnv === 'production';

    return {
        mode: isEnvProduction ? 'production' : isEnvDevelopment && 'development',
        devtool: isEnvProduction ? false : 'source-map',
        entry: path.join(__dirname, '../site/index.ts '),
        output: { // 可能后续后续会打包react来用
            filename: '[name].bundle.js', // filename: '[name].[contenthash].bundle.js', (多入口)
            path: __dirname + 'dist',
            globalObject: 'this',
        },
        resolve: {
            extensions: ['.tsx', '.ts', '.js', 'jsx', '.mjs', '.cjs'],
            // modules,
            // extensions,
            alias: {
                'sparrow-ui': path.resolve(__dirname, '../', 'components/index.ts')
            },
            plugins:[
                PnpWebpackPlugin
            ]
        },
        resolveLoader: {
            plugins: [
              // Also related to Plug'n'Play, but this time it tells webpack to load its loaders
              // from the current package.
              PnpWebpackPlugin.moduleLoader(module),
            ],
          },
        module: {
            rules: [
                {
                    test: /\.[tsx | ts]?$/,
                    use: 'ts-loader',
                    exclude: /node_modules/,
                },
                {
                    test: /\.css$/, use: [
                        { loader: !isEnvProduction ? 'style-loader' : MiniCssExtractPlugin.loader },
                        {
                            loader: 'css-loader',
                            options: {
                                modules: true
                            }
                        },
                        { loader: 'postcss-loader' }
                    ]
                },
                { test: /\.ts$/, use: 'ts-loader' },
                { test: /\.s(a|c)ss$/, use: ['style-loader', 'css-loader', 'sass-loader'] },
                { test: /\.less$/, use: ['style-loader', 'css-loader', 'less-loader'] },
                {
                    test: /\.(png|jpg|gif)$/i,
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 8192,
                            }
                        },
                    ],
                    type: 'javascript/auto'
                },
            ]
        },
        optimization: {
            minimize: true,
            minimizer: [new TerserPlugin(),
            // assetNameRegExp：一个正则表达式，指示应优化\最小化的资产的名称。提供的正则表达式针对配置中
            // ExtractTextPlugin实例导出的文件的文件名运行，而不是源CSS文件的文件名。默认为/.css$/g
            // cssProcessor：用于优化\最小化CSS的CSS处理器，默认为cssnano。这应该是一个跟随
            // cssnano.process接口的函数（接收CSS和选项参数并返回一个Promise）。
            // cssProcessorOptions：传递给cssProcessor的选项，默认为 {}
            // cssProcessorPluginOptions：传递给cssProcessor的插件选项，默认为 {}
            // canPrint：一个布尔值，指示插件是否可以将消息打印到控制台，默认为 true

            new OptimizeCSSAssetsPlugin({ // 压缩css
                assetNameRegExp: /\.css$/g,
                cssProcessor: require('cssnano'),
                cssProcessorPluginOptions: {
                    preset: ['default', { discardComments: { removeAll: true } }],
                },
                canPrint: true
            }),],
            splitChunks: {
                chunks: 'all',
                name: isEnvDevelopment,
            },

            runtimeChunk: {
                name: entrypoint => `runtime-${entrypoint.name}`,
            },
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css',
            }),


        ]
    }
};