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
      :filled="iconsFilled"
      :style="{ position: 'absolute' }"
      class="rotation"
      data-testid="icon-loading"
    />

    <UnnnicIcon
      v-if="iconLeft"
      :icon="iconLeft"
      :scheme="iconScheme"
      :size="iconSize"
      :filled="iconsFilled"
      :class="{ 'unnnic-button__icon-left': hasText }"
      :style="{ visibility: loading ? 'hidden' : 'visible' }"
      data-testid="icon-left"
    />

    <UnnnicIcon
      v-if="iconCenter"
      :icon="iconCenter"
      :scheme="iconScheme"
      :style="{ visibility: loading ? 'hidden' : 'visible' }"
      :size="iconSize"
      :filled="iconsFilled"
      data-testid="icon-center"
    />

    <span
      v-if="!float"
      class="unnnic-button__label"
      :style="{ visibility: loading ? 'hidden' : 'visible' }"
      data-testid="button-label"
    >
      <slot /> {{ text }}
    </span>

    <UnnnicIcon
      v-if="iconRight"
      :icon="iconRight"
      :scheme="iconScheme"
      :size="iconSize"
      :filled="iconsFilled"
      :class="{ 'unnnic-button__icon-right': hasText }"
      :style="{ visibility: loading ? 'hidden' : 'visible' }"
      data-testid="icon-right"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, watch, useSlots } from 'vue';
import UnnnicIcon from '../Icon.vue';
import type { ButtonProps, ButtonSize, ButtonType } from './types';
import type { SchemeColor } from '@/types/scheme-colors';

defineOptions({
  name: 'UnnnicButton',
});

export type { ButtonProps, ButtonSize, ButtonType };

const props = withDefaults(defineProps<ButtonProps>(), {
  size: 'large',
  text: '',
  type: 'primary',
  float: false,
  iconLeft: '',
  iconRight: '',
  iconCenter: '',
  iconsFilled: false,
  disabled: false,
  loading: false,
});

const slots = useSlots();

const buttonDisabled = computed(() => {
  return props.disabled || props.loading;
});

const iconSize = computed(() => {
  if (props.size === 'small') return 'sm';
  return 'md';
});

const hasText = computed(() => {
  if (slots.default) return true;
  return props.text && props.text.length > 0;
});

const iconScheme = computed((): SchemeColor => {
  if (buttonDisabled.value) {
    return 'neutral-clean';
  }

  const typeToSchemeMap: Record<ButtonType, SchemeColor> = {
    primary: 'neutral-white',
    secondary: 'neutral-dark',
    tertiary: 'neutral-dark',
    alternative: 'neutral-white',
    warning: 'neutral-white',
    attention: 'neutral-white',
  };

  return typeToSchemeMap[props.type] || 'neutral-white';
});

const isSizePropValid = computed(() => {
  return (
    props.size === 'large' ||
    (!props.float && props.size === 'small') ||
    (props.float && props.size === 'extra-large')
  );
});

const isTypePropValid = computed(() => {
  const validTypes: ButtonType[] = [
    'primary',
    'secondary',
    'tertiary',
    'alternative',
    'warning',
    'attention',
  ];
  return validTypes.includes(props.type);
});

const validateProps = () => {
  if (!isSizePropValid.value || !isTypePropValid.value) {
    let errorMessage = 'TypeError:';

    if (!isSizePropValid.value) {
      errorMessage += ' Invalid size prop.';
      errorMessage += ` Please provide 'large', 'small' (only if float prop is false), or 'extra-large' (only if float prop is true).`;
    }

    if (!isTypePropValid.value) {
      errorMessage += ' Invalid type prop.';
    }

    throw new Error(errorMessage);
  }
};

watch(
  () => props,
  () => {
    validateProps();
  },
  { deep: true, immediate: true },
);
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
@use '@/assets/scss/unnnic' as *;

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
@use '@/assets/scss/unnnic' as *;

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
