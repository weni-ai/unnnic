import alertCaller from '../components/Alert/AlertCaller.vue';

export default {
  title: 'example/Alert',
  component: alertCaller,
  argTypes: {
    text: { control: { type: 'text' } },
    title: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
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
  template: '<alert-caller v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  title: 'Title',
  text: 'Text',
  icon: 'check-circle-1-1',
  scheme: 'feedback-green',
};
