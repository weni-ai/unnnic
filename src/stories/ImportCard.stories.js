import i18n from '../utils/plugins/i18n';
import UnnnicImportCard from '../components/ImportCard/ImportCard.vue';

import { setup } from '@storybook/vue3';

setup((app) => {
  app.use(i18n);
});

export default {
  title: 'Example/ImportCard',
  component: UnnnicImportCard,
  argTypes: {
    title: { control: { type: 'text' } },
    subtitle: { control: { type: 'text' } },
    importProgress: { control: { type: 'number' } },
    isImporting: { control: { type: 'boolean' } },
    canImport: { control: { type: 'boolean' } },
    canDelete: { control: { type: 'boolean' } },
    acceptedFormats: { control: { type: 'text' } },
  },
};
export const Default = {
  args: {
    title: 'file.txt',
    subtitle: 'file.txt',
    importProgress: 24,
    isImporting: true,
    canImport: true,
    canDelete: true,
    acceptedFormats: '.txt',
  },
};
