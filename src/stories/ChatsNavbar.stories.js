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

export const Default = {
  render: (args) => ({
    components: { unnnicChatsNavbar },
    setup() {
      return { args };
    },
    template:
      '<unnnic-chats-navbar v-bind="args" v-model="args.selectedLink" />',
  }),
  args: {
    selectedLink: 'home',
    links: [
      {
        name: 'home',
        icon: 'home',
        action: () => {},
      },
      {
        name: 'forum',
        icon: 'forum',
        action: () => {},
      },
      {
        name: 'folder',
        icon: {
          default: 'folder',
          selected: 'folder',
        },
        action: () => {},
      },
      {
        name: 'speed',
        icon: {
          default: 'speed',
          selected: 'speed',
        },
        action: () => {},
      },
      {
        name: 'settings',
        icon: {
          default: 'settings',
          selected: 'settings',
        },
        action: () => {},
      },
    ],
  },
};
