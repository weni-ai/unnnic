import { setup } from '@storybook/vue3';

import i18n from '../src/utils/plugins/i18n';
import DocsTemplate from './DocsTemplate.mdx';
import '../src/assets/scss/unnnic.scss';
import '../src/assets/scss/tailwind.scss';

export default {
  parameters: {
    docs: {
      page: DocsTemplate,
      toc: true,
    },
  },
};

setup((app) => {
  app.use(i18n);
});
