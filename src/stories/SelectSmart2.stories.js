import unnnicSelectSmart from '../components/SelectSmart/SelectSmart.vue';

export default {
  title: 'Form/SelectSmart2',
  component: unnnicSelectSmart,
  argTypes: {
    'on-update:model-value': { action: '@update:model-value' },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
    type: { control: { type: 'select', options: ['normal', 'error'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicSelectSmart,
  },

  data() {
    return {
      selected: [],
      options: [
        {
          value: 't1',
          label: 'teste 1'
        },
        {
          value: 't2',
          label: 'teste 2'
        },
        {
          value: 't3',
          label: 'teste 3'
        },
      ]
    };
  },

  template: `
    <div>
      <pre>v-model: {{ content }}</pre>
      <unnnic-select-smart :options="options" v-model="selected" multiple/>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  label: 'Label',
  placeholder: 'Placeholder',
  maxLength: 150,
  disabled: false,
  type: 'normal',
  errors: [],
};
