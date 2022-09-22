import unnnicRadio from '../components/Radio/Radio.vue';

export default {
  title: 'Form/Radio',
  component: unnnicRadio,
  argTypes: {
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
      Inside value: {{ insideValue }}

      <unnnic-radio v-model="insideValue" value="option 1" v-bind="$props">
        Option 1
      </unnnic-radio>

      <unnnic-radio v-model="insideValue" value="option 2" v-bind="$props">
        Option 2
      </unnnic-radio>

      <unnnic-radio v-model="insideValue" value="option 3" v-bind="$props">
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
