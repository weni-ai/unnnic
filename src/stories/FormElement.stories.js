import UnnnicFormElement from '../components/FormElement/FormElement.vue';

export default {
  title: 'Form/FormElement',
  component: UnnnicFormElement,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md'],
      },
    },
  },
  render: (args) => ({
    components: {
      UnnnicFormElement,
    },
    setup() {
      return { args };
    },
    template: `
      <unnnic-form-element v-bind="args">
        <input />
      </unnnic-form-element>
    `,
  }),
};

export const Default = {
  args: {
    label: 'Name',
    error: 'Error',
    message: 'Message',
  },
};
