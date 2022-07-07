<template>
  <section v-if="hasAudio" class="audio-recorder">
    <audio-handler
      v-if="isRecording || isRecorded"
      :is-recording="isRecording"
      :time="numberToTimeString(duration)"
      @discard="discard"
      @save="save"
    />
    <audio-player
      v-else
      :time="numberToTimeString(isIdle ? duration : currentTime)"
      :progress-bar-percentual-value="playedPercentual"
      :is-playing="isPlaying"
      @pause="pause"
      @play="play"
    />
  </section>
</template>

<script>
import AudioHandler from './AudioHandler.vue';
import AudioPlayer from './AudioPlayer.vue';

export default {
  name: 'AudioRecorder',

  components: {
    AudioHandler,
    AudioPlayer,
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
      this.status = 'idle';
    },
    pause() {
      this.audio.pause();
    },
    stop() {
      this.status = 'recorded';
      this.recorder.stop();
    },

    play() {
      this.audio.play();
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

.audio-recorder {
  display: inline-flex;
  align-items: center;
  background: $unnnic-color-neutral-lightest;
  padding: $unnnic-spacing-inset-nano $unnnic-spacing-inset-sm;
  border-radius: $unnnic-border-radius-sm;

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

  &__time {
    font-size: $unnnic-font-size-body-md;
    color: $unnnic-color-neutral-darkest;
  }
}
</style>
