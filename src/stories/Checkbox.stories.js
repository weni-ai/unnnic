import UnnnicCheckbox from '../components/Checkbox/Checkbox.vue';

export default {
  title: 'Form/Checkbox',
  component: UnnnicCheckbox,
  argTypes: {
    modelValue: { control: 'inline-radio', options: [true, false, 'less'] },
    disabled: { control: 'boolean' },
    size: { control: 'select', options: ['md', 'sm'] },
    textRight: { control: 'text' },
  },
  render: (args) => ({
    components: {
      UnnnicCheckbox,
    },
    setup() {
      return { args };
    },
    template: `
      <UnnnicCheckbox v-bind="args" @change="args.modelValue = $event" />
    `,
  }),
};

export const Default = {
  args: {
    modelValue: true,
    disabled: false,
    size: 'md',
  },
};
