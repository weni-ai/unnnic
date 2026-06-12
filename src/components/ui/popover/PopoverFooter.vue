<template>
  <Teleport
    v-if="target"
    :to="target"
  >
    <footer class="unnnic-popover__footer">
      <slot />
    </footer>
  </Teleport>

  <footer
    v-else
    class="unnnic-popover__footer"
  >
    <slot />
  </footer>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { POPOVER_FOOTER_TARGET } from './context';

defineOptions({
  name: 'UnnnicPopoverFooter',
});

// When rendered inside a PopoverContent, teleport into its footer container.
// Falls back to inline rendering when used standalone (no target provided).
const target = inject(POPOVER_FOOTER_TARGET, null);
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$popover-space: $unnnic-space-4;

.unnnic-popover__footer {
  border-top: 1px solid $unnnic-color-border-soft;

  padding: $popover-space;

  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: $unnnic-space-2;
}
</style>
