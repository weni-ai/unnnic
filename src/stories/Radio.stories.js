import { action } from '@storybook/addon-actions';
import UnnnicRadio from '../components/Radio/Radio.vue';

export default {
  title: 'Form/Radio',
  component: UnnnicRadio,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Fundamental in forms, used when we present a list of two or more mutually 
        exclusive options, and the user needs to choose exactly one of them. When you click on 
        an unselected radio button, it will automatically deselect any other buttons that were 
        previously selected in the list.
          `,
      },
    },
  },
  argTypes: {
    value: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
  render: (args) => ({
    components: {
      UnnnicRadio,
    },
    setup() {
      const updateModelValue = (value) => {
        action('update:modelValue')(value);
        args.modelValue = value;
      };
      return { args, updateModelValue };
    },
    template: `
      <div>
        <UnnnicRadio v-bind="args" @update:model-value="updateModelValue" :value="args.value">
          Option
        </UnnnicRadio>
      </div>
    `,
  }),
};

export const Multiple = {
  render: (args) => ({
    components: {
      UnnnicRadio,
    },
    setup() {
      const updateModelValue = (value) => {
        action('update:modelValue')(value);
        args.modelValue = value;
      };
      return { args, updateModelValue };
    },
    template: `
      <div>
        <UnnnicRadio v-bind="args" @update:model-value="updateModelValue" value="option 1">
          Option 1
        </UnnnicRadio>

        <UnnnicRadio v-bind="args" @update:model-value="updateModelValue" value="option 2">
          Option 2
        </UnnnicRadio>

        <UnnnicRadio v-bind="args" @update:model-value="updateModelValue" value="option 3">
          Option 3
        </UnnnicRadio>
      </div>
    `,
  }),
};

export const Selected = {
  args: {
    modelValue: 'option 1',
    value: 'option 1',
  },
};

export const Disabled = {
  args: {
    modelValue: 'option 2',
    value: 'option 1',
    disabled: true,
  },
};

export const DisableSelected = {
  args: {
    modelValue: 'option 1',
    value: 'option 1',
    disabled: true,
  },
};

export const Helper = {
  args: {
    modelValue: 'option 1',
    value: 'option 1',
    helper: 'Helper text',
  },
};
