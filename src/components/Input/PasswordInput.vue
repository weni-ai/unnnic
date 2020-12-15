<template>
  <div :class="{
    'unnic-form': true,
    'unnic-form--error': type === 'error'
    }">
      <input
        v-bind="$attrs"
        :class="{
          'unnic-form__input': true,
          'unnic-form__input--error': type === 'error',
        }"
        :type="showPassword ? 'text' : 'password'"/>
        <UICon
          class="icon-right"
          clickable
          @click="togglePassword" />
  </div>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'unnic-input',
  components: { UICon },
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
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.icon-right {
  position: absolute;
  right: 0;
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

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;
    }
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

</style>
