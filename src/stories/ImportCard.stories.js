import i18n from '../utils/plugins/i18n';
import unnnicImportCard from '../components/ImportCard/ImportCard.vue';

export default {
  title: 'Example/ImportCard',
  component: unnnicImportCard,
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicImportCard },

  template: '<unnnic-import-card v-bind="$props" />',
  i18n,
});

export const Default = Template.bind({});
Default.args = {
  title: 'file.txt',
  subtitle: 'file.txt',
  importProgress: 24,
  isImporting: true,
  canImport: true,
  canDelete: true,
  acceptedFormats: '.txt',
};
