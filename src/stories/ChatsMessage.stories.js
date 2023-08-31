/* eslint-disable no-alert */
import unnnicChatsMessage from '../components/ChatsMessage/ChatsMessage.vue';

export default {
  title: 'Chats/Message',
  component: unnnicChatsMessage,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: '<unnnic-chats-message v-bind="$props"/>',
});

const ReceivedAndSentTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <div style="
      display: flex;
    ">
      <unnnic-chats-message v-bind="$props" />
      <unnnic-chats-message type="sent" v-bind="$props" />
    </div>
  `,
});

const MultipleMessagesTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <div style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message message="Ita." v-bind="$props" />
      <unnnic-chats-message message="Pashca ovum 😯😉" v-bind="$props" />
      <unnnic-chats-message message="Fusce scelerisque odio sit amet eleifend." v-bind="$props" />
      <unnnic-chats-message message="In mattis tristique massa, ut ornare urna porttitor faucibus. Pellentesque habitant morbi." v-bind="$props" />
      <unnnic-chats-message message="Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus." v-bind="$props" />
      <unnnic-chats-message message="Aenean vel pharetra ligula. Donec sit amet porttitor dui. Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget. Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo. Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis. Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo." v-bind="$props" />
    </div>
  `,
});

export const Default = Template.bind({});
Default.args = {
  message: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur facilisis congue sagittis. ',
  time: new Date('2023-08-08T09:54:07.876230-03:00'),
};

export const Sending = Template.bind({});
Sending.args = {
  message: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur facilisis congue sagittis. ',
  sending: true,
  type: 'sent',
  time: new Date('2023-08-08T09:54:07.876230-03:00'),
};

export const ReceivedAndSent = ReceivedAndSentTemplate.bind({});
ReceivedAndSent.args = {
  message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam rhoncus imperdiet enim, ac mattis turpis ultricies eget. Phasellus neque sapien, tincidunt nec scelerisque eget, lacinia non tellus.',
  time: new Date('2023-08-08T09:54:07.876230-03:00'),
};

export const MultipleMessages = MultipleMessagesTemplate.bind({});
MultipleMessages.args = {
  type: 'sent',
  time: new Date('2023-08-08T09:54:07.876230-03:00'),
};
