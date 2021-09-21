<template>
      <input
        v-if="!mask"
        v-bind="attributes"
        v-model="val"
        :class="[
          'unnnic-form__input',
          `unnnic-form__input--size-${size}`,
          type === 'error' ? 'unnnic-form__input--error' : '' ,
          hasIconLeft ? 'has-icon-left': '',
          hasIconRight ? 'has-icon-right': '',
        ]"
        :type="nativeType"
        v-on="inputListeners"
        :size="inputValue.length"
        />

        <input
        v-else
        v-bind="attributes"
        v-model="val"
        :class="[
          'unnnic-form__input',
          `unnnic-form__input--size-${size}`,
          type === 'error' ? 'unnnic-form__input--error' : '' ,
          hasIconLeft ? 'has-icon-left': '',
          hasIconRight ? 'has-icon-right': '',
        ]"
        :type="nativeType"
        v-on="inputListeners"
        :size="inputValue.length"
        v-mask="mask"/>
</template>

<script>
import { mask } from 'vue-the-mask';

export default {
  name: 'unnnic-input',
  data() {
    return {
      val: this.value,
    };
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
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
    inputValue() {
      return this.val || '';
    },
  },
  mounted() {
    this.val = this.value;
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-form {

  &__input {
    background: $unnnic-color-neutral-snow;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-sm;
    color: $unnnic-color-neutral-dark;
    font-weight: $unnnic-font-weight-regular;
    font-family: $unnnic-font-family-secondary;
    box-sizing: border-box;
    width: 100%;

    &--size-md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
      padding: $unnnic-squish-xs;

      &.has-icon {
        &-left {
          padding-left: calc(
            #{$unnnic-inline-sm} +
            #{$unnnic-icon-size-sm} +
            #{$unnnic-inline-xs}
          );
        }

        &-right {
          padding-right: calc(
            #{$unnnic-inline-sm} +
            #{$unnnic-icon-size-sm} +
            #{$unnnic-inline-xs}
          );
        }
      }
    }

    &--size-sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
      padding: $unnnic-squish-nano;

      &.has-icon {
        &-left {
          padding-left: calc(
            #{$unnnic-inline-sm} +
            #{$unnnic-icon-size-xs} +
            #{$unnnic-inline-xs}
          );
        }

        &-right {
          padding-right: calc(
            #{$unnnic-inline-sm} +
            #{$unnnic-icon-size-xs} +
            #{$unnnic-inline-xs}
          );
        }
      }
    }

    &:focus {
      border-color: $unnnic-color-neutral-cleanest;
      outline: none;
      &::placeholder {
        color: $unnnic-color-neutral-clean;
        opacity: 1; /* Firefox */
      }
    }

    &--error {
      border: $unnnic-border-width-thinner solid $unnnic-color-feedback-red;
    }

    ::placeholder {
      color: $unnnic-color-neutral-clean;
      opacity: 1; /* Firefox */
    }

    &:-ms-input-placeholder, &::-ms-input-placeholder { /* Internet Explorer 10-11 */
      color: $unnnic-color-brand-sec;
    }

    &:disabled {
      border: 1px dashed $unnnic-color-neutral-clean;
      background-color: $unnnic-color-neutral-light;
    }
  }

  &--error {
    color: $unnnic-color-feedback-red;
  }
}

</style>
