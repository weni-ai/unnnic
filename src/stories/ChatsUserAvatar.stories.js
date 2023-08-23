import unnnicChatsUserAvatar from '../components/ChatsUserAvatar/ChatsUserAvatar.vue';

export default {
  title: 'Chats/UserAvatar',
  component: unnnicChatsUserAvatar,
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'ant', 'md', 'lg', 'xl', '2xl'],
      },
    },
  },
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsUserAvatar },
  template: '<unnnic-chats-user-avatar v-bind="$props"/>',
});

export const Default = Template.bind({});
Default.args = {
  username: 'John Doe',
};

export const Agent = Template.bind({});
Agent.args = {
  username: 'Agent',
};

export const Bot = Template.bind({});
Bot.args = {
  username: 'Bot',
};
