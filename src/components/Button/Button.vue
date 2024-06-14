<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    v-bind="$attrs"
    :disabled="buttonDisabled"
    :class="[
      'unnnic-button',
      `unnnic-button--size-${size}`,
      `unnnic-button--${type}`,
      iconCenter ? `unnnic-button--icon-on-center` : null,
      float ? `unnnic-button--float` : null,
    ]"
  >
    <UnnnicIcon
      v-if="loading"
      icon="loading-circle-1"
      :scheme="iconScheme"
      :size="iconSize"
      :style="{ position: 'absolute' }"
      class="rotation"
      :next="next"
    />

    <UnnnicIcon
      v-if="iconLeft"
      :icon="iconLeft"
      :scheme="iconScheme"
      :size="iconSize"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :style="{ visibility: loading ? 'hidden' : null }"
      :next="next"
    />

    <UnnnicIcon
      v-if="iconCenter"
      :icon="iconCenter"
      :scheme="iconScheme"
      :style="{ visibility: loading ? 'hidden' : null }"
      :size="iconSize"
      :next="next"
    />

    <span
      v-if="!float"
      class="unnnic-button__label"
      :style="{ visibility: loading ? 'hidden' : null }"
    >
      <slot /> {{ text }}
    </span>

    <UnnnicIcon
      v-if="iconRight"
      :icon="iconRight"
      :scheme="iconScheme"
      :size="iconSize"
      :class="{ 'unnnic-button__icon-right': hasText }"
      :style="{ visibility: loading ? 'hidden' : null }"
      :next="next"
    />
  </button>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },
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
    float: {
      type: Boolean,
      default: false,
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
    next: {
      type: Boolean,
      default: null,
    },

    disabled: {
      type: Boolean,
      default: null,
    },

    loading: {
      type: Boolean,
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
      if (this.buttonDisabled) {
        return 'neutral-clean';
      }

      const typeToSchemeMap = {
        primary: 'neutral-white',
        secondary: 'neutral-dark',
        tertiary: 'neutral-dark',
        warning: 'neutral-white',
        attention: 'neutral-white',
      };

      return typeToSchemeMap[this.type] || '';
    },

    isSizePropValid() {
      return (
        this.size === 'large' ||
        (!this.float && this.size === 'small') ||
        (this.float && this.size === 'extra-large')
      );
    },
    isTypePropValid() {
      const validTypes = [
        'primary',
        'secondary',
        'tertiary',
        'alternative',
        'warning',
        'attention',
      ];
      return validTypes.includes(this.type);
    },
  },
  watch: {
    $props: {
      deep: true,
      immediate: true,
      handler() {
        this.validateProps();
      },
    },
  },
  methods: {
    validateProps() {
      if (!this.isSizePropValid || !this.isTypePropValid) {
        let errorMessage = 'TypeError:';

        if (!this.isSizePropValid) {
          errorMessage += ' Invalid size prop.';
          errorMessage += ` Please provide 'large', 'small' (only if float prop is false), or 'extra-large' (only if float prop is true).`;
        }

        if (!this.isTypePropValid) {
          errorMessage += ' Invalid type prop.';
        }

        throw new Error(errorMessage);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.rotation {
  animation: rotation 1300ms linear infinite;
}

@keyframes rotation {
  0% {
  }

  100% {
    transform: rotate(360deg);
  }
}
</style>

<style lang="scss" scoped>
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
  cursor: pointer;
  position: relative;

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

    &:active:enabled {
      background-color: $unnnic-color-weni-800;
    }
  }

  &--secondary {
    background-color: $unnnic-color-neutral-white;
    color: $unnnic-color-neutral-dark;
    box-shadow: inset 0 0 0 $unnnic-border-width-thinner
      $unnnic-color-neutral-cleanest;

    &:hover:enabled {
      background-color: $unnnic-color-neutral-light;
    }

    &:disabled {
      box-shadow: none;
    }

    &:active:enabled {
      background-color: $unnnic-color-neutral-soft;
    }
  }

  &--tertiary {
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

  &--alternative {
    background-color: $unnnic-color-weni-50;
    color: $unnnic-color-weni-800;

    :deep(svg .primary) {
      fill: $unnnic-color-weni-800;
    }

    :deep(svg .primary-stroke) {
      stroke: $unnnic-color-weni-800;
    }

    &:hover:enabled {
      background-color: $unnnic-color-weni-100;
    }

    &:disabled {
      :deep(svg .primary) {
        fill: $unnnic-color-neutral-clean;
      }

      :deep(svg .primary-stroke) {
        stroke: $unnnic-color-neutral-clean;
      }
    }

    &:active:enabled {
      background-color: $unnnic-color-weni-200;
      color: $unnnic-color-weni-900;

      :deep(svg .primary) {
        fill: $unnnic-color-weni-900;
      }

      :deep(svg .primary-stroke) {
        stroke: $unnnic-color-weni-900;
      }
    }
  }

  &--warning {
    background-color: $unnnic-color-aux-red-500;
    color: $unnnic-color-neutral-white;

    &:hover:enabled {
      background-color: $unnnic-color-aux-red-700;
    }

    &:active:enabled {
      background-color: $unnnic-color-aux-red-900;
    }
  }

  &--attention {
    background-color: $unnnic-color-aux-yellow-500;
    color: $unnnic-color-neutral-white;

    &:hover:enabled {
      background-color: $unnnic-color-aux-yellow-700;
    }

    &:active:enabled {
      background-color: $unnnic-color-aux-yellow-900;
    }
  }

  &--primary:disabled,
  &--secondary:disabled,
  &--alternative:disabled,
  &--warning:disabled,
  &--attention:disabled {
    background-color: $unnnic-color-neutral-soft;
    color: $unnnic-color-neutral-clean;
    cursor: not-allowed;
  }

  &--float {
    position: absolute;
    bottom: 0;
    right: 0;

    border-radius: $unnnic-border-radius-pill;
    box-shadow: $unnnic-shadow-level-near;
  }

  &--size {
    &-extra-large,
    &-large,
    &-small {
      padding: $unnnic-squish-xs;
      font-size: $unnnic-font-size-body-gt;
      line-height: ($unnnic-font-size-body-gt + $unnnic-line-height-medium);
    }

    &-extra-large {
      height: 58px;
    }

    &-large {
      height: 46px;
    }

    &-small {
      height: 38px;
    }
  }
}
</style>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-button--icon-on-center {
  min-width: auto;

  &.unnnic-button--size {
    &-extra-large {
      height: 58px;
      width: 58px;
    }

    &-large {
      height: 46px;
      width: 46px;
    }

    &-large,
    &-extra-large {
      padding: $unnnic-inset-xs;

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
