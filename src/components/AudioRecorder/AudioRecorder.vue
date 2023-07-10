<template>
  <section v-if="value || isRecording || src" class="unnnic-audio-recorder">
    <unnnic-tool-tip enabled text="Descartar" side="top">
      <span @click="discard" @keypress.enter="discard" class="delete-button unnnic--clickable">
        <unnnic-icon icon="delete-1-1" scheme="feedback-red" />
      </span>
    </unnnic-tool-tip>
    <audio-handler
      v-if="isRecording || isRecorded"
      :is-recording="isRecording"
      :time="numberToTimeString(duration)"
      @save="save"
    />
    <audio-player
      v-else
      :time="numberToTimeString(isIdle ? duration : currentTime)"
      :progress-bar-percentual-value="playedPercentual"
      :is-playing="isPlaying"
      :bars="playbackAudioBars ? bars : null"
      @pause="pause"
      @play="play"
      @progress-bar-update="progressBarUpdate"
    />
  </section>
</template>

<script>
import AudioHandler from './AudioHandler.vue';
import AudioPlayer from './AudioPlayer.vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

const filterData = (audioBuffer) => {
  const rawData = audioBuffer.getChannelData(0); // We only need to work with one channel of data
  const samples = 22; // Number of samples we want to have in our final data set
  const blockSize = Math.floor(rawData.length / samples);
  // the number of samples in each subdivision
  const filteredData = [];
  for (let i = 0; i < samples; i += 1) {
    const blockStart = blockSize * i; // the location of the first sample in the block
    let sum = 0;
    for (let j = 0; j < blockSize; j += 1) {
      sum += Math.abs(rawData[blockStart + j]); // find the sum of all the samples in the block
    }
    filteredData.push(sum / blockSize); // divide the sum by the block size to get the average
  }

  return filteredData;
};

const normalizeData = (filteredData) => {
  // eslint-disable-next-line no-restricted-properties
  const multiplier = Math.pow(Math.max(...filteredData), -1);
  return filteredData.map((n) => n * multiplier);
};

