<template>
  <div :class="['text-input', `size--${size}`]">
    <BaseInput
      v-bind="attributes"
      ref="base-input"
      :modelValue="modelValue"
      :size="size"
      :nativeType="
        nativeType === 'password' && showPassword ? 'text' : nativeType
      "
      :type="type"
      class="input-itself"
      :hasIconLeft="!!iconLeft"
      :hasIconRight="!!iconRight || allowTogglePassword"
      :hasClearIcon="showClear"
      :maxlength="maxlength"
      :readonly="readonly"
      :useFocusProp="useFocusProp"
      :focus="focus"
    />

    <UnnnicIcon
      v-if="iconLeft"
      :scheme="iconScheme"
      :icon="iconLeft"
      size="ant"
      :clickable="iconLeftClickable"
      :class="['icon-left', { clickable: iconLeftClickable }]"
      @click="onIconLeftClick"
    />

    <section class="icon-right-container">
      <UnnnicIcon
        v-if="showClear"
        class="icon-clear"
        scheme="fg-base"
        icon="close"
        size="ant"
        clickable
        @click.stop="onClearClick"
      />

      <UnnnicIcon
        v-if="iconRightSvg"
        :scheme="iconScheme"
        :icon="iconRightSvg"
        size="ant"
        :clickable="iconRightClickable || allowTogglePassword"
        class="icon-right"
        :class="{ clickable: iconRightClickable || allowTogglePassword }"
        @click="onIconRightClick"
      />
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, useAttrs, useTemplateRef } from 'vue';
import BaseInput, {
  type InputSize,
  type InputVariant,
} from './BaseInput.vue';
import UnnnicIcon from '../Icon.vue';

defineOptions({
  name: 'UnnnicTextInput',
});

export interface TextInputProps {
  placeholder?: string | null;
  type?: InputVariant;
  modelValue?: string;
  nativeType?: string;
  iconLeft?: string | null;
  iconRight?: string | null;
  iconLeftClickable?: boolean | null;
  iconRightClickable?: boolean | null;
  allowTogglePassword?: boolean | null;
  size?: InputSize | string;
  maxlength?: number | null;
  disabled?: boolean;
  readonly?: boolean;
  useFocusProp?: boolean;
  focus?: boolean;
  showClear?: boolean;
}

const props = withDefaults(defineProps<TextInputProps>(), {
  placeholder: null,
  type: 'normal',
  modelValue: '',
  nativeType: '',
  iconLeft: null,
  iconRight: null,
  iconLeftClickable: null,
  iconRightClickable: null,
  allowTogglePassword: null,
  size: 'md',
  maxlength: null,
  disabled: false,
  readonly: false,
  useFocusProp: false,
  focus: false,
  showClear: false,
});

const emit = defineEmits<{
  'icon-left-click': [];
  'icon-right-click': [];
  clear: [];
}>();

const attrs = useAttrs();
const baseInput = useTemplateRef<{ $el: HTMLInputElement }>('base-input');
const isFocused = ref(false);
const showPassword = ref(false);

const isDisabled = computed(() => {
  return Boolean(attrs.disabled || props.disabled);
});

const iconRightSvg = computed(() => {
  if (props.allowTogglePassword) {
    return showPassword.value ? 'view-off-1' : 'view-1-1';
  }

  return props.iconRight;
});

const iconScheme = computed(() => {
  if (isDisabled.value) {
    return 'fg-muted';
  }
  return 'fg-base';
});

const attributes = computed(() => {
  return {
    ...attrs,
    ...(attrs['v-bind'] as Record<string, unknown> | undefined),
    ...props,
  };
});

function focusInput() {
  baseInput.value?.$el.focus();
}

function onFocus() {
  isFocused.value = true;
}

function onBlur() {
  isFocused.value = false;
}

function onIconLeftClick() {
  if (props.iconLeftClickable) emit('icon-left-click');
}

function onClearClick() {
  emit('clear');
}

function onIconRightClick() {
  if (attributes.value.disabled) return;
  if (props.allowTogglePassword) showPassword.value = !showPassword.value;
  else if (props.iconRightClickable) emit('icon-right-click');
}

defineExpose({
  focusInput,
  onFocus,
  onBlur,
  showPassword,
  isFocused,
  iconRightSvg,
  iconScheme,
  attributes,
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.text-input {
  position: relative;
}

.icon {
  &-left {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: $unnnic-space-4;

    &:not(.clickable) {
      pointer-events: none;
    }
  }

  &-right-container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: $unnnic-space-4;
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;

    .icon-clear {
      cursor: pointer;
    }
    .icon-right:not(.clickable) {
      pointer-events: none;
    }
  }
}
</style>
