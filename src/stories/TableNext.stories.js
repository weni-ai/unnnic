import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';

export default {
  title: 'Data Display/TableNext',
  component: UnnnicTableNext,
  tags: ['autodocs'],
  argTypes: {
    headers: {
      description:
        'Array of header items defining the structure of the table header.',
      control: 'object',
    },
    rows: {
      description: 'Array of row items defining the content of the table rows.',
      control: 'object',
    },
    size: {
      description:
        'The size of the table. Options are `sm` for small and `md` for medium.',
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    pagination: {
      description: 'The current page number for pagination.',
      control: 'number',
    },
    paginationTotal: {
      description: 'The total number of pages available for pagination.',
      control: 'number',
    },
    paginationInterval: {
      description: 'The number of items displayed per page.',
      control: 'number',
    },
    isLoading: {
      description: 'Indicates whether the table data is loading.',
      control: 'boolean',
    },
    hideHeaders: {
      description: 'Determines if the table headers should be hidden.',
      control: 'boolean',
    },
  },
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

export const HideHeaders = {
  args: {
    rows,
    hideHeaders: true,
  },
};

export const WithoutResults = { args: {} };

export const Loading = {
  args: {
    isLoading: true,
  },
};
