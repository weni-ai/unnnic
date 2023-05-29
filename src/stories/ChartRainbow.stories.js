import unnnicChartRainbow from '../components/ChartRainbow/ChartRainbow.vue';

export default {
  title: 'charts/ChartRainbow',
  component: unnnicChartRainbow,
  argTypes: {
    value: { control: { type: 'number', min: 0, max: 100, step: 0.1 } },
    description: { control: 'text' },
  },
};

export const Default = {
  args: {
    value: 50,
    description: 'Description',
  },
};
