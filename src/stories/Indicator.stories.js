import unnnicIndicator from '../components/Indicator/Indicator.vue';

export default {
  title: 'Example/Indicator',
  component: unnnicIndicator,
  argTypes: {
    steps: { control: { type: 'number' } },
    current: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicIndicator },
  template: '<unnnic-indicator v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  steps: 3,
  current: 2,
  names: ['Indicator-1', 'Indicator-2', 'Indicator-3'],
};
