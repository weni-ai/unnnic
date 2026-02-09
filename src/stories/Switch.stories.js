import UnnnicSwitch from '../components/Switch/Switch.vue';

export default {
  title: 'Form/Switch',
  component: UnnnicSwitch,
  argTypes: {
    label: { control: { type: 'text' } },
    labelTooltip: { control: { type: 'object' } },
    option: { control: { type: 'text' } },
    helper: { control: { type: 'text' } },
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
        <UnnnicSwitch v-bind="args" v-model="value">
          <template #suffix>Slot content</template>
        </UnnnicSwitch> 
        <div>{{value}}</div>
      </div>
    `,
  }),
};

export const Default = {
  args: {
    label: 'Default',
    labelTooltip: {
      text: 'Tooltip',
    },
    option: 'Option',
    helper: 'Helper text',
    disabled: false,
  },
};
