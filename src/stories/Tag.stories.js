import unnnicTag from '../components/Tag/Tag.vue';
import colorsList from '../utils/colorsList';

export default {
  title: 'Example/Tag',
  component: unnnicTag,
  argTypes: {
    text: { control: { type: 'text' } },
    type: { control: { type: 'select', options: ['default', 'indicator', 'brand'] } },
    scheme: {
      control: {
        type: 'select',
        options: colorsList,
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
