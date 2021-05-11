<template>
  <p class="unnnic-label__label">{{ label }}</p>
</template>

<script>
export default {
  name: 'unnnic-label',
  props: {
    label: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-label {
  &__label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-md;
    color: $unnnic-color-neutral-darkest;
    margin: $unnnic-spacing-stack-xs 0;
  }
}
</style>
