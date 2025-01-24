<template>
  <section
    v-if="modelValue || isRecording || sanitizedSrc"
    class="unnnic-audio-recorder"
  >
    <UnnnicToolTip
      v-if="isRecording || canDiscard"
      enabled
      :text="sanitizedDiscardButtonText"
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
      :time="numberToTimeString(sanitizedDuration)"
      @save="save"
    />
    <AudioPlayer
      v-else
      :time="numberToTimeString(isIdle || isRecorded ? sanitizedDuration : sanitizedCurrentTime)"
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
import { sanitizeHtml } from '../../utils/sanitize';

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
      validator(status) {
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
    recorder: null,
    audio: null,
    stream: null,
    audioChunks: [],
    duration: 0,
    currentTime: 0,
    mockMilliseconds: 0,
    intervalMockMilliseconds: null,
    status: 'idle',
    bars: [],
  }),

  computed: {
    sanitizedSrc() {
      return sanitizeHtml(this.src, [], 500);
    },
    sanitizedDuration() {
      return parseFloat(this.duration) || 0;
    },
    sanitizedCurrentTime() {
      return parseFloat(this.currentTime) || 0;
    },
    sanitizedDiscardButtonText() {
      return sanitizeHtml(this.$t('audio_recorder.discard_button'), [], 100);
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
      return (this.sanitizedCurrentTime * 100) / this.sanitizedDuration;
    },
  },

  watch: {
    src: {
      immediate: true,
      async handler() {
        if (!this.sanitizedSrc) {
          return;
        }

        this.audio = new Audio();
        this.audio.src = this.sanitizedSrc;
        this.duration = await this.getBlobDuration(this.sanitizedSrc);

        this.addAudioEventListeners();
      },
    },
    status(newValue) {
      this.$emit('status', newValue);
    },
  },

  methods: {
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

    stop() {
      this.status = 'recorded';
      this.pause();

      if (this.hasInUseRecordDevice()) {
        this.recorder.stop();
      }

      this.$emit('update:model-value', this.audio);

      this.stopMockMilliseconds();
    },

    pause() {
      this.audio.pause();
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

    numberToTimeString(time) {
      const { isRecording } = this;

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
@import '../../assets/scss/unnnic.scss';

.unnnic-audio-recorder {
  position: relative;

  border-radius: $unnnic-border-radius-sm;

  display: inline-flex;
  align-items: center;

  width: 100%;

  ::v-deep .audio-player__time,
  ::v-deep .audio-handler__time {
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