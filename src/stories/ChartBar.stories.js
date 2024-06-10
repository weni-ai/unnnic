import unnnicChartBar from '../components/ChartBar/ChartBar.vue';

export default {
  title: 'charts/ChartBar',
  component: unnnicChartBar,
  argTypes: {
    update: {
      action: 'update',
    },

    previous: {
      action: 'previous',
    },

    next: {
      action: 'next',
    },
  },
};
export const Default = {
  args: {
    title: 'Title Graph',
    description: 'Description graph',
    updateText: 'Atualizar',
    groups: [
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 0.5,
        },
        title: 'Group 1',
      },
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 1,
        },
        title: 'Group 2',
      },
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 1,
        },
        title: 'Group 3',
      },
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 1,
        },
        title: 'Group 4',
      },
    ],
    showFooterLegend: true,
  },
};

export const Condensed = {
  args: {
    condensed: true,
    fixedMaxValue: 1,
    groups: [
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 0.5,
        },
        title: 'Group 1',
      },
      {
        values: {
          'Legend 1': 1,
          'Legend 2': 1,
        },
        title: 'Group 2',
      },
    ],
  },
};

export const CondensedWithoutEventsAndTitleAndDescription = {
  args: {
    condensed: true,
    fixedMaxValue: 1,
    groups: [
      {
        values: {
          'Legend 1': 1,
        },
        title: 'Group 1',
      },
      {
        values: {
          'Legend 1': 1,
        },
        title: 'Group 2',
      },
      {
        values: {
          'Legend 1': 1,
        },
        title: 'Group 3',
      },
      {
        values: {
          'Legend 1': 0.5,
        },
        title: 'Group 4',
      },
    ],
    update: null,
    previous: null,
    next: null,
  },
};
