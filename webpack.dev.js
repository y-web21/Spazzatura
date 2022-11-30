const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

/** @type {import('webpack').Configuration} */
module.exports = merge(common, {
  mode: 'development',
  watch: true,  // dev sever には不要な設定
  watchOptions:{
    ignored: /node_modules/
  },
  devtool: ['source-map', "inline-source-map", "hidden-source-map"][0],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    hot: true,
    open: true,
    port: 8080,
    // host: '0.0.0.0', // docker を使うならデフォルトルートを設定する
    watchFiles: ['src/**/*', 'dist/**/*html'],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      appConf$: path.resolve(__dirname, 'conf/development.js'),
    },
  },
});
