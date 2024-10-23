import UnnnicTag from '../components/Tag/Tag.vue';
import colorsList from '../utils/colorsList';

export default {
  title: 'Data Display/Tag',
  component: UnnnicTag,
  tags: ['autodocs'],
  argTypes: {
    text: { control: { type: 'text' } },
    type: {
      control: { type: 'select', options: ['default', 'indicator', 'brand'] },
    },
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
  },
};

export const LeftIcon = {
  args: {
    text: 'Label',
    type: 'default',
    leftIcon: 'check_circle',
  },
};

export const RightIcon = {
  args: {
    text: 'Label',
    type: 'default',
    rightIcon: 'check_circle',
  },
};

export const CloseIcon = {
  args: {
    text: 'Label',
    type: 'default',
    hasCloseIcon: true,
  },
};

export const Indicator = {
  args: {
    text: 'Tag Name',
    type: 'indicator',
    count: 100,
    clickable: true,
    hasBackButton: false,
    enableTooltip: true,
    tooltipText: 'This is the amount',
  },
};

export const Brand = {
  args: {
    text: 'Settings',
    type: 'brand',
  },
};
