<template>
  <section
    :class="['unnnic-disclaimerv2', `unnnic-disclaimerv2--${type}`]"
    data-testid="disclaimerv2"
  >
    <UnnnicIcon
      class="unnnic-disclaimerv2__icon"
      size="ant"
      :icon="variant.icon"
      :scheme="variant.scheme"
      data-testid="disclaimerv2-icon"
    />

    <section class="unnnic-disclaimerv2__content">
      <p
        v-if="title"
        class="unnnic-disclaimerv2__title"
        data-testid="disclaimerv2-title"
      >
        {{ title }}
      </p>
      <p
        v-if="description"
        class="unnnic-disclaimerv2__description"
        data-testid="disclaimerv2-description"
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
import type { DisclaimerTypeV2, DisclaimerV2Props } from './types-v2';

defineOptions({
  name: 'UnnnicDisclaimerV2',
});

const props = withDefaults(defineProps<DisclaimerV2Props>(), {
  title: 'Disclaimer',
  description: 'The quick brown fox jumps over the lazy dog',
  type: 'informational',
});

const variant = computed(() => {
  const variants: Record<
    DisclaimerTypeV2,
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

.unnnic-disclaimerv2 {
  display: flex;
  gap: $unnnic-space-2;

  width: 100%;
  padding: $unnnic-space-4;
  box-sizing: border-box;

  border: 1px solid $unnnic-color-border-base;
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
