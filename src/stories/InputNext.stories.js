import unnnicInputNext from '../components/InputNext/InputNext.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

export default {
  title: 'form/InputNext',
  component: unnnicInputNext,
  argTypes: {
    iconLeft: { control: { type: 'select', options: iconsOptions } },
    iconRight: { control: { type: 'select', options: iconsOptions } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['text', 'password'] } },
  },
};

const Template = (args, { argTypes }) => ({
  components: {
    unnnicInputNext,
  },

  props: Object.keys(argTypes),

  data() {
    return {
      v: '',
    };
  },

  template: '<div><pre>v-model: {{ v }}</pre><unnnic-input-next v-model="v" v-bind="$props"></unnnic-input-next></div>',
});

export const Default = Template.bind({});

Default.args = {
  placeholder: 'Placeholder',
};

export const WithLabel = Template.bind({});
WithLabel.args = {
  placeholder: 'Placeholder',
  label: 'Label',
  size: undefined,
  type: undefined,
  nativeType: undefined,
};

export const Small = Template.bind({});
Small.args = {
  placeholder: 'Placeholder',
  size: 'sm',
  type: undefined,
  nativeType: undefined,
};

export const ErrorWithMessage = Template.bind({});
ErrorWithMessage.args = {
  placeholder: 'Placeholder',
  error: 'Error message',
  size: undefined,
  type: undefined,
  nativeType: undefined,
};

export const ErrorWithoutMessage = Template.bind({});
ErrorWithoutMessage.args = {
  placeholder: 'Placeholder',
  error: true,
  size: undefined,
  type: undefined,
  nativeType: undefined,
};

export const WithMessage = Template.bind({});
ErrorWithoutMessage.args = {
  placeholder: 'Placeholder',
  message: 'Message',
  size: undefined,
  type: undefined,
  nativeType: undefined,
};

export const PasswordWithToggle = Template.bind({});
PasswordWithToggle.args = {
  placeholder: 'Placeholder',
  allowTogglePassword: true,
  size: undefined,
  type: undefined,
  nativeType: undefined,
};

export const PasswordWithoutToggle = Template.bind({});
PasswordWithoutToggle.args = {
  placeholder: 'Placeholder',
  nativeType: 'password',
  size: undefined,
  type: undefined,
};

export const IconLeftAndRight = Template.bind({});
IconLeftAndRight.args = {
  placeholder: 'Placeholder',
  iconLeft: 'read-email-at-1',
  iconRight: 'read-email-at-1',
  size: undefined,
  type: undefined,
  nativeType: undefined,
};
