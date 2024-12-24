import UnnnicTableNext from '../components/TableNext/TableNext.vue';
import UnnnicButton from '../components/Button/Button.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Data Display/TableNext',
  component: UnnnicTableNext,
  tags: ['autodocs'],
  args: {
    onRowClick: action('row-click'),
  },
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
      const sort = ({ order }) => {
        if (order === 'asc') return;
        if (order === 'desc') args.rows === args.rows.reverse();
        else args.rows === args.rows.reverse();
      };
      return { args, sort };
    },
    data() {
      return {
        pagination: 1,
        table: {
          headers: [
            {
              content: 'ID',
              size: 'auto',
              isSortable: true,
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
              size: 0.5,
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
      @sort="sort"
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
    uuid: '1',
    link: {
      url: 'https://weni.ai/',
      target: '_blank',
    },
  },
  {
    content: ['2', 'Bob', '25', 'Canada', addButton],
    uuid: '2',
    link: {
      url: 'https://weni.ai/',
    },
  },
  {
    content: ['3', 'Charlie', '35', 'UK', addButton],
    uuid: '3',
  },
  {
    content: ['4', 'Diana', '28', 'Australia', addButton],
    uuid: '4',
  },
  {
    content: ['5', 'Ethan', '22', 'New Zealand', addButton],
    uuid: '5',
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
