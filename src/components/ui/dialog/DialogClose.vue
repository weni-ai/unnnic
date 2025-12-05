<script setup lang="ts">
import type { DialogCloseProps } from 'reka-ui';
import { DialogClose } from 'reka-ui';

defineOptions({
  name: 'UnnnicDialogClose',
});

const props = withDefaults(defineProps<DialogCloseProps>(), {
  asChild: true,
});
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
.unnnic-dialog-close {
  > * {
    width: 100%;
  }
}
</style>
