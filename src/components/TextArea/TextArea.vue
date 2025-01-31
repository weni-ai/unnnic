<template>
  <UnnnicFormElement
    :label="sanitizedLabel"
    :size="size"
    :disabled="disabled"
    :message="sanitizedMessage"
    :error="errors.join(', ') || type === 'error'"
  >
    <textarea
      ref="textarea"
      class="unnnic-text-area__textarea"
      :class="[
        `unnnic-text-area__textarea--size-${size}`,
        `unnnic-text-area__textarea--type-${type}`,
      ]"
      :placeholder="sanitizedPlaceholder"
      :maxlength="maxLength"
      :disabled="disabled"
      v-model="decodedModelValue"
      @input="$emit('update:modelValue', sanitizedModelValue)"
    ></textarea>

    <template v-if="maxLength" #rightMessage>
      {{ sanitizedModelValue.length }}/{{ maxLength }}
    </template>
  </UnnnicFormElement>
</template>

<script>
import UnnnicFormElement from '../FormElement/FormElement.vue';
import { sanitizeHtml } from '../../utils/sanitize';

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
        return ['normal', 'error'].includes(value);
      },
    },

    errors: {
      type: Array,
      default: () => [],
    },
  },
  emits: ['update:modelValue'],

  computed: {
    sanitizedLabel() {
      return sanitizeHtml(this.label, [], 100);
    },
    sanitizedPlaceholder() {
      return sanitizeHtml(this.placeholder, [], 100);
    },
    sanitizedModelValue() {
      return sanitizeHtml(this.modelValue, [], this.maxLength || 500);
    },
    sanitizedMessage() {
      return sanitizeHtml(this.message, [], 200);
    },
    decodedModelValue: {
      get() {
        return this.sanitizedModelValue.replace(/&lt;/g, '<').replace(/&gt;/g, '>');
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },

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

    display: block;
    width: 100%;
    resize: vertical;
    box-sizing: border-box;

    scrollbar-width: thin;

    &--size-md {
      @include input-md-font;

      min-height: 6.25 * $unnnic-font-size;
      padding: ($unnnic-spacing-ant - $unnnic-border-width-thinner)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &--size-sm {
      @include input-sm-font;

      min-height: 5 * $unnnic-font-size;
      padding: ($unnnic-spacing-xs)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &.unnnic-text-area__textarea--type-error {
      @include input-error;
    }
  }
}
</style>