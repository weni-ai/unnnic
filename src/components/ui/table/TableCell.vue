<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { useHasComponentContent } from '@/composables/useSlotUtils';

const props = withDefaults(
  defineProps<{
    align?: 'center' | 'left' | 'right';
    class?: HTMLAttributes['class'];
    ellipsis?: boolean;
    width?: string;
  }>(),
  {
    align: 'left',
    ellipsis: true,
  },
);

const hasComponentContent = useHasComponentContent();
</script>

<template>
  <td
    :class="
      cn(
        'unnnic-table-cell',
        `unnnic-table-cell--align-${props.align}`,
        {
          'unnnic-table-cell--ellipsis': props.ellipsis,
          'unnnic-table-cell--has-component': hasComponentContent,
        },
        props.class,
      )
    "
    :style="{ width: props.width }"
  >
    <div class="unnnic-table-cell__inner">
      <slot />
    </div>
  </td>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$row-min-height: 61px;

.unnnic-table-cell {
  @include unnnic-font-body;
  color: $unnnic-color-fg-emphasized;
  vertical-align: middle;
  padding: 0;

  &__inner {
    box-sizing: border-box;
    display: grid;
    align-items: center;
    min-width: 0;
    max-width: 100%;
    min-height: $row-min-height;
    padding: $unnnic-space-3 $unnnic-space-4;
  }

  &--has-component &__inner {
    padding-block: $unnnic-space-2;
  }

  &--align-left {
    text-align: left;
  }

  &--align-center {
    text-align: center;
  }

  &--align-right {
    text-align: right;
  }

  &--ellipsis:not(&--has-component) &__inner {
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    align-content: center;
  }

  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
