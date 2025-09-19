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
import type { SchemeColor } from '../Icon/types';
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
  if (scheme.value === 'default') {
    return 'neutral-darkest';
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

$scheme-colors:
  'background-solo' $unnnic-color-background-solo,
  'background-sky' $unnnic-color-background-sky,
  'background-grass' $unnnic-color-background-grass,
  'background-carpet' $unnnic-color-background-carpet,
  'background-snow' $unnnic-color-background-snow,
  'background-lightest' $unnnic-color-background-lightest,
  'background-white' $unnnic-color-background-white,
  'neutral-black' $unnnic-color-neutral-black,
  'neutral-darkest' $unnnic-color-neutral-darkest,
  'neutral-dark' $unnnic-color-neutral-dark,
  'neutral-cloudy' $unnnic-color-neutral-cloudy,
  'neutral-cleanest' $unnnic-color-neutral-cleanest,
  'neutral-clean' $unnnic-color-neutral-clean,
  'neutral-soft' $unnnic-color-neutral-soft,
  'neutral-lightest' $unnnic-color-neutral-lightest,
  'neutral-light' $unnnic-color-neutral-light,
  'neutral-white' $unnnic-color-neutral-white,
  'neutral-snow' $unnnic-color-neutral-snow,
  'feedback-red' $unnnic-color-feedback-red,
  'feedback-green' $unnnic-color-feedback-green,
  'feedback-yellow' $unnnic-color-feedback-yellow,
  'feedback-blue' $unnnic-color-feedback-blue,
  'feedback-grey' $unnnic-color-feedback-grey,
  'aux-blue' $unnnic-color-aux-blue,
  'aux-purple' $unnnic-color-aux-purple,
  'aux-orange' $unnnic-color-aux-orange,
  'aux-lemon' $unnnic-color-aux-lemon,
  'aux-pink' $unnnic-color-aux-pink,
  'aux-baby-blue' $unnnic-color-aux-baby-blue,
  'aux-baby-yellow' $unnnic-color-aux-baby-yellow,
  'aux-baby-red' $unnnic-color-aux-baby-red,
  'aux-baby-green' $unnnic-color-aux-baby-green,
  'aux-baby-pink' $unnnic-color-aux-baby-pink,
  'brand-weni' $unnnic-color-brand-weni,
  'brand-weni-dark' $unnnic-color-brand-weni-dark,
  'brand-weni-soft' $unnnic-color-brand-weni-soft,
  'brand-sec-dark' $unnnic-color-brand-sec-dark,
  'brand-sec-soft' $unnnic-color-brand-sec-soft,
  'brand-sec' $unnnic-color-brand-sec,
  'bg-base' $unnnic-color-bg-base,
  'bg-soft' $unnnic-color-bg-soft,
  'teal-50' $unnnic-color-teal-50,
  'teal-100' $unnnic-color-teal-100,
  'teal-200' $unnnic-color-teal-200,
  'teal-300' $unnnic-color-teal-300,
  'teal-400' $unnnic-color-teal-400,
  'teal-500' $unnnic-color-teal-500,
  'teal-600' $unnnic-color-teal-600,
  'teal-700' $unnnic-color-teal-700,
  'teal-800' $unnnic-color-teal-800,
  'teal-900' $unnnic-color-teal-900,
  'teal-950' $unnnic-color-teal-950;

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

    @each $name, $color in $scheme-colors {
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