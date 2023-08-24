import unnnicChatsContact from '../components/ChatsContact/ChatsContact.vue';

export default {
  title: 'Chats/Contact',
  component: unnnicChatsContact,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsContact },
  template: '<unnnic-chats-contact v-bind="$props"/>',
});

const defaultArgs = {
  username: 'John Doe',
  lastMessage: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas vel.',
};
const unreadMessages = 5;
const waitingTime = 10;

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
  unreadMessages,
};

export const Selected = Template.bind({});
Selected.args = {
  ...defaultArgs,
  selected: true,
};

export const Read = Template.bind({});
Read.args = {
  ...defaultArgs,
};

export const Waiting = Template.bind({});
Waiting.args = {
  ...defaultArgs,
  waitingTime,
  unreadMessages,
};

export const WaitingRead = Template.bind({});
WaitingRead.args = {
  ...defaultArgs,
  waitingTime,
};
