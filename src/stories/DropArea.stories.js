import { action } from '@storybook/addon-actions';
import UnnnicDropArea from '../components/DropArea/DropArea.vue';

const events = {
  'onUpdate:currentFiles': action('update:currentFiles'),
  onFileChange: action('fileChange'),
  onUnsupportedFormat: action('unsupportedFormat'),
  onExceededTheMaximumFileSizeLimit: action('exceededTheMaximumFileSizeLimit'),
};

export default {
  title: 'Example/DropArea',
  component: UnnnicDropArea,
  argTypes: {
    acceptMultiple: { control: 'boolean' },
    supportedFormats: { control: 'text' },
    maxFileSize: { control: 'number' },
    shouldReplace: { control: 'boolean' },
    currentFiles: { control: 'object' },
    maximumUploads: { control: 'number' },
    subtitle: { control: 'text' },
    onFileChange: { control: 'function' },
  },
  parameters: {
    controls: {
      exclude: Object.keys(events),
    },
  },
  args: {
    ...events,
    acceptMultiple: true,
    supportedFormats: '*',
    maxFileSize: undefined,
    shouldReplace: false,
    currentFiles: [],
    maximumUploads: 1,
    subtitle: '',
  },
};

const Template = (args) => ({
  components: { UnnnicDropArea },

  setup() {
    return { args };
  },

  template: `
    <UnnnicDropArea v-bind="args" />
  `,
});

const TemplateWithTitleAndSubtitleSlots = (args) => ({
  components: { UnnnicDropArea },

  setup() {
    return { args };
  },

  template: `
    <UnnnicDropArea v-bind="args">
      <template #title>Title Slot</template>
      <template #subtitle>Subtitle Slot</template>
    </UnnnicDropArea>
  `,
});

export const Default = Template.bind({});
Default.args = {};

export const WithTitleAndSubtitleSlots = TemplateWithTitleAndSubtitleSlots.bind(
  {},
);
WithTitleAndSubtitleSlots.args = {};
