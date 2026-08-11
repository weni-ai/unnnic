<template>
  <div
    :class="{
      'unnnic-select-item': true,
      'unnnic-select-item__active': active,
      'unnnic--clickable': selectable,
      'unnnic-select-item--selectable': selectable,
      'text-focused': textFocused,
    }"
    @click="emit('click')"
  >
    <span
      :class="[
        'unnnic-select-item__label',
        `unnnic-select-item__label--${size}`,
      ]"
    >
      <slot />
    </span>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'UnnicSelectItem',
});

export interface SelectItemProps {
  size?: string;
  selectable?: boolean;
  active?: boolean;
  textFocused?: boolean;
}

withDefaults(defineProps<SelectItemProps>(), {
  size: '',
  selectable: true,
  active: false,
  textFocused: false,
});

const emit = defineEmits<{
  click: [];
}>();
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;
.unnnic-select-item {
  background-color: $unnnic-color-bg-base;
  padding: $unnnic-space-1 $unnnic-space-2;
  margin: $unnnic-space-2;

  font-family: $unnnic-font-family-secondary;
  color: $unnnic-color-fg-base;
  font-weight: $unnnic-font-weight-regular;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  max-width: 100%;
  -webkit-line-clamp: 1;

  &.text-focused {
    color: $unnnic-color-teal-8;
    font-weight: $unnnic-font-weight-bold;
  }

  &--selectable:hover,
  &__active {
    background-color: $unnnic-color-bg-base-soft;
    border-radius: $unnnic-border-radius-sm;
  }

  &__label {
    &--md {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }
    &--sm {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
  }
}
</style>
