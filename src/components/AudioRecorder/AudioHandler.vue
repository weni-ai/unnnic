<template>
  <div class="audio-handler">
    <div>
      <span class="audio-handler__time">
        {{ time }}
      </span>

      <UnnnicIcon
        v-if="!hideRecordingIndicator"
        icon="indicator"
        size="sm"
        :class="[{ 'is-recording': isRecording }]"
        :scheme="isRecording ? null : 'fg-base'"
      />
    </div>

    <UnnnicToolTip
      enabled
      :text="saveText || i18n('save')"
      side="top"
    >
      <span
        class="unnnic--clickable"
        @click="save"
        @keypress.enter="save"
      >
        <UnnnicIcon
          size="ant"
          icon="check_circle"
          scheme="feedback-green"
        />
      </span>
    </UnnnicToolTip>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicI18n from '../../mixins/i18n';

export default {
  components: {
    UnnnicIcon,
    UnnnicToolTip,
  },

  mixins: [UnnnicI18n],

  props: {
    isRecording: {
      type: Boolean,
      default: false,
    },
    time: {
      type: String,
      default: '',
    },
    saveText: {
      type: String,
      default: '',
    },
    hideRecordingIndicator: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['save'],

  data() {
    return {
      defaultTranslations: {
        save: {
          'pt-br': 'Salvar',
          en: 'Save',
          es: 'Guardar',
        },
      },
    };
  },

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
