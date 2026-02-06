/**
 * Converts HEX to HSL
 * @param {string} hex - Color in hexadecimal format (#RRGGBB)
 * @returns {string} - Color in HSL format (h s% l%)
 */
function hexToHSL(hex) {
  hex = hex.replace('#', '');

  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);

  let h,
    s,
    l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic color
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return `${h} ${s}% ${l}%`;
}

export default {
  source: ['./src/assets/tokens/**/*.json'],
  hooks: {
    filters: {
      colors: (token) => {
        const isColor = token.path.at(0) === 'color';
        return isColor;
      },
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
        const isShadow =
          token.path.at(0) === 'shadow' && isNumber(token.path.at(1));
        return isShadow;
      },
      iconSizes: (token) => {
        const isNumber = (element) => !isNaN(element);
        const isIconSize =
          token.path.at(0) === 'icon-size' && isNumber(token.path.at(1));
        return isIconSize;
      },
    },
    formats: {
      'scss/hsl-variables': (dictionary) => {
        return (
          `\n// Do not edit directly, this file was auto-generated.\n\n` +
          dictionary.allTokens
            .map((token) => {
              const name = token.name.replace(/_/g, '-');
              const hslValue = hexToHSL(token.value);
              return `$${name}-hsl: ${hslValue}; /* ${token.value} */`;
            })
            .join('\n') +
          `\n`
        );
      },
      'typescript/es6-declarations': (dictionary) => {
        return (
          `// Do not edit directly, this file was auto-generated.\n\n` +
          dictionary.allTokens
            .map((token) => {
              const name = token.name;
              return `export declare const ${name}: string;`;
            })
            .join('\n') +
          `\n`
        );
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
          destination: 'colors.scss',
          format: 'scss/variables',
          filter: 'colors',
        },
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
        {
          destination: 'colors-hsl.scss',
          format: 'scss/hsl-variables',
          filter: 'colors',
        },
      ],
    },
    js: {
      transforms: ['attribute/cti', 'name/camel', 'size/rem', 'color/hex'],
      buildPath: './dist/tokens/',
      files: [
        {
          destination: 'colors.mjs',
          format: 'javascript/es6',
          filter: 'colors',
        },
        {
          destination: 'colors.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'colors',
        },
        {
          destination: 'fonts.mjs',
          format: 'javascript/es6',
          filter: 'fonts',
        },
        {
          destination: 'fonts.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'fonts',
        },
        {
          destination: 'spaces.mjs',
          format: 'javascript/es6',
          filter: 'spaces',
        },
        {
          destination: 'spaces.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'spaces',
        },
        {
          destination: 'radii.mjs',
          format: 'javascript/es6',
          filter: 'radii',
        },
        {
          destination: 'radii.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'radii',
        },
        {
          destination: 'shadows.mjs',
          format: 'javascript/es6',
          filter: 'shadows',
        },
        {
          destination: 'shadows.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'shadows',
        },
        {
          destination: 'icon-sizes.mjs',
          format: 'javascript/es6',
          filter: 'iconSizes',
        },
        {
          destination: 'icon-sizes.d.ts',
          format: 'typescript/es6-declarations',
          filter: 'iconSizes',
        },
      ],
    },
  },
};
