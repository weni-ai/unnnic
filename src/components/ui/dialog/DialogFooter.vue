<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<{ class?: HTMLAttributes['class']; divider?: boolean }>(),
  {
    divider: true,
  },
);
</script>

<template>
  <footer
    :class="
      cn(
        'unnnic-dialog-footer',
        { 'unnnic-dialog-footer--with-divider': props.divider },
        props.class,
      )
    "
  >
    <slot />
  </footer>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-dialog-footer {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: $unnnic-space-2;

  padding: $unnnic-space-6;

  &--with-divider {
    border-top: 1px solid $unnnic-color-border-soft;
  }

  > * {
    width: 100%;
  }
}
</style>
