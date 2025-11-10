<script setup lang="ts">
import type { HTMLAttributes } from 'vue';
import { cn } from '@/lib/utils';
import UnnnicButton from '@/components/Button/Button.vue';
import DialogClose from './DialogClose.vue';
import UnnnicIcon, { SchemeColor } from '@/components/Icon.vue';

const props = withDefaults(
  defineProps<{
    class?: HTMLAttributes['class'];
    divider?: boolean;
    type?: 'default' | 'success' | 'warning' | 'attention';
    closeButton?: boolean;
  }>(),
  {
    divider: true,
    closeButton: true,
    type: 'default',
  },
);

const iconsMapper = {
  default: { icon: '', scheme: '' as SchemeColor },
  success: { icon: 'check_circle', scheme: 'aux-green-500' as SchemeColor },
  warning: { icon: 'warning', scheme: 'aux-red-500' as SchemeColor },
  attention: { icon: 'error', scheme: 'aux-yellow-500' as SchemeColor },
};
</script>

<template>
  <header
    :class="
      cn(
        'unnnic-dialog-header',
        { 'unnnic-dialog-header--with-divider': props.divider },
        props.class,
      )
    "
  >
    <UnnnicIcon
      v-if="iconsMapper[props.type]?.icon"
      :icon="iconsMapper[props.type]?.icon"
      :scheme="iconsMapper[props.type]?.scheme"
      size="md"
    />
    <slot />

    <DialogClose
      v-if="props.closeButton"
      class="unnnic-dialog-header__close"
    >
      <UnnnicButton
        type="tertiary"
        iconCenter="close"
        size="small"
      />
    </DialogClose>
  </header>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-dialog-header {
  display: flex;
  align-items: center;
  gap: $unnnic-space-2;

  padding: $unnnic-space-6;

  &--with-divider {
    border-bottom: 1px solid $unnnic-color-border-soft;
  }

  &__close {
    margin-left: auto;
  }
}
</style>
