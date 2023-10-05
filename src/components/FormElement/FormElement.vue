<template>
  <div class="unnnic-form-element">
    <div
      v-if="label"
      :class="[
        'label unnnic-font secondary color-neutral-cloudy',
        { 'body-md': size === 'sm', 'body-gt': size == 'md', 'label--fixed': fixedLabel },
      ]"
    >
      {{ label }}
    </div>

    <slot></slot>

    <div
      v-if="error && error !== true"
      class="message unnnic-font secondary body-md color-feedback-red"
    >
      {{ error }}
    </div>

    <div v-if="message" class="message unnnic-font secondary body-md color-neutral-cloudy">
      {{ message }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: String,
      default: 'md',
      validator: (size) => ['md', 'sm'].includes(size),
    },

    label: String,

    fixedLabel: Boolean,

    error: [Boolean, String],

    message: String,
  },

  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form-element {
  .label {
    margin-bottom: $unnnic-spacing-xs;

    &--fixed.unnnic-font.body-md {
      margin-top: - $unnnic-font-size-body-md - $unnnic-line-height-md + 3px;
    }

    &--fixed.unnnic-font.body-gt {
      margin-top: - $unnnic-font-size-body-gt - $unnnic-line-height-md + 3px;
    }

    &--fixed {
      margin-bottom: 0;
      position: absolute;
      padding: 0 $unnnic-spacing-nano;
      margin-left: $unnnic-spacing-xs;

      &:after {
        content: " ";
        position: absolute;
        left: 0;
        bottom: 3px - $unnnic-border-width-thinner;
        width: 100%;
        height: $unnnic-border-width-thinner;
        background-color: $unnnic-color-neutral-white;
      }
    }
  }

  .message {
    margin-top: $unnnic-spacing-stack-nano;
  }
}
</style>
