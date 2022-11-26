const path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    './index.js',
    './holder.min.js',
    './main.js',
    './common.js'
  ],
  output: {
    path: path.join(__dirname, "dest"),
    clean: {
      keep: /.*.html/, // 出力先削除後にビルドソース出力の対象外
    },
  },
  module: {
    rules: [
    ],
  },
};
