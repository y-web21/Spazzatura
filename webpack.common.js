const path = require('path');

module.exports = {
  context: path.join(__dirname, "src"),
  entry: [
    './index.js',
    './holder.min.js',
    './main.js',
    './common.js',
    // './scss/style.scss',
    './scss/spazzatura.scss'
  ],
  output: {
    path: path.join(__dirname, "dest"),
    filename: './main.js',
    clean: {
      keep: /.*.html/, // 出力先削除後にビルドソース出力の対象外
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
        //   // translates CSS into CommonJS modules
          loader: 'css-loader',
        },
        {
          // Run postcss actions
          loader: 'postcss-loader',
          options: {
            // postcss plugins, can be exported to postcss.config.js
            plugins:function () { // postcss plugins, can be exported to postcss.config.js
              return [
                require('autoprefixer')
              ];
            }
          }
        },
        {
          loader: 'sass-loader' // compiles Sass to CSS
        }]
      },
    ],
  },
};