import unnnicAutocompleteSelect from '../components/AutocompleteSelect/AutocompleteSelect.vue';

export default {
  title: 'Form/AutocompleteSelect',
  component: unnnicAutocompleteSelect,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicAutocompleteSelect,
  },

  data() {
    return {
      selecteds: [],
    };
  },

  template: `
    <div>
      <!--<pre>v-model: {{ selecteds }}</pre>-->
      <unnnic-autocomplete-select v-bind="$props" v-model="selecteds">
      </unnnic-autocomplete-select>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  items: [
    { value: 'Item 1', text: 'Item 1' },
    { value: 'Item 2', text: 'Item 2' },
    { value: 'Item 3', text: 'Item 3' },
    { value: 'Item 4', text: 'Item 4' },
    { value: 'Item 5', text: 'Item 5' },
    { value: 'Item 6', text: 'Item 6' },
    { value: 'Item 7', text: 'Item 7' },
  ],
};
