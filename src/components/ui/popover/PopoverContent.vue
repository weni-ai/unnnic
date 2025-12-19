<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :style="{ width: contentWidth }"
      :class="
        cn(
          'unnnic-popover',
          'bg-popover text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        )
      "
    >
      <section :class="`unnnic-popover__content ${props.class || ''}`">
        <component
          :is="child"
          v-for="(child, index) in contentChildren"
          :key="index"
        />
      </section>

      <component
        :is="child"
        v-for="(child, index) in footerChildren"
        :key="index"
      />
    </PopoverContent>
  </PopoverPortal>
</template>

<script setup lang="ts">
import type { PopoverContentEmits, PopoverContentProps } from 'reka-ui';
import type { HTMLAttributes, VNode } from 'vue';
import { computed, useSlots } from 'vue';
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

const slots = useSlots();

const getComponentName = (vnode: VNode): string | undefined => {
  const componentType = vnode.type as { name?: string; __name?: string };
  return componentType?.name || componentType?.__name;
};

const contentChildren = computed(() => {
  const defaultSlot = slots.default?.() || [];
  return defaultSlot.filter(
    (vnode: VNode) => getComponentName(vnode) !== 'UnnnicPopoverFooter',
  );
});

const footerChildren = computed(() => {
  const defaultSlot = slots.default?.() || [];
  return defaultSlot.filter(
    (vnode: VNode) => getComponentName(vnode) === 'UnnnicPopoverFooter',
  );
});

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
  z-index: 10000;

  border-radius: $unnnic-radius-2;
  box-shadow: $unnnic-shadow-1;
  border: 1px solid $unnnic-color-border-soft;

  &::-webkit-scrollbar {
    width: $unnnic-space-1;
  }

  &::-webkit-scrollbar-thumb {
    background: $unnnic-color-neutral-cleanest;
    border-radius: $unnnic-border-radius-pill;
  }

  &::-webkit-scrollbar-track {
    background: $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-pill;
  }

  &__content {
    padding: $popover-space;
  }
}
</style>
