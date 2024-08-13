import UnnnicDropArea from '../components/DropArea/DropArea.vue';

const events = {
  'update:currentFiles': { action: 'update:currentFiles' },
  fileChange: { action: 'fileChange' },
  unsupportedFormat: { action: 'unsupportedFormat' },
  exceededTheMaximumFileSizeLimit: { action: 'exceededTheMaximumFileSizeLimit' },
};

function getterEvents() {
  return Object.keys(events)
    .reduce(
      (previous, current) => (
        { ...previous, [current]: this.$props[current] }
      ), {},
    );
}

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
    ...events,
  },
  args: {
    acceptMultiple: true,
    supportedFormats: '*',
    maxFileSize: undefined,
    shouldReplace: false,
    currentFiles: [],
    maximumUploads: 1,
    subtitle: '',
  },
};

const Template = (_args, { argTypes }) => ({
  components: { UnnnicDropArea },

  props: Object.keys(argTypes),

  computed: {
    events: getterEvents,
  },

  template: `
    <UnnnicDropArea v-bind="$props" v-on="events" />
  `,
});

const TemplateWithTitleAndSubtitleSlots = (_args, { argTypes }) => ({
  components: { UnnnicDropArea },

  props: Object.keys(argTypes),

  computed: {
    events: getterEvents,
  },

  template: `
    <UnnnicDropArea v-bind="$props" v-on="events">
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
