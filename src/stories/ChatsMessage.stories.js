import unnnicChatsMessage from '../components/ChatsMessage/ChatsMessage.vue';
import unnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';
import AudioSample from './assets/audios/audio-recorder-sample.mp3';
import ImageSample1 from './assets/images/un.png';
import ImageSample2 from './assets/images/unnnic.png';
import ImageSample3 from './assets/images/unnnicPortrait.png';

export default {
  title: 'Chats/Message',
  component: unnnicChatsMessage,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <unnnic-chats-message v-bind="$props">
      <template #text>
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </template>
    </unnnic-chats-message>
  `,
});

const ReceivedAndSentTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <div style="
      display: flex;
    ">
      <unnnic-chats-message v-bind="$props">
        <template #text>
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </template>
      </unnnic-chats-message>
      <unnnic-chats-message type="sent" v-bind="$props">
        <template #text>
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </template>
      </unnnic-chats-message>
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
      <unnnic-chats-message v-bind="$props">
        <template #text>Ita.</template>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        <template #text>Pashca ovum 😯😉</template>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        <template #text>Fusce scelerisque odio sit amet eleifend.</template>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        <template #text>
          In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
        </template>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        <template #text>
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
        </template>
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        <template #text>
          Aenean vel pharetra ligula. Donec sit amet porttitor dui.
          Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
          leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
          Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
          tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
          Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
          Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta
          posuere commodo.
        </template>
      </unnnic-chats-message>
    </div>
  `,
});

const MediaTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage, unnnicAudioRecorder },
  data() {
    return {
      audio: AudioSample,
      image1: ImageSample1,
      image2: ImageSample2,
      image3: ImageSample3,
    };
  },
  template: `
  <div style="
    display: grid;
    gap: 16px;
  ">
    <unnnic-chats-message v-bind="$props">
      <template #media>
        <unnnic-audio-recorder style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </template>
    </unnnic-chats-message>
    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props">
        <template #media>
          <img :src="image1" />
        </template>
      </unnnic-chats-message>
      <unnnic-chats-message  status="sending" v-bind="$props">
        <template #media>
          <img :src="image1" />
        </template>
      </unnnic-chats-message>
      <unnnic-chats-message  status="failed" v-bind="$props">
        <template #media>
          <img :src="image1" />
        </template>
      </unnnic-chats-message>
    </div>
    <unnnic-chats-message v-bind="$props">
      <template #media>
        <img :src="image2" />
      </template>
    </unnnic-chats-message>
    <unnnic-chats-message v-bind="$props">
      <template #media>
        <img :src="image3" />
      </template>
    </unnnic-chats-message>
  </div>
  `,
});

const defaultArgs = { time: new Date('2023-08-08T09:54:07.876230-03:00') };

export const Default = Template.bind({});
Default.args = {
  ...defaultArgs,
};

export const Sending = Template.bind({});
Sending.args = {
  ...defaultArgs,
  status: 'sending',
  type: 'sent',
};

export const ReceivedAndSent = ReceivedAndSentTemplate.bind({});
ReceivedAndSent.args = {
  ...defaultArgs,
};

export const MultipleMessages = MultipleMessagesTemplate.bind({});
MultipleMessages.args = {
  ...defaultArgs,
  type: 'sent',
};

export const Media = MediaTemplate.bind({});
Media.args = {
  ...defaultArgs,
  type: 'sent',
};
