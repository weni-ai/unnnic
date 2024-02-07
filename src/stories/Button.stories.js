import unnnicButton from '../components/Button/Button.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Form/Button',
  component: unnnicButton,
  argTypes: {
    type: {
      control: {
        type: 'select',
        options: ['primary', 'secondary', 'tertiary', 'alternative', 'warning', 'attention'],
      },
    },
    size: {
      control: { type: 'select', options: ['extra-large', 'large', 'small'] },
      defaultValue: 'large',
    },
    text: { control: { type: 'text' } },
    float: { control: { type: 'boolean' } },
    iconLeft: { control: { type: 'select', options: [null, ...iconList] } },
    iconCenter: { control: { type: 'select', options: [null, ...iconList] } },
    iconRight: { control: { type: 'select', options: [null, ...iconList] } },
    iconFilled: { control: { type: 'boolean' } },
    next: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicButton },
  template: '<unnnic-button v-bind="$props" />',
});
const TemplateFloat = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicButton },
  template: `
  <div>
    <unnnic-button v-bind="$props" />

    When to use this variation: <br/>
    When there is a need to present a main action above a list of contents. <br/>
    It is important that the component is always floating over the content and fixed to the bottom right side.

    <br/>
    <br/>

    <p v-for="item in 50" :key="item">Scroll <br/></p>
  </div>
  `,
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

export const Alternative = Template.bind({});
Alternative.args = {
  type: 'alternative',
  iconLeft: 'add',
  text: 'Text',
};

export const Warning = Template.bind({});
Warning.args = {
  type: 'warning',
  iconLeft: 'add-1',
  text: 'Text',
};

export const Attention = Template.bind({});
Attention.args = {
  type: 'attention',
  iconLeft: 'add-1',
  text: 'Text',
};

export const Float = TemplateFloat.bind({});
Float.args = {
  type: 'primary',
  iconCenter: 'add',
  float: true,
};
