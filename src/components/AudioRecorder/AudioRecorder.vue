<template>
  <section v-if="hasAudio || src" class="unnnic-audio-recorder">
    <audio-handler
      v-if="isRecording || isRecorded"
      :is-recording="isRecording"
      :time="numberToTimeString(duration)"
      @discard="stop(); discard()"
      @save="save"
    />
    <audio-player
      v-else
      :time="numberToTimeString(isIdle ? duration : currentTime)"
      :progress-bar-percentual-value="playedPercentual"
      :is-playing="isPlaying"
      @pause="pause"
      @play="play"
      :bars="bars"
    />

    <div v-if="canDelete && (['idle', 'playing', 'paused'].includes(status))" class="delete-button">
      <unnnic-icon @click="discard" icon="delete-2-1" clickable></unnnic-icon>
    </div>
  </section>
</template>

<script>
import AudioHandler from './AudioHandler.vue';
import AudioPlayer from './AudioPlayer.vue';
import UnnnicIcon from '../Icon.vue';

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
  },

  props: {
    canDelete: {
      type: Boolean,
    },

    src: {
      type: String,
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
    /**
     * @type {('idle'|'recording'|'recorded'|'playing'|'paused')}
     */
    status: 'idle',

    bars: [],
  }),

  computed: {
    hasAudio() {
      return !!this.audio;
    },
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
      this.audio.addEventListener('loadeddata', () => {
        this.audio.currentTime = 0;
        this.duration = this.audio.duration;
      });

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
    startRecord() {
      this.status = 'recording';
      const recordTimeSliceInMilliseconds = 500;
      this.recorder.start(recordTimeSliceInMilliseconds);
    },

    discard() {
      this.audio = null;
      this.status = 'idle';
    },
    save() {
      this.stop();
      this.status = 'idle';
    },
    pause() {
      this.audio.pause();
    },
    async stop() {
      this.status = 'recorded';
      this.recorder.stop();

      this.$emit('input', this.audio);

      this.bars = await this.srcToBars(this.audio.src);
    },

    play() {
      this.audio.play();
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
      const minutes = Math.floor(time / 60);
      const seconds = Math.round(time % 60)
        .toString()
        .padStart(2, '0');

      return `${minutes}:${seconds}`;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-audio-recorder {
  display: inline-flex;
  align-items: center;
  background: $unnnic-color-neutral-lightest;
  padding: $unnnic-spacing-inset-nano $unnnic-spacing-inset-sm;
  border-radius: $unnnic-border-radius-sm;
  position: relative;

  &__progress-bar {
    width: 11.5rem;
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
    position: absolute;
    right: -0.75rem;
    top: -0.625rem;
  }
}
</style>
