<template>
  <div class="audio-handler">
    <div>
      <span class="audio-handler__time">
        {{ time }}
      </span>

      <UnnnicIcon
        icon="indicator"
        size="sm"
        :class="[{ 'is-recording': isRecording }]"
        :scheme="isRecording ? null : 'neutral-clean'"
      />
    </div>

    <UnnnicToolTip
      enabled
      text="Salvar"
      side="top"
    >
      <span
        class="unnnic--clickable"
        @click="save"
        @keypress.enter="save"
      >
        <UnnnicIcon
          icon="check-circle-1-1"
          scheme="feedback-green"
        />
      </span>
    </UnnnicToolTip>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';

export default {
  components: {
    UnnnicIcon,
    UnnnicToolTip,
  },

  props: {
    isRecording: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: '',
    },
  },
  emits: ['save'],

  methods: {
    save() {
      this.$emit('save');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.audio-handler {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-stack-xs;

  .unnnic-icon.is-recording ::v-deep {
    margin-left: $unnnic-spacing-inline-nano;

    .primary {
      animation: ease-in-out pulse 2s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    fill: $unnnic-color-neutral-soft;
  }

  50% {
    fill: $unnnic-color-feedback-red;
  }

  100% {
    fill: $unnnic-color-neutral-soft;
  }
}
</style>
