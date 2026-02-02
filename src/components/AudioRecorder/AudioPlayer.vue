<template>
  <div class="audio-player">
    <div class="audio-player__actions">
      <span
        class="unnnic--clickable"
        :class="{ inactive: reqStatus === 'sending' }"
        @click="click"
        @keypress.enter="click"
      >
        <UnnnicIcon
          :icon="playbackIcon"
          scheme="neutral-darkest"
        />
      </span>

      <input
        v-if="showProgressBar"
        v-model="progress"
        class="audio-player__progress-bar unnnic--clickable"
        :class="{
          inactive: reqStatus !== 'default',
          'audio-player__progress-bar--fluid': fluidBar,
        }"
        type="range"
        min="0"
        :max="duration"
        step="0.001"
        :style="progressBarStyle"
        @input="emitProgressBarUpdate"
      />

      <div
        v-else
        class="audio-player__progress-bar-bars"
      >
        <div
          v-for="(bar, index) in bars"
          :key="index"
          :style="{ height: `${bar * 100}%` }"
          :class="['bar', { active: isBarActive(index) }]"
        />
      </div>

      <span class="audio-player__time">
        {{ time }}
      </span>

      <div
        v-if="showTranscriptionAction"
        :class="[
          'audio-player__icon-container',
          {
            'audio-player__icon-container--active': showTranscriptionText,
            'audio-player__icon-container--disabled':
              !enableGenerateTranscription,
          },
        ]"
      >
        <UnnnicToolTip
          enabled
          side="top"
          :text="transcriptionTooltipText"
        >
          <UnnnicIcon
            class="audio-player__icon-transcription"
            clickable
            icon="material-symbols:subject-rounded"
            :scheme="!enableGenerateTranscription ? 'gray-300' : 'gray-900'"
            size="ant"
            @click="clickTranscription"
          />
        </UnnnicToolTip>
      </div>
    </div>

    <div
      v-if="showTranscriptionText"
      class="audio-player__transcription"
    >
      <div
        v-if="isLoadingTranscription"
        class="audio-player__transcription-loading"
      >
        <p>{{ i18n('loading_transcription') }}</p>

        <span
          v-for="dot of 3"
          :key="dot"
          class="loading__dot"
        />
      </div>
      <p v-else>{{ transcriptionText }}</p>
    </div>
    <slot name="transcriptionInfo" />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicI18n from '../../mixins/i18n';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicIcon,
    UnnnicToolTip,
  },

  mixins: [UnnnicI18n],

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
      required: true,
    },
    showTranscriptionAction: {
      type: Boolean,
      default: false,
    },
    enableGenerateTranscription: {
      type: Boolean,
      default: false,
    },
    isLoadingTranscription: {
      type: Boolean,
      default: false,
    },
    showTranscriptionText: {
      type: Boolean,
      default: false,
    },
    transcriptionText: {
      type: String,
      default: '',
    },
    locale: {
      type: String,
      default: 'en',
    },
    fluidBar: {
      type: Boolean,
      default: true,
    },
  },
  emits: [
    'play',
    'pause',
    'progress-bar-update',
    'failed-click',
    'update:showTranscriptionText',
  ],

  data() {
    return {
      progress: 0,
      defaultTranslations: {
        show_transcription: {
          'pt-br': 'Mostrar a transcrição',
          en: 'Show transcript',
          es: 'Mostrar la transcripción',
        },
        hide_transcription: {
          'pt-br': 'Ocultar a transcrição',
          en: 'Hide transcript',
          es: 'Ocultar la transcripción',
        },
        unavailable_transcription: {
          'pt-br': 'Transcrição não habilitada',
          en: 'Transcription Unavailable',
          es: 'Transcripción no habilitada',
        },
        loading_transcription: {
          'pt-br': 'Carregando transcrição',
          en: 'Loading transcription',
          es: 'Cargando transcripción',
        },
      },
    };
  },

  computed: {
    showProgressBar() {
      return !this.bars || this.bars.length === 0;
    },
    playbackIcon() {
      const statusMapping = {
        sending: 'loading-circle-1',
        failed: 'upload-bottom-1',
      };

      if (this.reqStatus in statusMapping) {
        return statusMapping[this.reqStatus];
      }

      return this.isPlaying
        ? 'material-symbols:pause-rounded'
        : 'material-symbols:play-arrow-rounded';
    },
    transcriptionTooltipText() {
      if (!this.enableGenerateTranscription) {
        return this.i18n('unavailable_transcription');
      }
      return this.showTranscriptionText
        ? this.i18n('hide_transcription')
        : this.i18n('show_transcription');
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

  methods: {
    clickTranscription() {
      if (this.enableGenerateTranscription) {
        this.$emit('update:showTranscriptionText', !this.showTranscriptionText);
      }
    },
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
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
}
.audio-player {
  display: flex;
  flex-direction: column;
  gap: $unnnic-space-1;

  &__actions {
    display: inline-flex;
    align-items: center;
    gap: $unnnic-space-2;

    width: 100%;

    .inactive {
      pointer-events: none;
    }
  }

  &__icon {
    &-container {
      display: flex;
      border-radius: $unnnic-radius-1;
      width: 24px;
      height: 24px;
      &:hover {
        background-color: rgba(136, 147, 168, 0.1);
      }
      &--active {
        background-color: rgba(136, 147, 168, 0.2);
      }
      &--disabled {
        background-color: $unnnic-color-bg-muted;
      }
      :deep(.unnnic-tooltip) {
        width: 24px;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }

  &__progress-bar {
    position: relative;

    width: clamp(85px, 100%, 185px);
    height: 2px;

    outline: none;

    &--fluid {
      width: 100%;
    }

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

  &__transcription {
    display: flex;
    padding: $unnnic-space-1 $unnnic-space-2;
    max-width: 400px;
    border-radius: $unnnic-radius-1;
    background-color: $unnnic-color-bg-soft;

    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;

    &-loading {
      display: flex;
      align-items: baseline;

      @keyframes wave {
        0%,
        60%,
        100% {
          transform: initial;
        }

        30% {
          transform: translateY(-3px);
        }
      }
      .loading__dot {
        display: inline-block;
        width: $unnnic-space-05;
        height: $unnnic-space-05;
        border-radius: 50%;
        margin-right: $unnnic-space-05;
        background-color: $unnnic-color-fg-base;
        animation: wave 1.5s linear infinite;

        &:nth-child(2) {
          animation-delay: 0.9s;
        }

        &:nth-child(3) {
          animation-delay: 1.2s;
        }
      }
    }
  }
}
</style>
