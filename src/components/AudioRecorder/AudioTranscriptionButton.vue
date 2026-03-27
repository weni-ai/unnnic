<template>
  <div
    :class="[
      'audio-player__icon-container',
      {
        'audio-player__icon-container--active': props.active,
        'audio-player__icon-container--disabled':
          !props.enableGenerateTranscription,
      },
    ]"
  >
    <UnnnicToolTip
      enabled
      side="top"
      :text="props.transcriptionTooltipText"
    >
      <div class="audio-player__icon-container">
        <UnnnicIcon
          class="audio-player__icon-transcription"
          clickable
          icon="material-symbols:subject-rounded"
          :scheme="!props.enableGenerateTranscription ? 'gray-300' : 'gray-900'"
          size="ant"
          @click="emit('click')"
        />
      </div>
    </UnnnicToolTip>
  </div>
</template>

<script setup lang="ts">
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

export interface AudioTranscriptionButtonProps {
  active: boolean;
  enableGenerateTranscription: boolean;
  transcriptionTooltipText: string;
}

const props = defineProps<AudioTranscriptionButtonProps>();

const emit = defineEmits<{
  click: [];
}>();
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
.audio-player {
  &__icon {
    &-container {
      display: flex;
      border-radius: $unnnic-radius-1;
      width: $unnnic-space-6;
      height: $unnnic-space-6;
      align-items: center;
      justify-content: center;
      &:hover {
        background-color: rgba(136, 147, 168, 0.1);
      }
      &--active {
        background-color: rgba(136, 147, 168, 0.2);
      }
      &--disabled {
        background-color: $unnnic-color-bg-muted;
      }
    }
  }
}
</style>
