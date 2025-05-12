import { action } from '@storybook/addon-actions';
import UnnnicChatsMessage from '../components/ChatsMessage/ChatsMessage.vue';
import UnnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';
import AudioSample from './assets/audios/audio-recorder-sample.mp3';
import ImageSample1 from './assets/images/un.png';
import ImageSample2 from './assets/images/unnnic.png';
import ImageSample3 from './assets/images/unnnicPortrait.png';
import VideoSample from './assets/videos/weni.mp4';

const baseReplyMessage = {
  uuid: '34fbcce3-a8fb-4097-9cb3-b9ff274a46c0',
  user: null,
  contact: {
    name: 'Weni',
  },
  created_on: '2025-01-15T12:57:46.164636-03:00',
};
const baseMedia = {
  content_type: 'video/mp4',
  message: '34fbcce3-a8fb-4097-9cb3-b9ff274a46c0',
  url: VideoSample,
  created_on: '2025-01-15T12:57:46.170003-03:00',
};

const replyMessage = {
  video: { ...baseReplyMessage, media: [{ ...baseMedia }] },
  document: {
    ...baseReplyMessage,
    media: [
      {
        ...baseMedia,
        content_type: 'application/pdf',
        url: 'http://example.com/file.pdf',
      },
    ],
  },
  audio: {
    ...baseReplyMessage,
    media: [{ ...baseMedia, content_type: 'audio/mp3', url: AudioSample }],
  },
  image: {
    ...baseReplyMessage,
    media: [{ ...baseMedia, content_type: 'image/png', url: ImageSample2 }],
  },
  geo: {
    ...baseReplyMessage,
    media: [
      {
        ...baseMedia,
        content_type: 'geo',
        url: '-1,111111111,-2,222222222',
      },
    ],
    text: '-1,111111111,-2,222222222',
  },
  text: {
    ...baseReplyMessage,
    media: [],
    text: 'Interdum et malesuada fames ac ante ipsum primis in faucibus. Curabitur facilisis congue sagittis',
  },
};

export default {
  title: 'Chats/Message',
  component: UnnnicChatsMessage,
  tags: ['autodocs'],
  args: {
    time: new Date(),
    type: 'sent',
    onClick: action('click'),
    onClickImage: action('click-image'),
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['sent', 'received'],
    },
    time: {
      control: 'date',
    },
    status: {
      control: 'select',
      options: ['sending', 'sent', 'failed'],
    },
    mediaType: {
      control: 'select',
      options: ['audio', 'image', 'video'],
    },
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <UnnnicChatsMessage v-bind="args">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </UnnnicChatsMessage>
    `,
  }),
};

export const Default = { args: {} };

export const Sending = {
  args: {
    status: 'sending',
  },
};

export const WithReply = {
  args: {
    enableReply: true,
  },
};

export const WithRepliedMessage = {
  render: (args) => ({
    setup() {
      return { args, replyMessage };
    },
    components: { UnnnicChatsMessage },
    template: `
      <div style="
        display: flex;
        gap: 12px;
        flex-direction: column
      ">
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.video" type="received">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.audio">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.image">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.document">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.geo" type="received">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" :replyMessage="replyMessage.text" type="received">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
      </div>
    `,
  }),
};

export const ReceivedAndSent = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <div style="
        display: flex;
      ">
        <UnnnicChatsMessage v-bind="args" type="received">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </UnnnicChatsMessage>
      </div>
    `,
  }),
};

export const MessageStatus = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <div style="display: flex; flex-direction: column; gap: 12px">
        <UnnnicChatsMessage v-bind="args" status="send">
          Send status
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" status="received">
          Received status
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" status="read">
          Read status
        </UnnnicChatsMessage>
      </div>
    `,
  }),
};

export const WithSignature = {
  args: {
    signature: 'John Doe',
  },
};

export const WithLink = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <UnnnicChatsMessage v-bind="args">
        A message with link: http://localhost:8080
      </UnnnicChatsMessage>
    `,
  }),
};

export const MultipleMessages = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <div style="
        display: grid;
        gap: 16px;
      ">
        <UnnnicChatsMessage v-bind="args">
          Ita.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Pashca ovum 😯😉
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Fusce scelerisque odio sit amet eleifend.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Aenean vel pharetra ligula. Donec sit amet porttitor dui.
          Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
          leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
          Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
          tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
          Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
          Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo.
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args">
          Aenean vel pharetra ligula.
          Donec sit amet porttitor dui.

          Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue.
          Donec at pulvinar leo, eget lobortis turpis.
          Ut hendrerit varius tortor, id mollis justo dictum eget.

          Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
          tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
        </UnnnicChatsMessage>
      </div>
    `,
  }),
};

export const Media = {
  render: (args) => ({
    setup() {
      return { args, replyMessage };
    },
    components: { UnnnicChatsMessage, UnnnicAudioRecorder },
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
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: start;
        ">
          <UnnnicChatsMessage v-bind="args" mediaType="audio" :replyMessage="replyMessage.audio">
            <unnnic-audio-recorder class="media" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" mediaType="audio" status="sending">
            <unnnic-audio-recorder class="media" reqStatus="sending" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" mediaType="audio" status="failed">
            <unnnic-audio-recorder class="media" reqStatus="failed" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </UnnnicChatsMessage>
        </div>

        <div  style="
          display: grid;
          gap: 16px;
          grid-template-columns: 1fr 1fr 1fr;
          align-items: start;
        ">
          <UnnnicChatsMessage v-bind="args" mediaType="video"  :replyMessage="replyMessage.audio">
          <video class="media" controls>
            <source :src="video" />
          </video>
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" status="sending" mediaType="video">
            <video class="media" controls>
              <source :src="video" />
            </video>
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" status="failed" mediaType="video">
            <video class="media" controls>
              <source :src="video" />
            </video>
          </UnnnicChatsMessage>
        </div>

        <div  style="
          display: flex;
          gap: 16px;
        ">
          <UnnnicChatsMessage v-bind="args" mediaType="image">
            <img class="media" :src="image1" />
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" status="sending" mediaType="image">
            <img class="media" :src="image1" />
          </UnnnicChatsMessage>
          <UnnnicChatsMessage v-bind="args" status="failed" mediaType="image">
            <img class="media" :src="image1" />
          </UnnnicChatsMessage>
        </div>

        <UnnnicChatsMessage v-bind="args" mediaType="image">
          <img class="media" :src="image2" />
        </UnnnicChatsMessage>
        <UnnnicChatsMessage v-bind="args" mediaType="image">
          <img class="media" :src="image3" />
        </UnnnicChatsMessage>

         <UnnnicChatsMessage v-bind="args" mediaType="geo">
          -1.11111, -1.11111
        </UnnnicChatsMessage>
      </div>
    `,
  }),
};

export const Document = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { UnnnicChatsMessage },
    template: `
      <div  style="
        display: grid;
        gap: 16px;
      ">
        <UnnnicChatsMessage v-bind="args" documentName="Lorem.pdf" type="received" />
        <UnnnicChatsMessage v-bind="args" documentName="Lorem.pdf" />
        <UnnnicChatsMessage v-bind="args" documentName="Lorem Ipsum.pdf" status="sending" />
        <UnnnicChatsMessage v-bind="args" documentName="Lorem Ipsum.pdf" status="failed" />
        <UnnnicChatsMessage v-bind="args" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit.docx" />
        <UnnnicChatsMessage v-bind="args" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit fusce iaculis ligula fringilla consectetur tempor ex massa convallis risus ut sagittis est quam non est integer bibendum vehicula.csv" />
      </div>
    `,
  }),
};
