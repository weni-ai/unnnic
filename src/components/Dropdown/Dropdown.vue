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
      default: 'bottom-left',
      validator(value) {
        return ['top-left', 'bottom-left', 'bottom-left', 'bottom-right'].indexOf(value) !== -1;
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
          &-top-left {
            bottom: 100%;
            right: 1rem;
            margin-bottom: $unnic-spacing-stack-xs;
          }
          &-top-right {
            bottom: 100%;
            left: 1rem;
            margin-bottom: $unnic-inline-xs;
          }
          &-bottom-left {
            margin-top: $unnic-spacing-stack-xs;
            top: 100%;
            right: 1rem;
          }
          &-bottom-right {
            margin-top: $unnic-inline-xs;
            top: 100%;
            left: 1rem;
          }
      }
    }
  }
</style>
