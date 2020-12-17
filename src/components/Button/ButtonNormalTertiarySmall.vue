<template>
    <button :class="{
    'button-active': checkNormal,
    'button-hover': checkHover,
    'button-disable': checkDisable,
    }">
      <span class="unnic-button-field__Label">
        Large Icon Off Tertiary Default
      </span>
    </button>
</template>

<script>

export default {
  name: 'unnic-button',
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'disabled', 'hover'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    checkNormal() {
      if (this.type === 'normal') { return true; }
      return false;
    },
    checkHover() {
      if (this.type === 'hover') { return true; }
      return false;
    },
    checkDisable() {
      if (this.type === 'disable') { return true; }
      return false;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

  .button-active{
    border-radius: $unnic-border-radius-sm;
    border: 0;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-nano;
    line-height: ($unnic-font-size-body-md + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-md;
    }
  }

  .button-hover{
    border-radius: $unnic-border-width-thinner;
    border: $unnic-border-width-thinner solid $unnic-color-neutral-soft;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-nano;
    line-height: ($unnic-font-size-body-md + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-md;
    }
  }

  .button-disable{
    background-color: $unnic-color-neutral-light;
    color: $unnic-color-neutral-clean;
    border: 0;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-nano;
    line-height: ($unnic-font-size-body-md + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-md;
    }
  }

</style>
