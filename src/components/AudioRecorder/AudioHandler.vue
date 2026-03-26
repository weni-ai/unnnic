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
        :scheme="isRecording ? null : 'fg-base'"
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
@use '@/assets/scss/unnnic' as *;

.audio-handler {
  display: inline-flex;
  align-items: center;
  gap: $unnnic-spacing-stack-xs;

  .unnnic-icon.is-recording {
    margin-left: $unnnic-spacing-inline-nano;

    :deep(.primary) {
      animation: ease-in-out pulse 2s infinite;
    }
  }
}

@keyframes pulse {
  0% {
    fill: $unnnic-color-border-base;
  }

  50% {
    fill: $unnnic-color-fg-critical;
  }

  100% {
    fill: $unnnic-color-border-base;
  }
}
</style>
