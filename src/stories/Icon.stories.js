import Icon from '../components/Icon.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Icon',
  component: Icon,
  argTypes: {
    icon: {
      control: {
        type: 'select',
        options: iconList,
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Icon },
  template: '<icon v-bind="$props"/>',
});

export const Normal = Template.bind({});
