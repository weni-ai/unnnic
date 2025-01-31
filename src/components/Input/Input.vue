<template>
  <div :class="['unnnic-form', size]">
    <p
      v-if="hasLabelSlot"
      class="unnnic-form__label"
    >
      <slot name="label" />
    </p>

    <p
      v-else-if="sanitizedLabel"
      class="unnnic-form__label"
    >
      {{ sanitizedLabel }}
    </p>

    <TextInput
      v-bind="$attrs"
      v-model="val"
      class="unnnic-form-input"
      :placeholder="sanitizedPlaceholder"
      :iconLeft="sanitizedIconLeft"
      :iconRight="sanitizedIconRight"
      :type="type"
      :iconLeftClickable="iconLeftClickable"
      :iconRightClickable="iconRightClickable"
      :hasCloudyColor="hasCloudyColor"
      :size="size"
      :mask="sanitizedMask"
      :nativeType="sanitizedNativeType"
    />

    <p
      v-if="sanitizedMessage"
      class="unnnic-form__message"
    >
      {{ sanitizedMessage }}
    </p>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';
import { sanitizeHtml } from '../../utils/sanitize';

export default {
  name: 'UnnnicInput',
  components: { TextInput },
  props: {
    placeholder: {
      type: String,
      default: '',
    },
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].includes(value);
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
      default: null,
    },
    label: {
      type: String,
      default: null,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    iconLeftClickable: {
      type: Boolean,
      default: null,
    },
    iconRightClickable: {
      type: Boolean,
      default: null,
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
    sanitizedPlaceholder() {
      return sanitizeHtml(this.placeholder, [], 100);
    },
    sanitizedMessage() {
      return sanitizeHtml(this.message, [], 200);
    },
    sanitizedLabel() {
      return sanitizeHtml(this.label, [], 100);
    },
    sanitizedIconLeft() {
      return sanitizeHtml(this.iconLeft, [], 50);
    },
    sanitizedIconRight() {
      return sanitizeHtml(this.iconRight, [], 50);
    },
    sanitizedMask() {
      if (Array.isArray(this.mask)) {
        return this.mask.map((m) => sanitizeHtml(m, [], 50));
      }
      return sanitizeHtml(this.mask, [], 50);
    },
    sanitizedNativeType() {
      return ['text', 'password', 'email', 'number'].includes(this.nativeType)
        ? this.nativeType
        : 'text';
    },
  },
  watch: {
    val() {
      this.$emit('update:modelValue', this.val);
    },
    modelValue() {
      this.val = this.modelValue;
    },
  },
  mounted() {
    this.val = this.modelValue;
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form {
  font-family: $unnnic-font-family-secondary;
  position: relative;

  &__message {
    font-size: $unnnic-font-size-body-md;
    margin: $unnnic-spacing-stack-nano 0;
    color: $unnnic-color-feedback-red;
  }

  &__label {
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    font-size: $unnnic-font-size-body-gt;
    color: $unnnic-color-neutral-cloudy;
    margin: $unnnic-spacing-stack-xs 0;
  }

  &.sm &__label {
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  }
}
</style>
