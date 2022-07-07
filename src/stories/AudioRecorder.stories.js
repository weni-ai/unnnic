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
    return {};
  },

  template: `
    <div>
      <button @mousedown="$refs['audio-recorder'].record()" @mouseup="$refs['audio-recorder'].stop()">Gravar</button>

      <unnnic-audio-recorder v-bind="$props" ref="audio-recorder">
      </unnnic-audio-recorder>
    </div>
  `,

  methods: {},
});

export const Default = Template.bind({});

Default.args = {};
