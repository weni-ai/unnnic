<script setup lang="ts">
import type { DrawerCloseProps } from 'vaul-vue';
import { DrawerClose } from 'vaul-vue';

const props = defineProps<DrawerCloseProps>();
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
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;

  > * {
    width: 100%;
  }
}
</style>
