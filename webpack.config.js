'use strict';

const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: {
    app: './src/index.js',
    styles: './style/scss/styles.scss'
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist/',
    filename: '[name].bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [{
          loader: 'babel-loader',
        }]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ]
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    mode: 'development'
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].bundle.css',
      chunkFilename: '[id].bundle.css'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'env.host': process.env.NODE_ENV === 'production' && '"https://tic-tac-toe-socketio.herokuapp.com"' || '"http://localhost:3050"'
    })
  ]
};