<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section
    :class="[
      'chip',
      chipClass,
      {
        'chip--border': shouldShowBorder,
        'chip--is-clickable': isClickable,
      },
    ]"
    @click="onClick"
  >
    <p class="chip__text">{{ text }}</p>
    <p
      v-if="count"
      :class="['chip__count', countColorClass]"
    >
      {{ count }}
    </p>
    <slot name="right" />
    <UnnnicIcon
      v-if="type === 'multiple'"
      :icon="isSelected ? 'close' : 'add'"
      scheme="fg-emphasized"
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
  height: 22px;
  padding: $unnnic-space-1 $unnnic-space-3;
  justify-content: center;
  align-items: center;
  gap: $unnnic-space-2;
  flex-shrink: 0;
  border-radius: $unnnic-radius-full;
  background-color: $unnnic-color-bg-base;
  border: 1px solid $unnnic-color-border-base;

  cursor: default;

  transition: all 0.15s cubic-bezier(0.4, 0, 0.2, 1); // Same as UnnnicButton

  &:hover {
    background-color: $unnnic-color-bg-soft;
  }

  &--is-selected {
    background-color: $unnnic-color-bg-accent-plain;
    border-color: transparent;

    &:hover {
      background-color: $unnnic-color-bg-accent-plain;
      border-color: $unnnic-color-border-accent-plain;
    }
  }

  &--is-clickable {
    cursor: pointer;
  }

  &--border {
    border-color: $unnnic-color-border-base;
  }

  &__text {
    color: $unnnic-color-fg-emphasized;
    @include unnnic-font-caption-1;
  }

  &__count {
    display: flex;
    padding: 0 $unnnic-space-2;
    justify-content: center;
    align-items: center;
    gap: 10px;
    border-radius: $unnnic-radius-full;
    background: $unnnic-color-bg-muted;
    color: $unnnic-color-fg-emphasized;
    @include unnnic-font-caption-2;

    &--is-selected {
      background: $unnnic-color-bg-teal-plain;
    }
  }
}
</style>
