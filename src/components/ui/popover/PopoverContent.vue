<template>
  <PopoverPortal>
    <PopoverContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'unnnic-popover',
          `unnnic-popover--size-${props.size}`,
          'bg-popover text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        )
      "
      :style="{ zIndex: popoverZIndex }"
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
import type { HTMLAttributes, Slots, VNode } from 'vue';
import { computed, useSlots } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { PopoverContent, PopoverPortal, useForwardPropsEmits } from 'reka-ui';
import { cn } from '@/lib/utils';
import { useLayerZIndex } from '@/lib/layer-manager';

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
    class: '',
  },
);
const emits = defineEmits<PopoverContentEmits>();

const delegatedProps = reactiveOmit(props, 'class', 'size');

const forwarded = useForwardPropsEmits(delegatedProps, emits);

const slots = useSlots() as Slots;

const popoverZIndex = useLayerZIndex('popover');

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
}
</style>
