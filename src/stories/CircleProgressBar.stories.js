import unnnicCircleProgressBar from '../components/CircleProgressBar/CircleProgressBar.vue';

export default {
  title: 'Progress/CircleProgressBar',
  component: unnnicCircleProgressBar,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicCircleProgressBar,
  },

  data() {
    return {};
  },

  template: `<unnnic-circle-progress-bar v-bind="$props" />`,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  progress: 4,
  totalProgress: 8,
};
