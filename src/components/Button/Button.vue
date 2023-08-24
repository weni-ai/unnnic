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
      v-if="iconLeft"
      :icon="iconLeft"
      :scheme="iconScheme"
      :size="iconSize"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :style="{ visibility: loading ? 'hidden' : null }"
    />

    <unnnic-icon-svg
      v-if="iconCenter"
      :icon="iconCenter"
      :scheme="iconScheme"
      :style="{ visibility: loading ? 'hidden' : null }"
      :size="iconSize"
    />

    <span class="unnnic-button__label" :style="{ visibility: loading ? 'hidden' : null }">
      <slot /> {{ text }}
    </span>

    <unnnic-icon-svg
      v-if="iconRight"
      :icon="iconRight"
      :scheme="iconScheme"
      :size="iconSize"
      :class="{ 'unnnic-button__icon-right': hasText }"
      :style="{ visibility: loading ? 'hidden' : null }"
    />
  </button>
</template>

<script>
import UnnnicIconSvg from '../Icon.vue';

export default {
  name: 'unnnic-button',
  components: {
    UnnnicIconSvg,
  },
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
        return ['primary', 'secondary', 'terciary', 'ghost', 'warning'].indexOf(value) !== -1;
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
        return ['feedback-green', 'feedback-red', 'feedback-yellow'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    buttonDisabled() {
      return this.disabled || this.loading;
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
        return this.buttonDisabled ? 'neutral-clean' : 'neutral-white';
      }

      if (this.type === 'secondary') {
        return this.buttonDisabled ? 'neutral-clean' : 'weni-900';
      }

      if (this.type === 'terciary') {
        return this.buttonDisabled ? 'neutral-clean' : 'neutral-dark';
      }

      if (this.type === 'ghost') {
        return this.buttonDisabled ? 'neutral-clean' : 'neutral-dark';
      }

      if (this.type === 'warning') {
        return this.buttonDisabled ? 'neutral-clean' : 'neutral-white';
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
  "feedback-green" $unnnic-color-feedback-green,
  "feedback-yellow" $unnnic-color-feedback-yellow;

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
    background-color: $unnnic-color-weni-600;
    color: $unnnic-color-neutral-white;

    &:hover:enabled {
      background-color: $unnnic-color-weni-700;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }

    &:active:enabled {
      background-color: $unnnic-color-weni-800;
    }
  }

  &--secondary {
    background-color: $unnnic-color-weni-50;
    color: $unnnic-color-weni-800;

    &:hover:enabled {
      background-color: $unnnic-color-weni-100;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;

    }

    &:active:enabled {
      background-color: $unnnic-color-weni-200;
      color: $unnnic-color-weni-900;
    }
  }

  &--terciary {
    background-color: $unnnic-color-neutral-white;
    color: $unnnic-color-neutral-dark;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;

    &:hover:enabled {
      background-color: $unnnic-color-neutral-light;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
      border: 0;
    }

    &:active:enabled {
      background-color: $unnnic-color-neutral-soft;
    }
  }

  &--ghost {
    background-color: transparent;
    color: $unnnic-color-neutral-dark;

    &:hover:enabled {
      background-color: $unnnic-color-neutral-light;
    }

    &:disabled {
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }

    &:active:enabled {
      background-color: $unnnic-color-neutral-soft;
    }
  }

  &--warning {
    background-color: $unnnic-color-aux-red-500;
    color: $unnnic-color-neutral-white;

    &:hover:enabled {
      background-color:$unnnic-color-aux-red-700;
    }

    &:disabled {
      background-color: $unnnic-color-neutral-soft;
      color: $unnnic-color-neutral-clean;
      cursor: not-allowed;
    }

    &:active:enabled {
      background-color: $unnnic-color-aux-red-900;
    }
  }

  &--size {
    &-large {
      padding: $unnnic-squish-xs;
      font-size: $unnnic-font-size-body-gt;
      line-height: ($unnnic-font-size-body-gt + $unnnic-line-height-medium);
      height: 46px;
    }

    &-small {
      padding: $unnnic-squish-xs;
      font-size: $unnnic-font-size-body-gt;
      line-height: ($unnnic-font-size-body-gt + $unnnic-line-height-medium);
      height: 38px;
    }
  }
}

@each $name,
$color in $scheme-colors {
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
      height: 46px;
      width: 46px;

      .unnnic-icon {
        width: $unnnic-icon-size-md;
        height: $unnnic-icon-size-md;
      }
    }

    &-small {
      padding: $unnnic-inset-nano;
      height: 38px;
      width: 38px;

      .unnnic-icon {
        width: $unnnic-icon-size-ant;
        height: $unnnic-icon-size-ant;
      }
    }
  }
}
</style>
