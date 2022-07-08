<template>
  <div class="audio-player">
    <span v-if="isPlaying" @click="pause" @keypress.enter="pause" class="clickable">
      <unnnic-icon icon="controls-pause-1" scheme="neutral-darkest" />
    </span>
    <span v-else @click="play" @keypress.enter="play" class="clickable">
      <unnnic-icon icon="controls-play-1" scheme="neutral-darkest" />
    </span>
    <div v-if="bars.length === 0" class="audio-player__progress-bar">
      <div
        class="audio-player__progress-bar__bar"
        :style="{ width: `${progressBarPercentualValue}%` }"
      />
    </div>

    <div v-else class="audio-player__progress-bar-bars">
      <div v-for="(bar, index) in bars" :key="index" :style="{ height: `${bar * 100}%` }" :class="['bar', { active: isBarActive(index) }]">
      </div>
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
    bars: {
      type: Array,
    },
  },

  methods: {
    play() {
      this.$emit('play');
    },
    pause() {
      this.$emit('pause');
    },

    isBarActive(index) {
      return (this.progressBarPercentualValue / 100) * 22 > index;
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

  &__progress-bar-bars {
    width: 11.5rem;
    height: 1rem;
    border-radius: $unnnic-border-radius-sm;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .bar {
      background: $unnnic-color-neutral-clean;
      border-radius: 1.5px;
      width: 3px;

      &.active {
        background: $unnnic-color-neutral-darkest;
      }
    }
  }

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
