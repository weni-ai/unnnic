const StyleDictionary = require('style-dictionary');

StyleDictionary.default.registerFormat({
  name: 'scss/mixin',
  format: function(options) {
    let mixin = '';

    options.allTokens.forEach(({ name, value }) => {
      mixin += `@mixin ${name} {\n`;
      mixin += `  ${value}\n`;
      mixin += '}\n';
    });

    return mixin;
  }
});

module.exports = {
  source: ['./src/assets/tokens/**/*.json'],
  hooks: {
    filters: {
      texts: (token) => {
        const isText = token.path.at(0) === 'text';
        return isText;
      },
    },
  },
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
        {
          destination: 'texts.scss',
          format: 'scss/mixin',
          filter: 'texts',
        },
      ],
    },
  },
};
