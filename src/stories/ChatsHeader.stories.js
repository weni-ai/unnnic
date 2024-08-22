import UnnnicChatsHeader from '../components/ChatsHeader/ChatsHeader.vue';
import UnnnicChatsDashboardTagLive from '../components/ChatsDashboardTagLive/ChatsDashboardTagLive.vue';
import { action } from '@storybook/addon-actions';

export default {
  title: 'Chats/Header',
  component: UnnnicChatsHeader,
  tags: ['autodocs'],
  args: {
    onCrumbClick: () => action('crumb-click')(),
    back: () => action('back')(),
    close: () => action('close')(),
    titleClick: () => action('title-click')(),
    avatarClick: () => action('avatar-click')(),
  },
};

const size = window.innerWidth < 600 ? 'small' : 'large';

export const Contact = {
  args: {
    title: 'John Doe',
    avatarName: 'John Doe',
  },
};

export const ContactInfos = {
  args: {
    title: 'Contact information',
    subtitle: 'John Doe',
    avatarName: 'John Doe',
  },
};

export const Dashboard = {
  args: {
    title: size === 'large' ? 'Lorem Ipsum Inc.' : 'Dashboard',
    subtitle: size === 'large' ? 'Dashboard of project' : 'Lorem Ipsum Inc.',
    avatarIcon: 'graph-stats-1',
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
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsHeader, UnnnicChatsDashboardTagLive },
    template: `
      <UnnnicChatsHeader 
        v-bind="args" 
        @crumbClick="crumbClick"
      >
        <UnnnicChatsDashboardTagLive />
      </UnnnicChatsHeader>`,
  }),
};

export const History = {
  args: {
    title: size === 'large' ? 'Lorem Ipsum Inc.' : 'History',
    subtitle: size === 'large' ? 'History of project' : 'Lorem Ipsum Inc.',
    avatarIcon: 'task-list-clock-1',
    crumbs: [
      {
        name: 'Chats',
        path: 'chats',
      },
      {
        name: 'History',
        path: 'history',
      },
    ],
  },
};
