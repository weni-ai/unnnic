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
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    UnnnicFormElement,
  },

  data() {
    return {};
  },

  template: `
    <unnnic-form-element v-bind="$props">
      <input />
    </unnnic-form-element>
  `,
});

export const Default = Template.bind({});

Default.args = {
  label: 'Name',
  error: 'Error',
  message: 'Message',
};
