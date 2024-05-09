<template>
  <div
    @click="$emit('click')"
    :class="{
      'unnnic-select-item': true,
      'unnnic-select-item__active': active,
      'unnnic--clickable': selectable,
      'unnnic-select-item--selectable': selectable,
      'text-focused': textFocused,
    }"
  >
    <span
      :class="[
        'unnnic-select-item__label',
        `unnnic-select-item__label--${size}`,
      ]"
    >
      <slot />
    </span>
  </div>
</template>

<script>
export default {
  name: 'UnnicSelectItem',
  props: {
    size: {
      type: String,
      default: '',
    },
    selectable: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
    textFocused: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';
.unnnic-select-item {
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-stack-nano $unnnic-inline-xs;
  margin: $unnnic-inline-xs;

  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-neutral-dark;
  font-weight: $unnnic-font-weight-regular;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  -webkit-line-clamp: 1;

  &.text-focused {
    color: $unnnic-color-brand-weni-soft;
    font-weight: $unnnic-font-weight-bold;
  }

  &--selectable:hover,
  &__active {
    background-color: $unnnic-color-neutral-lightest;
    border-radius: $unnnic-border-radius-sm;
  }

  &__label {
    &--md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
  }
}
</style>
