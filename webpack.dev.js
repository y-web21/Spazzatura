const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  module: {
    options: {
      sourceMap: true,
    },
  },
  watch: true,
  watchOptions:{
    ignored: /node_modules/
  },
  devtool: "hidden-source-map",
  module: {
    rules: [],
  },
});
