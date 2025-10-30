<script setup lang="ts">
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  DialogContent,
  DialogOverlay,
  DialogPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@/lib/utils';

const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: HTMLAttributes['class'];
      size?: 'small' | 'medium' | 'large';
    }
  >(),
  {
    size: 'medium',
  },
);
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<template>
  <DialogPortal>
    <DialogOverlay
      class="unnnic-dialog-overlay data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0"
    />
    <DialogContent
      v-bind="forwarded"
      :class="
        cn(
          'unnnic-dialog-content',
          `unnnic-dialog-content--size-${props.size}`,
          'duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]',

          props.class,
        )
      "
    >
      <slot />
    </DialogContent>
  </DialogPortal>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;

  width: 100vw;
  height: 100vh;
  background: rgba(53, 57, 69, 0.5);
}

.unnnic-dialog-content {
  z-index: 10000;

  position: fixed;
  top: 50%;
  left: 50%;

  transform: translate(-50%, -50%);

  width: 100%;
  max-height: calc(100% - $unnnic-space-20);

  display: flex;
  flex-direction: column;

  box-shadow: $unnnic-shadow-2;
  border-radius: $unnnic-radius-4;
  background-color: $unnnic-color-bg-base;

  &--size-small {
    max-width: 360px;
  }

  &--size-medium {
    max-width: 560px;
  }

  &--size-large {
    max-width: 800px;
  }

  > * {
    &::-webkit-scrollbar {
      width: $unnnic-spacing-inline-nano;
    }

    &::-webkit-scrollbar-thumb {
      background: $unnnic-color-neutral-cleanest;
      border-radius: $unnnic-border-radius-pill;
    }

    &::-webkit-scrollbar-track {
      background: $unnnic-color-neutral-soft;
      border-radius: $unnnic-border-radius-pill;
    }
  }
}
</style>
