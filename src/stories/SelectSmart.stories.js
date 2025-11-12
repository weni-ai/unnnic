import unnnicFormElement from '../components/FormElement/FormElement.vue';
import unnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';

export default {
  title: 'Select/SelectSmart',
  component: unnnicSelectSmart,
  argTypes: {},
  render: (args) => ({
    components: {
      unnnicFormElement,
      unnnicSelectSmart,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        exampleValue: [],
      };
    },
    template: `
      <unnnicFormElement label="Label" message="Helper text">
        <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
      </unnnicFormElement>
    `,
  }),
};

const TemplateError = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicSelectSmart,
  },

  setup() {
    return { args };
  },
  data() {
    return {
      exampleValue: [],
    };
  },

  template: `
    <unnnicFormElement label="Label" error="Error text">
      <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
    </unnnicFormElement>
  `,
});

const TemplateDisabled = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicFormElement,
    unnnicSelectSmart,
  },

  setup() {
    return { args };
  },
  data() {
    return {
      exampleValue: [],
    };
  },

  template: `
    <unnnicFormElement label="Label" message="Helper text" disabled>
      <unnnicSelectSmart v-bind="args" v-model="exampleValue"/>
    </unnnicFormElement>
  `,
});

const TemplateSecondary = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelectSmart },
  setup() {
    return { args };
  },
  data() {
    return { exampleValue: [] };
  },
  template: `<unnnicSelectSmart v-bind="args" v-model="exampleValue"/>`,
});

export const Default = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      { value: '5', label: 'Option 5' },
      { value: '3', label: 'Option 3' },
      { value: '1', label: 'Option 1' },
      { value: '4', label: 'Option 4' },
      { value: '2', label: 'Option 2' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
    ],
  },
};

export const Loading = {
  args: {
    isLoading: true,
    options: [
      { value: '', label: 'Select some option' },
      { value: '5', label: 'Option 5' },
      { value: '3', label: 'Option 3' },
      { value: '1', label: 'Option 1' },
      { value: '4', label: 'Option 4' },
      { value: '2', label: 'Option 2' },
      { value: '6', label: 'Option 6' },
      { value: '7', label: 'Option 7' },
    ],
  },
};

export const FirstSelected = {
  args: {
    options: [
      { value: '1', label: 'Option 1' },
      { value: '2', label: 'Option 2' },
      { value: '3', label: 'Option 3' },
      { value: '4', label: 'Option 4' },
      { value: '5', label: 'Option 5' },
    ],
  },
};

export const OrderedByIndex = {
  args: {
    options: [
      { value: '5', label: 'Option 5' },
      { value: '3', label: 'Option 3' },
      { value: '1', label: 'Option 1' },
      { value: '4', label: 'Option 4' },
      { value: '2', label: 'Option 2' },
    ],
    orderedByIndex: true,
  },
};

export const Error = TemplateError.bind({});
Error.args = {
  type: 'error',
  options: [
    { value: '', label: 'Select some option' },
    { value: '5', label: 'Option 5' },
    { value: '3', label: 'Option 3' },
    { value: '1', label: 'Option 1' },
    { value: '4', label: 'Option 4' },
    { value: '2', label: 'Option 2' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
  ],
};

export const Disabled = TemplateDisabled.bind({});
Disabled.args = {
  options: [{ value: '', label: 'Select some option' }],
  disabled: true,
};

export const WithDescriptions = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      {
        value: '1',
        label: 'Option 1',
        description: 'This is the first option',
      },
      {
        value: '2',
        label: 'Option 2',
        description: 'Another alternative you can consider',
      },
      {
        value: '3',
        label: 'Option 3',
        description: 'A third option for your consideration',
      },
      {
        value: '4',
        label: 'Option 4',
        description: 'Yet another choice among the options',
      },
      {
        value: '5',
        label: 'Option 5',
        description: 'The last option available for selection',
      },
    ],
  },
};

