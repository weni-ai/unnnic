<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <button
    v-bind="$attrs"
    :disabled="buttonDisabled"
    :class="[
      'unnnic-button',
      `unnnic-button--size-${size}`,
      `unnnic-button--${buttonType}`,
      iconCenter ? `unnnic-button--icon-on-center` : null,
      float ? `unnnic-button--float` : null,
    ]"
  >
    <UnnnicIconLoading
      v-if="loading"
      :scheme="iconScheme"
      :size="iconSize"
      :style="{ position: 'absolute' }"
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
      :next="next"
      data-testid="icon-left"
    />

    <UnnnicIcon
      v-if="iconCenter"
      :icon="iconCenter"
      :scheme="iconScheme"
      :style="{ visibility: loading ? 'hidden' : 'visible' }"
      :size="iconSize"
      :filled="iconsFilled"
      :next="next"
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
      :next="next"
      data-testid="icon-right"
    />
  </button>
</template>

<script setup lang="ts">
import { computed, watch, useSlots } from 'vue';
import UnnnicIcon from '../Icon.vue';
import UnnnicIconLoading from '../IconLoading/IconLoading.vue';
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
  next: false,
  disabled: false,
  loading: false,
});

const slots = useSlots();

const buttonDisabled = computed(() => {
  return props.disabled || props.loading;
});

const iconSize = computed(() => {
  if (props.size === 'extra-large') return 'lg';
  return 'ant';
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
    warning: 'neutral-white',
    attention: 'neutral-white',
  };

  return typeToSchemeMap[buttonType.value] || 'neutral-white';
});

const isSizePropValid = computed(() => {
  return (
    props.size === 'large' ||
    (!props.float && props.size === 'small') ||
    (props.float && props.size === 'extra-large')
  );
});

const buttonType = computed(() => {
  return (
    {
      alternative: 'tertiary',
    }[props.type] || props.type
  );
});

const isTypePropValid = computed(() => {
  const validTypes: ButtonType[] = [
    'primary',
    'secondary',
    'tertiary',
    'warning',
    'attention',
  ];
  return validTypes.includes(buttonType.value);
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
      errorMessage +=
        ' Please provide one of the following types: primary, secondary, tertiary, warning, attention. Alternative is discontinued and it was forced renamed to tertiary.';
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
  border-radius: $unnnic-radius-2;
  border: 0;
  outline: none;
  overflow: hidden;
  white-space: nowrap;
  font: $unnnic-font-action;
  cursor: pointer;
  position: relative;

  transition-property: color, background-color, border-color;
  transition-timing-function: cubic-bezier(.4, 0, .2, 1);
  transition-duration: .15s;

  * > {
    cursor: pointer;
  }

  &__icon {
    &-left {
      margin-right: $unnnic-inline-nano;
    }

    &-right {
      margin-left: $unnnic-inline-nano;
    }
  }

  &--primary,
  &--warning,
  &--attention {
    color: $unnnic-color-fg-inverted;
  }

  &--secondary,
  &--tertiary {
    color: $unnnic-color-fg-emphasized;
  }

  &--primary {
    background-color: $unnnic-color-bg-active;

    &:hover:enabled {
      background-color: $unnnic-color-teal-700;
    }

    &:active:enabled {
      background-color: $unnnic-color-teal-800;
    }
  }

  &--secondary {
    background-color: $unnnic-color-bg-base;
    box-shadow: inset 0 0 0 $unnnic-border-width-thinner
      $unnnic-color-border-base;

    &:hover:enabled {
      background-color: $unnnic-color-gray-50;
    }

    &:active:enabled {
      background-color: $unnnic-color-gray-100;
    }

    &:disabled {
      box-shadow: none;
    }
  }

  &--tertiary {
    background-color: transparent;

    &:hover:enabled {
      background-color: rgba($unnnic-color-gray-400, 0.1);
    }

    &:active:enabled {
      background-color: rgba($unnnic-color-gray-400, 0.2);
    }
  }

  &--warning {
    background-color: $unnnic-color-red-500;
    color: $unnnic-color-neutral-white;

    &:hover:enabled {
      background-color: $unnnic-color-red-600;
    }

    &:active:enabled {
      background-color: $unnnic-color-red-700;
    }
  }

  &--attention {
    background-color: $unnnic-color-yellow-500;

    &:hover:enabled {
      background-color: $unnnic-color-yellow-600;
    }

    &:active:enabled {
      background-color: $unnnic-color-yellow-700;
    }
  }

  &--primary:disabled,
  &--secondary:disabled,
  &--tertiary:disabled,
  &--warning:disabled,
  &--attention:disabled {
    background-color: $unnnic-color-bg-muted;
    color: $unnnic-color-fg-muted;
    cursor: not-allowed;
  }

  &--float {
    position: absolute;
    bottom: 0;
    right: 0;

    border-radius: $unnnic-border-radius-pill;
    box-shadow: $unnnic-shadow-level-near;
  }

  &--size-large {
    padding: $unnnic-space-3 $unnnic-space-4;
  }

  &--size-small {
    padding: $unnnic-space-2 $unnnic-space-4;
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
      height: 45px;
      width: 45px;
    }

    &-large,
    &-extra-large {
      padding: $unnnic-inset-xs;
    }

    &-small {
      padding: $unnnic-inset-nano;
      height: 37px;
      width: 37px;
    }
  }
}
</style>