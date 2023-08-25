import unnnicChartLine from '../components/ChartLine/ChartLine.vue';

export default {
  title: 'charts/ChartLine',
  component: unnnicChartLine,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: {
    unnnicChartLine,
  },

  props: Object.keys(argTypes),

  template: '<unnnic-chart-line v-bind="$props" />',
});

export const Default = Template.bind({});

Default.args = {
  title: 'Histórico de análises',
  fixedMaxValue: 1,
  data: [{
    title: 'Jan',
    value: 0.5,
  }, {
    title: 'Fev',
    value: 1,
  }, {
    title: 'Mar',
    value: 1,
  }],
};

export const Condensed = Template.bind({});

Condensed.args = {
  title: 'Histórico de análises',
  condensed: true,
  fixedMaxValue: 1,
  data: [{
    title: 'Jan',
    value: 0,
  }, {
    title: 'Fev',
    value: 1,
  }, {
    title: 'Mar',
    value: 0.5,
  }, {
    title: 'Abr',
    value: 1,
  }],
};
