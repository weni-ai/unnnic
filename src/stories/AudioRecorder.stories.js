import UnnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';
import AudioSample from './assets/audios/audio-recorder-sample.mp3';

export default {
  title: 'Form/AudioRecorder',
  component: UnnnicAudioRecorder,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `Used for recording and playing audio.`,
      },
    },
  },
  argTypes: {},
  render: (args) => ({
    components: {
      UnnnicAudioRecorder,
    },
    setup() {
      return { args };
    },
    data() {
      return {
        audio: null,
        status: '',
      };
    },
    template: `
    <div>
      <button @click="$refs['audio-recorder'].record()">Gravar</button>

      <pre>v-model: {{ audio }}</pre>
      <pre>status: {{ status }}</pre>

      <UnnnicAudioRecorder v-bind="args" ref="audio-recorder" v-model="audio" @status="(value) => this.status = value" />
    </div>
  `,
  }),
};

export const Default = {
  args: {
    canDiscard: true,
  },
};

export const Player = {
  args: {
    src: AudioSample,
  },
};
