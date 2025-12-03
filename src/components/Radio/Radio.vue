<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="unnnic-radio">
    <label :class="['unnnic-radio__input-wrapper', {'unnnic-radio__input-wrapper--disabled': disabled}]">
      <input
        class="unnnic-radio__input"
        type="radio"
        :disabled="disabled"
        :checked="computedModelValue === value"
        @change="click"
        :name="computedName"
        v-bind="pick($attrs, ['id'])"
      />

      <p :class="[
        'unnnic-radio__label',
        { 'unnnic-radio__label--disabled': disabled },
      ]">
        {{ label }}
        <slot />
      </p>

      <footer
        v-if="helper"
        class="unnnic-radio__helper"
      >
        {{ helper }}
      </footer>
    </label>
  </section>
</template>

<script setup>
import { pick } from 'lodash';
import { inject, computed } from 'vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },
  value: {
    type: [String, Number],
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  label: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    default: '',
  },
  helper: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const contextModelValue = inject('contextModelValue', undefined);
const contextName = inject('contextName', undefined);

function click() {
  if (!props.disabled) {
    emit('update:modelValue', props.value);

    if (contextModelValue) {
      contextModelValue.value = props.value;
    }
  }
}

const computedModelValue = computed(() => {
  return contextModelValue?.value || props.modelValue;
});

const computedName = computed(() => {
  return contextName?.value || props.name;
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$radio-size: 21px;

.unnnic-radio {
  display: inline-flex;
  flex-direction: column;

  &__input-wrapper {
    width: fit-content;

    display: grid;
    grid-template-columns: $radio-size auto;
    grid-template-rows: auto auto;
    align-items: center;
    column-gap: $unnnic-space-2;

    cursor: pointer;

    &--disabled {
      cursor: not-allowed;
    }
  }
  

  &__input {
    appearance: none;
    min-width: $radio-size;
    width: $radio-size;
    height: $radio-size;
    margin: 0;
    background-color: $unnnic-color-bg-base;
    border: 1px solid $unnnic-color-border-base;
    border-radius: $unnnic-radius-full;
    box-sizing: border-box;
    outline: none;

    cursor: pointer;

    &:checked {
      border-width: 0;
      background-color: $unnnic-color-bg-active;
      background-image: url('@/assets/icons/radio-checked.svg');
      background-position: center;
      background-repeat: no-repeat;
    }

    &:disabled {
      background-color: $unnnic-color-bg-muted;
      border: 1px solid $unnnic-color-border-muted;

      cursor: not-allowed;
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
    grid-column: 2 / -1;
    grid-row: 2;

    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }
}
</style>
