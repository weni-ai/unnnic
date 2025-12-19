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
    </TooltipContent>
  </Tooltip>
</template>

<script>
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';

export default {
  name: 'UnnnicTooltip',
  components: {
    Tooltip,
    TooltipTrigger,
    TooltipContent,
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
  },
};
</script>
