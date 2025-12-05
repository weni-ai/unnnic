<template>
  <div
    :class="[
      'unnnic-popover-option',
      {
        'unnnic-popover-option--disabled': props.disabled,
        'unnnic-popover-option--active': props.active,
        'unnnic-popover-option--focused': props.focused,
      },
    ]"
  >
    <UnnnicIcon
      v-if="props.icon"
      :icon="props.icon"
      :scheme="schemeColor"
      size="ant"
    />
    <p
      :class="[
        'unnnic-popover-option__label',
        `unnnic-popover-option__label--${schemeColor}`,
        `unnnic-popover-option--disabled: ${props.disabled}`,
      ]"
    >
      {{ props.label }}
    </p>
  </div>
</template>

<script setup lang="ts">
import UnnnicIcon from '@/components/Icon.vue';

import type { SchemeColor } from '@/types/scheme-colors';
import { computed } from 'vue';

defineOptions({
  name: 'UnnnicPopoverOption',
});

interface PopoverOptionProps {
  label: string;
  disabled?: boolean;
  active?: boolean;
  focused?: boolean;
  scheme?: SchemeColor;
  icon?: string;
}

const props = withDefaults(defineProps<PopoverOptionProps>(), {
  disabled: false,
  active: false,
  focused: false,
  scheme: 'fg-emphasized',
  icon: '',
});

const schemeColor = computed(() => {
  if (props.active) {
    return 'fg-inverted';
  }
  if (props.disabled) {
    return 'fg-muted';
  }
  return props.scheme;
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-popover-option {
  cursor: pointer;
  border-radius: $unnnic-radius-2;
  padding: $unnnic-space-2;
  font: $unnnic-font-emphasis;
  display: flex;
  gap: $unnnic-space-2;
  align-items: center;

  &:hover:not(&--active):not(&--disabled),
  &--focused {
    background-color: $unnnic-color-bg-soft;
  }

  &--active {
    background-color: $unnnic-color-bg-active;
  }

  &--disabled {
    color: $unnnic-color-fg-muted;
    background-color: $unnnic-color-bg-muted;
    cursor: not-allowed;
  }

  &__label {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    @each $name, $color in $unnnic-scheme-colors {
      &.unnnic-popover-option__label--#{$name} {
        color: $color;
      }
    }

    &--disabled {
      color: $unnnic-color-fg-muted;
    }

    &--active {
      color: $unnnic-color-fg-inverted;
    }
  }
}
</style>
