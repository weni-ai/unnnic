/* eslint-disable no-alert */
import unnnicChatsDashboardTagLive from '../components/ChatsDashboardTagLive/ChatsDashboardTagLive.vue';

export default {
  title: 'Chats/DashboardTagLive',
  component: unnnicChatsDashboardTagLive,
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
