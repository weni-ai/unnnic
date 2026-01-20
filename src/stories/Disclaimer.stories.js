import UnnnicDisclaimer from '../components/Disclaimer/Disclaimer.vue';

export default {
  title: 'Feedback/Disclaimer',
  component: UnnnicDisclaimer,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['informational', 'success', 'attention', 'error', 'neutral'],
    },
  },
};

const Template = (args) => ({
  components: { UnnnicDisclaimer },
  setup() {
    return { args };
  },
  template: '<UnnnicDisclaimer v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Disclaimer',
  description: 'The quick brown fox jumps over the lazy dog',
  type: 'informational',
};

export const Success = Template.bind({});
Success.args = {
  ...Default.args,
  type: 'success',
};

export const Attention = Template.bind({});
Attention.args = {
  ...Default.args,
  type: 'attention',
};

export const ErrorState = Template.bind({});
ErrorState.args = {
  ...Default.args,
  type: 'error',
};

export const Neutral = Template.bind({});
Neutral.args = {
  ...Default.args,
  type: 'neutral',
};

export const OnlyTitle = Template.bind({});
OnlyTitle.args = {
  ...Default.args,
  description: '',
};

export const OnlyDescription = Template.bind({});
OnlyDescription.args = {
  ...Default.args,
  title: '',
};

const TemplateWithDescriptionSlot = (args) => ({
  components: { UnnnicDisclaimer },
  setup() {
    return { args };
  },
  template:
    '<UnnnicDisclaimer v-bind="args"><template #description>This is a slot description with a <a href="https://example.com">link</a></template></UnnnicDisclaimer>',
});

export const WithDescriptionSlot = TemplateWithDescriptionSlot.bind({});
WithDescriptionSlot.args = {
  ...Default.args,
};
