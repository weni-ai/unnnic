import unnnicRadio from '../components/Radio/Radio.vue';

export default {
  title: 'Form/Radio',
  component: unnnicRadio,
  argTypes: {
    'on-update:model-value': { action: '@update:model-value' },
    value: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes).concat(['input']),
  components: {
    unnnicRadio,
  },
  data() {
    return {
      insideValue: 'option 1',
    };
  },
  template: `
    <div>
      v-model: {{ insideValue }}
      <br>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 1">
        Option 1
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 2">
        Option 2
      </unnnic-radio>

      <unnnic-radio v-bind="$props" v-model="insideValue" value="option 3">
        Option 3
      </unnnic-radio>
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  disabled: false,
  size: 'md',
};
