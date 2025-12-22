<script setup lang="ts">
import type { TooltipTriggerProps } from 'reka-ui';
import { TooltipTrigger } from 'reka-ui';

const props = defineProps<TooltipTriggerProps>();
</script>

<template>
  <TooltipTrigger
    v-bind="props"
    as="div"
    class="unnnic-tooltip-trigger"
  >
    <slot />
  </TooltipTrigger>
</template>

<style lang="scss" scoped>
.unnnic-tooltip-trigger {
  position: relative;
  display: inline-block;
  overflow-wrap: break-word;
}
</style>
