<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{
    align?: 'center' | 'left' | 'right';
    class?: HTMLAttributes['class'];
    ellipsis?: boolean;
    width?: string;
  }>(),
  {
    align: 'left',
    ellipsis: false,
  },
);
</script>

<template>
  <th
    :class="
      cn(
        'unnnic-table-head',
        `unnnic-table-head--align-${props.align}`,
        { 'unnnic-table-head--ellipsis': props.ellipsis },
        props.class,
      )
    "
    :style="{ width: props.width }"
  >
    <slot />
  </th>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-head {
  @include unnnic-font-caption-1;
  color: $unnnic-color-fg-base;
  vertical-align: middle;

  &--align-left {
    text-align: left;
  }

  &--align-center {
    text-align: center;
  }

  &--align-right {
    text-align: right;
  }

  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
