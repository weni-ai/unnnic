import AvatarIcon from '../components/AvatarIcon/AvatarIcon.vue';

const iconsOptions = [];

const schemes = [
  'feedback-red',
  'feedback-green',
  'feedback-yellow',
  'feedback-blue',
  'feedback-grey',
  'aux-blue',
  'aux-blue-500',
  'aux-green-500',
  'aux-purple',
  'aux-purple-500',
  'aux-orange',
  'aux-orange-500',
  'aux-lemon',
  'aux-red-500',
  'aux-pink',
];

export default {
  title: 'Data Display/AvatarIcon',
  component: AvatarIcon,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Visual element used to represent a user, entity or object in digital interfaces.`,
      },
    },
  },
  args: {
    enabled: true,
    icon: 'graph-stats-1',
    size: 'sm',
    scheme: 'aux-blue',
    filled: false,
    opacity: false,
  },
  argTypes: {
    enabled: { control: 'boolean' },
    icon: { control: 'select', options: iconsOptions },
    size: {
      control: 'select',
      options: ['nano', 'xs', 'sm', 'lg', 'xl'],
    },
    scheme: { control: 'select', options: schemes },
    filled: { control: 'boolean' },
    opacity: { control: 'boolean' },
  },
};

export const Normal = {
  args: {},
};
