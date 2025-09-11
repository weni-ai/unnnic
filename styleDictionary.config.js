module.exports = {
  source: ['./src/assets/tokens/**/*.json'],
  hooks: {
    filters: {
      fonts: (token) => {
        const isFont = token.path.at(0) === 'font';
        return isFont;
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
          destination: 'fonts.scss',
          format: 'scss/variables',
          filter: 'fonts',
        },
        {
          destination: 'spaces.scss',
          format: 'scss/variables',
          filter: 'spaces',
        },
        {
          destination: 'radii.scss',
          format: 'scss/variables',
          filter: 'radii',
        },
        {
          destination: 'shadows.scss',
          format: 'scss/variables',
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
