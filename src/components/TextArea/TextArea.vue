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
      :placeholder="fullySanitize(placeholder)"
      :maxlength="maxLength"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', fullySanitize($event.target.value))"
    />

    <template
      v-if="maxLength"
      #rightMessage
    >
      {{ modelValue.length }}/{{ maxLength }}
    </template>
  </UnnnicFormElement>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
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
    fullySanitize,
    focus() {
      this.$refs.textarea.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use '@/components/Input/Input' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-text-area {
  &__textarea {
    @include input-base;

    display: block;
    width: 100%;
    resize: vertical;

    scrollbar-width: thin;

    padding: $unnnic-space-3 $unnnic-space-4;

    &--size-md {
      @include input-md-font;

      min-height: 100px;
      
    }

    &--size-sm {
      @include input-sm-font;

      min-height: $unnnic-space-20;
    }

    &.unnnic-text-area__textarea--type-error {
      @include input-error;
    }
  }
}
</style>
