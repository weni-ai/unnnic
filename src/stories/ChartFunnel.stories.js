import UnnnicChartFunnel from '../components/ChartFunnel/ChartFunnel.vue';

export default {
  title: 'Charts/ChartFunnel',
  tags: ['autodocs'],
  component: UnnnicChartFunnel,
  decorators: [
    () => ({ template: '<div style="width: 500px;"><story /></div>' }),
  ],
};

export const ThreeRows = {
  args: {
    data: [
      {
        title: '100% (18.621)',
        description: 'Execução de fluxo',
      },
      {
        title: '67% (12.476)',
        description: 'Execução de fluxo',
      },
      {
        title: '12% (2.234)',
        description: 'Execução de fluxo',
      },
    ],
  },
};

export const FourRows = {
  args: {
    data: [
      {
        title: '100% (18.621)',
        description: 'Execução de fluxo',
      },
      {
        title: '67% (12.476)',
        description: 'Execução de fluxo',
      },
      {
        title: '12% (2.234)',
        description: 'Execução de fluxo',
      },
      {
        title: '5% (931)',
        description: 'Execução de fluxo',
      },
    ],
  },
};

export const FiveRows = {
  args: {
    data: [
      {
        title: '100% (18.621)',
        description: 'Execução de fluxo',
      },
      {
        title: '67% (12.476)',
        description: 'Execução de fluxo',
      },
      {
        title: '12% (2.234)',
        description: 'Execução de fluxo',
      },
      {
        title: '5% (931)',
        description: 'Execução de fluxo',
      },
      {
        title: '2% (372)',
        description: 'Execução de fluxo',
      },
    ],
  },
};
