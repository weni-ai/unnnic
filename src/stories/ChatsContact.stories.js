import unnnicChatsContact from '../components/ChatsContact/ChatsContact.vue';
import { setup } from '@storybook/vue3';
import i18n from '@/utils/plugins/i18n';

setup((app) => {
  app.use(i18n);
});

export default {
  title: 'Chats/Contact',
  component: unnnicChatsContact,
  tags: ['autodocs'],
};

const defaultArgs = {
  title: 'John Doe',
  lastMessage:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel.',
};
const unreadMessages = 5;
const waitingTime = 10;

export const Default = {
  args: {
    ...defaultArgs,
    unreadMessages,
  },
};

export const Selected = {
  args: {
    ...defaultArgs,
    selected: true,
  },
};

export const SelectedWithCheckbox = {
  args: {
    ...defaultArgs,
    selected: true,
    checkboxWhenSelect: true,
  },
};

export const Read = {
  args: {
    ...defaultArgs,
  },
};

export const Waiting = {
  args: {
    ...defaultArgs,
    waitingTime,
    unreadMessages,
  },
};

export const WaitingRead = {
  args: {
    ...defaultArgs,
    waitingTime,
  },
};

export const Discussion = {
  args: {
    ...defaultArgs,
    title: 'Lorem ipsum dolor sit amet',
    discussionGoal: 'John Doe',
  },
};

export const ContactList = {
  args: {
    ...defaultArgs,
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsContact },
    data() {
      return {
        selectedContact: 1,
      };
    },
    template: `
    <div style="display: grid;">
      <unnnic-chats-contact v-for="index in 5" v-bind="args" @click="selectedContact = index" :selected="selectedContact === index"/>
    </div>
  `,
  }),
};
