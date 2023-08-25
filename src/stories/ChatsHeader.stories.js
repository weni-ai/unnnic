/* eslint-disable no-alert */
import unnnicChatsHeader from '../components/ChatsHeader/ChatsHeader.vue';

export default {
  title: 'Chats/Header',
  component: unnnicChatsHeader,
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['pt-br', 'en', 'es'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsHeader },
  template: '<unnnic-chats-header v-bind="$props"/>',
});

const title = 'Lorem Ipsum Inc.';
const back = () => alert('back');
const close = () => alert('close');

const defaultArgs = { title, back, close };

export const Contact = Template.bind({});
Contact.args = {
  ...defaultArgs,
  title: 'John Doe',
  type: 'contact',
};

export const Dashboard = Template.bind({});
Dashboard.args = {
  ...defaultArgs,
  type: 'dashboard',
  crumbs: [
    {
      name: 'Chats',
      path: 'chats',
    },
    {
      name: 'Dashboard',
      path: 'dashboard',
    },
  ],
};

export const History = Template.bind({});
History.args = {
  ...defaultArgs,
  type: 'history',
  crumbs: [
    {
      name: 'Chats',
      path: 'chats',
    },
    {
      name: 'Histórico',
      path: 'dashboard',
    },
  ],
};
