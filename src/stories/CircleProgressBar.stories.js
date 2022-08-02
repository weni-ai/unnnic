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

  template: `
    <div>
      <unnnic-circle-progress-bar v-bind="$props" />
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  value: 50,
  progress: 4,
  totalProgress: 8,
  description: 'Description',
};
