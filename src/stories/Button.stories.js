import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Button',
  component: unnnicButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary', 'terciary'] } },
    size: { control: { type: 'select', options: ['large', 'small'] } },
    text: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: [null, ...iconList] } },
    iconRight: { control: { type: 'select', options: [null, ...iconList] } },
    disabled: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicButton },
  template: '<unnnicButton v-bind="$props" />',
});

export const Normal = Template.bind({});
Normal.args = {
  text: 'Button text',
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  text: 'Button Text',
  disabled: false,
};

export const Terciary = Template.bind({});
Terciary.args = {
  type: 'terciary',
  text: 'Button Text',
  disabled: false,
};

export const withIcon = Template.bind({});
withIcon.args = {
  text: 'Button Text',
  iconLeft: 'developer-community-github-1-1',
};
