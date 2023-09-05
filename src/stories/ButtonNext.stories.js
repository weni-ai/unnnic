import unnnicButtonNext from '../components/ButtonNext/ButtonNext.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/ButtonNext',
  component: unnnicButtonNext,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary', 'terciary', 'ghost', 'warning'] } },
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
  components: { unnnicButtonNext },
  template: '<unnnic-button-next v-bind="$props" />',
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

export const Ghost = Template.bind({});
Ghost.args = {
  type: 'ghost',
  text: 'Button Text',
  disabled: false,
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  text: 'Button Text',
  disabled: false,
};

export const withIcon = Template.bind({});
withIcon.args = {
  text: 'Button Text',
  iconLeft: 'developer-community-github-1-1',
};
