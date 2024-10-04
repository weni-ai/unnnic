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
      UnnnicTextArea,
    },
    data() {
      return {
        content: '',
      };
    },
    template: `
      <div>
        <pre>v-model: {{ content }}</pre>
        <unnnic-text-area v-bind="args" v-model="content"/>
      </div>
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
  },
};
