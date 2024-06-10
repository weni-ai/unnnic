import UnnnicRadio from '../components/Radio/Radio.vue';

export default {
  title: 'Form/Radio',
  component: UnnnicRadio,
  argTypes: {
    value: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
    size: { control: { type: 'select', options: ['md', 'sm'] } },
  },
  render: (args) => ({
    components: {
      UnnnicRadio,
    },
    setup() {
      return { args };
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

        <unnnic-radio v-bind="args" v-model="insideValue" value="option 1">
          Option 1
        </unnnic-radio>

        <unnnic-radio v-bind="args" v-model="insideValue" value="option 2">
          Option 2
        </unnnic-radio>

        <unnnic-radio v-bind="args" v-model="insideValue" value="option 3">
          Option 3
        </unnnic-radio>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    disabled: false,
    size: 'md',
  },
};
