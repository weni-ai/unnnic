import unnnicEmoji from '../components/Emoji/Emoji.vue';

export default {
  title: 'Example/Emoji',
  component: unnnicEmoji,
  argTypes: {
    name: { control: { type: 'text' } },
    height: { control: { type: 'number' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicEmoji },
  template: '<unnnic-emoji v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  name: 'Grinning_Face',
  height: 1,
};
