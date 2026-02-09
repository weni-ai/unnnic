<template>
  <section class="unnnic-switch">
    <UnnnicLabel
      v-if="label"
      :label="label"
      :tooltip="labelTooltip"
      class="unnnic-switch__label"
    />

    <label
      :class="[
        'unnnic-switch__input-wrapper',
        { 'unnnic-switch__input-wrapper--disabled': disabled },
      ]"
    >
      <input
        class="unnnic-switch__input"
        type="checkbox"
        :disabled="disabled"
        :checked="modelValue"
        v-bind="pick($attrs, ['id', 'name'])"
        @change="toggleState"
      />

      <p
        v-if="option || textLeft || textRight"
        :class="[
          'unnnic-switch__option',
          { 'unnnic-switch__option--disabled': disabled },
        ]"
        data-testid="switch-option"
      >
        {{ option }}
        {{ textLeft }}
        {{ textRight }}

        <slot name="suffix" />
      </p>
    </label>

    <p
      v-if="helper"
      class="unnnic-switch__helper"
    >
      {{ helper }}
    </p>
  </section>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { pick } from 'lodash';
import UnnnicLabel from '../Label/Label.vue';
import { type TooltipProps } from '../ToolTip/ToolTip.vue';

defineOptions({
  name: 'UnnnicSwitch',
});

interface SwitchProps {
  size?: 'small' | 'medium';
  label?: string;
  labelTooltip?: TooltipProps;
  option?: string;
  helper?: string;
  textLeft?: string;
  textRight?: string;
  disabled?: boolean;
  modelValue?: boolean;
}

const props = withDefaults(defineProps<SwitchProps>(), {
  size: 'medium',
  label: '',
  labelTooltip: undefined,
  option: '',
  helper: '',
  textLeft: '',
  textRight: '',
  disabled: false,
  modelValue: false,
});

const emit = defineEmits(['update:model-value']);

const isActive = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal: boolean) => {
    if (newVal !== isActive.value) {
      isActive.value = newVal;
    }
  },
  { immediate: true },
);

function toggleState() {
  if (!props.disabled) {
    isActive.value = !isActive.value;
    emit('update:model-value', isActive.value);
  }
}
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$switch-width: 38px;
$switch-height: 20px;

.unnnic-switch {
  display: flex;
  flex-direction: column;

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
    width: $switch-width;
    min-width: $switch-width;
    height: $switch-height;
    margin: 0;
    background-color: $unnnic-color-bg-muted;
    border-radius: $unnnic-radius-3;
    box-sizing: border-box;
    outline: none;

    background-image: url('@/assets/icons/switch-checked.svg');
    background-repeat: no-repeat;
    background-position: 4px center;

    transition:
      120ms linear background-position,
      120ms linear background-color;

    cursor: pointer;

    &:checked {
      background-color: $unnnic-color-bg-active;
      background-position: 20px center;
    }

    &:disabled {
      background-color: $unnnic-color-bg-muted;
      background-image: url('@/assets/icons/switch-checked-disabled.svg');

      cursor: not-allowed;
    }
  }

  &__label {
    margin-bottom: $unnnic-space-3;
  }

  &__option {
    margin: 0;
    font: $unnnic-font-body;
    color: $unnnic-color-fg-emphasized;

    &--disabled {
      color: $unnnic-color-fg-muted;
    }
  }

  &__helper {
    margin: 0;
    margin-left: $switch-width + $unnnic-space-2;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }
}
</style>
