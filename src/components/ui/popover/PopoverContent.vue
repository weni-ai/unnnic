<template>
  <PopoverPortal :to="portalTarget">
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :style="{ width: contentWidth, zIndex: popoverZIndex }"
      :class="
        cn(
          'unnnic-popover',
          'bg-popover text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        )
      "
    >
      <section :class="`unnnic-popover__content ${props.class || ''}`">
        <slot />
      </section>

      <div
        ref="footerContainer"
        data-testid="popover-footer-container"
      />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { computed, provide, ref } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';
import { useLayerZIndex } from '@/lib/layer-manager';
import { useTeleportTarget } from '@/lib/teleport-target';
import { POPOVER_FOOTER_TARGET } from './context';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<
    PopoverContentProps & {
      class?: HTMLAttributes['class'];
      size?: string;
      width?: string;
    }
  >(),
  {
    align: 'center',
    sideOffset: 4,
    size: 'medium',
    class: '',
    width: '',
  },
);
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size');

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const popoverZIndex = useLayerZIndex();
const portalTarget = useTeleportTarget();

const footerContainer = ref<HTMLElement | null>(null);
provide(POPOVER_FOOTER_TARGET, footerContainer);

const contentWidth = computed(() => {
  if (props.width) return props.width;

  const sizes = {
    small: '240px',
    medium: '320px',
    large: '400px',
  };

  return sizes[props.size as keyof typeof sizes];
});
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$popover-space: $unnnic-space-4;

.unnnic-popover {
  border-radius: $unnnic-radius-2;
  box-shadow: $unnnic-shadow-1;
  border: 1px solid $unnnic-color-border-soft;

  &.bg-popover {
    background-color: $unnnic-color-bg-base;
  }

  &::-webkit-scrollbar {
    width: $unnnic-space-1;
  }

  &::-webkit-scrollbar-thumb {
    background: $unnnic-color-border-emphasized;
    border-radius: $unnnic-border-radius-pill;
  }

  &::-webkit-scrollbar-track {
    background: $unnnic-color-bg-muted;
    border-radius: $unnnic-border-radius-pill;
  }

  &__content {
    padding: $popover-space;
  }
}
</style>
