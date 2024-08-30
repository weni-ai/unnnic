import UnnnicChartRainbow from '../components/ChartRainbow/ChartRainbow.vue';

export default {
  title: 'Charts/ChartRainbow',
  component: UnnnicChartRainbow,
  tags: ['autodocs'],
  argTypes: {
    modelValue: { control: { type: 'number', min: 0, max: 100, step: 0.1 } },
    description: { control: 'text' },
  },
};

export const Default = {
  args: {
    modelValue: 50,
    description: 'Description',
  },
};
