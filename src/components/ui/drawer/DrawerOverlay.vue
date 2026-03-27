<script lang="ts" setup>
import type { DialogOverlayProps } from 'reka-ui';
import { type HTMLAttributes } from 'vue';
import { reactiveOmit } from '@vueuse/core';
import { DrawerOverlay } from 'vaul-vue';
import { cn } from '@/lib/utils';

defineOptions({
  name: 'UnnnicDrawerOverlay',
});

const props = defineProps<
  DialogOverlayProps & { class?: HTMLAttributes['class'] }
>();

const delegatedProps = reactiveOmit(props, 'class');
</script>

<template>
  <DrawerOverlay
    v-bind="delegatedProps"
    :class="cn('unnnic-drawer__overlay', props.class)"
  />
</template>

<style lang="scss" scoped>
.unnnic-drawer__overlay {
  position: fixed;
  inset: 0;

  background: rgba(53, 57, 69, 0.65);
}
</style>
