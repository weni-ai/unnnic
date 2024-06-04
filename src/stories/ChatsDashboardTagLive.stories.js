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

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsDashboardTagLive },
  template: '<unnnic-chats-dashboard-tag-live v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {};
