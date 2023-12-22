import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Button',
  component: unnnicButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary', 'tertiary', 'alternative', 'warning'] } },
    size: { control: { type: 'select', options: ['large', 'small'] } },
    text: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: [null, ...iconList] } },
    iconCenter: { control: { type: 'select', options: [null, ...iconList] } },
    iconRight: { control: { type: 'select', options: [null, ...iconList] } },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicButton },
  template: '<unnnic-button v-bind="$props" />',
});

export const Primary = Template.bind({});
Primary.args = {
  text: 'Button Text',
  disabled: false,
};

export const Secondary = Template.bind({});
Secondary.args = {
  type: 'secondary',
  text: 'Button Text',
  disabled: false,
};

export const Tertiary = Template.bind({});
Tertiary.args = {
  type: 'tertiary',
  text: 'Button Text',
  disabled: false,
};

export const WithIcon = Template.bind({});
WithIcon.args = {
  text: 'Button Text',
  iconLeft: 'developer-community-github-1-1',
};

export const OnlyIcon = Template.bind({});
OnlyIcon.args = {
  iconCenter: 'add-1',
};