export default {
  name: 'AudioRecorder',

  components: {
    AudioHandler,
    AudioPlayer,
    UnnnicIcon,
    UnnnicToolTip,
  },

  props: {
    value: {
      type: HTMLAudioElement,
    },

    src: {
      type: String,
    },

    playbackAudioBars: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    /**
     * @type MediaRecorder
     */
    recorder: null,
    /**
     * @type HTMLAudioElement
     */
    audio: null,
    /**
     * @type MediaStream
     */
    stream: null,
    audioChunks: [],
    duration: 0,
    currentTime: 0,
    mockMilliseconds: 0,
    intervalMockMilliseconds: null,
    /**
     * @type {('idle'|'recording'|'recorded'|'playing'|'paused')}
     */
    status: 'idle',

    bars: [],
  }),

  computed: {
    isIdle() {
      return this.status === 'idle';
    },
    isPlaying() {
      return this.status === 'playing';
    },
    isRecording() {
      return this.status === 'recording';
    },
    isRecorded() {
      return this.status === 'recorded';
    },
    playedPercentual() {
      return (this.currentTime * 100) / this.duration;
    },
  },

  watch: {
    src: {
      immediate: true,

      async handler() {
        if (!this.src) {
          return;
        }

        this.audio = new Audio();
        this.audio.setAttribute('src', this.src);

        this.addAudioEventListeners();

        this.bars = await this.srcToBars(this.src);
      },
    },
  },

  methods: {
    // entry point; accessed by external components
    async record() {
      if (this.hasInUseRecordDevice()) return;

      this.discard();

      await this.getAudioRecordDevice();
      this.setupRecorderAndAudio();
      this.addListeners();

      this.startRecord();
    },
    hasInUseRecordDevice() {
      return !!this.recorder;
    },
    async getAudioRecordDevice() {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      this.recorder = new MediaRecorder(this.stream);
    },
    async setupRecorderAndAudio() {
      this.audio = new Audio();
      this.audioChunks = [];
      this.duration = 0;
      this.currentTime = 0;
    },
    addListeners() {
      this.recorder.addEventListener('dataavailable', (event) => {
        this.audioChunks.push(event.data);
        const blob = new Blob(this.audioChunks);
        const src = URL.createObjectURL(blob);
        this.audio.src = src;
        // necessary to have the audio duration correctly
        this.audio.currentTime = 1e100;
      });

      this.recorder.addEventListener('stop', () => {
        this.stream.getTracks().forEach((track) => {
          track.stop();
        });
        this.recorder = null;
      });

      this.addAudioEventListeners();
    },

    addAudioEventListeners() {
      const setDuration = () => {
        if (this.audio.duration === Infinity) {
          return;
        }
        this.audio.currentTime = 0;
        this.duration = this.audio.duration;
      };

      this.audio.addEventListener('loadeddata', setDuration);
      this.audio.addEventListener('durationchange', setDuration);

      this.audio.addEventListener('play', () => {
        this.status = 'playing';
      });

      this.audio.addEventListener('pause', () => {
        this.status = 'paused';
      });

      this.audio.addEventListener('timeupdate', () => {
        if (this.status !== 'playing') return;

        this.currentTime = this.audio.currentTime;
      });

      this.audio.addEventListener('ended', () => {
        this.currentTime = 0;
        this.status = 'idle';
      });
    },

    startMockMilliseconds() {
      this.intervalMockMilliseconds = setInterval(() => {
        this.mockMilliseconds += 1;

        if (this.mockMilliseconds >= 100) {
          this.mockMilliseconds = 0;
        }
      }, 10); // 0.01 second
    },
    stopMockMilliseconds() {
      clearInterval(this.intervalMockMilliseconds);
    },

    startRecord() {
      this.status = 'recording';
      const recordTimeSliceInMilliseconds = 500;
      this.recorder.start(recordTimeSliceInMilliseconds);

      this.startMockMilliseconds();
    },
    discard() {
      if (this.audio) {
        this.pause();
      }

      this.$emit('input', null);

      this.status = 'idle';
    },
    save() {
      this.stop();
      this.status = 'idle';

      this.stopMockMilliseconds();
    },
    pause() {
      this.audio.pause();
    },
    async stop() {
      this.status = 'recorded';

      if (this.recorder) {
        this.recorder.stop();
      }

      this.$emit('input', this.audio);

      this.stopMockMilliseconds();
      this.bars = await this.srcToBars(this.audio.src);
    },

    play() {
      this.audio.play();
    },

    progressBarUpdate(event) {
      const { audio } = this;

      audio.currentTime = (event.target.value * audio.duration) / 100;
    },

    async srcToBars(src) {
      window.AudioContext = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioContext();

      const response = await fetch(src);
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);

      return normalizeData(filterData(audioBuffer));
    },

    numberToTimeString(time) {
      const { isRecording } = this;

      function formatNumber(number, decimals = 2) {
        return number.toString().padStart(decimals, '0');
      }

      const minutes = formatNumber(Math.floor(time / 60), isRecording ? 2 : 1);
      const seconds = formatNumber(Math.round(time % 60));
      const millisecondsFormatted = formatNumber(this.mockMilliseconds);

      return `${minutes}:${seconds}${isRecording ? `:${millisecondsFormatted}` : ''}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-audio-recorder {
  display: inline-flex;
  align-items: center;
  border-radius: $unnnic-border-radius-sm;
  position: relative;

  &__progress-bar {
    width: 11.5 * $unnnic-font-size;
    height: 2px;
    border-radius: $unnnic-border-radius-sm;
    background: $unnnic-color-neutral-clean;

    &__bar {
      background: $unnnic-color-neutral-darkest;
      height: 100%;
      width: 0%; // updated programmatically
    }
  }

  ::v-deep .audio-player__time, ::v-deep .audio-handler__time {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    color: $unnnic-color-neutral-darkest;
    user-select: none;
  }

  .delete-button {
    margin-right: $unnnic-spacing-inline-xs;
  }
}
</style>
