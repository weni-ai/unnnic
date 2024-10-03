<template>
  <UnnnicFormElement
    :label="label"
    :size="size"
    :disabled="disabled"
    :message="message"
    :error="errors.join(', ') || type === 'error'"
  >
    <textarea
      ref="textarea"
      class="unnnic-text-area__textarea"
      :class="[
        `unnnic-text-area__textarea--size-${size}`,
        `unnnic-text-area__textarea--type-${type}`,
      ]"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
    ></textarea>

    <template
      v-if="maxLength"
      #rightMessage
      >{{ modelValue.length }}/{{ maxLength }}</template
    >
  </UnnnicFormElement>
</template>

<script>
import UnnnicFormElement from '../FormElement/FormElement.vue';

export default {
  components: {
    UnnnicFormElement,
  },

  props: {
    size: {
      type: String,
      default: 'md',
    },

    label: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    modelValue: {
      type: String,
    },

    maxLength: {
      type: Number,
    },

    message: {
      type: String,
      default: '',
    },

    disabled: {
      type: Boolean,
    },

    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },

    errors: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],

  methods: {
    focus() {
      this.$refs.textarea.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';
@import '../Input/Input.scss';

.unnnic-text-area {
  &__textarea {
    @include input-base;

    $textarea-height: 5 * $unnnic-font-size;

    display: block;
    min-height: $textarea-height;
    width: 100%;
    resize: vertical;
    box-sizing: border-box;

    scrollbar-width: thin;

    &--size-md {
      @include input-md-font;

      padding: ($unnnic-spacing-ant - $unnnic-border-width-thinner)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &--size-sm {
      @include input-sm-font;

      padding: ($unnnic-spacing-xs)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &.unnnic-text-area__textarea--type-error {
      @include input-error;
    }
  }
}
</style>
