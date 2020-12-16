// vue.config.js
module.exports = {
  configureWebpack: {
    optimization: {
      splitChunks: false,
    },
  },
  css: {
    extract: false,
  },
};
