<template>
  <div
    @click="$emit('click')"
    :class="{
      'unnnic-select-smart-option': true,
      'unnnic-select-smart-option__active': active,
      'unnnic--clickable': selectable,
      'unnnic-select-smart-option--selectable': selectable,
      'text-focused': textFocused,
    }"
    :title="label"
  >
    <span
      :class="['unnnic-select-smart-option__label', `unnnic-select-smart-option__label--${size}`]"
      >{{ label }}</span
    >
    <p
      :class="[
        'unnnic-select-smart-option__description',
        `unnnic-select-smart-option__description--${size}`,
      ]"
    >
      {{ description }}
    </p>
  </div>
</template>

<script>
export default {
  name: 'UnnicSelectSmartOption',
  props: {
    label: {
      type: String,
      default: 'Option',
      required: true,
    },
    description: {
      type: String,
      default: '',
      required: false,
    },
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
.unnnic-select-smart-option {
  margin: 0 $unnnic-inline-xs;
  background-color: $unnnic-color-background-snow;
  padding: $unnnic-spacing-stack-nano $unnnic-inline-xs;

  max-width: 100%;

  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-neutral-dark;
  font-weight: $unnnic-font-weight-regular;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 1;

  &.text-focused {
    color: $unnnic-color-brand-weni-soft;
    font-weight: $unnnic-font-weight-bold;
  }

  &--selectable:hover,
  &__active {
    border-radius: $unnnic-border-radius-sm;

    background-color: $unnnic-color-neutral-light;
  }

  &__active {
    color: $unnnic-color-weni-600;
    font-weight: $unnnic-font-weight-bold;
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

  &__description {
    margin: 0;

    color: $unnnic-color-neutral-cloudy;
    font-weight: $unnnic-font-weight-regular;

    &--md {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-sm;
    }
  }
}
</style>
