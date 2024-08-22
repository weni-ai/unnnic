import UnnnicChartMultiLine from '../components/ChartMultiLine/ChartMultiLine.vue';

export default {
  title: 'charts/ChartMultiLine',
  component: UnnnicChartMultiLine,
  tags: ['autodocs'],
  argTypes: {},
};

export const Default = {
  args: {
    title: 'Histórico',
    data: [
      {
        title: 'Grupo 1',
        data: [
          {
            title: '1',
            value: 5,
          },
          {
            title: '2',
            value: 7,
          },
          {
            title: '3',
            value: 9,
          },
        ],
      },
      {
        title: 'Grupo 2',
        data: [
          {
            title: '1',
            value: 1,
          },
          {
            title: '2',
            value: 4,
          },
          {
            title: '3',
            value: 2,
          },
        ],
      },
    ],
  },
};
