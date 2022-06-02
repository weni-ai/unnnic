import unnnicCardNumber from '../components/CardNumber/CardNumber.vue';

export default {
  title: 'Card/CardNumber',
  component: unnnicCardNumber,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicCardNumber,
  },

  data() {
    return {};
  },

  template: `
    <div>
      <unnnic-card-number v-bind="$props">
      </unnnic-card-number>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  description: 'Description',
  number: '00',
};
