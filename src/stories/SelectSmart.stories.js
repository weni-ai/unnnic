import unnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';

export default {
  title: 'select/SelectSmart',
  component: unnnicSelectSmart,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    orderedByIndex: { control: { type: 'boolean' } },
    autocomplete: { control: { type: 'boolean' } },
    autocompleteIconLeft: { control: { type: 'boolean' } },
    autocompleteClearOnFocus: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelectSmart },
  data() {
    return {
      exampleValue: '',
    };
  },

  methods: {
    addDynamicOption() {
      const value = Math.floor(Math.random() * 1e3);

      this.exampleOptions.push({
        value: `option${value}`,
        label: `Option ${value}`,
      });
    },
  },

  template: `
    <div>
    <unnnic-select-smart
      v-model="exampleValue"
      :options="exampleOptions"
      v-bind="$props"
    />

    <button v-if="!(disabled || autocomplete)" @click="addDynamicOption">Add dynamic option</button>

    <p v-if="!disabled">v-model: {{exampleValue}}</p>
    </div>
  `,
});

const exampleOptionsDefault = [
  { value: '', label: 'Select some option' },
  { value: '5', label: 'Option 5' },
  { value: '3', label: 'Option 3' },
  { value: '1', label: 'Option 1' },
  { value: '4', label: 'Option 4' },
  { value: '2', label: 'Option 2' },
];

const exampleOptionsWithDescriptions = [
  { value: '', label: 'Select some option' },
  { value: '1', label: 'Option 1', description: 'This is the first option' },
  { value: '2', label: 'Option 2', description: 'Another alternative you can consider' },
  { value: '3', label: 'Option 3', description: 'A third option for your consideration' },
  { value: '4', label: 'Option 4', description: 'Yet another choice among the options' },
  { value: '5', label: 'Option 5', description: 'The last option available for selection' },
];

const exampleOptionsCountries = [
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
];

const exampleOptionsFirstSelected = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
  { value: '4', label: 'Option 4' },
  { value: '5', label: 'Option 5' },
  { value: '5', label: 'Option 5' },
];

export const Default = Template.bind({});
Default.args = {
  exampleOptions: exampleOptionsDefault,
};

export const FirstSelected = Template.bind({});
FirstSelected.args = {
  exampleOptions: exampleOptionsFirstSelected,
};

export const OrderedByIndex = Template.bind({});
OrderedByIndex.args = {
  exampleOptions: exampleOptionsDefault,
  orderedByIndex: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const WithDescriptions = Template.bind({});
WithDescriptions.args = {
  exampleOptions: exampleOptionsWithDescriptions,
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  exampleOptions: exampleOptionsCountries,
  autocomplete: true,
};

export const Multiple = Template.bind({});
Multiple.args = {
  exampleOptions: exampleOptionsCountries,
  autocomplete: true,
  multiple: true,
};
