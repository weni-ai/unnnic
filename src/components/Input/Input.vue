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
      :forceActiveStatus="forceActiveStatus"
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
      @clear="$emit('clear')"
    />

    <template
      v-if="maxlength && showMaxlengthCounter"
      #rightMessage
    >
      {{ (val || '').length }} / {{ maxlength }}
    </template>
  </UnnnicFormElement>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
import TextInput from './TextInput.vue';
import UnnnicFormElement from '../FormElement/FormElement.vue';

export default {
  name: 'UnnnicInput',
  components: { 
    TextInput, 
    UnnnicFormElement,
  },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    modelValue: {
      type: String,
      default: '',
    },
    nativeType: {
      type: String,
      default: 'text',
    },
    message: {
      type: String,
      default: '',
    },
    errors: {
      type: [String, Array],
      default: '',
    },
    label: {
      type: String,
      default: '',
    },
    iconLeft: {
      type: String,
      default: '',
    },
    iconRight: {
      type: String,
      default: '',
    },
    allowTogglePassword: {
      type: Boolean,
      default: false,
    },
    iconLeftClickable: {
      type: Boolean,
      default: false,
    },
    iconRightClickable: {
      type: Boolean,
      default: false,
    },
    hasCloudyColor: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    mask: {
      type: [String, Array],
      default: '',
    },
    tooltip: {
      type: String,
      default: '',
    },
    maxlength: {
      type: [Number, null],
      default: null,
    },
    showMaxlengthCounter: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    forceActiveStatus: {
      type: Boolean,
      default: false,
    },
    showClear: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue', 'clear'],

  data() {
    return {
      val: this.modelValue,
    };
  },
  computed: {
    computedError() {
      if (Array.isArray(this.errors)) {
        return this.errors.join(', ') || this.type === 'error';
      }

      return this.errors || this.type === 'error';
    },
  },
  watch: {
    val() {
      this.$emit('update:modelValue', fullySanitize(this.val));
    },
    modelValue() {
      this.val = this.modelValue;
    },
  },
  mounted() {
    this.val = this.modelValue;
  },
  methods: {
    fullySanitize,
  },
};
</script>

<style lang="scss" scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
</style>
