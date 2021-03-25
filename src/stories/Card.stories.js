import Card from '../components/Card/Card.vue';
import iconList from '../utils/iconList';

export default {
  title: 'Example/Card',
  component: Card,
  argTypes: {
    enabled: { control: { type: 'select', options: [true, false] } },
    infoPosition: { control: { type: 'select', options: ['top', 'right', 'bottom', 'left'] } },
    type: { control: { type: 'select', options: ['title', 'dash', 'account', 'status', 'default', 'blank'] } },
    icon: { control: { type: 'select', options: iconList } },
    scheme: {
      control: {
        type: 'select',
        options: ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'],
      },
    },
  },
};

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
  hasInformationIcon: true,
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
};

export const Default = Template.bind({});
Default.args = {
  type: 'default',
  title: 'This is the title',
  description: 'This is the description',
};

export const Blank = Template.bind({});
Blank.args = {
  type: 'blank',
  text: 'This is the text',
};
