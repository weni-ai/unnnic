import unnnicAudioRecorder from '../components/AudioRecorder/AudioRecorder.vue';

export default {
  title: 'Form/AudioRecorder',
  component: unnnicAudioRecorder,
  argTypes: {},
};

const Template = (args, { argTypes }) => ({
  props: Object.keys(argTypes),

  components: {
    unnnicAudioRecorder,
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

      <unnnic-audio-recorder v-bind="$props" ref="audio-recorder" v-model="audio" @status="(value) => this.status = value" />
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {
  canDiscard: true,
};

export const Player = Template.bind({});

Player.args = {
  src: 'http://172.17.32.1:8080/sample-3s.mp3',
};
