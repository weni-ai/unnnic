<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error'
    }">
      <p class="unnic-form__label"> {{ label }}  </p>
      <UIcon class="icon-left"/>
      <UIcon class="icon-right"/>
      <component
        class="unnic-form-input"
        :is="currentComponent"
        :v-bind="$attrs"
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
  },
  computed: {
    currentComponent() {
      if (this.nativeType === 'password') return PasswordInput;
      return TextInput;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-form {
  font-family: $unnic-font-family-primary;
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
    font-size: $unnic-font-size-body-md;
    margin: $unnic-spacing-stack-xs 0;
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

.icon-left {
  position: absolute;
  left: 0;
}

.icon-right {
  position: absolute;
  right: 0;
}

</style>
