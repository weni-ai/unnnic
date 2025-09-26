import UnnnicSelect from '../components/Select/index.vue';

export default {
  title: 'Form/Select',
  component: UnnnicSelect,
  argTypes: {
    readonly: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    components: { UnnnicSelect },
    setup() {
      return { args };
    },
    template: `
      <unnnic-select v-bind="args" />
    `,
  }),
};

export const Default = {
};