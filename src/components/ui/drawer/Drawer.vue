<script lang="ts" setup>
import type { DrawerRootEmits, DrawerRootProps } from 'vaul-vue';
import { useForwardPropsEmits } from 'reka-ui';
import { DrawerRoot } from 'vaul-vue';

defineOptions({
  name: 'UnnnicDrawerNext',
});

const props = withDefaults(defineProps<DrawerRootProps>(), {
  shouldScaleBackground: true,
});

const emits = defineEmits<DrawerRootEmits>();

const forwarded = useForwardPropsEmits(props, emits);
</script>

<template>
  <DrawerRoot
    v-bind="forwarded"
    direction="right"
    handleOnly
  >
    <slot />
  </DrawerRoot>
</template>
