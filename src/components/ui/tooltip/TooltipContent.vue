<script setup lang="ts">
import type { TooltipContentEmits, TooltipContentProps } from 'reka-ui';
import type { HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import {
  TooltipArrow,
  TooltipContent,
  TooltipPortal,
  useForwardPropsEmits,
} from 'reka-ui';
import { cn } from '@/lib/utils';
import { useLayerZIndex } from '@/lib/layer-manager';
import { useTeleportTarget } from '@/lib/teleport-target';

defineOptions({
  inheritAttrs: false,
});

const props = withDefaults(
  defineProps<TooltipContentProps & { class?: HTMLAttributes['class'] }>(),
  {
    sideOffset: 0,
    class: undefined,
  },
);

const emits = defineEmits<TooltipContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');

const forwarded = useForwardPropsEmits(delegatedProps, emits);
const tooltipZIndex = useLayerZIndex();
const portalTarget = useTeleportTarget();
</script>

<template>
  <TooltipPortal :to="portalTarget">
    <TooltipContent
      v-bind="{ ...forwarded, ...$attrs }"
      :class="
        cn(
          'tooltip__content',
          'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          props.class,
        )
      "
      :style="{ zIndex: tooltipZIndex }"
    >
      <slot />

      <TooltipArrow class="tooltip__arrow" />
    </TooltipContent>
  </TooltipPortal>
</template>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

.tooltip__content {
  background-color: $unnnic-color-gray-900;
  color: $unnnic-color-white;
  border-radius: $unnnic-radius-1;
  padding: $unnnic-space-2;
  box-shadow: $unnnic-shadow-1;
  font: $unnnic-font-caption-2;

  overflow-wrap: break-word;
}

.tooltip__arrow {
  width: 10px;
  height: 10px;
  background-color: $unnnic-color-gray-900;
  fill: $unnnic-color-gray-900;
  transform: rotate(45deg) translate(-50%, -50%);
}
</style>
