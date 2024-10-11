import unnnicFormElement from '../components/FormElement/FormElement.vue';
import UnnnicTextArea from '../components/TextArea/TextArea.vue';

export default {
  title: 'Form/TextArea',
  component: UnnnicTextArea,
  argTypes: {
    size: { control: { type: 'select' }, options: ['md', 'sm'] },
    type: { control: { type: 'select' }, options: ['normal', 'error'] },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: {
      unnnicFormElement,
      UnnnicTextArea,
    },
    data() {
      return {
        content: '',
      };
    },
    template: `
      <unnnic-text-area v-bind="args" v-model="content"/>
    `,
  }),
};

export const Default = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: false,
    type: 'normal',
    errors: [],
    size: 'md',
    message: 'Helper text',
  },
};

export const Error = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: false,
    type: 'error',
    error: 'Error text',
    size: 'md',
  },
};

export const Disabled = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: true,
    type: 'normal',
    size: 'md',
    message: 'Helper text',
  },
};

export const DefaultSm = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: false,
    type: 'normal',
    errors: [],
    size: 'sm',
    message: 'Helper text',
  },
};

export const ErrorSm = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: false,
    type: 'error',
    error: 'Error text',
    size: 'sm',
  },
};

export const DisabledSm = {
  args: {
    label: 'Label',
    placeholder: 'Placeholder',
    maxLength: 150,
    disabled: true,
    type: 'normal',
    size: 'sm',
    message: 'Helper text',
  },
};
