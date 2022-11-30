const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');


/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'production',

  output: {
    publicPath: "auto"
  },
  resolve: {
    alias: {
      appConf$: path.resolve(__dirname, 'conf/production.js'),
    },
  },
});
