<script setup lang="ts">
import type { DialogRootEmits, DialogRootProps } from 'reka-ui';
import { computed, toRef } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DialogRoot, useForwardPropsEmits } from 'reka-ui';
import useDelayedUnmount from '@/composables/useDelayedUnmount';

defineOptions({
  name: 'UnnnicDialog',
});

const props = withDefaults(
  defineProps<
    DialogRootProps & {
      /**
       * When true, the dialog is only mounted while open and stays mounted for
       * `unmountDelay` ms after closing so the exit animation can play. Use it
       * to avoid mounting many dialogs eagerly inside lists.
       */
      lazyMount?: boolean;
      /**
       * Delay (ms) before the dialog is unmounted after closing. Should match
       * the leave animation duration. Only applies when `lazyMount` is true.
       */
      unmountDelay?: number;
    }
  >(),
  {
    lazyMount: false,
    unmountDelay: 300,
  },
);
const emits = defineEmits<DialogRootEmits>();

const delegatedProps = reactiveOmit(props, 'lazyMount', 'unmountDelay');
const forwarded = useForwardPropsEmits(delegatedProps, emits);

const open = toRef(props, 'open');
const lazyShouldRender = useDelayedUnmount(open, props.unmountDelay);

const shouldRender = computed(() => !props.lazyMount || lazyShouldRender.value);
</script>

<template>
  <DialogRoot
    v-if="shouldRender"
    v-bind="forwarded"
  >
    <slot />
  </DialogRoot>
</template>
