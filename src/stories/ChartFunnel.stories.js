import UnnnicChartFunnel from '../components/ChartFunnel/ChartFunnel.vue';

export default {
  title: 'Charts/ChartFunnel',
  tags: ['autodocs'],
  component: UnnnicChartFunnel,
  argTypes: {
    type: { control: { type: 'select' }, options: ['default', 'basic'] },
  },
  decorators: [
    () => ({
      template: '<div style="width: 500px; height: 500px;"><story /></div>',
    }),
  ],
};

export const TwoRows = {
  args: {
    data: [
      {
        title: '100%',
        description: 'Clicou em comprar',
        value: '18.621',
        color: '#F6E05E',
      },
      {
        title: '67%',
        description: 'Informou entrega',
        value: '12.476',
        color: '#F6AD55',
      },
    ],
  },
};

export const ThreeRows = {
  args: {
    data: [
      {
        title: '100%',
        description: 'Clicou em comprar',
        value: '18.621',
        color: '#F6E05E',
      },
      {
        title: '67%',
        description: 'Informou entrega',
        value: '12.476',
        color: '#F6AD55',
      },
      {
        title: '24%',
        description: 'Selecionou Itens',
        value: '4.469',
        color: '#B794F4',
      },
    ],
  },
};

export const FourRows = {
  args: {
    data: [
      {
        title: '100%',
        description: 'Clicou em comprar',
        value: '18.621',
        color: '#F6E05E',
      },
      {
        title: '67%',
        description: 'Informou entrega',
        value: '12.476',
        color: '#F6AD55',
      },
      {
        title: '24%',
        description: 'Selecionou Itens',
        value: '4.469',
        color: '#B794F4',
      },
      {
        title: '12%',
        description: 'Foi para checkout',
        value: '2.234',
        color: '#63B3ED',
      },
    ],
  },
};

export const FiveRows = {
  args: {
    data: [
      {
        title: '100%',
        description: 'Clicou em comprar',
        value: '18.621',
        color: '#F6E05E',
      },
      {
        title: '67%',
        description: 'Informou entrega',
        value: '12.476',
        color: '#F6AD55',
      },
      {
        title: '24%',
        description: 'Selecionou Itens',
        value: '4.469',
        color: '#B794F4',
      },
      {
        title: '12%',
        description: 'Foi para checkout',
        value: '2.234',
        color: '#63B3ED',
      },
      {
        title: '5%',
        description: 'Finalizou a compra',
        value: '931',
        color: '#68D391',
      },
    ],
  },
};
