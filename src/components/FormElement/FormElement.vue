<template>
  <section
    class="unnnic-form-element"
    :class="{ 'unnnic-form-element--disabled': disabled }"
  >
    <p
      v-if="label"
      :class="[
        'unnnic-form-element__label',
        {
          'unnnic-form-element__label--fixed': fixedLabel,
        },
      ]"
    >
      {{ fullySanitize(label) }}
    </p>

    <slot></slot>

    <section class="unnnic-form-element__hints-container">
      <section class="unnnic-form-element__message-container">
        <p
          v-if="message"
          class="unnnic-form-element__message"
        >
          {{ fullySanitize(message) }}
        </p>
        <p v-if="!!error.length" class="unnnic-form-element__message error">
          {{ Array.isArray(error) ? error.join(', ') : error }}
        </p>
      </section>
      <p v-if="!!$slots.rightMessage">
        <slot name="rightMessage"></slot>
      </p>
    </section>
  </section>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
export default {

  props: {
    size: {
      type: String,
      default: 'md',
      validator: (size) => ['md', 'sm'].includes(size),
    },

    label: { type: String, default: '' },

    fixedLabel: { type: Boolean, default: false },

    error: {
      type: [Boolean, String],
      default: false,
    },

    message: { type: String, default: '' },

    disabled: { type: Boolean, default: false },
  },
  methods: {
    fullySanitize,
  }
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-form-element {
  &__label {
    margin: 0;
    margin-bottom: $unnnic-spacing-nano;

    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;

    $label-bottom-spacing: 3px;

    &--fixed {
      margin-top: -$unnnic-font-size-body-gt - $unnnic-line-height-md +
        $label-bottom-spacing;
    }

    &--fixed {
      margin-bottom: 0;
      position: absolute;
      padding: 0 $unnnic-spacing-nano;
      margin-left: $unnnic-spacing-xs;

      &:after {
        content: ' ';
        position: absolute;
        left: 0;
        bottom: $label-bottom-spacing - $unnnic-border-width-thinner;
        width: 100%;
        height: $unnnic-border-width-thinner;
        background-color: $unnnic-color-neutral-white;
      }
    }
  }

  &__message {
    &.error {
      color: $unnnic-color-fg-critical;
    }
  }

  &__hints-container {
    display: flex;
    justify-content: space-between;
    margin-top: $unnnic-space-1;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }

  &__message-container {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-1;
  }


  &--disabled .unnnic-form-element__label,
  &--disabled .unnnic-form-element__message {
    user-select: none;
  }
}
</style>
