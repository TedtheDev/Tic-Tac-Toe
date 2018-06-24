'use strict';

const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('bundle.css');

module.exports = {
  entry: ['./src/index.js', './style/scss/styles.scss'],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    rules:[
      {
        test: /\.js$/,
        use: [{
          loader: 'babel-loader',
          options: {
            presets: ["react", "es2015", "stage-1"]
          }
        }]
      },
      {
        test: /\.scss$/,
        use: extractCSS.extract({
          use: [{
                loader: "css-loader"
              },{
                loader: "postcss-loader",
                options: {
                  plugins: (loader) => [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-cssnext')(),
                    require('cssnano')()
                  ]
                }
              },{
                loader: "sass-loader"
              }]
        })
      }
    ]
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  plugins: [
    extractCSS,
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
      'env.host': process.env.NODE_DEV === 'production' && 'https://tic-tac-toe-socketio.herokuapp.com' || 'http://localhost:3050'
    })
  ]
};
