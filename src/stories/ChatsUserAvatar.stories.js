import UnnnicChatsUserAvatar from '../components/ChatsUserAvatar/ChatsUserAvatar.vue';

export default {
  title: 'Chats/UserAvatar',
  component: UnnnicChatsUserAvatar,
  args: {
    size: 'sm',
  },
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['xs', 'sm', 'ant', 'md', 'lg', 'xl', '2xl'],
      },
    },
  },
};

export const Default = {
  args: {
    username: 'John Doe',
  },
};

export const Agent = {
  args: {
    username: 'Agent',
  },
};

export const Bot = {
  args: {
    username: 'Bot',
  },
};
