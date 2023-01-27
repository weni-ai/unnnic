import unnnicChartRainbow from '../components/ChartRainbow/ChartRainbow.vue';

export default {
  title: 'charts/ChartRainbow',
  component: unnnicChartRainbow,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicChartRainbow,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-chart-rainbow v-bind="$props" />
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  value: 50,
  description: 'Description',
};
