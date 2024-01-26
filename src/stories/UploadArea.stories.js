import i18n from '../utils/plugins/i18n';
import unnnicUploadArea from '../components/UploadArea/UploadArea.vue';

import { setup } from '@storybook/vue3';

setup((app) => {
  app.use(i18n);
});

export default {
  title: 'Form/UploadArea',
  component: unnnicUploadArea,
  argTypes: {
    acceptMultiple: { control: { type: 'boolean' } },
    supportedFormats: { control: { type: 'text' } },
    maximumUploads: { control: { type: 'number' } },
    filesProgress: { control: { type: 'array' } },
    isUploading: { control: { type: 'boolean' } },
    canImport: { control: { type: 'boolean' } },
    canDelete: { control: { type: 'boolean' } },
  },
};

export const Default = {
  render: (args) => ({
    components: { unnnicUploadArea },
    setup() {
      return { args, files: [] };
    },
    template: '<unnnic-upload-area v-bind="args" v-model="files" />',
  }),
  args: {
    acceptMultiple: true,
    supportedFormats: '.png,.jpeg',
    maximumUploads: 2,
    filesProgress: [20, 30, 40],
    isUploading: false,
    canImport: true,
    canDelete: true,
    maxFileSize: 10,
  },
};
