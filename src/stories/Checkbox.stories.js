import { action } from '@storybook/addon-actions';
import UnnnicCheckbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'Form/Checkbox',
  component: UnnnicCheckbox,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Allows the user to select multiple options from a category. It can also be 
        used to display a single option that may require additional acceptance or confirmation 
        before submission.
          `,
      },
    },
  },
  args: { disabled: false, size: 'md' },
  argTypes: {
    modelValue: { control: 'inline-radio', options: [true, false, 'less'] },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'sm'] },
  },
  render: (args) => ({
    components: {
      UnnnicCheckbox,
    },
    setup() {
      const updateModelValue = (value) => {
        action('update:modelValue')(value);
        args.modelValue = value;
      };
      return { args, updateModelValue };
    },
    template: `
      <UnnnicCheckbox v-bind="args" @update:modelValue="updateModelValue"/>
    `,
  }),
};

export const Default = {
  args: {
    modelValue: false,
  },
};

export const Selected = {
  args: {
    modelValue: true,
  },
};

export const LessSelected = {
  args: {
    modelValue: 'less',
  },
};

export const Disabled = {
  args: {
    modelValue: false,
    disabled: true,
  },
};

export const DisabledSelected = {
  args: {
    modelValue: true,
    disabled: true,
  },
};
