<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error'
    }">
      <input
        v-bind="attributes"
        v-on="inputListeners"
        :class="{
          'unnic-form__input': true,
          'unnic-form__input--error': type === 'error',
          'has-icon-right': hasIconRight,
          'has-icon-left': iconLeft,
        }"
        :type="showPassword ? 'text' : 'password'"/>
        <UIcon
          v-if="iconLeft"
          :icon="iconLeft"
          class="icon-left"
          size="md"
          @click="onIconRightClick" />
        <UIcon
          v-if="hasIconRight"
          :icon="iconToShowRight"
          class="icon-right"
          size="md"
          :clickable="allowTogglePassword"
          @click="onIconRightClick" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnic-input',
  components: { UIcon },
  data() {
    return { showPassword: false };
  },
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
    allowTogglePassword: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onIconRightClick() {
      if (!this.allowTogglePassword) return;
      this.showPassword = !this.showPassword;
    },
  },
  computed: {
    hasIconRight() {
      return this.allowTogglePassword || this.iconRight;
    },
    iconToShowRight() {
      if (this.allowTogglePassword) {
        return this.showPassword ? 'view-1-1' : 'view-off-1';
      }

      return this.iconRight;
    },
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

.icon-right {
  position: absolute;
  right: 7px;
  top: 7px;
}

.unnic-form {
  font-family: $unnic-font-family-primary;
  &__input {
    background: $unnic-color-neutral-snow;
    border: $unnic-border-width-thinner solid $unnic-color-neutral-soft;
    border-radius: $unnic-border-radius-sm;
    padding: $unnic-squish-xs;
    color: inherit;
    font-weight: $unnic-font-weight-regular;
    font-size: $unnic-font-size-body-lg;
    font-family: $unnic-font-family-primary;
    width: 100%;
    box-sizing: border-box;

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;
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
