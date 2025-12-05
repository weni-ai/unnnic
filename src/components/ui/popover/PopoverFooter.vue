<template>
  <footer class="unnnic-popover__footer">
    <slot />
  </footer>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UnnnicPopoverFooter',
});
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

$popover-space: $unnnic-space-4;

.unnnic-popover__footer {
  border-top: 1px solid $unnnic-color-border-soft;

  padding: $popover-space;

  display: flex;
  justify-content: center;
  align-items: center;
  gap: $unnnic-space-2;

  > * {
    width: 100%;
  }
}
</style>
