//HTML Webpack Plugin config
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const HTMLWebpackPluginConfig = new HtmlWebpackPlugin({
  template: __dirname + '/app/index.html',
  filename: 'index.html',
  inject: 'body'
});

//webpack modules, entry, output
module.exports = {
  entry: [
    './app/index.js'
  ],
  output: {
    filename: "index_bundle.js",
    path: __dirname + '/dist'
  },
  module: {
    loaders: [
      {test: /\.jsx?$/, exclude: /node_modules/, loader: "babel-loader"},
    ]
  },
  plugins: [HTMLWebpackPluginConfig]
};
