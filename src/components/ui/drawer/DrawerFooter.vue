<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <footer :class="cn('unnnic-drawer__footer', props.class)">
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__footer {
  border-top: 1px solid $unnnic-color-border-soft;

  margin-top: auto;
  padding: $unnnic-space-6;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: $unnnic-space-2;

  > * {
    width: 100%;
  }
}
</style>
