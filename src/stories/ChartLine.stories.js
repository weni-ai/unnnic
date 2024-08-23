import UnnnicChartLine from '../components/ChartLine/ChartLine.vue';

export default {
  title: 'Charts/ChartLine',
  tags: ['autodocs'],
  component: UnnnicChartLine,
  argTypes: {},
};

export const Default = {
  args: {
    title: 'Histórico de análises',
    fixedMaxValue: 1,
    data: [
      {
        title: 'Jan',
        value: 0.5,
      },
      {
        title: 'Fev',
        value: 1,
      },
      {
        title: 'Mar',
        value: 1,
      },
    ],
  },
};

export const Condensed = {
  args: {
    title: 'Histórico de análises',
    condensed: true,
    fixedMaxValue: 1,
    data: [
      {
        title: 'Jan',
        value: 0,
      },
      {
        title: 'Fev',
        value: 1,
      },
      {
        title: 'Mar',
        value: 0.5,
      },
      {
        title: 'Abr',
        value: 1,
      },
    ],
  },
};
