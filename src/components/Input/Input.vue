<template>
  <UnnnicFormElement
    :label="label || $slots.label"
    :size="size"
    :disabled="disabled"
    :message="message"
    :tooltip="tooltip"
    :error="computedError"
    :class="['unnnic-form', size]"
    data-testid="form-element"
  >
    <TextInput
      v-bind="$attrs"
      v-model="val"
      class="unnnic-form-input"
      :useFocusProp="useFocusProp"
      :focus="focus"
      :placeholder="placeholder"
      :iconLeft="iconLeft"
      :iconRight="iconRight"
      :type="errors.length > 0 && !disabled ? 'error' : type"
      :iconLeftClickable="iconLeftClickable"
      :iconRightClickable="iconRightClickable"
      :hasCloudyColor="hasCloudyColor"
      :size="size"
      :mask="mask"
      :nativeType="nativeType"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
      :showClear="showClear"
      @clear="emit('clear')"
    />

    <template
      v-if="maxlength && showMaxlengthCounter"
      #rightMessage
    >
      {{ (val || '').length }} / {{ maxlength }}
    </template>
  </UnnnicFormElement>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { fullySanitize } from '../../utils/sanitize';
import TextInput from './TextInput.vue';
import UnnnicFormElement from '../FormElement/FormElement.vue';
import { type TooltipProps } from '../ToolTip/ToolTip.vue';
import type { InputSize, InputVariant } from './BaseInput.vue';

defineOptions({
  name: 'UnnnicInput',
});

export interface InputProps {
  placeholder?: string;
  type?: InputVariant;
  modelValue?: string;
  nativeType?: string;
  message?: string;
  errors?: string | string[];
  label?: string;
  iconLeft?: string;
  iconRight?: string;
  allowTogglePassword?: boolean;
  iconLeftClickable?: boolean;
  iconRightClickable?: boolean;
  hasCloudyColor?: boolean;
  size?: InputSize | string;
  mask?: string | string[];
  tooltip?: TooltipProps;
  maxlength?: number | null;
  showMaxlengthCounter?: boolean;
  disabled?: boolean;
  readonly?: boolean;
  useFocusProp?: boolean;
  focus?: boolean;
  showClear?: boolean;
}

const props = withDefaults(defineProps<InputProps>(), {
  placeholder: '',
  type: 'normal',
  modelValue: '',
  nativeType: 'text',
  message: '',
  errors: '',
  label: '',
  iconLeft: '',
  iconRight: '',
  allowTogglePassword: false,
  iconLeftClickable: false,
  iconRightClickable: false,
  hasCloudyColor: false,
  size: 'md',
  mask: '',
  tooltip: undefined,
  maxlength: null,
  showMaxlengthCounter: false,
  disabled: false,
  readonly: false,
  useFocusProp: false,
  focus: false,
  showClear: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
  clear: [];
}>();

const val = ref(props.modelValue);

const computedError = computed(() => {
  if (Array.isArray(props.errors)) {
    return props.errors.join(', ') || props.type === 'error';
  }

  return props.errors || props.type === 'error';
});

watch(val, () => {
  emit('update:modelValue', fullySanitize(val.value));
});

watch(
  () => props.modelValue,
  () => {
    val.value = props.modelValue;
  },
);

val.value = props.modelValue;
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
