import unnnicTextArea from '../components/TextArea/TextArea.vue';

export default {
  title: 'Form/TextArea',
  component: unnnicTextArea,
  argTypes: {
    'on-update:model-value': { action: '@update:model-value' },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicTextArea,
  },

  data() {
    return {
      content: '',
    };
  },

  template: `
    <div>
      <pre>v-model: {{ content }}</pre>
      <unnnic-text-area v-bind="$props" v-model="content"/>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  maxLength: 150,
  disabled: false,
  type: 'normal',
  errors: [],
};
