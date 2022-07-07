<template>
  <div class="audio-player">
    <span v-if="isPlaying" @click="pause" @keypress.enter="pause" class="clickable">
      <unnnic-icon icon="controls-pause-1" scheme="neutral-darkest" />
    </span>
    <span v-else @click="play" @keypress.enter="play" class="clickable">
      <unnnic-icon icon="controls-play-1" scheme="neutral-darkest" />
    </span>
    <div class="audio-player__progress-bar">
      <div
        class="audio-player__progress-bar__bar"
        :style="{ width: `${progressBarPercentualValue}%` }"
      />
    </div>
    <span class="audio-player__time">
      {{ time }}
    </span>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    time: {
      type: String,
      default: '',
    },
    duration: {
      type: String,
      default: '',
    },
    isPlaying: {
      type: Boolean,
      default: false,
    },
    progressBarPercentualValue: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    play() {
      this.$emit('play');
    },
    pause() {
      this.$emit('pause');
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.audio-player {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-stack-xs;

  &__progress-bar {
    width: 11.5rem;
    height: 2px;
    border-radius: $unnnic-border-radius-sm;
    background: $unnnic-color-neutral-clean;

    &__bar {
      background: $unnnic-color-neutral-darkest;
      height: 100%;
    }
  }

  &__time {
    font-size: $unnnic-font-size-body-md;
    color: $unnnic-color-neutral-darkest;
  }
}
</style>
