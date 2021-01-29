<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error'
    }">
      <p class="unnic-form__label"> {{ label }}  </p>
      <component
        v-model="val"
        v-on="inputListeners"
        class="unnic-form-input"
        :is="currentComponent"
        :v-bind="$attrs"
        :icon-left="iconLeft"
        :icon-right="iconRight"
        :allow-toggle-password="togglePassword"
        :type="type" />
    <p class="unnic-form__message"> {{ message }} </p>
  </div>
</template>

<script>
import PasswordInput from './PasswordInput.vue';
import TextInput from './TextInput.vue';
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
@import '../../assets/scss/unnic.scss';

.unnic-form {
  font-family: $unnic-font-family-secondary;
  position: relative;

  &__input {
    width: 100%;

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;
    }
  }

  &__message {
    font-size: $unnic-font-size-body-md;
    margin: $unnic-spacing-stack-nano 0;
  }

  &__label {
    font-weight: $unnic-font-weight-regular;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
    font-size: $unnic-font-size-body-md;
    color: $unnic-color-neutral-darkest;
    margin: $unnic-spacing-stack-xs 0;
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

</style>
