<template>
  <section
    v-if="modelValue || isRecording || src"
    class="unnnic-audio-recorder"
  >
    <UnnnicToolTip
      v-if="isRecording || canDiscard"
      enabled
      :text="$t('audio_recorder.discard_button')"
      side="top"
    >
      <span
        class="delete-button unnnic--clickable"
        @click="discard"
        @keypress.enter="discard"
      >
        <UnnnicIcon
          icon="delete-1-1"
          scheme="feedback-red"
        />
      </span>
    </UnnnicToolTip>
    <AudioHandler
      v-if="isRecording"
      :isRecording="isRecording"
      :time="numberToTimeString(duration)"
      @save="save"
    />
    <AudioPlayer
      v-else
      :time="numberToTimeString(isIdle || isRecorded ? duration : currentTime)"
      :reqStatus="reqStatus"
      :progressBarPercentualValue="playedPercentual"
      :isPlaying="isPlaying"
      :bars="playbackAudioBars ? bars : null"
      @failed-click="$emit('failed-click')"
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
    modelValue: {
      type: HTMLAudioElement,
    },

    src: {
      type: String,
    },

    canDiscard: {
      type: Boolean,
      default: true,
    },

    reqStatus: {
      type: String,
      default: 'default',
      validate(status) {
        return ['default', 'sending', 'failed'].includes(status);
      },
    },

    playbackAudioBars: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:model-value', 'status', 'failed-click'],

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
        this.audio.src = this.src;
        this.duration = await this.getBlobDuration(this.src);

        this.addAudioEventListeners();
      },
    },
    status(newValue) {
      this.$emit('status', newValue);
    },
  },

  methods: {
    getBlobDuration(blob) {
      const tempAudioEl = document.createElement('audio');

      const durationPromisse = new Promise((resolve, reject) => {
        tempAudioEl.addEventListener('loadedmetadata', () => {
          // Chrome bug: https://bugs.chromium.org/p/chromium/issues/detail?id=642012
          if (tempAudioEl.duration === Infinity) {
            tempAudioEl.currentTime = Number.MAX_SAFE_INTEGER;
            tempAudioEl.ontimeupdate = () => {
              tempAudioEl.ontimeupdate = null;
              resolve(tempAudioEl.duration);
              tempAudioEl.currentTime = 0;
            };
          }
          // Normal behavior
          else resolve(tempAudioEl.duration);
        });
        tempAudioEl.onerror = (event) => reject(event.target.error);
      });

      tempAudioEl.src =
        typeof blob === 'string' || blob instanceof String
          ? blob
          : window.URL.createObjectURL(blob);

      return durationPromisse.catch(() => 0); // Return 0 if there's an error
    },

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
        this.duration = isNaN(this.audio.duration) ? 0 : this.audio.duration;
      };

      this.audio.addEventListener('loadeddata', setDuration);
      this.audio.addEventListener('durationchange', setDuration);

      this.audio.addEventListener('play', () => {
        this.status = 'playing';
      });

      this.audio.addEventListener('pause', () => {
        if (this.audio) this.status = 'paused';
      });

      this.audio.addEventListener('timeupdate', () => {
        if (this.status !== 'playing') return;

        this.currentTime = isNaN(this.audio.currentTime) ? 0 : this.audio.currentTime;
      });

      this.audio.addEventListener('ended', () => {
        this.currentTime = 0;
        this.status = 'recorded';
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
        this.stop();
      }

      this.audio = null;

      this.$emit('update:model-value', null);

      this.status = 'idle';
    },
    save() {
      this.stop();
      this.status = 'recorded';

      this.stopMockMilliseconds();
    },
    pause() {
      this.audio.pause();
    },
    stop() {
      this.status = 'recorded';
      this.pause();

      if (this.hasInUseRecordDevice()) {
        this.recorder.stop();
      }

      this.$emit('update:model-value', this.audio);

      this.stopMockMilliseconds();
    },

    play() {
      this.audio.play();
    },

    progressBarUpdate(event) {
      if (this.audio) {
        const { audio } = this;
        audio.currentTime = (event.target.value * audio.duration) / 100;
      }
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

      if (isNaN(time)) {
        return isRecording ? '00:00:00' : '00:00';
      }

      function formatNumber(number, decimals = 2) {
        return number.toString().padStart(decimals, '0');
      }

      const minutes = formatNumber(Math.floor(time / 60), isRecording ? 2 : 1);
      const seconds = formatNumber(Math.round(time % 60));
      const millisecondsFormatted = formatNumber(this.mockMilliseconds);

      return `${minutes}:${seconds}${
        isRecording ? `:${millisecondsFormatted}` : ''
      }`;
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-audio-recorder {
  position: relative;

  border-radius: $unnnic-border-radius-sm;

  display: inline-flex;
  align-items: center;

  width: 100%;

  :deep(.audio-player__time),
  :deep(.audio-handler__time) {
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
