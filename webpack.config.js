const path = require('path');
const dotenv = require('dotenv').config().parsed;
const isDev = dotenv.NODE === 'development'
const mode = isDev ? 'development' : 'production';

console.info(`webpack mode is ${mode}`)

module.exports = {
  mode: mode,
  module: {
    options: {
      sourceMap: isDev,
    },
  },
  watch: isDev,
  watchOptions:{
    ignored: /node_modules/
  },
  context: path.join(__dirname, "src"),
  entry: [
    './index.js',
    './holder.min.js',
    './main.js',
    './common.js'
  ],
  output: {
    path: path.join(__dirname, "dest"),
    filename: path.join("js", 'common.js'),
    clean: {
      keep: /.*.html/, // 出力先削除後にビルドソース出力の対象外
    },
  },
  devtool: "hidden-source-map",
  module: {
    rules: [
    ],
  },
};
