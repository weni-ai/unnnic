<template>
  <div :class="['unnnic-form', size]">
    <p v-if="hasLabelSlot" class="unnnic-form__label">
      <slot name="label" />
    </p>

    <p v-else-if="label" class="unnnic-form__label">{{ label }}</p>

    <text-input
      :v-bind="$attrs"
      v-model="val"
      class="unnnic-form-input"
      :placeholder="placeholder"
      :icon-left="iconLeft"
      :icon-right="iconRight"
      :allow-toggle-password="allowTogglePassword"
      :type="type"
      :icon-left-clickable="iconLeftClickable"
      :icon-right-clickable="iconRightClickable"
      :has-cloudy-color="hasCloudyColor"
      :size="size"
      :mask="mask"
      :native-type="nativeType"
    />

    <p v-if="message" class="unnnic-form__message">{{ message }}</p>
  </div>
</template>

<script>
import TextInput from './TextInput.vue';

export default {
  name: 'unnnic-input',
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
    allowTogglePassword: {
      type: Boolean,
      default: false,
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
  data() {
    return {
      val: this.modelValue,
    };
  },
  watch: {
    val() {
      this.$emit('update:model-value', this.val);
    },
    modelValue() {
      this.val = this.modelValue;
    },
  },
  mounted() {
    this.val = this.modelValue;
  },
  computed: {
    hasLabelSlot() {
      return !!this.$slots.label;
    },
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
