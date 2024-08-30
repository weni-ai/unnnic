import UnnnicChatsDashboardTagLive from '../components/ChatsDashboardTagLive/ChatsDashboardTagLive.vue';

export default {
  title: 'Chats/DashboardTagLive',
  component: UnnnicChatsDashboardTagLive,
  tags: ['autodocs'],
  argTypes: {
    locale: {
      control: {
        type: 'select',
        options: ['pt-br', 'en', 'es'],
      },
    },
  },
};

export const Default = { args: {} };
