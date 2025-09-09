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
      spaces: (token) => {
        const isSpace = token.path.at(0) === 'space';
        return isSpace;
      },
      radii: (token) => {
        const isRadius = token.path.at(0) === 'radius';
        return isRadius;
      },
      shadows: (token) => {
        const isNumber = (element) => !isNaN(element);
        const isShadow = token.path.at(0) === 'shadow' && isNumber(token.path.at(1));
        return isShadow;
      },
      iconSizes: (token) => {
        const isNumber = (element) => !isNaN(element);
        const isIconSize = token.path.at(0) === 'icon-size' && isNumber(token.path.at(1));
        return isIconSize;
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
          destination: 'texts.scss',
          format: 'scss/mixin',
          filter: 'texts',
        },
        {
          destination: 'spaces.scss',
          format: 'scss/variables',
          filter: 'spaces',
        },
        {
          destination: 'radii.scss',
          format: 'scss/mixin',
          filter: 'radii',
        },
        {
          destination: 'shadows.scss',
          format: 'scss/mixin',
          filter: 'shadows',
        },
        {
          destination: 'icon-sizes.scss',
          format: 'scss/variables',
          filter: 'iconSizes',
        },
      ],
    },
  },
};
