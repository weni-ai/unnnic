import unnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';

export default {
  title: 'select/SelectSmart',
  component: unnnicSelectSmart,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
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
      <unnnic-select-smart v-model="exampleValue" :options="exampleOptions" v-bind="$props" />


      <button v-if="!disabled" @click="addDynamicOption">Add dynamic option</button>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  exampleOptions: [
    { value: '', label: 'Select some option' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
  ],
};

export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};

export const WithDescriptions = Template.bind({});
WithDescriptions.args = {
  exampleOptions: [
    { value: '', label: 'Select some option' },
    { value: '1', label: 'Option 1', description: 'This is the first option' },
    { value: '2', label: 'Option 2', description: 'Another alternative you can consider' },
    { value: '3', label: 'Option 3', description: 'A third option for your consideration' },
    { value: '4', label: 'Option 4', description: 'Yet another choice among the options' },
    { value: '5', label: 'Option 5', description: 'The last option available for selection' },
  ],
};

export const Autocomplete = Template.bind({});
Autocomplete.args = {
  exampleOptions: [
    { value: '', label: 'Select some option' },
    { value: '1', label: 'Option 1' },
    { value: '2', label: 'Option 2' },
    { value: '3', label: 'Option 3' },
    { value: '4', label: 'Option 4' },
    { value: '5', label: 'Option 5' },
  ],
  autocomplete: true,
};
