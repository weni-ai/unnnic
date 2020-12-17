import unnicButton from '../components/Button2/Button2.vue';

export default {
  title: 'Example/Button2',
  component: unnicButton,
  argTypes: {
    type: { control: { type: 'select', options: ['primary', 'secondary', 'terciary'] } },
    size: { control: { type: 'select', options: ['large', 'small'] } },
    text: { control: { type: 'text' } },
    iconLeft: { control: { type: 'select', options: [null, 'alarm-bell-2', 'read-email-at-1'] } },
    iconRight: { control: { type: 'select', options: [null, 'alarm-bell-2', 'read-email-at-1'] } },
    disabled: { control: { type: 'select', options: [true, false] } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnicButton },
  template: '<unnicButton v-bind="$props" />',
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
