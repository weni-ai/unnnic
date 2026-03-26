import { setup } from '@storybook/vue3';

import i18n from '../src/utils/plugins/i18n';
import '../src/assets/scss/tailwind.scss';
import '../src/assets/scss/unnnic.scss';

export default {
  parameters: {
    docs: {
      toc: true,
    },
  },
};

setup((app) => {
  app.use(i18n);
});
