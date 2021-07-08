import AvatarIcon from '../components/AvatarIcon/AvatarIcon.vue';

export default {
  title: 'Example/AvatarIcon',
  component: AvatarIcon,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['nano', 'xs', 'sm', 'lg', 'xl'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { AvatarIcon },
  template: '<avatar-icon v-bind="$props"/>',
});

export const Normal = Template.bind({});
Normal.args = {
};
