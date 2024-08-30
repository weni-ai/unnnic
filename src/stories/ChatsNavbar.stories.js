import UnnnicChatsNavbar from '../components/ChatsNavbar/ChatsNavbar.vue';

export default {
  title: 'Chats/Navbar',
  component: UnnnicChatsNavbar,
  tags: ['autodocs'],
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
    components: { UnnnicChatsNavbar },
    setup() {
      return { args };
    },
    template: '<UnnnicChatsNavbar v-bind="args" v-model="args.selectedLink" />',
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
