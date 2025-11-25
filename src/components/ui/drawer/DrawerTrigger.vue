<script setup lang="ts">
import type { DrawerTriggerProps } from 'vaul-vue';
import { DrawerTrigger } from 'vaul-vue';

const props = defineProps<DrawerTriggerProps>();
</script>

<template>
  <DrawerTrigger
    v-bind="props"
    class="unnnic-drawer__trigger"
  >
    <slot />
  </DrawerTrigger>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-drawer__trigger {
  border: none;
  background: none;
  padding: 0;
  margin: 0;
  cursor: pointer;
}
</style>
