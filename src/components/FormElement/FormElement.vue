<template>
  <div class="unnnic-form-element">
    <div
      v-if="label"
      :class="[
        'label unnnic-font secondary color-neutral-cloudy',
        { 'body-md': size === 'sm', 'body-gt': size == 'md' },
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
    margin-bottom: $unnnic-spacing-stack-xs;
  }

  .message {
    margin-top: $unnnic-spacing-stack-nano;
  }
}
</style>
