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
    <slot />
  </td>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-cell {
  @include unnnic-font-body;
  color: $unnnic-color-fg-emphasized;
  vertical-align: middle;
  padding: $unnnic-space-3 $unnnic-space-4;

  &--has-component {
    padding-top: $unnnic-space-2;
    padding-bottom: $unnnic-space-2;
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

  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &--ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
