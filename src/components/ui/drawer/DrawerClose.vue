<script setup lang="ts">
import type { DrawerCloseProps } from 'vaul-vue';
import { DrawerClose } from 'vaul-vue';

defineOptions({
  name: 'UnnnicDrawerClose',
});

const props = withDefaults(defineProps<DrawerCloseProps>(), {
  asChild: true,
});
</script>

<template>
  <DrawerClose
    v-bind="props"
    class="unnnic-drawer__close"
  >
    <slot />
  </DrawerClose>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__close {
  > * {
    width: 100%;
  }
}
</style>
