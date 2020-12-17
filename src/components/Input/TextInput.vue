<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error',
    'has-icon': iconLeft || iconRight,
    }">
      <input
        v-bind="attributes"
        :class="{
          'unnic-form__input': true,
          'unnic-form__input--error': type === 'error',
          'has-icon-left': iconLeft,
          'has-icon-right': iconRight,
        }"
        type="text"/>
        <UIcon
          v-if="iconLeft"
          :icon="iconLeft"
          class="icon-left"
          size="md" />
        <UIcon
          v-if="iconRight"
          :icon="iconRight"
          class="icon-right"
          size="md" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnic-input',
  components: { UIcon },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
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
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.icon {
  color: $unnic-color-neutral-clean;
}

.unnic-form {
  font-family: $unnic-font-family-primary;

  &:focus-within .icon{
    color: $unnic-color-brand-ilha;
  }

  &__input {
    background: $unnic-color-neutral-snow;
    border: $unnic-border-width-thinner solid $unnic-color-neutral-soft;
    border-radius: $unnic-border-radius-sm;
    padding: $unnic-squish-xs;
    color: inherit;
    font-weight: $unnic-font-weight-regular;
    font-size: $unnic-font-size-body-lg;
    font-family: $unnic-font-family-primary;
    box-sizing: border-box;
    width: 100%;

    &:focus {
      color: $unnic-color-brand-ilha;
      border-color: $unnic-color-brand-ilha;
      outline: none;
    }

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;

      &:focus-within .icon{
        color: $unnic-color-feedback-red;
      }
    }
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

.has-icon {
  position: relative;

  &-left {
    padding-left: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }

  &-right {
    padding-right: calc(#{$unnic-inline-sm} + #{$unnic-icon-size-md} + #{$unnic-inline-xs});
  }
}

.icon {
  &-left {
    position: absolute;
    top: 25%;
    left: $unnic-inline-sm;
  }

  &-right {
    position: absolute;
    top: 25%;
    right: $unnic-inline-sm;
  }
}

</style>
