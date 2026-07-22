<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, useAttrs } from 'vue';
import { cn } from '@/lib/utils';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const attrs = useAttrs();
const isClickable = computed(() => Boolean(attrs.onClick));
</script>

<template>
  <tr
    :tabindex="isClickable ? 0 : undefined"
    :class="
      cn(
        'unnnic-table-row',
        'transition-colors data-[state=selected]:bg-muted',
        isClickable && 'cursor-pointer',
        props.class,
      )
    "
    @keydown.enter="isClickable && $emit('click', $event)"
    @keydown.space.prevent="isClickable && $emit('click', $event)"
  >
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-row {
  & > :first-child {
    padding-left: $unnnic-space-3;
  }

  & > :last-child {
    padding-right: $unnnic-space-3;
  }

  border-bottom: 1px solid $unnnic-color-border-base;

  &:hover {
    background-color: $unnnic-color-bg-soft;
  }
}
</style>
