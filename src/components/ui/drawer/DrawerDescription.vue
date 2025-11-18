<script lang="ts" setup>
import type { DrawerDescriptionProps } from 'vaul-vue';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DrawerDescription } from 'vaul-vue';
import { cn } from '@/lib/utils';

const props = defineProps<
  DrawerDescriptionProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerDescription
    v-bind="delegatedProps"
    :class="cn('unnnic-drawer__description', props.class)"
  >
    <slot />
  </DrawerDescription>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__description {
  margin: 0;

  font: $unnnic-font-body;
  color: $unnnic-color-fg-base;

  grid-column: 1 / 3;
  grid-row: 2 / 3;
}
</style>
