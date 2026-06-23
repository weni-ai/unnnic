<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <td :class="cn('unnnic-table-cell', props.class)">
    <slot />
  </td>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-cell {
  vertical-align: middle;

  padding: $unnnic-space-4 0;

  &:not(:last-child) {
    padding-right: $unnnic-space-4;
  }
}
</style>
