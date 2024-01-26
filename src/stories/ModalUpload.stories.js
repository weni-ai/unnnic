import i18n from '../utils/plugins/i18n';
import unnnicModalUpload from '../components/ModalUpload/ModalUpload.vue';

import { setup } from '@storybook/vue3';

setup((app) => {
  app.use(i18n);
});

export default {
  title: 'example/ModalUpload',
  component: unnnicModalUpload,
  argTypes: {},
};

export const Default = {
  render: (args) => ({
    components: { unnnicModalUpload },
    setup() {
      return { args, files: [] };
    },
    template: '<unnnic-modal-upload v-bind="args" v-model="files" />',
  }),
  args: {},
};
