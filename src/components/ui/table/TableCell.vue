<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    ellipsis?: boolean;
    width?: string;
  }>(),
  {
    ellipsis: false,
  },
);
</script>

<template>
  <td
    :class="
      cn(
        'unnnic-table-cell',
        { 'unnnic-table-cell--ellipsis': props.ellipsis },
        props.class,
      )
    "
    :style="{ width: props.width }"
  >
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

  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
