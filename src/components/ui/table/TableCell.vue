<script setup lang="ts">
import type { HTMLAttributes, VNode } from 'vue';
import { Comment, Fragment, Text, computed, useSlots } from 'vue';
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
    ellipsis: true,
  },
);

const slots = useSlots();

const isTextOnlySlot = (vnodes: VNode[] | undefined): boolean => {
  if (!vnodes?.length) return true;

  return vnodes.every((vnode) => {
    if (vnode.type === Comment) return true;
    if (vnode.type === Text) return true;
    if (vnode.type === Fragment) {
      return isTextOnlySlot(vnode.children as VNode[]);
    }

    return false;
  });
};

const hasComponentContent = computed(() => !isTextOnlySlot(slots.default?.()));
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
}
</style>
