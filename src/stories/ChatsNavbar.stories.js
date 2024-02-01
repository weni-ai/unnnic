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
  data() {
    return {
      selectedLink: 'home',
    };
  },
  template: '<unnnic-chats-navbar v-bind="$props" v-model="selectedLink"/>',
});

export const Default = Template.bind({});
Default.args = {
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
};
