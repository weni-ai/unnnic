<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui';
import type { HTMLAttributes, ComputedRef } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TabsTrigger, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';
import { inject, computed } from 'vue';

const props = defineProps<
  TabsTriggerProps & {
    size?: 'small' | 'medium';
    class?: HTMLAttributes['class'];
  }
>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);

const injectedSize = inject<ComputedRef<'small' | 'medium'>>(
  'segmented-control-size',
);
const currentSize = computed(
  () => props.size ?? injectedSize?.value ?? 'medium',
);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="
      cn(
        'unnnic-segmented-control-trigger',
        `unnnic-segmented-control-trigger--${currentSize}`,
        'transition-all',
        props.class,
      )
    "
  >
    <slot />
  </TabsTrigger>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-segmented-control-trigger {
  width: 100%;

  border: 1px solid $unnnic-color-bg-soft;

  padding: $unnnic-space-2 $unnnic-space-4;

  background-color: $unnnic-color-bg-soft;
  border-radius: $unnnic-radius-1;

  font: $unnnic-font-emphasis;
  color: $unnnic-color-fg-base;

  cursor: pointer;

  &[data-state='active'] {
    border-color: $unnnic-color-border-soft;
    background-color: $unnnic-color-bg-base;
    color: $unnnic-color-fg-emphasized;
  }

  &:disabled {
    color: $unnnic-color-fg-muted;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: $unnnic-color-fg-emphasized;
  }

  &--small {
    font: $unnnic-font-caption-1;
  }
}
</style>
