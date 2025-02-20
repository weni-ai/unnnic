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
      {{ label }}
    </p>

    <slot></slot>

    <p
      v-if="shouldShowErrorSection"
      class="unnnic-form-element__error"
    >
      <template v-if="error !== true">
        <UnnnicIcon
          size="sm"
          icon="warning"
          scheme="aux-red-500"
        />

        {{ error }}
      </template>

      <span
        v-if="!!$slots.rightMessage"
        class="unnnic-form-element__right-message"
      >
        <slot name="rightMessage"></slot>
      </span>
    </p>

    <p
      v-if="message || !!$slots.rightMessage"
      class="unnnic-form-element__message"
    >
      {{ message }}

      <span
        v-if="!shouldShowErrorSection && !!$slots.rightMessage"
        class="unnnic-form-element__right-message"
      >
        <slot name="rightMessage"></slot>
      </span>
    </p>
  </section>
</template>

<script>
import UnnnicIcon from '../../components/Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    size: {
      type: String,
      default: 'md',
      validator: (size) => ['md', 'sm'].includes(size),
    },

    label: String,

    fixedLabel: Boolean,

    error: {
      type: [Boolean, String],
      default: false,
    },

    message: String,

    disabled: Boolean,
  },

  data() {
    return {};
  },

  computed: {
    shouldShowErrorSection() {
      return this.error && (this.error !== true || !!this.$slots.rightMessage);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

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

  &__error,
  &__message {
    margin: 0;
    margin-top: $unnnic-spacing-stack-nano;

    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
  }

  &__message {
    display: flex;
    column-gap: $unnnic-spacing-nano;
  }

  &__right-message {
    margin-left: auto;
  }

  &__error {
    display: flex;
    column-gap: $unnnic-spacing-nano;
    align-items: center;

    color: $unnnic-color-aux-red-500;
  }

  &--disabled .unnnic-form-element__label,
  &--disabled .unnnic-form-element__message {
    user-select: none;
    color: $unnnic-color-neutral-cleanest;
  }
}
</style>
