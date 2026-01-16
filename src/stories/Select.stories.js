import UnnnicSelect from '../components/Select/index.vue';

const options = [
  { label: 'Option 1', value: 'option1', altValue: 'alt_value_option1' },
  { label: 'Option 2', value: 'option2', altValue: 'alt_value_option2' },
  { label: 'Option 3', value: 'option3', altValue: 'alt_value_option3' },
  { label: 'Option 4', value: 'option4', altValue: 'alt_value_option4' },
  { label: 'Option 5', value: 'option5', altValue: 'alt_value_option5' },
  { label: 'Option 6', value: 'option6', altValue: 'alt_value_option6' },
  { label: 'Option 7', value: 'option7', altValue: 'alt_value_option7' },
  { label: 'Option 8', value: 'option8', altValue: 'alt_value_option8' },
  { label: 'Option 9', value: 'option9', altValue: 'alt_value_option9' },
  { label: 'Option 10', value: 'option10', disabled: true },
];

export default {
  title: 'Form/Select',
  component: UnnnicSelect,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Select is designed to solve common problems related to option selection.',
      },
    },
  },
  argTypes: {
    options: {
      description:
        'List of items to be displayed in the options. If an item has a `disabled` key set to `true`, that item will be disabled. By default, the component looks for the `label` and `value` keys to display and update the model, but these are not required if you wish to customize them using the `itemLabel` and `itemValue` props, respectively.',
    },
    placeholder: {
      description: 'Text to be displayed in the placeholder.',
    },
    label: {
      description: 'Text to be displayed in the label.',
    },
    modelValue: {
      description:
        'Model variable. Its type will always match the return type of the key specified by `itemValue`, or the entire options object when `returnObject` prop is set to `true`.',
    },
    returnObject: {
      description:
        'Prop to indicate that the full option object should be returned in the v-model.',
    },
    itemLabel: {
      description:
        'Field of the option item that should be used to render the option label.',
    },
    itemValue: {
      description:
        'Field of the option item that should be used to return value to v-model.',
    },
    type: {
      description: 'Select state type',
    },
    errors: {
      description:
        "Error message or messages. When it's an array, the messages will be separated by commas.",
    },
    message: {
      description: 'Help or hint message.',
    },
    size: {
      description: 'Select size',
    },
    optionsLines: {
      description:
        'Number of options to display at most; if exceeded, scrolling will be enabled.',
    },
    enableSearch: {
      description:
        'If true, enables a search field displayed inside the options popover. The `update:search` event is emitted on each input.',
    },
    search: {
      description: 'Search value.',
    },
    locale: {
      description: 'Locale for i18n translations.',
    },
    disabled: {
      description: 'Disable the select.',
    },
    infiniteScroll: {
      description:
        'Enable infinite scroll functionality. When enabled, the component will emit a `scroll-end` event when the user scrolls near the bottom of the options list.',
    },
    infiniteScrollDistance: {
      description:
        'Distance in pixels from the bottom of the scroll area to trigger the `scroll-end` event. Default is 10.',
    },
    infiniteScrollCanLoadMore: {
      description:
        'Function that returns a boolean indicating whether more items can be loaded. Used to prevent unnecessary scroll-end events.',
    },
  },
  render: (args) => ({
    components: { UnnnicSelect },
    setup() {
      const handleSearch = (value) => {
        args.search = value;
      };
      return { args, handleSearch };
    },
    data() {
      return {
        exampleValue: null,
      };
    },
    template: `
      <div style="width: 300px;">
        <p>modelValue: {{ exampleValue }}</p>
        <unnnic-select v-model="exampleValue" v-bind="args" @update:search="handleSearch" />
      </div>
      
    `,
  }),
};

export const Default = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    options,
  },
};

export const ReturnObject = {
  args: {
    returnObject: true,
    placeholder: 'Placeholder',
    label: 'Label',
    options,
  },
};

export const AlternativeValueKey = {
  args: {
    itemValue: 'altValue',
    placeholder: 'Placeholder',
    label: 'Label',
    options,
  },
};

export const AlternativeValueLabel = {
  args: {
    itemLabel: 'altValue',
    placeholder: 'Placeholder',
    label: 'Label',
    options,
  },
};

export const Clearable = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    options,
    clearable: true,
  },
};

export const Disabled = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    options,
    disabled: true,
  },
};

export const WithSearch = {
  args: {
    placeholder: 'Placeholder',
    label: 'Label',
    options,
    enableSearch: true,
    search: '',
  },
};

export const WithInfiniteScroll = {
  render: () => ({
    components: { UnnnicSelect },
    data() {
      return {
        selectedValue: null,
        loadedOptions: [],
        currentPage: 1,
        totalPages: 10,
        isLoading: false,
      };
    },
    mounted() {
      this.loadInitialOptions();
    },
    methods: {
      loadInitialOptions() {
        this.loadedOptions = this.generateOptions(1);
      },
      generateOptions(page) {
        const startIndex = (page - 1) * 10 + 1;
        return Array.from({ length: 10 }, (_, i) => ({
          label: `Option ${startIndex + i}`,
          value: `option${startIndex + i}`,
        }));
      },
      async handleScrollEnd() {
        if (this.currentPage >= this.totalPages || this.isLoading) {
          return;
        }

        this.isLoading = true;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        this.currentPage++;
        const newOptions = this.generateOptions(this.currentPage);
        this.loadedOptions = [...this.loadedOptions, ...newOptions];

        this.isLoading = false;

        this.$refs.selectRef.finishInfiniteScroll();
      },
      canLoadMore() {
        return this.currentPage < this.totalPages && !this.isLoading;
      },
    },
    template: `
      <div style="width: 300px;">
        <h3>Infinite Scroll Example</h3>
        <p style="color: #666; font-size: 14px;">
          Scroll down in the options list to load more items.
          <br />
          Page: {{ currentPage }} / {{ totalPages }}
          <br />
          Total options: {{ loadedOptions.length }}
        </p>
        <p>Selected: {{ selectedValue }}</p>
        <unnnic-select
          ref="selectRef"
          v-model="selectedValue"
          :options="loadedOptions"
          placeholder="Select an option"
          label="Infinite Scroll Select"
          :infinite-scroll="true"
          :infinite-scroll-distance="10"
          :infinite-scroll-can-load-more="canLoadMore"
          @scroll-end="handleScrollEnd"
        />
      </div>
    `,
  }),
};
