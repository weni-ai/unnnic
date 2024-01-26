import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Button',
  component: unnnicButton,
  argTypes: {
    type: {
      control: { type: 'select', },
      options: ['primary', 'secondary', 'tertiary', 'alternative', 'warning', 'attention'],
    },
    size: {
      control: { type: 'select', },
      options: ['large', 'small'],
    },
    text: { control: { type: 'text' } },
    iconLeft: {
      control: { type: 'select', },
      options: [null, ...iconList],
    },
    iconCenter: {
      control: { type: 'select', },
      options: [null, ...iconList],
    },
    iconRight: {
      control: { type: 'select', },
      options: [null, ...iconList],
    },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
};

export const Primary = {
  args: {
    text: 'Button Text',
    disabled: false,
  },
};

export const Secondary = {
  args: {
    type: 'secondary',
    text: 'Button Text',
    disabled: false,
  },
};

export const Tertiary = {
  args: {
    type: 'tertiary',
    text: 'Button Text',
    disabled: false,
  },
};

export const WithIcon = {
  args: {
    text: 'Button Text',
    iconLeft: 'developer-community-github-1-1',
  },
};

export const OnlyIcon = {
  args: {
    iconCenter: 'add-1',
  },
};

export const Alternative = {
  args: {
    type: 'alternative',
    iconLeft: 'add',
    text: 'Text',
  },
};

export const Warning = {
  args: {
    type: 'warning',
    iconLeft: 'add-1',
    text: 'Text',
  },
};

export const Attention = {
  args: {
    type: 'attention',
    iconLeft: 'add-1',
    text: 'Text',
  },
};
