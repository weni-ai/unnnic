<template>
      <input
        v-bind="attributes"
        :class="{
          'unnic-form__input': true,
          'unnic-form__input--error': type === 'error',
          'has-icon-left': hasIconLeft,
          'has-icon-right': hasIconRight,
        }"
        :type="nativeType"
        v-on="inputListeners"/>
</template>

<script>

export default {
  name: 'unnic-input',
  data() {
    return {
      val: null,
    };
  },
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
    hasIconLeft: {
      type: Boolean,
      default: null,
    },
    hasIconRight: {
      type: Boolean,
      default: null,
    },
    nativeType: {
      type: String,
      default: 'text',
    },
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnic.scss';

.unnic-form {

  &__input {
    background: $unnic-color-neutral-snow;
    border: $unnic-border-width-thinner solid $unnic-color-neutral-soft;
    border-radius: $unnic-border-radius-sm;
    padding: $unnic-squish-xs;
    color: inherit;
    font-weight: $unnic-font-weight-regular;
    font-size: $unnic-font-size-body-lg;
    font-family: $unnic-font-family-secondary;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      color: $unnic-color-brand-ilha-soft;
      border-color: $unnic-color-brand-ilha;
      outline: none;
    }

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;
    }

    ::placeholder {
      color: $unnic-color-brand-sec;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder, &::-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $unnic-color-brand-sec;
    }

    &:disabled {
      border: 1px dashed $unnic-color-neutral-clean;
      background-color: $unnic-color-neutral-light;
    }
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

.has-icon {

  &-left {
    padding-left: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }

  &-right {
    padding-right: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }
}

</style>
