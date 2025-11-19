<script lang="ts" setup>
import type { DrawerTitleProps } from 'vaul-vue';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DrawerTitle } from 'vaul-vue';
import { cn } from '@/lib/utils';

const props = defineProps<
  DrawerTitleProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerTitle
    v-bind="delegatedProps"
    :class="cn('unnnic-drawer__title', props.class)"
  >
    <slot />
  </DrawerTitle>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__title {
  margin: 0;

  color: $unnnic-color-fg-emphasized;
  font: $unnnic-font-display-2;
}
</style>
