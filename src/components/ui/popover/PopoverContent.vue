<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'unnnic-popover',
          `unnnic-popover--size-${props.size}`,
          'z-50 bg-popover text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
    >
      <section class="unnnic-popover__content">
        <slot />
      </section>

      <footer
        v-if="$slots.footer"
        class="unnnic-popover__footer"
      >
        <slot name="footer" />
      </footer>
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    PopoverContentProps & {
      class?: HTMLAttributes['class'];
      size?: 'small' | 'medium' | 'large';
    }
  >(),
  {
    align: 'center',
    sideOffset: 4,
    size: 'medium',
  },
);
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$popover-space: $unnnic-space-4;

.unnnic-popover {
  border-radius: $unnnic-radius-2;
  box-shadow: $unnnic-shadow-1;

  &--size-small {
    width: 240px;
  }
  &--size-medium {
    width: 320px;
  }
  &--size-large {
    width: 400px;
  }

  &__content {
    padding: $popover-space;
  }

  &__footer {
    border-top: 1px solid $unnnic-color-border-soft;

    padding: $popover-space;

    display: flex;
    justify-content: center;
    align-items: center;
    gap: $unnnic-space-2;

    > * {
      width: 100%;
    }
  }
}
</style>
