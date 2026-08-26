<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { computed, getCurrentInstance } from 'vue';
import { cn } from '@/lib/utils';

const emit = defineEmits<{
  (e: 'click', event: KeyboardEvent | MouseEvent): void;
}>();

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();

const instance = getCurrentInstance();
const isClickable = computed(() => Boolean(instance?.vnode.props?.onClick));

function handleClick(event: KeyboardEvent | MouseEvent) {
  if (!isClickable.value) return;
  emit('click', event);
}
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
    @click="handleClick"
    @keydown.enter="handleClick"
    @keydown.space.prevent="handleClick"
  >
    <slot />
  </tr>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-table-row {
  border-bottom: 1px solid $unnnic-color-border-base;

  &:hover {
    background-color: $unnnic-color-bg-soft;
  }
}
</style>
