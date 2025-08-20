import UnnnicDataTable from '../components/DataTable/index.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Data Display/DataTable',
  component: UnnnicDataTable,
  tags: ['autodocs'],
  args: {
    page: 1,
  },
  argTypes: {
    headers: {
      description:
        'Array of header items defining the structure of the table header.',
      control: 'object',
    },
    items: {
      description: 'Array of row items defining the content of the table rows.',
      control: 'object',
    },
    size: {
      description:
        'The size of the table. Options are `sm` for small and `md` for medium.',
      control: { type: 'select' },
      options: ['sm', 'md'],
    },
    page: {
      description: 'The current page number for pagination.',
      control: 'number',
    },
    pageTotal: {
      description: 'The total number of pages available for pagination.',
      control: 'number',
    },
    pageInterval: {
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
    height: {
      description: 'The height of the table.',
      control: 'text',
    },
    maxHeight: {
      description: 'The maximum height of the table.',
      control: 'text',
    },
    clickable: {
      description: 'Indicates whether the table rows should be clickable.',
      control: 'boolean',
    },
    fixedHeaders: {
      description:
        'Indicates whether the table headers should be fixed in scroll.',
      control: 'boolean',
    },
    hidePagination: {
      description: 'Indicates whether the pagination should be hidden.',
      control: 'boolean',
    },
    locale: {
      description: 'The locale for the table translations.',
      control: { type: 'select' },
      options: ['en', 'pt-br', 'es'],
    },
  },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    setup() {
      const sort = ({ order, header }) => {
        action('update:sort')({ order, header });
        if (order === 'asc')
          args.items = args.items.sort((a, b) => a.id - b.id);
        if (order === 'desc')
          args.items = args.items.sort((a, b) => b.id - a.id);
      };
      const updatePage = (page) => {
        action('update:page')(page);
        args.page = page;
      };
      const itemClick = (item) => {
        action('itemClick')(item);
      };

      return { args, sort, updatePage, itemClick };
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="args.items"
      :pageTotal="125"
      :pageInterval="5"
      @update:sort="sort"
      @update:page="updatePage"
      @itemClick="itemClick"
    >
    </UnnnicDataTable>
    `,
  }),
};

const headers = [
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
];

const items = [
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
    headers,
    items,
  },
};

export const Clickable = {
  args: {
    headers,
    items,
    clickable: true,
  },
};

export const WithHeightLimit = {
  args: {
    headers,
    items,
    height: '165px',
  },
};

export const FixedHeaders = {
  args: {
    headers,
    items,
    fixedHeaders: true,
    height: '165px',
  },
};

export const Medium = {
  args: {
    headers,
    items,
    size: 'md',
  },
};

export const Small = {
  args: {
    headers,
    items,
    size: 'sm',
  },
};

export const HideHeaders = {
  args: {
    headers,
    items,
    hideHeaders: true,
  },
};

export const SlotHeader = {
  args: { headers, items },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    setup() {
      const sort = ({ order, header }) => {
        action('update:sort')({ order, header });
        if (order === 'asc')
          args.items = args.items.sort((a, b) => a.id - b.id);
        if (order === 'desc')
          args.items = args.items.sort((a, b) => b.id - a.id);
      };
      const updatePage = (page) => {
        action('update:page')(page);
        args.page = page;
      };
      const itemClick = (item) => {
        action('itemClick')(item);
      };

      return { args, sort, updatePage, itemClick };
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="args.items"
      :pageTotal="125"
      :pageInterval="5"
      @update:sort="sort"
      @update:page="updatePage"
      @itemClick="itemClick"
    >
      <template #header-name="{ header }">
        <button>
          {{ header.title }}
        </button>
      </template>
    </UnnnicDataTable>
    `,
  }),
};

export const SlotItem = {
  args: { headers, items },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    setup() {
      const sort = ({ order, header }) => {
        action('update:sort')({ order, header });
        if (order === 'asc')
          args.items = args.items.sort((a, b) => a.id - b.id);
        if (order === 'desc')
          args.items = args.items.sort((a, b) => b.id - a.id);
      };
      const updatePage = (page) => {
        action('update:page')(page);
        args.page = page;
      };
      const itemClick = (item) => {
        action('itemClick')(item);
      };

      return { args, sort, updatePage, itemClick };
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="args.items"
      :pageTotal="125"
      :pageInterval="5"
      @update:sort="sort"
      @update:page="updatePage"
      @itemClick="itemClick"
    >
      <template #body-id="{ item }">
        <button>
          {{ item.id }}
        </button>
      </template>
    </UnnnicDataTable>
    `,
  }),
};

export const HidePagination = {
  args: {
    headers,
    items,
    hidePagination: true,
  },
};

export const WithoutResults = {
  args: {
    headers,
    items: [],
  },
};

export const Loading = {
  args: {
    headers,
    items,
    isLoading: true,
  },
};
