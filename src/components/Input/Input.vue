<template>
  <div :class="{
    'unnnic-form': true,
    'unnnic-form--error': type === 'error'
    }">
      <p v-if="label" class="unnnic-form__label"> {{ label }}  </p>
      <component
        v-model="val"
        v-on="inputListeners"
        class="unnnic-form-input"
        :is="currentComponent"
        :v-bind="$attrs"
        :icon-left="iconLeft"
        :icon-right="iconRight"
        :allow-toggle-password="togglePassword"
        :type="type"
        :icon-left-clickable="iconLeftClickable"
        :icon-right-clickable="iconRightClickable"
        :size="size" />
    <p v-if="message" class="unnnic-form__message"> {{ message }} </p>
  </div>
</template>

<script>
import PasswordInput from './PasswordInput.vue';
import TextInput from './TextInput.vue';
import UIcon from '../Icon.vue';

export default {
  name: 'unnnic-input',
  components: { UIcon },
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
      default: null,
    },
    nativeType: {
      type: String,
      default: null,
    },
    message: {
      type: String,
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    togglePassword: {
      type: Boolean,
      default: false,
    },
    iconLeftClickable: {
      type: Boolean,
      default: null,
    },
    iconRightClickable: {
      type: Boolean,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
  },
  data() {
    return {
      val: null,
    };
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
  mounted() {
    this.val = this.value;
  },
  computed: {
    currentComponent() {
      if (this.nativeType === 'password') return PasswordInput;
      return TextInput;
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
  },
};
</script>

<style lang="scss" >
@import '../../assets/scss/unnnic.scss';

.unnnic-form {
  font-family: $unnnic-font-family-secondary;
  position: relative;

  &__input {
    width: 100%;

    &--error {
      border: $unnnic-border-width-thinner solid $unnnic-color-feedback-red;
    }
  }

  &__message {
    font-size: $unnnic-font-size-body-md;
    margin: $unnnic-spacing-stack-nano 0;
  }

  &__label {
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-md;
    color: $unnnic-color-neutral-darkest;
    margin: $unnnic-spacing-stack-xs 0;
  }

  &--error {
    color: $unnnic-color-feedback-red;
  }
}

</style>
