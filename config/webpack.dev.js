const { merge } = require('webpack-merge');
const webpack = require('webpack');
const path = require('path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..'),
    hot: true,
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
});
