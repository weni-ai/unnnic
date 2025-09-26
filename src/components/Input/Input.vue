<template>
  <div :class="['unnnic-form', size]">
    <p
      v-if="hasLabelSlot"
      class="unnnic-form__label"
    >
      <slot name="label" />
    </p>
    
    <UnnnicLabel v-else-if="label" class="unnnic-form__label" :label="label" :tooltip="tooltip" />

    <TextInput
      v-bind="$attrs"
      v-model="val"
      class="unnnic-form-input"
      :forceActiveStatus="forceActiveStatus"
      :placeholder="placeholder"
      :iconLeft="iconLeft"
      :iconRight="iconRight"
      :type="type"
      :iconLeftClickable="iconLeftClickable"
      :iconRightClickable="iconRightClickable"
      :hasCloudyColor="hasCloudyColor"
      :size="size"
      :mask="mask"
      :nativeType="nativeType"
      :maxlength="maxlength"
      :disabled="disabled"
      :readonly="readonly"
    />

    <section class="unnnic-form__hints-container">
      <section class="unnnic-form__message-container">
        <p
          v-if="message"
          class="unnnic-form__message"
        >
          {{ fullySanitize(message) }}
        </p>
        <p v-if="!!errors.length" class="unnnic-form__message error">
          {{ Array.isArray(errors) ? errors.join(', ') : errors }}
        </p>
      </section>
      <p v-if="maxlength && showMaxlengthCounter">
        {{ (val || '').length }} / {{ maxlength }}
      </p>
    </section>
  </div>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
import TextInput from './TextInput.vue';
import UnnnicLabel from '../Label/Label.vue';

export default {
  name: 'UnnnicInput',
  components: { TextInput, UnnnicLabel },
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
  },
  emits: ['update:modelValue'],
  data() {
    return {
      val: this.modelValue,
    };
  },
  computed: {
    hasLabelSlot() {
      return !!this.$slots.label;
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
@use '@/assets/scss/unnnic' as *;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.unnnic-form {
  position: relative;

  &__message {
    &.error {
      color: $unnnic-color-fg-critical;
    }
  }

  &__label {
    margin-bottom: $unnnic-space-1;
  }

  &__hints-container {
    display: flex;
    justify-content: space-between;
    margin-top: $unnnic-space-1;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }

  &__message-container {
    display: flex;
    flex-direction: column;
    gap: $unnnic-space-1;
  }
}
</style>
