import unnnicPagination from '../components/Pagination/Pagination.vue';

export default {
  title: 'example/Pagination',
  component: unnnicPagination,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicPagination,
  },

  data() {
    return {
      page: 1,
    };
  },

  template: `
    <div>
      <unnnic-pagination v-bind="$props" v-model="page" :max="10" :show="5"/>
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {};
