<template>
  <div :class="['unnnic-form', size]">
    <p
      v-if="hasLabelSlot"
      class="unnnic-form__label"
    >
      <slot name="label" />
    </p>
    <section 
      v-else-if="label"
      class="unnnic-form__label"
    >
      <p>
        {{ fullySanitize(label) }}
      </p>
      <UnnnicToolTip v-if="tooltip" enabled :text="tooltip">
        <UnnnicIcon icon="help" size="sm" scheme="fg-base" />
      </UnnnicToolTip>
    </section>
    

    <TextInput
      v-bind="$attrs"
      v-model="val"
      class="unnnic-form-input"
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
    />

    <section class="unnnic-form__hints-container">
      <p
        v-if="message"
        class="unnnic-form__message"
        :class="{ error: type === 'error' }"
      >
        {{ fullySanitize(message) }}
      </p>
      <p v-if="maxlength && showMaxlengthCounter">
        {{ (val || '').length }} / {{ maxlength }}
      </p>
    </section>
  </div>
</template>

<script>
import { fullySanitize } from '../../utils/sanitize';
import TextInput from './TextInput.vue';
import UnnnicToolTip from '../ToolTip/ToolTip.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicInput',
  components: { TextInput, UnnnicToolTip, UnnnicIcon },
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
    tooltip: {
      type: String,
      default: null,
    },
    maxlength: {
      type: Number,
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
    font: $unnnic-font-body;
    color: $unnnic-color-neutral-cloudy;
    margin-bottom: $unnnic-space-1;
    display: flex;
    align-items: center;
    gap: $unnnic-space-2;

    :deep(.unnnic-tooltip) {
      display: flex;
    }
  }

  &__hints-container {
    display: flex;
    justify-content: space-between;
    margin-top: $unnnic-space-1;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }
}
</style>
