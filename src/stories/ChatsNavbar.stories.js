/* eslint-disable no-alert */
import unnnicChatsNavbar from '../components/ChatsNavbar/ChatsNavbar.vue';

export default {
  title: 'Chats/Navbar',
  component: unnnicChatsNavbar,
  argTypes: {
    links: [
      {
        icon: 'add-1',
        action: () => {},
      },
    ],
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsNavbar },
  template: '<unnnic-chats-navbar v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  links: [
    {
      name: 'house',
      icon: {
        default: 'house-1-1',
        selected: 'house-2-2',
      },
      action: () => {},
    },
    {
      name: 'messaging',
      icon: {
        default: 'messaging-we-chat-3',
        selected: 'messaging-we-chat-2',
      },
      action: () => {},
    },
    {
      name: 'folder',
      icon: {
        default: 'folder-1',
        selected: 'folder-2',
      },
      action: () => {},
    },
    {
      name: 'gauge',
      icon: {
        default: 'gauge-dashboard-2',
        selected: 'gauge-dashboard-1',
      },
      action: () => {},
    },
    {
      name: 'cog',
      icon: {
        default: 'cog-1',
        selected: 'cog-2',
      },
      action: () => {},
    },
  ],
  initialLink: 'house',
};
