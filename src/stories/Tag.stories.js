import UnnnicTag from '../components/Tag/Tag.vue';

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
      control: 'select',
      options: [
        'green',
        'blue',
        'purple',
        'red',
        'orange',
        'yellow',
        'gray',
        'teal',
      ],
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
