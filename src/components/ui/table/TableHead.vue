<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <th :class="cn('unnnic-table-head', props.class)">
    <slot />
  </th>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-head {
  @include unnnic-font-caption-1;
  color: $unnnic-color-fg-base;
  text-align: left;
  align-items: center;

  pointer-events: none;
}
</style>
