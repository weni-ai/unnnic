<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui';
import { DialogClose } from 'reka-ui';

defineOptions({
  name: 'UnnnicDialogClose',
});

const props = defineProps<DialogCloseProps>();
</script>

<template>
  <DialogClose
    class="unnnic-dialog-close"
    v-bind="props"
  >
    <slot />
  </DialogClose>
</template>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-dialog-close {
  > * {
    width: 100%;
  }
}
</style>
