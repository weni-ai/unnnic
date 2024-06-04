<template>
  <div :class="['unnnic-text-area', { disabled }, size, type]">
    <div
      v-if="label"
      class="label"
    >
      {{ label }}
    </div>

    <textarea
      ref="textarea"
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.srcElement.value)"
    ></textarea>

    <div
      v-if="maxLength && type === 'normal'"
      class="helper"
    >
      {{ modelValue.length }}/{{ maxLength }}
    </div>
    <div
      v-if="type === 'error'"
      class="error-list"
    >
      <span
        v-for="(error, index) in errors"
        :key="index"
      >
        {{ error }}
      </span>
    </div>
  </div>
</template>

<script>
export default {
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

  methods: {
    focus() {
      this.$refs.textarea.focus();
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-text-area {
  .label {
    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    margin-bottom: $unnnic-spacing-stack-nano;
  }

  &.md {
    .label {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    }

    textarea {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;

      &::placeholder {
        font-size: $unnnic-font-size-body-gt;
        line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      }
    }
  }

  &.sm {
    .label {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    }

    textarea {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;

      &::placeholder {
        font-size: $unnnic-font-size-body-md;
        line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      }
    }
  }

  textarea {
    outline: none;
    min-height: 6.5 * $unnnic-font-size;
    width: 100%;
    resize: vertical;
    box-sizing: border-box;
    padding: $unnnic-spacing-inset-nano;
    border-radius: $unnnic-border-radius-sm;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
    background-color: $unnnic-color-neutral-snow;

    color: $unnnic-color-neutral-dark;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;

    &::placeholder {
      color: $unnnic-color-neutral-cleanest;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
    }

    &:focus {
      border-color: $unnnic-color-neutral-clean;
    }
  }

  .helper {
    text-align: right;
    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;
    margin-top: $unnnic-spacing-stack-nano;
  }

  &.disabled {
    textarea::placeholder {
      color: $unnnic-color-neutral-clean;
    }
  }

  &.error {
    .label {
      color: $unnnic-color-feedback-red;
    }

    textarea {
      border-color: $unnnic-color-feedback-red;
      &::placeholder {
        color: $unnnic-color-feedback-red;
      }
    }

    .error-list {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
      width: 100%;

      color: $unnnic-color-feedback-red;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
      margin-top: $unnnic-spacing-stack-nano;

      span {
        max-width: 100%;
        word-wrap: break-word;
        text-align: right;
      }
    }
  }
}
</style>
