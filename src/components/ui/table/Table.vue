<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <div class="relative w-full overflow-auto">
    <table :class="cn('unnnic-table', props.class)">
      <slot />
    </table>
  </div>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table {
  border-collapse: collapse;
  width: 100%;
  caption-side: bottom;

  @include unnnic-font-body;
  color: $unnnic-color-fg-base;
}
</style>
