import unnnicInput from '../components/Input/Input.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Input',
  component: unnnicInput,
  argTypes: {
    label: { control: { type: 'text' } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['text', 'password'] } },
    placeholder: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: iconList } },
    iconRight: { control: { type: 'select', options: iconList } },
    allowTogglePassword: { control: { type: 'boolean' } },
    hasCloudyColor: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicInput },
  template: '<unnnic-input v-bind="$props" />',
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

export const Password = Template.bind({});
Password.args = {
  placeholder: 'Password',
  nativeType: 'password',
  allowTogglePassword: true,
};

export const IconLeftAndRight = Template.bind({});
IconLeftAndRight.args = {
  placeholder: 'Text',
  iconLeft: 'read-email-at-1',
  iconRight: 'read-email-at-1',
};

export const Mask = Template.bind({});
Mask.args = {
  label: 'CPF or CNPJ',
  placeholder: 'Text',
  mask: ['###.###.###-##', '##.###.###/####-##'],
};
