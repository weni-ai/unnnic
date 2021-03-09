import alertCaller from '../components/Alert/AlertCaller.vue';
import alert from '../utils/call';

export default {
  title: 'example/Alert',
  component: alertCaller,
  argTypes: {
    text: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    closeText: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
      },
    },
    position: {
      control: {
        type: 'select',
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right'],
      },
    },
    icon: {
      control: {
        type: 'select',
        options: ['check-circle-1-1'],
      },
    },
    seconds: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { alertCaller },
  template: '<button @click="unnnicCallAlert"> Click for alert </button>',
  methods: {
    unnnicCallAlert() {
      alert.callAlert({ props: this.$props, seconds: this.$props.seconds });
    },
  },
});

export const Normal = Template.bind({});
Normal.args = {
  title: 'Title',
  text: 'Text',
  icon: 'check-circle-1-1',
  scheme: 'feedback-green',
};
