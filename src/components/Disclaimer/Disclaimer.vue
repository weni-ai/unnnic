<template>
  <section
    :class="['unnnic-disclaimer', `unnnic-disclaimer--${type}`]"
    data-testid="disclaimer"
  >
    <UnnnicIcon
      class="unnnic-disclaimer__icon"
      size="ant"
      :icon="variant.icon"
      :scheme="variant.scheme"
      data-testid="disclaimer-icon"
    />

    <section class="unnnic-disclaimer__content">
      <p
        v-if="title"
        class="unnnic-disclaimer__title"
        data-testid="disclaimer-title"
      >
        {{ title }}
      </p>
      <p
        v-if="description"
        class="unnnic-disclaimer__description"
        data-testid="disclaimer-description"
      >
        {{ description }}
      </p>
    </section>
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import UnnnicIcon from '../Icon.vue';
import type { SchemeColor } from '@/types/scheme-colors';
import type { DisclaimerType, DisclaimerProps } from './types';

defineOptions({
  name: 'UnnnicDisclaimer',
});

const props = withDefaults(defineProps<DisclaimerProps>(), {
  title: 'Disclaimer',
  description: 'The quick brown fox jumps over the lazy dog',
  type: 'informational',
  icon: 'alert-circle-1-1',
  iconColor: 'neutral-darkest',
});

const variant = computed(() => {
  const variants: Record<
    DisclaimerType,
    { icon: string; scheme: SchemeColor }
  > = {
    informational: {
      icon: 'info',
      scheme: 'blue-500',
    },
    success: {
      icon: 'check_circle',
      scheme: 'green-500',
    },
    attention: {
      icon: 'error',
      scheme: 'yellow-500',
    },
    error: {
      icon: 'cancel',
      scheme: 'red-500',
    },
    neutral: {
      icon: 'info',
      scheme: 'gray-400',
    },
  };

  return variants[props.type];
});
</script>

<style scoped lang="scss">
@use '@/assets/scss/unnnic' as *;

.unnnic-disclaimer {
  $border-width: 1px;

  display: flex;
  gap: $unnnic-space-2;

  width: 100%;
  min-height: 53px;
  padding: calc($unnnic-space-4 - $border-width) $unnnic-space-4;
  box-sizing: border-box;

  border: $border-width solid $unnnic-color-border-base;
  border-radius: $unnnic-radius-2;

  background-color: $unnnic-color-bg-soft;

  color: $unnnic-color-fg-emphasized;

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: $unnnic-space-1;
  }

  &__title {
    margin: 0;
    font: $unnnic-font-action;
  }

  &__description {
    margin: 0;
    font: $unnnic-font-caption-2;
  }

  &--informational {
    background-color: $unnnic-color-bg-info;
    border-color: $unnnic-color-border-info;
  }

  &--success {
    background-color: $unnnic-color-bg-success;
    border-color: $unnnic-color-border-success;
  }

  &--attention {
    background-color: $unnnic-color-bg-warning;
    border-color: $unnnic-color-border-warning;
  }

  &--error {
    background-color: $unnnic-color-bg-critical;
    border-color: $unnnic-color-border-critical;
  }

  &--neutral {
    background-color: $unnnic-color-bg-soft;
    border-color: $unnnic-color-border-base;
  }
}
</style>
