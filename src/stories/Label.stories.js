import unnnicLabel from '../components/Label/Label.vue';

export default {
  title: 'Example/Label',
  component: unnnicLabel,
  argTypes: {
    label: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicLabel },
  template: '<unnnic-label v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  label: 'Label',
};
