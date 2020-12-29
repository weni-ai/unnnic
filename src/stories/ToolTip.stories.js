import unnicToolTip from '../components/ToolTip/ToolTip.vue';

export default {
  title: 'Example/ToolTip',
  component: unnicToolTip,
  argTypes: {
    text: { control: { type: 'text' } },
    side: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicToolTip },
  template: '<unnicToolTip v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Label',
};
