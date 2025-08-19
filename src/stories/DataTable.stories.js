import UnnnicDataTable from '../components/DataTable/index.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Data Display/DataTable',
  component: UnnnicDataTable,
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
      UnnnicDataTable,
    },
    setup() {
      const sort = ({ order }) => {
        if (order === 'asc') args.rows = args.rows.sort((a, b) => a.id - b.id);
        if (order === 'desc') args.rows = args.rows.sort((a, b) => b.id - a.id);
      };
      return { args, sort };
    },
    data() {
      return {
        pagination: 1,
        table: {
          headers: [
            {
              title: 'ID',
              itemKey: 'id',
              isSortable: true,
            },
            {
              title: 'Name',
              itemKey: 'name',
            },
            {
              title: 'Age',
              itemKey: 'age',
            },
            {
              title: 'Country',
              itemKey: 'country',
            },
          ],
          rows: [],
        },
      };
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      v-model:pagination="pagination"
      :headers="table.headers"
      :items="args.rows || table.rows"
      :paginationTotal="125"
      :paginationInterval="5"
      @sort="sort"
    >
    </UnnnicDataTable>
    `,
  }),
};

const rows = [
  {
    id: '1',
    name: 'Eduardo',
    age: 27,
    country: 'Brazil',
  },
  {
    id: '2',
    name: 'Marcus',
    age: 27,
    country: 'Brazil',
  },
  {
    id: '3',
    name: 'Paulo',
    age: 29,
    country: 'Brazil',
  },
  {
    id: '4',
    name: 'Cristian',
    age: 27,
    country: 'Brazil',
  },
  {
    id: '5',
    name: 'Aldemylla',
    age: 27,
    country: 'Brazil',
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
