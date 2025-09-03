module.exports = {
  source: ['./src/assets/tokens/**/*.json'],
  platforms: {
    scss: {
      transformGroup: 'scss',
      buildPath: './src/assets/scss/',
      prefix: 'unnnic',
      files: [
        {
          destination: 'spacing.scss',
          format: 'scss/variables',
          filter: {
            type: 'size',
          },
        },
      ],
    },
  },
};
