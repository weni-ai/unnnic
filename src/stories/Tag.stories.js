import unnnicTag from '../components/Tag/Tag.vue';

export default {
  title: 'Example/Tag',
  component: unnnicTag,
  argTypes: {
    text: { control: { type: 'text' } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicTag },
  template: '<unnnic-tag v-bind="$props"/>',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Label',
};
