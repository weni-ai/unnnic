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

export const Default = {
  args: {
    text: 'Label',
    type: 'default',
  }
}

export const Indicator = {
  args: {
    text: 'Tag Name',
    type: 'indicator',
    count: 100,
    clickable: true,
    hasBackButton: false,
    enableTooltip: true,
    tooltipText: 'This is the amount',
  }
}

export const Brand = {
  args: {
    text: 'Settings',
    type: 'brand',
  }
}
