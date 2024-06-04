<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div
    @click="click"
    :class="[
      'unnnic-radio-container',
      `unnnic-radio-container--${size}`,
      disabled ? 'disabled' : null,
    ]"
  >
    <UnnnicIcon
      class="unnnic-radio"
      :icon="icon"
      :scheme="color"
      :size="size"
    />

    <span class="label">
      <slot />
    </span>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import UnnnicIcon from '../Icon.vue';

const props = defineProps({
  modelValue: {
    type: [String, Number],
  },
  value: {
    type: [String, Number],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['md', 'sm'].includes(value);
    },
  },
});

const emit = defineEmits(['update:modelValue']);

const valueName = computed(() =>
  props.modelValue === props.value ? 'selected' : 'default',
);
const icon = computed(
  () =>
    ({
      selected: 'radio-selected',
      default: props.disabled ? 'radio-disable' : 'radio-default',
    })[valueName.value],
);
const color = computed(() => {
  if (props.disabled) {
    return 'brand-sec';
  }

  return valueName.value === 'selected' ? 'brand-weni' : 'neutral-cleanest';
});

function click() {
  if (!props.disabled) {
    emit('update:modelValue', props.value);
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-radio-container {
  display: inline-flex;
  align-items: center;

  &:not(.disabled) {
    cursor: pointer;
  }

  &--sm .unnnic-radio {
    margin: $unnnic-spacing-stack-nano $unnnic-spacing-inline-nano;
  }

  &--md .unnnic-radio {
    margin: $unnnic-spacing-stack-nano 0;
    margin-left: $unnnic-spacing-inline-nano;
    margin-right: $unnnic-spacing-inline-xs;
  }

  .label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;
    margin: $unnnic-spacing-stack-nano 0;
    margin-right: $unnnic-spacing-inline-nano;
  }

  &--sm .label {
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
  }

  &--md .label {
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }
}
</style>
