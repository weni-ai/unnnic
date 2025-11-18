<script lang="ts" setup>
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import { UnnnicButton } from '@/components';
import DrawerClose from './DrawerClose.vue';

const props = defineProps<{
  class?: HTMLAttributes['class'];
}>();
</script>

<template>
  <header :class="cn('unnnic-drawer__header', props.class)">
    <slot />

    <template v-if="$slots.close">
      <slot
        name="close"
        class="unnnic-drawer__close-button"
      />
    </template>
    <template v-else>
      <DrawerClose>
        <UnnnicButton
          iconCenter="close"
          size="small"
          type="tertiary"
          class="unnnic-drawer__close-button"
        />
      </DrawerClose>
    </template>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__header {
  display: grid;
  align-items: center;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto auto;
  padding: $unnnic-space-6;

  gap: $unnnic-space-1;

  border-bottom: 1px solid $unnnic-color-border-soft;
}

.unnnic-drawer__close-button {
  grid-column: 2 / 3;
  grid-row: 1 / 2;
}
</style>
