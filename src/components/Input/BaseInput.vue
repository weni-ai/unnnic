<template>
  <input
    v-if="mask"
    v-mask="mask"
    v-bind="attributes"
    :value="modelValue"
    :class="classes"
    :type="nativeType"
  />

  <input
    v-else
    v-bind="attributes"
    :value="modelValue"
    :class="classes"
    :type="nativeType"
  />
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  directives: { mask },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    modelValue: {
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
    hasIconLeft: Boolean,
    hasIconRight: Boolean,
  },
  emits: ['update:modelValue'],
  data() {
    return {};
  },
  computed: {
    attributes() {
      return {
        ...this.$attrs,
        ...this.$attrs['v-bind'],
        onInput: (event) => {
          this.$emit('update:modelValue', event.srcElement.value);
        },
      };
    },

    classes() {
      return [
        'input',
        `size-${this.size}`,
        this.type,
        {
          'input--has-icon-left': this.hasIconLeft,
          'input--has-icon-right': this.hasIconRight,
        },
      ];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.input {
  background: $unnnic-color-neutral-snow;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
  outline: none;
  border-radius: $unnnic-border-radius-sm;
  color: $unnnic-color-neutral-darkest;
  caret-color: $unnnic-color-neutral-clean;
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-secondary;
  box-sizing: border-box;
  width: 100%;

  &.size {
    &-md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      padding: ($unnnic-spacing-ant - $unnnic-border-width-thinner)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &-sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      padding: $unnnic-spacing-xs
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }
  }

  &.input--has-icon-left {
    padding-left: $unnnic-spacing-sm + $unnnic-icon-size-sm + $unnnic-spacing-xs -
      $unnnic-border-width-thinner;
  }

  &.input--has-icon-right {
    padding-right: $unnnic-spacing-sm + $unnnic-icon-size-sm +
      $unnnic-spacing-xs - $unnnic-border-width-thinner;
  }

  &:focus {
    border-color: $unnnic-color-weni-600;
  }

  &.error {
    border-color: $unnnic-color-aux-red-500;
    color: $unnnic-color-aux-red-500;
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
    border-color: $unnnic-color-neutral-cleanest;
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
