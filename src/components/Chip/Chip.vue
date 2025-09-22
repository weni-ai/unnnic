<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section 
    :class="[
      'chip',
      `chip--${scheme}`,
      {
        'chip--border': shouldShowBorder
      }
    ]"
  >
    <p :class="['chip__text', textColorClass]">{{ text }}</p>
    <p v-if="count" :class="['chip__count', countColorClass]">{{ count }}</p>
    <UnnnicIcon 
      v-if="icon" 
      :icon="icon" 
      :scheme="iconScheme" 
      class="chip__icon" 
      size="sm" 
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UnnnicIcon from '../Icon.vue';
import type { SchemeColor } from '@/types/scheme-colors';
import type { ChipProps } from './types';

const props = defineProps<ChipProps>();

const scheme = computed(() => props.scheme || 'bg-base');

const shouldShowBorder = computed(() => {
  return scheme.value === 'bg-base' || scheme.value === 'bg-soft';
});

const isTealVariation = computed(() => {
  return scheme.value.startsWith('teal-');
});

const iconScheme = computed((): SchemeColor => {
  if (isTealVariation.value) {
    return 'weni-600';
  }

  if (scheme.value === 'bg-base' || scheme.value === 'bg-soft') {
    return 'neutral-darkest';
  }
  return scheme.value as SchemeColor;
});

const textColorClass = computed(() => {
  if (isTealVariation.value) {
    return 'chip__text--teal';
  }
  return '';
});

const countColorClass = computed(() => {
  if (isTealVariation.value) {
    return 'chip__count--teal';
  }
  return '';
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.chip {
    display: inline-flex;
    height: 26px;
    padding: $unnnic-space-1 $unnnic-space-3;
    justify-content: center;
    align-items: center;
    gap: $unnnic-space-2;
    flex-shrink: 0;
    border-radius: 600px;
    background: $unnnic-color-bg-base;

    &--border {
        border: 1px solid $unnnic-color-border-base;
    }

    @each $name, $color in $unnnic-scheme-colors {
        &--#{$name} {
            background: $color;
        }
    }

    &__text {
        color: $unnnic-color-fg-base;
        font: $unnnic-font-caption-1;

        &--teal {
            color: $unnnic-color-fg-active;
        }
    }

    &__count {
        display: flex;
        padding: 0 $unnnic-space-2;
        justify-content: center;
        align-items: center;
        gap: 10px;
        border-radius: 600px;
        background: $unnnic-color-bg-soft;
        color: $unnnic-color-fg-base;
        font: $unnnic-font-caption-1;
        font-weight: $unnnic-font-weight-medium;

        &--teal {
            color: $unnnic-color-fg-active;
            background: $unnnic-color-white;
        }
    }
}
</style>