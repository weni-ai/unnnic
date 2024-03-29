<template>
  <input
    v-if="mask"
    v-bind="attributes"
    :value="value"
    :class="classes"
    :type="nativeType"
    v-on="inputListeners"
    :size="inputValueLength"
    v-mask="mask"
  />

  <input
    v-else
    v-bind="attributes"
    :value="value"
    :class="classes"
    :type="nativeType"
    v-on="inputListeners"
    :size="inputValueLength"
  />
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  data() {
    return {};
  },
  directives: { mask },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    value: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'text',
    },
    size: {
      type: String,
      default: 'md',
    },
    mask: {
      type: [String, Array],
      default: '',
    },
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('input', event.srcElement.value);
        },
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
    inputValueLength() {
      return (this.value || '').length;
    },

    classes() {
      return [
        'input',
        `size-${this.size}`,
        this.type,
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.input {
  background: $unnnic-color-neutral-snow;
  border: none;
  outline-style: solid;
  outline-color: $unnnic-color-neutral-soft;
  outline-width: $unnnic-border-width-thinner;
  outline-offset: -$unnnic-border-width-thinner;
  border-radius: $unnnic-border-radius-sm;
  color: $unnnic-color-neutral-dark;
  caret-color: $unnnic-color-neutral-clean;
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-secondary;
  box-sizing: border-box;
  width: 100%;

  &.size {
    &-md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      padding: $unnnic-squish-xs;
    }

    &-sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      padding: $unnnic-squish-nano;
    }
  }

  &:focus {
    outline-color: $unnnic-color-neutral-clean;
  }

  &.error {
    outline-color: $unnnic-color-feedback-red;
    color: $unnnic-color-feedback-red;
  }

  &::placeholder {
    color: $unnnic-color-neutral-cleanest;
    opacity: 1; /* Firefox */
  }

  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $unnnic-color-brand-sec;
  }

  &:disabled {
    outline-color: $unnnic-color-neutral-cleanest;
    background-color: $unnnic-color-neutral-lightest;
    cursor: not-allowed;
    color: $unnnic-color-neutral-cleanest;

    &::placeholder {
      color: $unnnic-color-neutral-cleanest;
      opacity: 1; /* Firefox */
    }
  }
}
</style>