export const Autocomplete = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      { value: 'united_states', label: 'Estados Unidos' },
      { value: 'brazil', label: 'Brasil' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'Índia' },
      { value: 'russia', label: 'Rússia' },
      { value: 'japan', label: 'Japão' },
      { value: 'germany', label: 'Alemanha' },
      { value: 'france', label: 'França' },
      { value: 'canada', label: 'Canadá' },
      { value: 'australia', label: 'Austrália' },
      { value: 'south_korea', label: 'Coreia do Sul' },
      { value: 'mexico', label: 'México' },
      { value: 'egypt', label: 'Egito' },
      { value: 'south_africa', label: 'África do Sul' },
      { value: 'turkey', label: 'Turquia' },
      { value: 'nigeria', label: 'Nigéria' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'italy', label: 'Itália' },
      { value: 'spain', label: 'Espanha' },
      { value: 'saudi_arabia', label: 'Arábia Saudita' },
    ],
    autocomplete: true,
    autocompleteClearOnFocus: true,
    autocompleteIconLeft: true,
  },
};

export const EnableSearchByValue = {
  args: {
    options: [
      { value: '', label: 'Select some option' },
      { value: 'united_states', label: 'Estados Unidos' },
      { value: 'brazil', label: 'Brasil' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'Índia' },
      { value: 'russia', label: 'Rússia' },
      { value: 'japan', label: 'Japão' },
      { value: 'germany', label: 'Alemanha' },
      { value: 'france', label: 'França' },
      { value: 'canada', label: 'Canadá' },
      { value: 'australia', label: 'Austrália' },
      { value: 'south_korea', label: 'Coreia do Sul' },
      { value: 'mexico', label: 'México' },
      { value: 'egypt', label: 'Egito' },
      { value: 'south_africa', label: 'África do Sul' },
      { value: 'turkey', label: 'Turquia' },
      { value: 'nigeria', label: 'Nigéria' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'italy', label: 'Itália' },
      { value: 'spain', label: 'Espanha' },
      { value: 'saudi_arabia', label: 'Arábia Saudita' },
    ],
    enableSearchByValue: true,
    autocomplete: true,
    autocompleteClearOnFocus: true,
    autocompleteIconLeft: true,
  },
};

export const Multiple = {
  args: {
    options: [
      { value: '', label: 'Select some countries' },
      { value: 'united_states', label: 'Estados Unidos' },
      { value: 'brazil', label: 'Brasil' },
      { value: 'china', label: 'China' },
      { value: 'india', label: 'Índia' },
      { value: 'russia', label: 'Rússia' },
      { value: 'japan', label: 'Japão' },
      { value: 'germany', label: 'Alemanha' },
      { value: 'france', label: 'França' },
      { value: 'canada', label: 'Canadá' },
      { value: 'australia', label: 'Austrália' },
      { value: 'south_korea', label: 'Coreia do Sul' },
      { value: 'mexico', label: 'México' },
      { value: 'egypt', label: 'Egito' },
      { value: 'south_africa', label: 'África do Sul' },
      { value: 'turkey', label: 'Turquia' },
      { value: 'nigeria', label: 'Nigéria' },
      { value: 'argentina', label: 'Argentina' },
      { value: 'italy', label: 'Itália' },
      { value: 'spain', label: 'Espanha' },
      { value: 'saudi_arabia', label: 'Arábia Saudita' },
    ],
    multiple: true,
    multipleWithoutSelectsMessage: 'No country selected yet :(',
  },
};

export const Secondary = TemplateSecondary.bind({});
Secondary.args = {
  type: 'secondary',
  options: [
    { value: '', label: 'Select some option' },
    { value: '5', label: 'Option 5' },
    { value: '3', label: 'Option 3' },
    { value: '1', label: 'Option 1' },
    { value: '4', label: 'Option 4' },
    { value: '2', label: 'Option 2' },
    { value: '6', label: 'Option 6' },
    { value: '7', label: 'Option 7' },
  ],
};

/**
 * Infinite Scroll Example
 *
 * This story demonstrates the infinite scroll feature.
 * Scroll to the bottom of the options list to load more items.
 *
 * Features:
 * - Loads 20 items per page
 * - Simulates API delay (500ms)
 * - Shows loading state while fetching
 * - Stops loading when reaching the last page (5 pages total = 100 items)
 * - Works with autocomplete and search
 */
