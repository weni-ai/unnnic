import unnnicSwitch from '../components/Switch/Switch.vue';

export default {
  title: 'Example/Switch',
  component: unnnicSwitch,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium'] } },
    textLeft: { control: { type: 'text' } },
    textRight: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSwitch },
  template: '<unnnicSwitch v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  size: 'medium',
  textRight: 'Default',
  disabled: false,
  initialState: true,
};
