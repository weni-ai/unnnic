<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <thead :class="cn('unnnic-table-header', props.class)">
    <slot />
  </thead>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-header {
  * {
    padding-bottom: $unnnic-space-2;
  }
}
</style>
