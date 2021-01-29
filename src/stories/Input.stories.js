import textInput from '../components/Input/Input.vue';
import inputTest from '../components/Input/InputTest.vue';

export default {
  title: 'Example/Input',
  component: textInput,
  argTypes: {
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['input', 'password'] } },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: ['alarm-bell-2', 'read-email-at-1'] } },
    iconRight: { control: { type: 'select', options: ['alarm-bell-2', 'read-email-at-1'] } },
    allowTogglePassword: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { textInput },
  template: '<textInput v-bind="$props" />',
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

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Placeholder',
};

const Template2 = (args, { argTypes }) => ({
  components: { inputTest },
  template: '<inputTest />',
});
export const Test = Template2.bind({});
