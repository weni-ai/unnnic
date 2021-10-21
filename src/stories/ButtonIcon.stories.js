import unnnicButtonIcon from '../components/Button/ButtonIcon.vue';
import icons from '../utils/icons';

const iconsOptions = Object.keys(icons);

export default {
  title: 'Example/ButtonIcon',
  component: unnnicButtonIcon,
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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: {
    unnnicButtonIcon,
  },
  template: `
    <unnnic-button-icon v-bind="$props" />
  `,
});

export const Normal = Template.bind({});
Normal.args = {
  size: 'small',
  icon: iconsOptions[0],
};
