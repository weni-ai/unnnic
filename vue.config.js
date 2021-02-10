// vue.config.js
// const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
    plugins: [
      new CopyWebpackPlugin({
        patterns: [
          {
            to: 'scss',
            from: '**',
            context: 'src/assets/scss',
            globOptions: { ignore: ['.gitkeep', '**/.DS_Store', '**/Thumbs.db'], debug: 'warning' },
          },
        ],
      }),
    ],
  },
  css: {
    extract: true,
  },
};
