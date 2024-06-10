import UnnnicPagination from '../components/Pagination/Pagination.vue';

export default {
  title: 'example/Pagination',
  component: UnnnicPagination,
  argTypes: {
    max: {
      control: {
        type: 'number',
        min: 1,
      },
    },
  },
  args: {
    max: 10,
  },
};

export const Default = {
  render: (args) => ({
    components: { UnnnicPagination },
    setup() {
      return { args };
    },
    data() {
      return {
        page: 1,
      };
    },
    template: `
      <div>
        <unnnic-pagination v-bind="args" v-model="page" :max="10" :show="5"/>
      </div>
    `,
  }),
  args: {},
};
