<template>
  <section class="unnnic-radio-group__container">
    <UnnnicLabel
      v-if="label"
      :label="label"
      :tooltip="labelTooltip"
      :useHtmlTooltip="labelUseHtmlTooltip"
    />

    <section
      :class="[
        'unnnic-radio-group__radios',
        `unnnic-radio-group__radios--state-${state}`,
      ]"
    >
      <slot />
    </section>
  </section>
</template>

<script setup>
import { ref, provide, watch, computed } from 'vue';
import UnnnicLabel from '../Label/Label.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: '',
  },

  state: {
    type: String,
    default: 'horizontal',
    validator(value) {
      return ['horizontal', 'vertical'].includes(value);
    },
  },

  label: {
    type: String,
  },

  labelTooltip: {
    type: String,
  },

  labelUseHtmlTooltip: {
    type: Boolean,
  },

  name: {
    type: String,
    default: '',
  },
});

const emit = defineEmits(['update:modelValue']);

const contextModelValue = ref(props.modelValue);

watch(() => props.modelValue, (newVal) => {
  if (newVal !== contextModelValue.value) {
    contextModelValue.value = newVal;
  }
});

watch(contextModelValue, (newVal) => {
  if (newVal !== props.modelValue) {
    emit('update:modelValue', newVal);
  }
});

const computedName = computed(() => {
  return props.name || `unnnic-radio-group-${Math.random().toString(36).substring(2, 15)}`;
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
    gap: $unnnic-space-3;
  }

  &__radios {
    display: flex;
    gap: $unnnic-space-4 $unnnic-space-6;

    &--state-horizontal {
      flex-direction: row;
    }

    &--state-vertical {
      flex-direction: column;
    }
  }
}
</style>
