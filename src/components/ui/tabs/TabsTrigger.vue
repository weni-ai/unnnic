<script setup lang="ts">
import type { TabsTriggerProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TabsTrigger, useForwardProps } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<
  TabsTriggerProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <TabsTrigger
    v-bind="forwardedProps"
    :class="cn('unnnic-tabs-trigger', 'transition-all', props.class)"
  >
    <span class="unnnic-tabs-trigger__content truncate">
      <slot />
    </span>
  </TabsTrigger>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tabs-trigger {
  background-color: transparent;
  border: none;

  padding: $unnnic-space-2 $unnnic-space-4;
  font: $unnnic-font-action;
  color: $unnnic-color-fg-base;

  cursor: pointer;

  &[data-state='active'] {
    font: $unnnic-font-action;
    color: $unnnic-color-fg-emphasized;
    box-shadow: inset 0 (-$unnnic-border-width-thin) 0 0
      $unnnic-color-border-active;
  }

  &:disabled {
    color: $unnnic-color-fg-muted;
    cursor: not-allowed;
  }

  &:hover:not(:disabled) {
    color: $unnnic-color-fg-emphasized;
  }

  &__content {
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;
  }
}
</style>
