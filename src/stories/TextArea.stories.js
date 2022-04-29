import unnnicTextArea from '../components/TextArea/TextArea.vue';

export default {
  title: 'example/TextArea',
  component: unnnicTextArea,
  argTypes: {},
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
};
