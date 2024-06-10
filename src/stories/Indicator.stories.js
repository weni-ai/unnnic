import UnnnicIndicator from '../components/Indicator/Indicator.vue';

export default {
  title: 'Example/Indicator',
  component: UnnnicIndicator,
  argTypes: {
    numberOfSteps: { control: { type: 'number' } },
    currentStep: { control: { type: 'number' } },
  },
};

export const Default = {
  args: {
    numberOfSteps: 3,
    currentStep: 2,
    titles: ['Indicator-1', 'Indicator-2', 'Indicator-3'],
  },
};
