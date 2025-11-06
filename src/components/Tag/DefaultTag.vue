<template>
  <section
    :class="`unnnic-tag unnnic-tag-scheme--${scheme} unnnic-tag--${size}`"
  >
    <section
      v-if="leftIcon"
      class="unnnic-tag__icon"
    >
      <UnnnicIcon
        :icon="leftIcon"
        :scheme="scheme"
        size="sm"
      />
    </section>
    <span
      :class="`unnnic-tag__label`"
      >{{ text }}</span
    >
  </section>
</template>

<script setup lang="ts">
import UnnnicIcon from '../Icon.vue';
import type { DefaultTagProps } from './types';

withDefaults(defineProps<DefaultTagProps>(), {
  text: undefined,
  size: 'medium',
  scheme: 'aux-purple',
  leftIcon: undefined,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

@each $name, $color in $scheme-colors {
  .unnnic-tag-scheme--#{$name} {
    background-color: rgba($color, $unnnic-opacity-level-light);
    outline-style: solid;
    outline-color: rgba($color, $unnnic-opacity-level-extra-light);
    outline-width: $unnnic-border-width-thinner;
    outline-offset: -$unnnic-border-width-thinner;
  }
}

.unnnic-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $unnnic-space-1;
  border-radius: $unnnic-border-radius-pill;
  padding: calc($unnnic-space-1 * 1.5) $unnnic-space-3;

  &--small {
    padding: calc($unnnic-space-1 * 0.5) $unnnic-space-3;
  }

  &__label {
    font: $unnnic-font-caption-1;
    color: $unnnic-color-fg-emphasized;
  }

  &__icon {
    display: flex;
  }
}
</style>
