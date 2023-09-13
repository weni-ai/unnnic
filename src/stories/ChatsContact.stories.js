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

const TemplateList = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsContact },
  data() {
    return {
      selectedContact: 1,
    };
  },
  template: `
    <div style="display: grid; gap: 5px;">
      <unnnic-chats-contact v-for="index in 5" v-bind="$props" @click="selectedContact = index" :selected="selectedContact === index"/>
    </div>
  `,
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

export const SelectedWithCheckbox = Template.bind({});
SelectedWithCheckbox.args = {
  ...defaultArgs,
  selected: true,
  checkboxWhenSelect: true,
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

export const ContactList = TemplateList.bind({});
ContactList.args = {
  ...defaultArgs,
};
