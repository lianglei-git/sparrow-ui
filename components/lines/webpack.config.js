

const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const MineCssExtractPlugin=require('mini-css-extract-plugin')
const webpack = require('webpack'); 
const path = require('path')
module.exports = {
  entry: './index.ts',
  mode: "development",
  output: {
    path: path.resolve(__dirname, '__dist'),
    filename: 'temp.js',
    clean: true,
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MineCssExtractPlugin.loader,
          'css-loader',
          'sass-loader'
        ]

      }, {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          },
          // [sass-loader](/loaders/sass-loader)
          { loader: 'sass-loader' }
        ]
      },
      { test: /\.ts$/, use: 'ts-loader' },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader'
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  devServer: {
    static: './__dist',
    hot: true,
  },
  plugins: [
    new MineCssExtractPlugin({
      filename:'[name].css'
    }),
    new HtmlWebpackPlugin({ template: './public/index.html' }),
    new webpack.ProgressPlugin(),

    
  ],
}