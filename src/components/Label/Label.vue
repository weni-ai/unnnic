<template>
  <p class="unnnic-label__label">{{ fullySanitize(label) }}</p>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
export default {
  name: 'UnnnicLabel',
  props: {
    label: {
      type: String,
      default: null,
    },
  },
  methods: {
    fullySanitize,
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;

.unnnic-label {
  &__label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-cloudy;
    margin: $unnnic-spacing-stack-xs 0;
  }
}
</style>
