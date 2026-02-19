import { action } from 'storybook/actions';
import UnnnicInputNext from '../components/InputNext/InputNext.vue';

const iconsOptions = [];

export default {
  title: 'Form/InputNext',
  component: UnnnicInputNext,
  argTypes: {
    iconLeft: { control: { type: 'select', options: iconsOptions } },
    iconRight: { control: { type: 'select', options: iconsOptions } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    nativeType: { control: { type: 'select', options: ['text', 'password'] } },
  },
  render: (args) => ({
    components: { UnnnicInputNext },
    setup() {
      const updateModelValue = (value) => {
        action('update:modelValue')(value);
        args.modelValue = value;
      };
      return { args, updateModelValue };
    },
    template: `
      <div><pre>v-model: {{ modelValue }}</pre><UnnnicInputNext v-bind="args" v-model="modelValue"></UnnnicInputNext></div>
    `,
  }),
};

export const Default = {
  args: {
    placeholder: 'Placeholder',
  },
};

export const WithLabel = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
  },
};

export const Small = {
  args: {
    placeholder: 'Placeholder',
    size: 'sm',
  },
};

export const ErrorWithMessage = {
  args: {
    placeholder: 'Placeholder',
    error: 'Error message',
  },
};

export const ErrorWithoutMessage = {
  args: {
    placeholder: 'Placeholder',
    error: true,
  },
};

export const WithMessage = {
  args: {
    placeholder: 'Placeholder',
    message: 'Message',
  },
};

export const PasswordWithToggle = {
  args: {
    placeholder: 'Placeholder',
    allowTogglePassword: true,
  },
};

export const PasswordWithoutToggle = {
  args: {
    placeholder: 'Placeholder',
    nativeType: 'password',
  },
};

export const IconLeftAndRight = {
  args: {
    placeholder: 'Placeholder',
    iconLeft: 'read-email-at-1',
    iconRight: 'read-email-at-1',
  },
};
