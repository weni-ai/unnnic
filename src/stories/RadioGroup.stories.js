import { action } from '@storybook/addon-actions';
import UnnnicRadioGroup from '../components/RadioGroup/RadioGroup.vue';
import UnnnicRadio from '../components/Radio/Radio.vue';
import { ref } from 'vue';

export default {
  title: 'Form/RadioGroup',
  component: UnnnicRadioGroup,
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
    label: { control: { type: 'text' } },
    labelTooltip: { control: { type: 'text' } },
    labelUseHtmlTooltip: { control: 'boolean' },
    modelValue: { control: { type: ['string', 'number'] } },
    name: { control: { type: 'text' } },
    state: { control: 'select', options: ['horizontal', 'vertical'] },
  },
};

export const Default = {
  args: {
    label: 'Radio Group 1',
  },

  render: (args) => ({
    components: {
      UnnnicRadioGroup,
      UnnnicRadio,
    },

    setup() {
      const modelValue = ref('option 1');

      const updateModelValue = (value) => {
        action('update:modelValue')(value);
        modelValue.value = value;
      };

      return { args, modelValue, updateModelValue };
    },

    template: `
      <section>
        <pre>v-model: {{ modelValue }}</pre>

        <UnnnicRadioGroup v-bind="args" :modelValue="modelValue" @update:modelValue="updateModelValue">
          <UnnnicRadio value="option 1">
            Option 1
          </UnnnicRadio>

          <UnnnicRadio value="option 2">
            Option 2
          </UnnnicRadio>

          <UnnnicRadio value="option 3">
            Option 3
          </UnnnicRadio>
        </UnnnicRadioGroup>
      </section>
    `,
  }),
};

export const Horizontal = {
  args: {
    state: 'horizontal',
    label: 'Label',
    name: 'Radio Group 1',
  },

  render: (args) => ({
    components: {
      UnnnicRadioGroup,
      UnnnicRadio,
    },
    setup() {
      return { args };
    },
    template: `
      <UnnnicRadioGroup v-bind="args">
        <UnnnicRadio value="option 1">
            Option 1
        </UnnnicRadio>

        <UnnnicRadio value="option 2">
            Option 2
        </UnnnicRadio>

        <UnnnicRadio value="option 3">
            Option 3
        </UnnnicRadio>
      </UnnnicRadioGroup>
    `,
  }),
};

export const Vertical = {
  args: {
    state: 'vertical',
    label: 'Label',
    name: 'Radio Group 2',
  },

  render: (args) => ({
    components: {
      UnnnicRadioGroup,
      UnnnicRadio,
    },
    setup() {
      return { args };
    },
    template: `
      <UnnnicRadioGroup v-bind="args">
        <UnnnicRadio value="option 1">
            Option 1
        </UnnnicRadio>

        <UnnnicRadio value="option 2">
            Option 2
        </UnnnicRadio>

        <UnnnicRadio value="option 3">
            Option 3
        </UnnnicRadio>
      </UnnnicRadioGroup>
    `,
  }),
};
