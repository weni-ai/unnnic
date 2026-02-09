<template>
  <Tooltip
    :disabled="!(enabled || forceOpen)"
    :open="forceOpen || undefined"
    data-testid="tooltip-wrapper"
  >
    <TooltipTrigger data-testid="tooltip-trigger">
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
        scheme="bg-white"
        @click="$emit('click:close', false)"
      />
    </TooltipContent>
  </Tooltip>
</template>

<script>
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import UnnnicIcon from '../Icon.vue';
export default {
  name: 'UnnnicTooltip',
  components: {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: '',
    },
    enabled: {
      type: Boolean,
      default: false,
    },
    forceOpen: {
      type: Boolean,
      default: false,
    },
    side: {
      type: String,
      default: 'right',
      validator(value) {
        return ['top', 'right', 'bottom', 'left'].indexOf(value) !== -1;
      },
    },
    maxWidth: {
      type: String,
      default: '',
    },
    enableHtml: {
      type: Boolean,
      default: false,
    },
    showClose: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['click:close'],
};
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
