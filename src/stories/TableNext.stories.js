import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Data Display/TableNext',
  component: UnnnicTableNext,
  tags: ['autodocs'],
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicTableNext,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        pagination: 1,
        table: {
          headers: [
            {
              content: 'ID',
              size: 0.3,
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
    template: `
    <UnnnicTableNext
      v-bind="args"
      :headers="table.headers"
      :rows="args.rows || table.rows"
      v-model:pagination="pagination"
      :paginationTotal="125"
      :paginationInterval="5"
    />
    `,
  }),
};
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

const rows = [
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
];

export const Default = {
  args: {
    rows,
  },
};

export const Medium = {
  args: {
    rows,
    size: 'md',
  },
};

export const WithoutResults = { args: {} };

export const Loading = {
  args: {
    isLoading: true,
  },
};
