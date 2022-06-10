<template>
  <div :class="['unnnic-text-area', { disabled }]">
    <div v-if="label" class="label">{{ label }}</div>

    <textarea
      :placeholder="placeholder"
      :maxlength="maxLength"
      :disabled="disabled"
      :value="value"
      @input="$emit('input', $event.srcElement.value)"
    ></textarea>

    <div v-if="maxLength" class="helper">{{ value.length }}/{{ maxLength }}</div>
  </div>
</template>

<script>
export default {
  props: {
    label: {
      type: String,
    },

    placeholder: {
      type: String,
    },

    value: {
      type: String,
    },

    maxLength: {
      type: Number,
    },

    disabled: {
      type: Boolean,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-text-area {
  .label {
    color: $unnnic-color-neutral-cloudy;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;
    margin-bottom: $unnnic-spacing-stack-nano;
  }

  textarea {
    outline: none;
    min-height: 6.5rem;
    width: 100%;
    resize: vertical;
    box-sizing: border-box;
    padding: $unnnic-spacing-inset-nano;
    border-radius: $unnnic-border-radius-sm;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
    background-color: $unnnic-color-neutral-snow;

    color: $unnnic-color-neutral-dark;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    font-weight: $unnnic-font-weight-regular;

    &::placeholder {
      color: $unnnic-color-neutral-cloudy;
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      font-weight: $unnnic-font-weight-regular;
    }

    &:focus {
      border-color: $unnnic-color-neutral-cleanest;
      &::placeholder {
        color: $unnnic-color-neutral-clean;
      }
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
      color: $unnnic-color-neutral-cleanest;
    }
  }
}
</style>
