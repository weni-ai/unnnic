<template>
  <button
    v-bind="$attrs"
    :class="[
      'unnnic-button',
      `unnnic-button--size-${size}`,
      `unnnic-button--${type}`
    ]"
    v-on="$listeners">
    <u-icon
      v-if="iconLeft" :icon="iconLeft"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :size="iconSize"
    />
    <span class="unnnic-button__label">
      <slot /> {{ text }}
    </span>
    <u-icon
      v-if="iconRight"
      :class="{ 'unnnic-button__icon-right': hasText }"
      :icon="iconRight"
      :size="iconSize" />
  </button>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnnic-button',
  components: { UIcon },
  props: {
    size: {
      type: String,
      default: 'large',
      validator(value) {
        return ['small', 'large'].indexOf(value) !== -1;
      },
    },
    text: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: 'primary',
      validator(value) {
        return ['primary', 'secondary', 'terciary'].indexOf(value) !== -1;
      },
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

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-border-radius-sm;
  border: 0;
  outline: none;
  overflow: hidden;
  white-space: nowrap;
  font-weight: $unnnic-font-weight-regular;
  font-family: $unnnic-font-family-secondary;
  min-width: 56px;
  cursor: pointer;

  &__icon {
    &-left {
      margin-right: $unnnic-inline-nano;
    }

    &-right {
      margin-left: $unnnic-inline-nano;
    }
  }

  &--primary {
    background-color: $unnnic-color-neutral-darkest;
    color: $unnnic-color-background-snow;

    &:hover:enabled {
      opacity: $unnnic-opacity-level-darkest;
      border: 0;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-light;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }
  }

  &--secondary {
    background-color: rgba($unnnic-color-neutral-clean, $unnnic-opacity-level-light);
    color: $unnnic-color-neutral-dark;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;

    &:hover:enabled {
      border: 0;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-light;
      color: $unnnic-color-neutral-cloudy;
      border: $unnnic-border-width-thinner dashed $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }
  }

  &--terciary {
    background-color: transparent;
    border: $unnnic-border-width-thinner solid transparent;
    &:hover:enabled {
      border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-light;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }
  }

  &--size {
    &-large {
      padding: $unnnic-squish-xs;
      font-size: $unnnic-font-size-body-lg;
      line-height: ($unnnic-font-size-body-lg + $unnnic-line-height-medium);
    }

    &-small {
      padding: $unnnic-squish-nano;
      font-size: $unnnic-font-size-body-md;
      line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
    }
  }
}
</style>
