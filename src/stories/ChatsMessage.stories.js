import unnnicChatsMessage from '../components/ChatsMessage/ChatsMessage.vue';
import unnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';
import AudioSample from './assets/audios/audio-recorder-sample.mp3';
import ImageSample1 from './assets/images/un.png';
import ImageSample2 from './assets/images/unnnic.png';
import ImageSample3 from './assets/images/unnnicPortrait.png';
import VideoSample from './assets/videos/weni.mp4';

export default {
  title: 'Chats/Message',
  component: unnnicChatsMessage,
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <unnnic-chats-message v-bind="$props">
      Interdum et malesuada fames ac ante ipsum primis in faucibus.
      Curabitur facilisis congue sagittis.
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
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
      <unnnic-chats-message type="sent" v-bind="$props">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
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
        Ita.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Pashca ovum 😯😉
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Fusce scelerisque odio sit amet eleifend.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula. Donec sit amet porttitor dui.
        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
        leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
        Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
        Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo.
      </unnnic-chats-message>
      <unnnic-chats-message v-bind="$props">
        Aenean vel pharetra ligula.
        Donec sit amet porttitor dui.

        Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue.
        Donec at pulvinar leo, eget lobortis turpis.
        Ut hendrerit varius tortor, id mollis justo dictum eget.

        Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
        tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
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
      video: VideoSample,
    };
  },
  template: `
  <div style="
    display: grid;
    gap: 16px;
  ">
    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message mediaType="audio" v-bind="$props">
        <unnnic-audio-recorder class="media" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message mediaType="audio" status="sending" v-bind="$props">
        <unnnic-audio-recorder class="media" reqStatus="sending" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
      <unnnic-chats-message mediaType="audio" status="failed" v-bind="$props">
        <unnnic-audio-recorder class="media" reqStatus="failed" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message v-bind="$props" mediaType="video">
      <video class="media" controls>
        <source :src="video" />
      </video>
      </unnnic-chats-message>
      <unnnic-chats-message status="sending" v-bind="$props" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
      <unnnic-chats-message status="failed" v-bind="$props" mediaType="video">
        <video class="media" controls>
          <source :src="video" />
        </video>
      </unnnic-chats-message>
    </div>

    <div  style="
      display: flex;
      gap: 16px;
    ">
      <unnnic-chats-message mediaType="image" v-bind="$props">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message  status="sending" mediaType="image" v-bind="$props">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
      <unnnic-chats-message  status="failed" mediaType="image" v-bind="$props">
        <img class="media" :src="image1" />
      </unnnic-chats-message>
    </div>

    <unnnic-chats-message mediaType="image" v-bind="$props">
      <img class="media" :src="image2" />
    </unnnic-chats-message>
    <unnnic-chats-message mediaType="image" v-bind="$props">
      <img class="media" :src="image3" />
    </unnnic-chats-message>
  </div>
  `,
});

const DocumentTemplate = (args, { argTypes }) => ({
  props: Object.keys(argTypes),
  components: { unnnicChatsMessage },
  template: `
    <div  style="
      display: grid;
      gap: 16px;
    ">
      <unnnic-chats-message documentName="Lorem.pdf" type="received" v-bind="$props" />
      <unnnic-chats-message documentName="Lorem.pdf" v-bind="$props" />
      <unnnic-chats-message documentName="Lorem Ipsum.pdf" status="sending" v-bind="$props" />
      <unnnic-chats-message documentName="Lorem Ipsum.pdf" status="failed" v-bind="$props" />
      <unnnic-chats-message documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit.docx" v-bind="$props" />
      <unnnic-chats-message documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit fusce iaculis ligula fringilla consectetur tempor ex massa convallis risus ut sagittis est quam non est integer bibendum vehicula.csv" v-bind="$props" />
    </div>
  `,
});

const defaultArgs = { time: new Date('2023-08-08T11:09:07.876230-03:00') };

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

export const Document = DocumentTemplate.bind({});
Document.args = {
  ...defaultArgs,
  type: 'sent',
};
