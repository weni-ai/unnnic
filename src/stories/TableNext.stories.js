import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'example/TableNext',
  component: UnnnicTableNext,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    UnnnicTableNext,
    UnnnicButton,
  },
  template: `
    <unnnic-table-next
      v-bind="$props"
      :headers="table.headers"
      :rows="$props.rows || table.rows"
      :pagination.sync="pagination"
      :paginationTotal="125"
    />
  `,

  data() {
    return {
      pagination: 1,
      table: {
        headers: [
          {
            content: 'ID',
          },
          {
            content: 'Name',
          },
          {
            content: 'Age',
          },
          {
            content: 'Country',
          },
          {
            content: 'Add with friend',
          },
        ],
        rows: [],
      },
    };
  },
});

const addButton = {
  component: UnnnicButton,
  props: {
    text: 'Add',
    type: 'tertiary',
    iconLeft: 'add',
    size: 'small',
  },
  events: {
    click: (event) => {
      event.preventDefault();
      // eslint-disable-next-line no-alert
      console.log('click');
    },
  },
};

export const Default = Template.bind({});
Default.args = {
  rows: [
    {
      content: ['1', 'Alice', '30', 'USA', addButton],
      link: {
        url: 'https://weni.ai/',
        target: '_blank',
      },
    },
    {
      content: ['2', 'Bob', '25', 'Canada', addButton],
      link: {
        url: 'https://weni.ai/',
      },
    },
    {
      content: ['3', 'Charlie', '35', 'UK', addButton],
    },
    {
      content: ['4', 'Diana', '28', 'Australia', addButton],
    },
    {
      content: ['5', 'Ethan', '22', 'New Zealand', addButton],
    },
  ],
};

export const WithoutResults = Template.bind({});
WithoutResults.args = {
};

export const Loading = Template.bind({});
Loading.args = {
  isLoading: true,
};
