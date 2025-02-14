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
@use '@/assets/scss/unnnic' as *;
@import './Input.scss';

.input {
  @include input-base;

  box-sizing: border-box;
  width: 100%;

  &.size {
    &-md {
      @include input-md-font;

      padding: ($unnnic-spacing-ant - $unnnic-border-width-thinner)
        ($unnnic-spacing-sm - $unnnic-border-width-thinner);
    }

    &-sm {
      @include input-sm-font;

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

  &.error {
    @include input-error;
  }

  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $unnnic-color-brand-sec;
  }
}
</style>
