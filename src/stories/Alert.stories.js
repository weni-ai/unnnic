import alertCaller from '../components/Alert/AlertCaller.vue';
import alert from '../utils/call';
import unnnicAlert from '../components/Alert/Alert.vue';

export default {
  title: 'example/Alert',
  component: unnnicAlert,
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
        options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'bottom-center'],
      },
    },
    icon: {
      control: {
        type: 'select',
        options: ['check-circle-1-1', 'check-circle-1-1-1', 'alert-circle-1-1'],
      },
    },
    seconds: { control: { type: 'number' } },
    version: {
      control: {
        type: 'select',
        options: ['1.0', '1.1'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { alertCaller, unnnicAlert },
  template: '<div><button @click="unnnicCallAlert"> Click for alert </button> <unnnic-alert v-bind="$props"></unnnic-alert> </div>',
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
