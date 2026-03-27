<script setup lang="ts">
import type { PopoverTriggerProps } from 'reka-ui';
import { PopoverTrigger } from 'reka-ui';

const props = defineProps<PopoverTriggerProps>();
</script>

<template>
  <PopoverTrigger
    v-bind="props"
    class="unnnic-popover-trigger"
  >
    <slot />
  </PopoverTrigger>
</template>

<style lang="scss" scoped>
.unnnic-popover-trigger {
  border: none;
  background: transparent;
  padding: 0;

  & > * {
    width: 100%;
  }
}
</style>
