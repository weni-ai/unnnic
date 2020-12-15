import testInput from '../components/Input/Input.vue';

export default {
  title: 'Example/Input',
  component: testInput,
  argTypes: {
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['input', 'password'] } },
    placeholder: { control: { type: 'text' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { testInput },
  template: '<testInput v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  type: 'normal',
  placeholder: 'Placeholder',
};

export const Error = Template.bind({});
Error.args = {
  type: 'error',
  placeholder: 'Placeholder',
};
