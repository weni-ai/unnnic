import UnnnicButtonIcon from '../components/Button/ButtonIcon.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

export default {
  title: 'Form/ButtonIcon',
  component: UnnnicButtonIcon,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['small', 'large'],
      },
    },

    icon: {
      control: {
        type: 'select',
        options: iconsOptions,
      },
    },
  },
};

export const Normal = {
  args: {
    size: 'small',
    icon: iconsOptions[0],
  },
};
