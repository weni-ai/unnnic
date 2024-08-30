import { action } from '@storybook/addon-actions';
import UnnnicChatsMessage from '../components/ChatsMessage/ChatsMessage.vue';
import UnnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';
import AudioSample from './assets/audios/audio-recorder-sample.mp3';
import ImageSample1 from './assets/images/un.png';
import ImageSample2 from './assets/images/unnnic.png';
import ImageSample3 from './assets/images/unnnicPortrait.png';
import VideoSample from './assets/videos/weni.mp4';

export default {
  title: 'Chats/Message',
  component: UnnnicChatsMessage,
  tags: ['autodocs'],
  args: {
    time: new Date('2023-08-08T11:09:07.876230-03:00'),
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
      return { args };
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
          display: flex;
          gap: 16px;
        ">
          <UnnnicChatsMessage v-bind="args" mediaType="audio">
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
          display: flex;
          gap: 16px;
        ">
          <UnnnicChatsMessage v-bind="args" mediaType="video">
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
