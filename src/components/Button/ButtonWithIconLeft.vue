<template>
      <button :class="{
    'button-active': checkNormal,
    'button-hover': checkHover,
    'button-disable': checkDisable,
    }">
    <div class="field-content">
      <UICon
        icon="developer-community-github-1-1"
        class="field-content__icon-style"
      />
        <span class="unnic-button-field__Label">
          Icon on Large Left Primary Default
          </span>
    </div>
        </button>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'unnic-button',
  components: { UICon },
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

.field-content{
  display: flex;
  justify-content: center;
  align-items: center;

  &__icon-style{
    margin-right: $unnic-inline-nano;
    height: $unnic-icon-size-md;
  }
}

  .button-active{
    border-radius: $unnic-border-radius-sm;
    background-color: $unnic-color-neutral-darkest;
    color: $unnic-color-background-snow;
    border: 0;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-xs;
    line-height: ($unnic-font-size-body-lg + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-lg;
    }
  }

  .button-hover{
    border-radius: $unnic-border-radius-sm;
    background-color: $unnic-color-neutral-darkest;
    color: $unnic-color-background-snow;
    opacity: $unnic-opacity-level-darkest;
    border: 0;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-xs;
    line-height: ($unnic-font-size-body-lg + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-lg;
    }
  }

  .button-disable{
    border-radius: $unnic-border-radius-sm;
    background-color: $unnic-color-neutral-light;
    color: $unnic-color-neutral-clean;
    border: 0;
    outline:none;
    min-width: 56px;
    padding: $unnic-squish-xs;
    line-height: ($unnic-font-size-body-lg + $unnic-line-height-medium);
    font-family: $unnic-font-family-secondary;
    cursor: pointer;

     &__label {
      font-weight: $unnic-font-weight-regular;
      font-size: $unnic-font-size-body-lg;
    }
  }

</style>
