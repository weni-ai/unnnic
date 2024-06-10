import { action } from '@storybook/addon-actions';
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
  args: {
    time: new Date('2023-08-08T11:09:07.876230-03:00'),
    type: 'sent',
    onClick: action('click'),
    onClickImage: action('click-image'),
  },
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsMessage },
    template: `
      <unnnic-chats-message v-bind="args">
        Interdum et malesuada fames ac ante ipsum primis in faucibus.
        Curabitur facilisis congue sagittis.
      </unnnic-chats-message>
    `,
  }),
};

export const Default = { args: {} };

export const Sending = {
  args: {
    status: 'sending',
  },
};

export const ReceivedAndSent = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsMessage },
    template: `
      <div style="
        display: flex;
      ">
        <unnnic-chats-message v-bind="args" type="received">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          Interdum et malesuada fames ac ante ipsum primis in faucibus.
          Curabitur facilisis congue sagittis.
        </unnnic-chats-message>
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
    components: { unnnicChatsMessage },
    template: `
      <unnnic-chats-message v-bind="args">
        A message with link: http://localhost:8080
      </unnnic-chats-message>
    `,
  }),
};

export const MultipleMessages = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsMessage },
    template: `
      <div style="
        display: grid;
        gap: 16px;
      ">
        <unnnic-chats-message v-bind="args">
          Ita.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          Pashca ovum 😯😉
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          Fusce scelerisque odio sit amet eleifend.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          In mattis tristique massa, ornare urna porttitor faucibus. Pellentesque habitant morbi.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.
          Donec dignissim sapien ac condimentum sagittis. Cras vitae consectetur risus.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
          Aenean vel pharetra ligula. Donec sit amet porttitor dui.
          Suspendisse lacinia mauris egestas, aliquam dui non, tristique augue. Donec at pulvinar
          leo, eget lobortis turpis. Ut hendrerit varius tortor, id mollis justo dictum eget.
          Praesent finibus urna vel lacus pretium consequat. Proin imperdiet ante tempus feugiat
          tristique. Duis in ultrices sem. Cras pharetra eleifend ligula vel commodo.
          Phasellus placerat faucibus est, nec posuere est venenatis sed. Phasellus a quam felis.
          Fusce volutpat sem eget urna sagittis laoreet non maximus quam. Mauris porta posuere commodo.
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args">
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
  }),
};

export const Media = {
  render: (args) => ({
    setup() {
      return { args };
    },
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
          <unnnic-chats-message v-bind="args" mediaType="audio">
            <unnnic-audio-recorder class="media" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" mediaType="audio" status="sending">
            <unnnic-audio-recorder class="media" reqStatus="sending" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" mediaType="audio" status="failed">
            <unnnic-audio-recorder class="media" reqStatus="failed" style="padding: 8px; margin: 4px 0;" ref="audio-recorder" :src="audio" :canDiscard="false" />
          </unnnic-chats-message>
        </div>

        <div  style="
          display: flex;
          gap: 16px;
        ">
          <unnnic-chats-message v-bind="args" mediaType="video">
          <video class="media" controls>
            <source :src="video" />
          </video>
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" status="sending" mediaType="video">
            <video class="media" controls>
              <source :src="video" />
            </video>
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" status="failed" mediaType="video">
            <video class="media" controls>
              <source :src="video" />
            </video>
          </unnnic-chats-message>
        </div>

        <div  style="
          display: flex;
          gap: 16px;
        ">
          <unnnic-chats-message v-bind="args" mediaType="image">
            <img class="media" :src="image1" />
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" status="sending" mediaType="image">
            <img class="media" :src="image1" />
          </unnnic-chats-message>
          <unnnic-chats-message v-bind="args" status="failed" mediaType="image">
            <img class="media" :src="image1" />
          </unnnic-chats-message>
        </div>

        <unnnic-chats-message v-bind="args" mediaType="image">
          <img class="media" :src="image2" />
        </unnnic-chats-message>
        <unnnic-chats-message v-bind="args" mediaType="image">
          <img class="media" :src="image3" />
        </unnnic-chats-message>
      </div>
    `,
  }),
};

export const Document = {
  render: (args) => ({
    setup() {
      return { args };
    },
    components: { unnnicChatsMessage },
    template: `
      <div  style="
        display: grid;
        gap: 16px;
      ">
        <unnnic-chats-message v-bind="args" documentName="Lorem.pdf" type="received" />
        <unnnic-chats-message v-bind="args" documentName="Lorem.pdf" />
        <unnnic-chats-message v-bind="args" documentName="Lorem Ipsum.pdf" status="sending" />
        <unnnic-chats-message v-bind="args" documentName="Lorem Ipsum.pdf" status="failed" />
        <unnnic-chats-message v-bind="args" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit.docx" />
        <unnnic-chats-message v-bind="args" documentName="Lorem ipsum dolor sit amet consectetur adipiscing elit fusce iaculis ligula fringilla consectetur tempor ex massa convallis risus ut sagittis est quam non est integer bibendum vehicula.csv" />
      </div>
    `,
  }),
};
