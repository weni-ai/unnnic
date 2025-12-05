<template>
  <section
    class="unnnic-disclaimerv2"
    :class="[
      `type-${type}`,
      { 'unnnic-disclaimerv2-align-center': showDescription && !showTitle },
    ]"
    data-testid="disclaimerv2"
  >
    <section class="unnnic-disclaimerv2__icon-container">
      <UnnnicIcon
        class="unnnic-disclaimerv2__icon"
        size="sm"
        :icon="variant.icon"
        :scheme="variant.scheme"
        data-testid="disclaimerv2-icon"
      />
    </section>

    <section class="unnnic-disclaimerv2__content">
      <p
        v-if="showTitle && title"
        class="unnnic-disclaimerv2__title"
        data-testid="disclaimerv2-title"
      >
        {{ title }}
      </p>
      <p
        v-if="showDescription && description"
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
import type { DisclaimerV2Props } from './types-v2';

export type DisclaimerTypeV2 =
  | 'informational'
  | 'success'
  | 'attention'
  | 'error'
  | 'neutral';

defineOptions({
  name: 'UnnnicDisclaimerV2',
});

const props = withDefaults(defineProps<DisclaimerV2Props>(), {
  title: 'Disclaimer',
  showTitle: true,
  description: 'The quick brown fox jumps over the lazy dog',
  showDescription: true,
  type: 'informational',
});

const variant = computed(() => {
  const variants: Record<DisclaimerTypeV2, { icon: string; scheme: string }> = {
    informational: {
      icon: 'information-circle-4',
      scheme: 'blue-500',
    },
    success: {
      icon: 'check-circle-1-1',
      scheme: 'green-500',
    },
    attention: {
      icon: 'alert-circle-1-1',
      scheme: 'yellow-500',
    },
    error: {
      icon: 'alert-circle-1',
      scheme: 'red-500',
    },
    neutral: {
      icon: 'information-circle-4',
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

  &-align-center {
    align-items: center;
  }

  width: 100%;
  padding: $unnnic-space-4;
  box-sizing: border-box;

  border: 1px solid $unnnic-color-border-base;
  border-radius: $unnnic-radius-2;

  background-color: $unnnic-color-bg-soft;

  color: $unnnic-color-fg-emphasized;

  &__icon-container {
    display: flex;
    padding: 3px $unnnic-space-05;
    justify-content: center;
    align-items: flex-start;
    flex-shrink: 0;
    align-self: stretch;
  }

  &__icon {
    flex-shrink: 0;
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-1;
  }

  &__title {
    margin: 0;
    font: $unnnic-font-action;
    color: $unnnic-color-fg-emphasized;
  }

  &__description {
    margin: 0;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-emphasized;
  }

  &.type-informational {
    background-color: $unnnic-color-bg-info;
    border-color: $unnnic-color-border-info;
  }

  &.type-success {
    background-color: $unnnic-color-bg-success;
    border-color: $unnnic-color-border-success;
  }

  &.type-attention {
    background-color: $unnnic-color-bg-warning;
    border-color: $unnnic-color-border-warning;
  }

  &.type-error {
    background-color: $unnnic-color-bg-critical;
    border-color: $unnnic-color-border-critical;
  }

  &.type-neutral {
    background-color: $unnnic-color-bg-soft;
    border-color: $unnnic-color-border-base;
  }
}
</style>
