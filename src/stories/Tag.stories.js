import unnnicTag from '../components/Tag/Tag.vue';

export default {
  title: 'Example/Tag',
  component: unnnicTag,
  argTypes: {
    text: { control: { type: 'text' } },
    type: { control: { type: 'select', options: ['default', 'indicator', 'brand'] } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicTag },
  template: '<unnnic-tag v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  text: 'Label',
  type: 'default',
};

export const Indicator = Template.bind({});
Indicator.args = {
  text: 'Tag Name',
  type: 'indicator',
  count: 100,
  clickable: true,
  hasBackButton: false,
  enableTooltip: true,
  tooltipText: 'This is the amount',
};

export const Brand = Template.bind({});
Brand.args = {
  text: 'Settings',
  type: 'brand',
};
