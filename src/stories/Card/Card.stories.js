import Card from '../../components/Card/Card.vue'

export default {
  title: 'Example/Card',
  component: Card,
}

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { Card },
  template: '<Card v-bind="$props"/>',
});

export const Title = Template.bind({});
Title.args = {
  type: 'title',
  title: 'This is the title',
  info: 'This is the info',
};

export const Dash = Template.bind({});
Dash.args = {
  type: 'dash',
  title: 'This is the title',
  value: 12345,
  percent: 15,
};

export const Status = Template.bind({});
Status.args = {
  type: 'status',
  title: 'This is the title',
  description: 'This is the description',
  status: 'This is the status',
};

export const Account = Template.bind({});
Account.args = {
  type: 'account',
  title: 'This is the title',
  description: 'This is the description',
  enabled: { control: { type: 'select', options: [true, false] } },
};

