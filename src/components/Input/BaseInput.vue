<template>
  <input
    v-if="mask"
    v-mask="mask"
    v-bind="attributes"
    :value="fullySanitize(modelValue)"
    :class="[classes, { focus, 'use-focus-prop': useFocusProp }]"
    :type="nativeType"
    :readonly="readonly"
  />
  <input
    v-else
    v-bind="attributes"
    :value="fullySanitize(modelValue)"
    :class="[classes, { focus, 'use-focus-prop': useFocusProp }]"
    :type="nativeType"
    :maxlength="maxlength ?? undefined"
    :readonly="readonly"
  />
</template>

<script setup lang="ts">
import { computed, useAttrs } from 'vue';
import { mask as vMask } from 'vue-the-mask';
import { fullySanitize } from '../../utils/sanitize';

defineOptions({
  name: 'UnnnicBaseInput',
});

export type InputVariant = 'normal' | 'error';
export type InputSize = 'md' | 'sm';

export interface BaseInputProps {
  type?: InputVariant;
  modelValue?: string;
  nativeType?: string;
  size?: InputSize | string;
  mask?: string | string[];
  hasIconLeft?: boolean;
  hasIconRight?: boolean;
  hasClearIcon?: boolean;
  maxlength?: number | null;
  readonly?: boolean;
  useFocusProp?: boolean;
  focus?: boolean;
}

const props = withDefaults(defineProps<BaseInputProps>(), {
  type: 'normal',
  modelValue: '',
  nativeType: 'text',
  size: 'md',
  mask: '',
  hasIconLeft: false,
  hasIconRight: false,
  hasClearIcon: false,
  maxlength: null,
  readonly: false,
  useFocusProp: false,
  focus: false,
});

const emit = defineEmits<{
  'update:modelValue': [value: string];
}>();

const attrs = useAttrs();

const attributes = computed(() => {
  return {
    ...attrs,
    ...(attrs['v-bind'] as Record<string, unknown> | undefined),
    onInput: (event: Event) => {
      const target = event.target as HTMLInputElement | null;
      emit('update:modelValue', target?.value ?? '');
    },
  };
});

const classes = computed(() => {
  return [
    'input',
    `size-${props.size}`,
    props.type,
    {
      'input--has-icon-left': props.hasIconLeft,
      'input--has-icon-right': props.hasIconRight,
      'input--has-clear-icon': props.hasClearIcon,
    },
  ];
});
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;
@use './Input.scss' as *;

.input {
  @include input-base;

  box-sizing: border-box;
  width: 100%;

  &.size {
    &-md {
      @include input-md-font;
      padding: $unnnic-space-3 $unnnic-space-4;
      height: 45px;
    }

    &-sm {
      @include input-sm-font;
      padding: $unnnic-space-2 $unnnic-space-4;
      height: 37px;
    }
  }

  &.input--has-icon-left {
    padding-left: $unnnic-space-10;
  }

  &.input--has-icon-right {
    padding-right: $unnnic-space-10;
    &.input--has-clear-icon {
      padding-right: $unnnic-space-10 + $unnnic-space-6;
    }
  }

  &.input--has-clear-icon {
    padding-right: $unnnic-space-10;
  }

  &.input--has-clear-icon {
      padding-right: $unnnic-space-10;
    }

  &.error {
    @include input-error;
  }

  &:-ms-input-placeholder,
  &::-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $unnnic-color-fg-muted;
  }
}
</style>
