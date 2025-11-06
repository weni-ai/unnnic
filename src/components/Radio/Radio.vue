<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="unnnic-radio-container">
    <label>
      <input
        class="unnnic-radio"
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

.unnnic-radio-container {
  display: inline-flex;
  flex-direction: column;

  label {
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;
  }

  .unnnic-radio {
    appearance: none;
    width: $radio-size;
    height: $radio-size;
    margin: 0;
    background-color: $unnnic-color-bg-base;
    border: 1px solid $unnnic-color-border-base;
    border-radius: $unnnic-radius-full;
    box-sizing: border-box;
    outline: none;

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
    }
  }

  .unnnic-radio__label {
    margin: 0;
    font: $unnnic-font-body;
    color: $unnnic-color-fg-emphasized;

    &--disabled {
      color: $unnnic-color-fg-muted;
    }
  }
}
</style>
