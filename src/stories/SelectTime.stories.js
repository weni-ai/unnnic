import unnnicSelectTime from '../components/SelectTime/index.vue';

export default {
  title: 'Select/SelectTime',
  component: unnnicSelectTime,
  argTypes: {},
  render: (args) => ({
    components: {
      unnnicSelectTime,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        exampleValue: '',
      };
    },
    template: `
      <unnnicSelectTime v-bind="args" v-model="exampleValue" />
    `,
  }),
};

export const Default = {};
