<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import { computed, toRef } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { useForwardPropsEmits } from 'reka-ui';
import { DrawerRoot } from 'vaul-vue';
import useDelayedUnmount from '@/composables/useDelayedUnmount';

defineOptions({
  name: 'UnnnicDrawerNext',
});

interface UnnnicDrawerNextProps extends DrawerRootProps {
  /**
   * When true, the drawer is only mounted while open and stays mounted for
   * `unmountDelay` ms after closing so the exit animation can play. Use it
   * to avoid mounting many drawers eagerly inside lists.
   */
  lazyMount?: boolean;
  /**
   * Delay (ms) before the drawer is unmounted after closing. Should match
   * the leave animation duration. Only applies when `lazyMount` is true.
   */
  unmountDelay?: number;
}

const props = withDefaults(defineProps<UnnnicDrawerNextProps>(), {
  shouldScaleBackground: true,
  lazyMount: false,
  unmountDelay: 300,
});

const emits = defineEmits<DrawerRootEmits>();

const delegatedProps = reactiveOmit(props, 'lazyMount', 'unmountDelay');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const open = toRef(props, 'open');
// @ts-expect-error - unmountDelay conflict with the DrawerRootProps type
const lazyShouldRender = useDelayedUnmount(open, props.unmountDelay);

// @ts-expect-error - lazyMount conflict with the DrawerRootProps type
const shouldRender = computed(() => !props.lazyMount || lazyShouldRender.value);
</script>

<template>
  <DrawerRoot
    v-if="shouldRender"
    v-bind="forwarded"
    direction="right"
    handleOnly
  >
    <slot />
  </DrawerRoot>
</template>
