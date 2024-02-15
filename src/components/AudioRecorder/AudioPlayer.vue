<template>
  <div class="audio-player">
    <div
      @click="click"
      @keypress.enter="click"
      class="audio-player__handler"
      :class="{ inactive: reqStatus === 'sending' }"
    >
      <unnnic-icon-loading v-if="this.reqStatus === 'sending'" size="md" scheme="neutral-darkest" />
      <unnnic-icon v-else :icon="playbackIcon" scheme="neutral-darkest" />
    </div>

    <input
      v-if="showProgressBar"
      class="audio-player__progress-bar unnnic--clickable"
      :class="{ inactive: reqStatus !== 'default' }"
      type="range"
      min="0"
      :max="duration"
      step="0.001"
      v-model="progress"
      @input="emitProgressBarUpdate"
      :style="progressBarStyle"
    />

    <div v-else class="audio-player__progress-bar-bars">
      <div
        v-for="(bar, index) in bars"
        :key="index"
        :style="{ height: `${bar * 100}%` }"
        :class="['bar', { active: isBarActive(index) }]"
      ></div>
    </div>

    <span class="audio-player__time">
      {{ time }}
    </span>
  </div>
</template>

<script>
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIconLoading,
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
    reqStatus: {
      type: String,
      default: 'default',
      validate(status) {
        return ['default', 'sending', 'failed'].includes(status);
      },
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

  data() {
    return {
      progress: 0,
    };
  },

  methods: {
    click() {
      if (this.reqStatus === 'failed') {
        this.$emit('failed-click');
      } else if (this.reqStatus !== 'sending') {
        this.togglePlayback();
      }
    },

    togglePlayback() {
      this[this.isPlaying ? 'pause' : 'play']();
    },

    play() {
      this.$emit('play');
    },

    pause() {
      this.$emit('pause');
    },

    emitProgressBarUpdate(event) {
      this.$emit('progress-bar-update', event);
    },

    isBarActive(index) {
      return (this.progressBarPercentualValue / 100) * 22 > index;
    },
  },

  computed: {
    showProgressBar() {
      return !this.bars || this.bars.length === 0;
    },
    playbackIcon() {
      if (this.reqStatus === 'failed') {
        return 'upload';
      }

      return this.isPlaying ? 'pause_circle' : 'play_circle';
    },
    progressBarStyle() {
      return {
        '--progressBarPercentualValue': `${this.progress}%`,
      };
    },
  },

  watch: {
    progressBarPercentualValue(newValue) {
      this.progress = newValue;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.audio-player {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-stack-xs;

  width: 100%;

  &__handler {
    display: flex;

    cursor: pointer;
  }

  &__progress-bar {
    position: relative;

    width: clamp(85px, 100%, 185px);
    height: 2px;

    outline: none;

    &::before {
      content: '';

      position: absolute;
      left: 0;

      width: var(--progressBarPercentualValue);
      height: 100%;
      place-self: center;

      border-radius: $unnnic-border-radius-sm;
      background: $unnnic-color-neutral-darkest;
    }

    &::-webkit-slider-runnable-track {
      width: 100%;
      height: 100%;

      border-radius: $unnnic-border-radius-sm;
      background: $unnnic-color-neutral-cleanest;
    }
    &::-webkit-slider-thumb {
      opacity: 0;
    }

    // Duplicate moz code from webkit needed to work.
    // It won't work if combine the two.
    &::-moz-range-track {
      width: 100%;
      height: 100%;

      border-radius: $unnnic-border-radius-sm;
      background: $unnnic-color-neutral-cleanest;
    }
    &::-moz-range-thumb {
      opacity: 0;
    }

    &-bars {
      width: 11.5 * $unnnic-font-size;
      height: 1 * $unnnic-font-size;

      display: flex;
      align-items: center;
      justify-content: space-between;

      border-radius: $unnnic-border-radius-sm;

      .bar {
        width: 3px;

        background: $unnnic-color-neutral-cleanest;
        border-radius: 1.5px;

        &.active {
          background: $unnnic-color-neutral-darkest;
        }
      }
    }
  }

  &__time {
    margin-left: $unnnic-spacing-stack-xs;
  }

  .inactive {
    pointer-events: none;
  }
}
</style>
