<script setup lang="ts">
import type { TabsListProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { TabsList } from 'reka-ui';
import { cn } from '@/lib/utils';

const props = defineProps<
  TabsListProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <section class="unnnic-tabs-list">
    <TabsList
      v-bind="delegatedProps"
      :class="cn('unnnic-tabs-list__list', props.class)"
    >
      <slot />
    </TabsList>
    <slot name="right" />
  </section>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tabs-list {
  display: flex;
  &__list {
    display: flex;
    align-items: center;
    width: 100%;
    gap: $unnnic-space-6;
    box-shadow: inset 0 (-$unnnic-border-width-thinner) 0 0
      $unnnic-color-border-base;
  }
}
</style>
