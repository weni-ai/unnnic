import UnnnicDataTable from '../components/DataTable/index.vue';
import { action } from '@storybook/addon-actions';

const SAMPLE_NAMES = [
  'Eduardo',
  'Marcus',
  'Paulo',
  'Cristian',
  'Aldemylla',
  'João',
  'Maria',
  'Ana',
  'Pedro',
  'Lucas',
];

const SAMPLE_COUNTRIES = ['Brazil', 'USA', 'Canada', 'Argentina', 'Chile'];

const generateItems = (count, startId) => {
  return Array.from({ length: count }, (_, i) => ({
    id: String(startId + i),
    name: SAMPLE_NAMES[Math.floor(Math.random() * SAMPLE_NAMES.length)],
    age: Math.floor(Math.random() * 30) + 20,
    country:
      SAMPLE_COUNTRIES[Math.floor(Math.random() * SAMPLE_COUNTRIES.length)],
  }));
};

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
    infiniteScroll: {
      description:
        'Enables infinite scroll functionality. When enabled, the table will emit a loadMore event when the user scrolls near the bottom.',
      control: 'boolean',
    },
    infiniteScrollDistance: {
      description:
        'Distance in pixels from the bottom of the table to trigger the loadMore event.',
      control: 'number',
    },
    infiniteScrollDisabled: {
      description:
        'Disables the infinite scroll functionality. Useful when all data has been loaded.',
      control: 'boolean',
    },
    isLoadingMore: {
      description:
        'Indicates whether more data is being loaded for infinite scroll. Shows a loading indicator at the bottom of the table.',
      control: 'boolean',
    },
  },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    setup() {
      const sort = ({ order, header, itemKey }) => {
        action('update:sort')({ order, header, itemKey });
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

export const ControlledSort = {
  args: { headers, items },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    setup() {
      let sortState = {
        header: 'ID',
        itemKey: 'id',
        order: 'asc',
      };

      const handleSort = ({ order, header, itemKey }) => {
        action('update:sort')({ order, header, itemKey });
        sortState = { header, itemKey, order };

        if (order === 'asc') {
          args.items = [...args.items].sort((a, b) => {
            if (itemKey === 'id') return a.id - b.id;
            return a[itemKey] > b[itemKey] ? 1 : -1;
          });
        } else if (order === 'desc') {
          args.items = [...args.items].sort((a, b) => {
            if (itemKey === 'id') return b.id - a.id;
            return a[itemKey] < b[itemKey] ? 1 : -1;
          });
        }
      };

      const updatePage = (page) => {
        action('update:page')(page);
        args.page = page;
      };

      const itemClick = (item) => {
        action('itemClick')(item);
      };

      return { args, sortState, handleSort, updatePage, itemClick };
    },
    template: `
    <div>
      <UnnnicDataTable
        v-bind="args"
        :headers="args.headers"
        :items="args.items"
        :pageTotal="125"
        :pageInterval="5"
        v-model:sort="sortState"
        @update:sort="handleSort"
        @update:page="updatePage"
        @itemClick="itemClick"
      >
      </UnnnicDataTable>
    </div>
    `,
  }),
};

export const InfiniteScroll = {
  args: { headers },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    data() {
      return {
        args,
        currentId: 11,
        displayedItems: generateItems(10, 1),
        isLoadingMore: false,
      };
    },
    methods: {
      loadMore() {
        action('loadMore')();
        this.isLoadingMore = true;

        setTimeout(() => {
          const newItems = generateItems(5, this.currentId);
          this.displayedItems = [...this.displayedItems, ...newItems];
          this.currentId += 5;
          this.isLoadingMore = false;
        }, 1000);
      },
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="displayedItems"
      :infiniteScroll="true"
      :infiniteScrollDistance="100"
      :isLoadingMore="isLoadingMore"
      :hidePagination="true"
      height="400px"
      @loadMore="loadMore"
    >
    </UnnnicDataTable>
    `,
  }),
};

export const InfiniteScrollWithFixedHeaders = {
  args: { headers },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    data() {
      return {
        args,
        currentId: 11,
        displayedItems: generateItems(10, 1),
        isLoadingMore: false,
        hasMore: true,
      };
    },
    methods: {
      loadMore() {
        if (!this.hasMore) return;

        action('loadMore')();
        this.isLoadingMore = true;

        setTimeout(() => {
          const newItems = generateItems(5, this.currentId);
          this.displayedItems = [...this.displayedItems, ...newItems];
          this.currentId += 5;

          if (this.displayedItems.length >= 50) {
            this.hasMore = false;
          }

          this.isLoadingMore = false;
        }, 1000);
      },
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="displayedItems"
      :infiniteScroll="true"
      :infiniteScrollDistance="50"
      :infiniteScrollDisabled="!hasMore"
      :isLoadingMore="isLoadingMore"
      :hidePagination="true"
      :fixedHeaders="true"
      height="400px"
      @loadMore="loadMore"
    >
    </UnnnicDataTable>
    `,
  }),
};

export const InfiniteScrollClickable = {
  args: { headers },
  render: (args) => ({
    components: {
      UnnnicDataTable,
    },
    data() {
      return {
        args,
        currentId: 11,
        displayedItems: generateItems(10, 1),
        isLoadingMore: false,
      };
    },
    methods: {
      loadMore() {
        action('loadMore')();
        this.isLoadingMore = true;

        setTimeout(() => {
          const newItems = generateItems(5, this.currentId);
          this.displayedItems = [...this.displayedItems, ...newItems];
          this.currentId += 5;
          this.isLoadingMore = false;
        }, 1000);
      },
      itemClick(item) {
        action('itemClick')(item);
      },
    },
    template: `
    <UnnnicDataTable
      v-bind="args"
      :headers="args.headers"
      :items="displayedItems"
      :infiniteScroll="true"
      :infiniteScrollDistance="100"
      :isLoadingMore="isLoadingMore"
      :hidePagination="true"
      :clickable="true"
      height="400px"
      @loadMore="loadMore"
      @itemClick="itemClick"
    >
    </UnnnicDataTable>
    `,
  }),
};
