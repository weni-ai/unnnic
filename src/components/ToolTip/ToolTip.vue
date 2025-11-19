<template>
  <TooltipProvider>
   <Tooltip 
      :class="{ 'unnnic-tooltip': enabled || forceOpen }"
      :disabled="!(enabled || forceOpen)"
      :open="forceOpen || undefined"
    >
    <TooltipTrigger>
      <slot />
    </TooltipTrigger>

    <TooltipContent
      :class="['unnnic-tooltip-label', `unnnic-tooltip-label-${side}`]"
      :style="{ maxWidth: maxWidth }"
      :side="side"
      data-testid="tooltip-label"
    >
      <template v-if="enableHtml">
        <!-- eslint-disable-next-line vue/no-v-html -->
        <section v-html="text"></section>
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
  </TooltipProvider>
</template>

<script>
import { Tooltip, TooltipProvider } from '../ui/tooltip'; 
import TooltipContent from '../ui/tooltip/TooltipContent.vue';
import TooltipTrigger from '../ui/tooltip/TooltipTrigger.vue';

export default {
  name: 'UnnnicTooltip',
  components: {
     Tooltip, TooltipProvider, TooltipTrigger, TooltipContent
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
