<script lang="ts" setup>
import type { DialogContentEmits, DialogContentProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { DrawerContent, DrawerPortal } from 'vaul-vue';
import { cn } from '@/lib/utils';
import { useLayerZIndex } from '@/lib/layer-manager';
import { useTeleportTarget } from '@/lib/teleport-target';
import DrawerOverlay from './DrawerOverlay.vue';

defineOptions({
  name: 'UnnnicDrawerContent',
});

const props = withDefaults(
  defineProps<
    DialogContentProps & {
      class?: HTMLAttributes['class'];
      size?: 'medium' | 'large' | 'extra-large' | 'giant';
      showOverlay?: boolean;
    }
  >(),
  {
    class: undefined,
    size: 'medium',
    showOverlay: true,
  },
);
const emits = defineEmits<DialogContentEmits>();

const delegatedProps = reactiveOmit(props, 'class');
const forwardedProps = useForwardPropsEmits(delegatedProps, emits);

const layerZIndex = useLayerZIndex();
const portalTarget = useTeleportTarget();
</script>

<template>
  <DrawerPortal :to="portalTarget">
    <DrawerOverlay
      v-if="showOverlay"
      :style="{ zIndex: layerZIndex - 2 }"
    />
    <DrawerContent
      v-bind="forwardedProps"
      :class="
        cn(
          'unnnic-drawer__content',
          `unnnic-drawer__content--${props.size}`,
          props.class,
        )
      "
      :style="{
        '--initial-transform': 'calc(100% + 8px)',
        zIndex: layerZIndex,
      }"
    >
      <slot />
    </DrawerContent>
  </DrawerPortal>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$drawer-space: $unnnic-space-2;

.unnnic-drawer__content {
  -webkit-user-select: unset;
  user-select: unset;
  will-change: unset;

  &::after {
    display: none;
  }

  position: fixed;
  top: $drawer-space;
  right: $drawer-space;

  display: flex;
  flex-direction: column;

  height: calc(100% - $drawer-space * 2);

  border-radius: $unnnic-radius-4;
  border: 1px solid $unnnic-color-border-soft;
  background-color: $unnnic-color-bg-base;

  &--medium {
    width: calc(100% / 3);
  }

  &--large {
    width: 50%;
  }

  &--extra-large {
    width: 66%;
  }

  &--giant {
    width: 75%;
  }

  &__body {
    overflow-y: auto;
    padding: $unnnic-space-6;
    flex: 1 0 0;
  }
}
</style>
