<template>
  <div :class="{
    'unnic-form--error': type === 'error'
    }">
      <input
        v-bind="$attrs"
        :class="{
          'unnic-form__input': true,
          'unnic-form__input--error': type === 'error',
        }"
        type="text"/>
  </div>
</template>

<script>
export default {
  name: 'unnic-input',
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

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
    box-sizing: border-box;
    width: 100%;

    &--error {
      border: $unnic-border-width-thinner solid $unnic-color-feedback-red;
    }
  }

  &--error {
    color: $unnic-color-feedback-red;
  }
}

.input-icons i {
            position: absolute;
        }

        .input-icons {
            width: 100%;
            margin-bottom: 10px;
        }

        .icon {
            padding: 10px;
            color: green;
            min-width: 50px;
            text-align: center;
        }

</style>
