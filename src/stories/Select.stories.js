import unnnicSelect from '../components/Select/Select.vue';

export default {
  title: 'example/Select',
  component: unnnicSelect,
  argTypes: {
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
    search: { control: { type: 'boolean' } },
    searchIconLeft: { control: { type: 'text' } },
    searchPlaceholder: { control: { type: 'text' } },
    optionsHeader: { control: { type: 'array' } },
    hasCloudyColor: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicSelect },
  data() {
    return {
      value: '1',
      options: [
        { value: '', text: 'None' },
        { value: '1', text: 'option1' },
        { value: '2', text: 'option2' },
        { value: '3', text: 'option3' },
        { value: '4', text: 'option4' },
        { value: '5', text: 'option5' },
      ],
    };
  },

  methods: {
    addDynamicOption() {
      const value = Math.floor(Math.random() * 1e3);

      this.options.push({
        value: value.toString(),
        text: `option ${value}`,
      });
    },
  },

  // eslint-disable-next-line no-multi-str
  template: '<div><unnnicSelect v-model="value" v-bind="$props"> \
    <div slot="header"> header </div>\
    <option v-for="option in options" :value="option.value">{{ option.text }}</option> \
  </unnnicSelect><button @click="addDynamicOption">Add dynamic option</button></div>',
});

export const Medium = Template.bind({});

Medium.args = {
  searchPlaceholder: 'Buscar por...',
  optionsHeader: [
    {
      text: '+ Criar novo projeto',
      click() { console.log('clicked'); },
    },
  ],
};
