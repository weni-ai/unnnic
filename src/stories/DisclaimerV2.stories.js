import UnnnicDisclaimerV2 from '../components/Disclaimer/DisclaimerV2.vue';

export default {
  title: 'Example/DisclaimerV2',
  component: UnnnicDisclaimerV2,
  argTypes: {
    type: {
      control: { type: 'select' },
      options: ['informational', 'success', 'attention', 'error', 'neutral'],
    },
    showTitle: { control: { type: 'boolean' } },
    showDescription: { control: { type: 'boolean' } },
  },
};

const Template = (args) => ({
  components: { UnnnicDisclaimerV2 },
  setup() {
    return { args };
  },
  template: '<UnnnicDisclaimerV2 v-bind="args" />',
});

export const Default = Template.bind({});
Default.args = {
  title: 'Disclaimer',
  description: 'The quick brown fox jumps over the lazy dog',
  type: 'informational',
  showTitle: true,
  showDescription: true,
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

export const Error = Template.bind({});
Error.args = {
  ...Default.args,
  type: 'error',
};

export const Neutral = Template.bind({});
Neutral.args = {
  ...Default.args,
  type: 'neutral',
};

