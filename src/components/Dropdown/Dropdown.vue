<template>
    <div class="unnic-dropdown" @click="active = !active">
        <div class="unnic-dropdown__trigger">
            <slot name="trigger" />
            <div :class="[
            'unnic-dropdown__content',
            active ? '' : 'unnic-dropdown__content--hidden',
            `unnic-dropdown__content__position-${position}` ]">
            <slot />
        </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'UnnicDropdown',
  props: {
    position: {
      type: String,
      default: 'bottom',
      validator(value) {
        return ['top', 'left', 'right', 'bottom'].indexOf(value) !== -1;
      },
    },
  },
  data() {
    return {
      active: false,
    };
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';
  .unnic-dropdown {
    &__trigger {
      position: relative;
      display: inline-block;
    }

    &__content {
        background-color: $unnic-color-neutral-snow;
        box-shadow: $unnic-shadow-level-near;
        border-radius: $unnic-border-radius-sm;
        position: absolute;
        display: flex;
        flex-direction: column;
        padding: $unnic-squish-xs;
      &--hidden {
        display: none !important;
      }
      &__position {
          &-top {
            bottom: 100%;
            margin-bottom: $unnic-spacing-stack-xs;
          }
          &-left {
            right: 100%;
            top: 0;
            margin-right: $unnic-inline-xs;
          }
          &-bottom {
            margin-top: $unnic-spacing-stack-xs;
            top: 100%;
          }
          &-right {
            margin-left: $unnic-inline-xs;
            left: 100%;
            top: 0;
          }
      }
    }
  }
</style>
