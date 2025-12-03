<script setup lang="ts">
import type { TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TabsList } from 'reka-ui';
import { cn } from '@/lib/utils';
import { provide, computed } from 'vue';

const props = withDefaults(
  defineProps<
    TabsListProps & {
      size?: 'small' | 'medium';
      class?: HTMLAttributes['class'];
    }
  >(),
  {
    size: 'medium',
  },
);

const delegatedProps = reactiveOmit(props, 'class');

provide(
  'segmented-control-size',
  computed(() => props.size),
);
</script>

<template>
  <TabsList
    v-bind="delegatedProps"
    :class="cn('unnnic-segmented-control-list', props.class)"
  >
    <slot />
  </TabsList>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-segmented-control-list {
  padding: $unnnic-space-1;

  display: flex;
  align-items: center;
  gap: $unnnic-space-1;

  border-radius: $unnnic-radius-2;
  background-color: $unnnic-color-bg-soft;
}
</style>