export const InfiniteScroll = {
  render: (args) => ({
    components: {
      unnnicFormElement,
      unnnicSelectSmart,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        selectedOptions: [],
        options: [],
        currentPage: 1,
        totalPages: 5,
        itemsPerPage: 20,
      };
    },
    computed: {
      hasMoreData() {
        return this.currentPage <= this.totalPages;
      },
    },
    mounted() {
      this.loadInitialOptions();
    },
    methods: {
      async loadInitialOptions() {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const newOptions = Array.from({ length: this.itemsPerPage }, (_, i) => {
          const itemNumber = (this.currentPage - 1) * this.itemsPerPage + i + 1;
          return {
            value: `item-${itemNumber}`,
            label: `Item ${itemNumber}`,
            description: `Description for item ${itemNumber}`,
          };
        });

        this.options.push(...newOptions);
        this.currentPage++;
      },
      async handleScrollEnd() {
        if (!this.hasMoreData) {
          this.$refs.selectSmart?.finishInfiniteScroll();
          return;
        }

        try {
          await new Promise((resolve) => setTimeout(resolve, 500));

          const newOptions = Array.from(
            { length: this.itemsPerPage },
            (_, i) => {
              const itemNumber =
                (this.currentPage - 1) * this.itemsPerPage + i + 1;
              return {
                value: `item-${itemNumber}`,
                label: `Item ${itemNumber}`,
                description: `Description for item ${itemNumber}`,
              };
            },
          );

          this.options.push(...newOptions);
          this.currentPage++;
        } catch (error) {
          console.error('Error loading options:', error);
        } finally {
          this.$refs.selectSmart?.finishInfiniteScroll();
        }
      },
    },
    template: `
        <unnnicFormElement label="Select with Infinite Scroll" message="Try scrolling to the bottom of the list">
          <unnnicSelectSmart
            ref="selectSmart"
            v-model="selectedOptions"
            :options="options"
            :infinite-scroll="true"
            :infinite-scroll-distance="20"
            :infinite-scroll-can-load-more="() => hasMoreData"
            :autocomplete="true"
            :autocomplete-icon-left="true"
            :autocomplete-clear-on-focus="true"
            multiple
            @scroll-end="handleScrollEnd"
          />
        </unnnicFormElement>
    `,
  }),
};

/**
 * Infinite Scroll Simple Example
 *
 * A simpler version without multiple selection and descriptions.
 * Useful for single selection scenarios.
 */
export const InfiniteScrollSimple = {
  render: (args) => ({
    components: {
      unnnicFormElement,
      unnnicSelectSmart,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        selectedOption: [],
        options: [],
        currentPage: 1,
        totalPages: 3,
      };
    },
    mounted() {
      this.loadInitialOptions();
    },
    methods: {
      async loadInitialOptions() {
        await new Promise((resolve) => setTimeout(resolve, 300));

        const newOptions = Array.from({ length: 15 }, (_, i) => {
          const itemNumber = (this.currentPage - 1) * 15 + i + 1;
          return {
            value: `option-${itemNumber}`,
            label: `Option ${itemNumber}`,
          };
        });

        this.options.push(...newOptions);
        this.currentPage++;
      },
      async handleScrollEnd() {
        if (this.currentPage > this.totalPages) {
          this.$refs.selectSmart?.finishInfiniteScroll();
          return;
        }

        try {
          await new Promise((resolve) => setTimeout(resolve, 400));

          const newOptions = Array.from({ length: 15 }, (_, i) => {
            const itemNumber = (this.currentPage - 1) * 15 + i + 1;
            return {
              value: `option-${itemNumber}`,
              label: `Option ${itemNumber}`,
            };
          });

          this.options.push(...newOptions);
          this.currentPage++;
        } catch (error) {
          console.error('Error:', error);
        } finally {
          this.$refs.selectSmart?.finishInfiniteScroll();
        }
      },
    },
    template: `
      <unnnicFormElement label="Simple Infinite Scroll">
        <unnnicSelectSmart
          ref="selectSmart"
          v-model="selectedOption"
          :options="options"
          :infinite-scroll="true"
          :infinite-scroll-distance="10"
          :infinite-scroll-can-load-more="() => currentPage <= totalPages"
          :autocomplete="true"
          @scroll-end="handleScrollEnd"
        />
      </unnnicFormElement>
    `,
  }),
};
