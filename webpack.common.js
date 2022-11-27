const path = require('path');

/** @type {import('webpack').Configuration} */
module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    './index.js',
    './holder.min.js',
    './main.js',
    './common.js',
  ],
  output: {
    path: path.join(__dirname, "dist"),
    filename: path.join("js", 'main.js'),
    clean: {
      keep: /.*.(html|css|jpg)/, // 出力先削除後にビルドソース出力の対象外
    },
  },
  module: {
    rules: [
      {
        test: /\.(scss)$/,
        use: [
          {
            // inject CSS to page
            loader: 'style-loader',
          },
          {
            // translates CSS into CommonJS modules
            loader: 'css-loader',
            options: {
              sourceMap: true
            },
          },
          {
            // Run postcss actions
            loader: 'postcss-loader',
            options: {
              // postcss plugins, can be exported to postcss.config.js
              plugins: function () { // postcss plugins, can be exported to postcss.config.js
                return [
                  require('autoprefixer')
                ];
              }
            }
          },
          {
            // compiles Sass to CSS
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
      },
    ],
  },
  // target: ["web", "es5"], トランスパイル向けの設定
};
