<template>
  <Tooltip
    :disabled="!(enabled || forceOpen)"
    :open="forceOpen || undefined"
    data-testid="tooltip-wrapper"
  >
    <TooltipTrigger
      class="unnnic-tooltip"
      data-testid="tooltip-trigger"
    >
      <slot />
    </TooltipTrigger>

    <TooltipContent
      :class="['unnnic-tooltip-label', `unnnic-tooltip-label-${side}`]"
      :style="{ maxWidth: maxWidth }"
      :side="side"
      data-testid="tooltip-content"
    >
      <template v-if="enableHtml">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <section
          data-testid="tooltip-html-content"
          v-html="text"
        ></section>
      </template>
      <template
        v-for="(line, index) in text.split('\n')"
        v-else
        :key="index"
      >
        {{ line }}
        <br />
      </template>
      <UnnnicIcon
        v-if="showClose"
        class="unnnic-tooltip__close"
        icon="close"
        size="sm"
        clickable
        filled
        scheme="white"
        @click="$emit('click:close')"
      />
    </TooltipContent>
  </Tooltip>
</template>

<script setup lang="ts">
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import UnnnicIcon from '../Icon.vue';

export interface TooltipProps {
  text?: string;
  enabled?: boolean;
  forceOpen?: boolean;
  side?: 'top' | 'right' | 'bottom' | 'left';
  maxWidth?: string;
  enableHtml?: boolean;
  showClose?: boolean;
}

defineOptions({
  name: 'UnnnicTooltip',
});

withDefaults(defineProps<TooltipProps>(), {
  text: '',
  enabled: false,
  forceOpen: false,
  side: 'right',
  maxWidth: '',
  enableHtml: false,
  showClose: false,
});

defineEmits(['click:close']);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tooltip {
  &__close {
    margin-left: $unnnic-space-3;
    align-self: center;
  }
}
</style>
