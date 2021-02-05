import Icon from '../components/Icon.vue';

export default {
  title: 'Example/Icon',
  component: Icon,
  argTypes: {
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
        options: ['add-1', 'alarm-bell-2', 'alarm-bell-3', 'check-square-1'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  template: '<icon v-bind="$props"/>',
});

export const Normal = Template.bind({});
