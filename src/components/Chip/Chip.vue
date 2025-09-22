<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section 
    :class="[
      'chip',
      chipClass,
      {
        'chip--border': shouldShowBorder,
        'chip--is-clickable': isClickable
      }
    ]"
    @click="onClick"
  >
    <p :class="['chip__text', textColorClass]">{{ text }}</p>
    <p v-if="count" :class="['chip__count', countColorClass]">{{ count }}</p>
    <UnnnicIcon 
      v-if="type === 'multiple'" 
      :icon="isSelected ? 'add' : 'close'" 
      :scheme="isSelected ? 'teal-600' : 'feedback-grey'" 
      class="chip__icon" 
      size="sm" 
    />
  </section>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import UnnnicIcon from '../Icon.vue';
import type { ChipProps } from './types';

const props = defineProps<ChipProps>();

const emit = defineEmits<{
  click: [event: Event];
}>();

const onClick = (event: Event) => {
  emit('click', event);
};

const shouldShowBorder = computed(() => {
  return !props.isSelected;
});

const textColorClass = computed(() => {
  if (props.isSelected) {
    return 'chip__text--is-selected';
  }
  return '';
}); 

const countColorClass = computed(() => {
  if (props.isSelected) {
    return 'chip__count--is-selected';
  }
  return '';
});

const chipClass = computed(() => {
  return props.isSelected ? 'chip--is-selected' : '';
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
    background-color: $unnnic-color-bg-base;

    &:hover {
        background-color: $unnnic-color-bg-soft;
    }

    &--is-selected {
        background-color: $unnnic-color-teal-100;
        &:hover {
            background-color: $unnnic-color-teal-200;
        }
    }

    &--is-clickable {
        cursor: pointer;
    }
    
    &--border {
        border: 1px solid $unnnic-color-border-base;
    }

    &__text {
        color: $unnnic-color-fg-base;
        font: $unnnic-font-caption-1;

        &--is-selected {
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

        &--is-selected {
            color: $unnnic-color-fg-active;
            background: $unnnic-color-white;
        }
    }
}
</style>