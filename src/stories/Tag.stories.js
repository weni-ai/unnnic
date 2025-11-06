import UnnnicTag from '../components/Tag/Tag.vue';
import colorsList from '../utils/colorsList';

export default {
  title: 'Data Display/Tag',
  component: UnnnicTag,
  tags: ['autodocs'],
  argTypes: {
    text: { control: { type: 'text' } },
    type: {
      control: 'select',
      options: ['default', 'brand', 'next'],
    },
    scheme: {
      control: {
        type: 'select',
        options: colorsList,
      },
    },
    size: {
      control: 'select',
      options: ['small', 'medium'],
    },
    hasCloseIcon: { control: 'boolean' },
    leftIcon: {
      control: 'select',
      options: [null, 'check_circle', 'sentiment_satisfied'],
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

export const Small = {
  args: {
    text: 'Label',
    type: 'default',
    size: 'small',
  },
};
