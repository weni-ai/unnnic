import unnnicPagination from '../components/Pagination/Pagination.vue';
import { ref } from 'vue';

export default {
  title: 'example/Pagination',
  component: unnnicPagination,
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicPagination,
  },

  setup() {
    let page = ref(1);
    const onChange = (value) => {
      page.value = value;
    };

    return { page, onChange };
  },

  template: `
    <div>
      <unnnic-pagination v-bind="$props" :value="page" @input="onChange"/>
    </div>
  `,
});

export const Default = Template.bind({});

Default.args = {};
