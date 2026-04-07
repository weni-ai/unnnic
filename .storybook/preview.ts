import { setup } from '@storybook/vue3';
import { withThemeByClassName } from '@storybook/addon-themes';

import i18n from '../src/utils/plugins/i18n';
import '../src/assets/scss/tailwind.scss';
import '../src/assets/scss/unnnic.scss';
import './theme.scss';

export default {
  parameters: {
    docs: {
      toc: true,
    },
  },
  decorators: [
    withThemeByClassName({
      themes: {
        light: '',
        dark: 'dark',
      },
      defaultTheme: 'light',
      parentSelector: 'html',
    }),
  ],
};

setup((app) => {
  app.use(i18n);
});
