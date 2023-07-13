import AvatarIcon from '../components/AvatarIcon/AvatarIcon.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

const schemes = [
  'feedback-red',
  'feedback-green',
  'feedback-yellow',
  'feedback-blue',
  'feedback-grey',
  'aux-blue',
  'aux-purple',
  'aux-orange',
  'aux-lemon',
  'aux-pink',
];

export default {
  title: 'Example/AvatarIcon',
  component: AvatarIcon,
  argTypes: {
    enabled: { control: 'boolean' },
    icon: { control: 'select', options: iconsOptions },
    size: {
      control: 'select',
      options: ['nano', 'xs', 'sm', 'lg', 'xl'],
    },
    scheme: { control: 'select', options: schemes },
  },
};

export const Normal = {
  args: {},
};
