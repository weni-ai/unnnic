import UnnnicCardFlow from '../components/CardFlow/CardFlow.vue';

export default {
  title: 'card/CardFlow',
  component: UnnnicCardFlow,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  components: {
    UnnnicCardFlow,
  },

  props: Object.keys(argTypes),

  data() {
    return {
      v: false,
    };
  },

  template: '<div><unnnic-card-flow v-model="v" v-bind="$props"></unnnic-card-flow></div>',
});

export const Default = Template.bind({});

Default.args = {
  title: 'Title',
  description: 'Description',
  options: [
    {
      name: 'Option 1',
      value: '10',
    },
    {
      name: 'Option 2',
      value: '8',
    },
    {
      name: 'Option 3',
      value: '9',
    },
  ],
};
