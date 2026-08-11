<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="unnnic-checkbox">
    <label
      :class="[
        'unnnic-checkbox__input-wrapper',
        { 'unnnic-checkbox__input-wrapper--disabled': disabled },
      ]"
    >
      <input
        :class="[
          'unnnic-checkbox__input',
          { 'unnnic-checkbox__input--less': modelValue === 'less' },
        ]"
        type="checkbox"
        :disabled="disabled"
        :checked="modelValue === 'less' || modelValue"
        v-bind="pick($attrs, ['id', 'name'])"
        @change="click"
      />

      <p
        v-if="label || textRight"
        :class="[
          'unnnic-checkbox__label',
          { 'unnnic-checkbox__label--disabled': disabled },
        ]"
        data-testid="checkbox-text-right"
      >
        {{ label || textRight }}
      </p>
    </label>

    <p
      v-if="helper"
      class="unnnic-checkbox__helper"
    >
      {{ helper }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { pick } from 'lodash';

defineOptions({
  name: 'UnnnicCheckbox',
});

export type CheckboxValue = boolean | 'less';

export interface CheckboxProps {
  modelValue?: CheckboxValue;
  disabled?: boolean;
  label?: string;
  helper?: string;
  textRight?: string;
}

const props = withDefaults(defineProps<CheckboxProps>(), {
  modelValue: false,
  disabled: false,
  label: '',
  helper: '',
  textRight: '',
});

const emit = defineEmits<{
  change: [value: boolean];
  'update:model-value': [value: boolean];
}>();

const $attrs = useAttrs();

const valueName = computed(() => {
  if (props.modelValue === true) {
    return 'checked';
  }
  if (props.modelValue === false) {
    return 'default';
  }

  return 'less';
});

function click() {
  const isChecked = ['checked', 'less'].includes(valueName.value);
  emit('change', !isChecked);
  emit('update:model-value', !isChecked);
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$checkbox-size: 21px;

.unnnic-checkbox {
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  &__input-wrapper {
    width: fit-content;

    display: flex;
    align-items: center;
    column-gap: $unnnic-space-2;

    cursor: pointer;

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__input {
    appearance: none;
    width: $checkbox-size;
    min-width: $checkbox-size;
    height: $checkbox-size;
    margin: 0;
    background-color: $unnnic-color-bg-base;
    border: 1px solid $unnnic-color-border-base;
    border-radius: $unnnic-radius-1;
    box-sizing: border-box;

    outline: none;

    cursor: pointer;

    &:checked {
      border-width: 0;
      background-color: $unnnic-color-bg-active;
      background-image: url('../../assets/icons/checkbox-checked.svg');
      background-repeat: no-repeat;
      background-position: center;

      &.unnnic-checkbox__input--less {
        background-image: url('../../assets/icons/checkbox-less.svg');
      }
    }

    &:disabled,
    &:disabled:checked {
      background-color: $unnnic-color-bg-muted;
      border: 1px solid $unnnic-color-border-muted;

      cursor: not-allowed;
    }

    &:disabled:checked {
      background-image: url('../../assets/icons/checkbox-checked-disabled.svg');

      &.unnnic-checkbox__input--less {
        background-image: url('../../assets/icons/checkbox-less-disabled.svg');
      }
    }
  }

  &__label {
    margin: 0;
    font: $unnnic-font-body;
    color: $unnnic-color-fg-emphasized;

    &--disabled {
      color: $unnnic-color-fg-muted;
    }
  }

  &__helper {
    margin: 0;
    margin-left: $checkbox-size + $unnnic-space-2;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }
}
</style>
