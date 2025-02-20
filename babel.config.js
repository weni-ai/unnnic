module.exports = {
  presets: [
    [
      '@vue/cli-plugin-babel/preset',
      {
        targets: {
          chrome: '87.0.0',
          edge: '87.0.0',
          firefox: '84.0.0',
          ios: '13.3.0',
          safari: '13.1.0',
        },
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-optional-chaining'],
};
