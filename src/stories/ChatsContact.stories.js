import unnnicChatsContact from '../components/ChatsContact/ChatsContact.vue';
import { setup } from '@storybook/vue3';
import i18n from '@/utils/plugins/i18n';

setup((app) => {
  app.use(i18n);
});

const lastMessageMedia = {
  geo: {
    text: '-1.111111,-2.222222',
    media: [
      {
        content_type: 'geo',
        message: 'f0c74bfa-d405-4d20-8f75-42edc7543883',
        url: '-1.111111,-2.222222',
        created_on: '2025-04-15T15:20:56.030692-03:00',
      },
    ],
  },
  image: {
    media: [
      {
        content_type: 'image/jpeg',
        message: 'a997421d-6238-4bef-912d-e689c1c0db3f',
        url: 'https://example.com/photo.jpg',
        created_on: '2025-04-15T14:58:56.163027-03:00',
      },
    ],
  },
  audio: {
    media: [
      {
        content_type: 'audio/ogg',
        message: 'bd8ec88a-83b8-45ed-b861-20e8c98dd5ef',
        url: 'https://example.com/audio.oga',
        created_on: '2025-04-15T14:56:51.539059-03:00',
      },
    ],
  },
  document: {
    media: [
      {
        content_type: 'application/pdf',
        message: '46f58626-1623-4c66-9b16-746831e60130',
        url: 'https://example.com/DocumentName.pdf',
        created_on: '2025-04-15T14:50:14.854262-03:00',
      },
    ],
  },
  video: {
    media: [
      {
        content_type: 'video/mp4',
        message: 'aade7c9f-e42a-4c3d-9372-c9c0af4ad2a8',
        url: 'https://example/video.mp4',
        created_on: '2025-04-15T14:48:57.295346-03:00',
      },
    ],
  },
};

export default {
  title: 'Chats/Contact',
  component: unnnicChatsContact,
  tags: ['autodocs'],
};

const defaultArgs = {
  title: 'John Doe',
  lastMessage: {
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel.',
  },
};
const unreadMessages = 5;
const waitingTime = 10;

export const Default = {
  args: {
    ...defaultArgs,
    unreadMessages,
  },
};

export const WithLastInteractionTimePrefix = {
  args: {
    ...defaultArgs,
    unreadMessages,
    lastInteractionTime: new Date().toISOString(),
    lastInteractionTimePrefix: 'Since',
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

export const WithProjectInfo = {
  args: {
    ...defaultArgs,
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsContact },
    template: `
    <div style="display: grid;">
      <unnnic-chats-contact v-for="(project, index) in ['Project A', 'Project B', 'Project C']" v-bind="args" :projectName="project" />
    </div>
  `,
  }),
};

export const MediaLastMessage = {
  args: {
    ...defaultArgs,
  },
  render: (args) => ({
    setup() {
      return { args, lastMessageMedia };
    },
    components: { unnnicChatsContact },
    template: `
    <div style="display: grid;">
      <unnnic-chats-contact v-for="mediaType in ['geo', 'audio', 'image', 'video', 'document']" v-bind="args" :lastMessage="lastMessageMedia[mediaType]"/>
    </div>
  `,
  }),
};
