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
      <p>modelValue: {{ exampleValue }}</p>
      <unnnic-select v-model="exampleValue" v-bind="args" @update:search="handleSearch" />
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
