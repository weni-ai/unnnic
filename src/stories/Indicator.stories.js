import unnnicIndicator from '../components/Indicator/Indicator.vue';

export default {
  title: 'Example/Indicator',
  component: unnnicIndicator,
  argTypes: {
    numberOfSteps: { control: { type: 'number' } },
    currentStep: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicIndicator },
  template: '<unnnic-indicator v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  numberOfSteps: 3,
  currentStep: 2,
  titles: ['Indicator-1', 'Indicator-2', 'Indicator-3'],
};
