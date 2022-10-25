const path = require('path')
const Ug = require('uglifyjs-webpack-plugin')
process.env.NODE_ENV = "production"
module.exports = {
    target: "node",
    mode: process.env.NODE_ENV,
    node: {
        __dirname: false,
        // global: {
        //     'process.env.NODE_ENV':  'production'
        // }
        
    },
    entry: path.resolve(__dirname, './entry.js'),
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
    externals: {
      design: 'design',
    },  
    module: {
        rules: [
            {
                test: /\.node$/,
                loader: 'node-loader'
            },
            {
                test: /\.tsx?$/,
                loader: 'esbuild-loader',
                options: {
                  loader: 'ts', // Or 'ts' if you don't need tsx
                  target: 'es2015',
                },
              },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/g,
                use: {
                    loader: 'babel-loader',
                    options: {
                      cacheDirectory: true,
                      presets: ['@babel/preset-env'],
                      plugins: [
                        '@babel/plugin-transform-modules-commonjs',
                        '@babel/plugin-transform-runtime',
                        'transform-remove-strict-mode',
                        // ['@babel/plugin-proposal-decorators', { 'legacy': true }]
                      ]
                    }
                  }
            }
        ]
    },
    // plugins: [
    //     new Ug()
    // ],
    optimization: {
        minimize: false
    }
}