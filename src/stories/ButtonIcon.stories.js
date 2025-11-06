import UnnnicButtonIcon from '../components/Button/ButtonIcon.vue';

const iconsOptions = ['add'];

export default {
  title: 'Form/ButtonIcon',
  component: UnnnicButtonIcon,
  tags: ['autodocs'],
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
