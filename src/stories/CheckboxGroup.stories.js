import { action } from '@storybook/addon-actions';
import UnnnicCheckboxGroup from '../components/CheckboxGroup/CheckboxGroup.vue';
import UnnnicCheckbox from '../components/Checkbox/Checkbox.vue';
import { ref } from 'vue';

export default {
  title: 'Form/CheckboxGroup',
  component: UnnnicCheckboxGroup,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Allows the user to select multiple options from a category. It can also be 
        used to display a single option that may require additional acceptance or confirmation 
        before submission.`,
      },
    },
  },
  argTypes: {
    label: { control: { type: 'text' } },
    labelTooltip: { control: { type: 'text' } },
    labelUseHtmlTooltip: { control: 'boolean' },
    helper: { control: { type: 'text' } },
    state: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export const Default = {
  args: {
    label: 'Checkbox Group 1',
    helper: 'Helper text',
  },

  render: (args) => ({
    components: {
      UnnnicCheckboxGroup,
      UnnnicCheckbox,
    },

    setup() {
      return { args };
    },

    template: `
      <section>
        <UnnnicCheckboxGroup v-bind="args">
          <UnnnicCheckbox :modelValue="true" label="Option 1" />
          <UnnnicCheckbox :modelValue="false" label="Option 2" />
          <UnnnicCheckbox :modelValue="false" label="Option 3" />
        </UnnnicCheckboxGroup>
      </section>
    `,
  }),
};

export const Horizontal = {
  args: {
    state: 'horizontal',
    label: 'Label',
    helper: 'Helper text',
  },

  render: (args) => ({
    components: {
      UnnnicCheckboxGroup,
      UnnnicCheckbox,
    },
    setup() {
      return { args };
    },
    template: `
      <UnnnicCheckboxGroup v-bind="args">
        <UnnnicCheckbox :modelValue="true" label="Option 1" />
        <UnnnicCheckbox :modelValue="false" label="Option 2" />
        <UnnnicCheckbox :modelValue="false" label="Option 3" />
      </UnnnicCheckboxGroup>
    `,
  }),
};

export const Vertical = {
  args: {
    state: 'vertical',
    label: 'Label',
    helper: 'Helper text',
  },

  render: (args) => ({
    components: {
      UnnnicCheckboxGroup,
      UnnnicCheckbox,
    },
    setup() {
      return { args };
    },
    template: `
      <UnnnicCheckboxGroup v-bind="args">
        <UnnnicCheckbox :modelValue="true" label="Option 1" />
        <UnnnicCheckbox :modelValue="false" label="Option 2" />
        <UnnnicCheckbox :modelValue="false" label="Option 3" />
      </UnnnicCheckboxGroup>
    `,
  }),
};
