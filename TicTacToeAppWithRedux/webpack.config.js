const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCSS = new ExtractTextPlugin('bundle.css');

const extractCommons = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons.js',
  filename: 'commons.js'
})

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
    extractCSS
  ]
};
