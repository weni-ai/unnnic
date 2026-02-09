<template>
  <section
    :class="[
      'unnnic-radio-group__container',
      `unnnic-radio-group--state-${state}`,
    ]"
  >
    <UnnnicLabel
      v-if="label"
      :label="label"
      :tooltip="labelTooltip"
      class="unnnic-radio-group__label"
    />

    <section class="unnnic-radio-group__radios">
      <slot />
    </section>

    <footer
      v-if="helper"
      class="unnnic-radio-group__helper"
    >
      {{ helper }}
    </footer>
  </section>
</template>

<script setup lang="ts">
import { ref, provide, watch, computed } from 'vue';
import UnnnicLabel from '../Label/Label.vue';
import { type TooltipProps } from '../ToolTip/ToolTip.vue';

defineOptions({
  name: 'UnnnicRadioGroup',
});

interface RadioGroupProps {
  modelValue?: string | number;
  state?: 'horizontal' | 'vertical';
  label?: string;
  labelTooltip?: TooltipProps;
  name?: string;
  helper?: string;
}

const props = withDefaults(defineProps<RadioGroupProps>(), {
  modelValue: '',
  state: 'horizontal',
  label: '',
  labelTooltip: undefined,
  name: '',
  helper: '',
});

const emit = defineEmits(['update:modelValue']);

const contextModelValue = ref(props.modelValue);

watch(
  () => props.modelValue,
  (newVal) => {
    if (newVal !== contextModelValue.value) {
      contextModelValue.value = newVal;
    }
  },
);

watch(contextModelValue, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal);
  }
});

const computedName = computed(() => {
  return (
    props.name ||
    `unnnic-radio-group-${Math.random().toString(36).substring(2, 15)}`
  );
});

provide('contextModelValue', contextModelValue);
provide('contextName', computedName);
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-radio-group {
  &__container {
    display: flex;
    flex-direction: column;
  }

  &__label {
    margin-bottom: $unnnic-space-3;
  }

  &__radios {
    display: flex;
    gap: $unnnic-space-4 $unnnic-space-6;
  }

  &__helper {
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }

  &--state-horizontal {
    .unnnic-radio-group__radios {
      flex-direction: row;
    }

    .unnnic-radio-group__helper {
      margin-top: $unnnic-space-2;
    }
  }

  &--state-vertical {
    .unnnic-radio-group__radios {
      flex-direction: column;
    }

    .unnnic-radio-group__helper {
      margin-top: $unnnic-space-3;
    }
  }
}
</style>
