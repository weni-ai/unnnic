import UnnnicSwitch from '../components/Switch/Switch.vue';

export default {
  title: 'Form/Switch',
  component: UnnnicSwitch,
  argTypes: {
    size: { control: { type: 'select', options: ['small', 'medium'] } },
    textLeft: { control: { type: 'text' } },
    textRight: { control: { type: 'text' } },
    disabled: { control: { type: 'boolean' } },
  },
  render: (args) => ({
    components: {
      UnnnicSwitch,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        value: true,
      };
    },
    template: `
      <div>
        <UnnnicSwitch v-bind="args" v-model="value"/> 
        <div>{{value}}</div>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    size: 'medium',
    textRight: 'Default',
    disabled: false,
  },
};
