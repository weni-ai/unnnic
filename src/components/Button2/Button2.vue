<template>
    <div>
        <button
          v-bind="$attrs"
          :class="[
            'unnic-button',
            `unnic-button--size-${size}`,
            `unnic-button--${type}`
            ]">
            <u-icon
              v-if="iconLeft" :icon="iconLeft"
              :class="{ 'unnic-button__icon-left': hasText }"
              :size="iconSize"
               />
            <span class="unnic-button__label">
                <slot /> {{ text }}
            </span>
            <u-icon
              v-if="iconRight"
              :class="{ 'unnic-button__icon-right': hasText }"
              :icon="iconRight"
              :size="iconSize" />
        </button>
    </div>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnic-button2',
  components: { UIcon },
  props: {
    size: {
      type: String,
      default: 'large',
    },
    text: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
  },
  computed: {
    iconSize() {
      if (this.size === 'small') return 'sm';
      return 'md';
    },
    hasText() {
      if (this.$slots.default) return true;
      return this.text && this.text.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnic.scss';

.unnic-button {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnic-border-radius-sm;
  border: 0;
  outline: none;
  line-height: ($unnic-font-size-body-lg + $unnic-line-height-medium);
  font-weight: $unnic-font-weight-regular;
  font-family: $unnic-font-family-secondary;
  min-width: 56px;
  cursor: pointer;

  &__icon {
    &-left {
      margin-right: $unnic-inline-nano;
    }

    &-right {
      margin-left: $unnic-inline-nano;
    }
  }

  &--primary {
    background-color: $unnic-color-neutral-darkest;
    color: $unnic-color-background-snow;

    &:hover:enabled {
      opacity: $unnic-opacity-level-darkest;
      border: 0;
    }

    &:disabled {
      background-color: $unnic-color-neutral-light;
      color: $unnic-color-neutral-clean;
    }
  }

  &--terciary {
    background-color: transparent;
    border: $unnic-border-width-thinner solid transparent;
    &:hover:enabled {
      border: $unnic-border-width-thinner solid $unnic-color-neutral-soft;
    }

    &:disabled {
      background-color: $unnic-color-neutral-light;
      color: $unnic-color-neutral-clean;
    }
  }

  &--size {
    &-large {
      padding: $unnic-squish-xs;
      font-size: $unnic-font-size-body-lg;
    }

    &-small {
      padding: $unnic-squish-nano;
      font-size: $unnic-font-size-body-md;
    }
  }
}
</style>
