<template>
  <UnnnicFormElement
    :label="label"
    :size="size"
    :disabled="disabled"
    :message="message"
    :tooltip="tooltip"
    :error="computedError"
  >
    <textarea
      ref="textareaRef"
      class="unnnic-text-area__textarea"
      :class="[
        `unnnic-text-area__textarea--size-${size}`,
        `unnnic-text-area__textarea--type-${type}`,
      ]"
      :placeholder="fullySanitize(placeholder)"
      :maxlength="maxLength"
      :disabled="disabled"
      :value="modelValue"
      @input="
        $emit(
          'update:modelValue',
          fullySanitize(($event.target as HTMLTextAreaElement)?.value ?? ''),
        )
      "
    />

    <template
      v-if="maxLength"
      #rightMessage
    >
      {{ modelValue.length }}/{{ maxLength }}
    </template>
  </UnnnicFormElement>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import { fullySanitize } from '../../utils/sanitize';
import UnnnicFormElement from '../FormElement/FormElement.vue';
import { type TooltipProps } from '../ToolTip/ToolTip.vue';

defineOptions({
  name: 'UnnnicTextArea',
});

export interface TextAreaProps {
  size?: 'md' | 'sm';
  resize?: 'none' | 'vertical';
  label?: string;
  placeholder?: string;
  modelValue?: string;
  maxLength?: number;
  message?: string;
  disabled?: boolean;
  type?: 'normal' | 'error';
  tooltip?: TooltipProps;
  errors?: string | string[];
}

const props = withDefaults(defineProps<TextAreaProps>(), {
  size: 'md',
  resize: 'vertical',
  label: '',
  placeholder: '',
  modelValue: '',
  maxLength: undefined,
  message: '',
  disabled: false,
  type: 'normal',
  tooltip: undefined,
  errors: () => [],
});

defineEmits(['update:modelValue']);

const computedError = computed(() => {
  if (Array.isArray(props.errors)) {
    return props.errors.join(', ');
  }

  if (typeof props.errors === 'string') {
    return props.errors;
  }

  return '';
});

const textareaRef = ref<HTMLTextAreaElement | null>(null);
defineExpose({
  focus: () => {
    textareaRef.value?.focus();
  },
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use '@/components/Input/Input' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-text-area {
  &__textarea {
    @include input-base;

    display: block;
    width: 100%;

    resize: v-bind(resize);

    scrollbar-width: thin;

    padding: $unnnic-space-3 $unnnic-space-4;

    &--size-md {
      @include input-md-font;

      min-height: 90px;
    }

    &--size-sm {
      @include input-sm-font;

      min-height: $unnnic-space-20;
    }

    &.unnnic-text-area__textarea--type-error {
      @include input-error;
    }
  }
}
</style>
