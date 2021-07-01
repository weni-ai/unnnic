<template>
  <button
    v-bind="$attrs"
    :disabled="buttonDisabled"
    :class="[
      'unnnic-button',
      `unnnic-button--size-${size}`,
      `unnnic-button--${type}`,
      `unnnic-button-scheme--${buttonScheme}`,
      iconCenter ? `unnnic-button--icon-on-center` : null
    ]"
    v-on="$listeners">

    <unnnic-icon-svg
      v-if="loading"
      icon="loading-circle-1"
      :scheme="iconScheme"
      :size="iconSize"
      :style="{ position: 'absolute' }"
      class="rotation"
    />

    <unnnic-icon-svg
      v-if="showSvgIconLeft"
      :icon="iconLeft"
      :scheme="iconScheme"
      :size="iconSize"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :style="{ visibility: loading ? 'hidden' : null }"
    />

    <u-icon
      v-else-if="iconLeft" :icon="iconLeft"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :size="iconSize"
      :style="{ visibility: loading ? 'hidden' : null }"
    />

    <unnnic-icon-svg
      v-if="iconCenter"
      :icon="iconCenter"
      :scheme="iconScheme"
      :style="{ visibility: loading ? 'hidden' : null }"
    ></unnnic-icon-svg>

    <span class="unnnic-button__label" :style="{ visibility: loading ? 'hidden' : null }">
      <slot /> {{ text }}
    </span>
    <u-icon
      v-if="iconRight"
      :class="{ 'unnnic-button__icon-right': hasText }"
      :icon="iconRight"
      :size="iconSize"
      :style="{ visibility: loading ? 'hidden' : null }"
    />
  </button>
</template>

<script>
import UIcon from '../Icon.vue';
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-button',
  components: { UIcon, UnnnicIconSvg },
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
    iconCenter: {
      type: String,
      default: null,
    },

    disabled: {
      type: Boolean,
    },

    loading: {
      type: Boolean,
    },
    scheme: {
      type: String,
      validator(value) {
        return ['feedback-green', 'feedback-red'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    buttonDisabled() {
      return this.disabled || this.loading;
    },

    showSvgIconLeft() {
      return this.iconLeft
        && [
          'button-play-1',
          'search-1',
          'arrow-button-up-1',
          'arrow-button-down-1',
        ].includes(this.iconLeft);
    },

    iconSize() {
      if (this.size === 'small') return 'sm';
      return 'md';
    },
    hasText() {
      if (this.$slots.default) return true;
      return this.text && this.text.length > 0;
    },
    iconScheme() {
      if (this.type === 'primary') {
        return this.buttonDisabled ? 'neutral-clean' : 'background-snow';
      }

      if (this.type === 'secondary') {
        return this.buttonDisabled ? 'neutral-cloudy' : 'neutral-dark';
      }

      return '';
    },
    buttonScheme() {
      if (this.type === 'primary') {
        return this.scheme;
      }

      return '';
    },
  },
};
</script>

<style lang="scss" scoped>
.rotation {
  animation: rotation 1300ms linear infinite;
}

@keyframes rotation {
  0% {}

  100% {
    transform: rotate(360deg);
  }
}

</style>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

$scheme-colors:
  "feedback-red" $unnnic-color-feedback-red,
  "feedback-green" $unnnic-color-feedback-green;

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
    position: relative;

    &:after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      border-radius: $unnnic-border-radius-sm;
      border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
    }

    &:hover:enabled:after {
      border-width: 0;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-light;
      color: $unnnic-color-neutral-cloudy;
      cursor: not-allowed;

      &:after {
        border: $unnnic-border-width-thinner dashed $unnnic-color-neutral-clean;
      }
    }
  }

  &--terciary {
    background-color: transparent;
    color: $unnnic-color-neutral-dark;
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

@each $name, $color in $scheme-colors {
  .unnnic-button-scheme {
    &--#{$name} {
      background-color: $color;
    }
  }
}

</style>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-button--icon-on-center {
  min-width: auto;

  &.unnnic-button--size {
    &-large {
      padding: $unnnic-inset-xs;

      .unnnic-icon {
        width: $unnnic-icon-size-md;
        height: $unnnic-icon-size-md;
      }
    }

    &-small {
      padding: $unnnic-inset-nano;

      .unnnic-icon {
        width: $unnnic-icon-size-ant;
        height: $unnnic-icon-size-ant;
      }
    }
  }
}
</style>
