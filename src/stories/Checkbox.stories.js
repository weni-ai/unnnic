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
  args: { disabled: false },
  argTypes: {
    modelValue: { control: 'inline-radio', options: [true, false] },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    helper: { control: 'text' },
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
    label: 'Label',
    helper: 'Helper',
  },
};

export const Selected = {
  args: {
    modelValue: true,
    label: 'Label',
  },
};

export const Disabled = {
  args: {
    modelValue: false,
    disabled: true,
    label: 'Label',
  },
};

export const DisabledSelected = {
  args: {
    modelValue: true,
    disabled: true,
    label: 'Label',
  },
};
