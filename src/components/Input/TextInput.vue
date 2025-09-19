<template>
  <div
    :class="[
      'text-input',
      `size--${size}`,
      `text-input--icon-right-size-${iconRightSize}`,
    ]"
  >
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
      :maxlength="maxlength"
      @focus="onFocus"
      @blur="onBlur"
    />

    <UnnnicIcon
      v-if="iconLeft"
      :scheme="iconScheme"
      :icon="iconLeft"
      :size="iconLeftSize"
      :clickable="iconLeftClickable"
      :class="['icon-left', { clickable: iconLeftClickable }]"
      @click="onIconLeftClick"
    />

    <UnnnicIcon
      v-if="iconRightSvg"
      :scheme="iconScheme"
      :icon="iconRightSvg"
      :size="iconRightSize"
      :clickable="iconRightClickable || allowTogglePassword"
      :class="[
        'icon-right',
        { clickable: iconRightClickable || allowTogglePassword },
      ]"
      @click="onIconRightClick"
    />
  </div>
</template>

<script>
import BaseInput from './BaseInput.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    BaseInput,
    UnnnicIcon,
  },
  props: {
    placeholder: {
      type: String,
      default: null,
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
      default: '',
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
    iconRightSize: {
      type: String,
      default: 'ant',
    },
    iconLeftSize: {
      type: String,
      default: 'ant',
    },
    allowTogglePassword: {
      type: Boolean,
      default: null,
    },
    hasCloudyColor: {
      type: Boolean,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
    },
    maxlength: {
      type: Number,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['icon-left-click', 'icon-right-click'],
  data() {
    return {
      isFocused: false,
      showPassword: false,
    };
  },
  computed: {
    isDisabled() {
      return this.$attrs.disabled || this.disabled;
    },

    iconRightSvg() {
      if (this.allowTogglePassword) {
        return this.showPassword ? 'view-off-1' : 'view-1-1';
      }

      return this.iconRight;
    },

    iconScheme() {
      if (this.type === 'error') {
        return 'fg-critical';
      }

      if (this.isDisabled) {
        return 'fg-muted';
      }

      if (this.modelValue || this.isFocused) {
        return 'color-gray-700';
      }

      if (this.hasCloudyColor) {
        return 'fg-base';
      }

      return 'fg-base';
    },

    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'], ...this.$props };
    },
  },

  methods: {
    focus() {
      this.$refs['base-input'].$el.focus();
    },

    onFocus() {
      this.isFocused = true;
    },

    onBlur() {
      this.isFocused = false;
    },

    onIconLeftClick() {
      if (this.iconLeftClickable) this.$emit('icon-left-click');
    },

    onIconRightClick() {
      if (this.attributes.disabled) return;
      if (this.allowTogglePassword) this.showPassword = !this.showPassword;
      else if (this.iconRightClickable) this.$emit('icon-right-click');
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.icon {
  &-left,
  &-right {
    &:not(.clickable) {
      pointer-events: none;
    }
  }

  &-left {
    position: absolute;
    top: 14px; // TODO: 12.5px
    left: $unnnic-space-4;
  }

  &-right {
    position: absolute;
    top: 14px; // TODO: 12.5px
    right: $unnnic-space-4;
  }
}
.text-input {
  position: relative;

  &.size--sm {
    .icon-left,
    .icon-right {
      top: 10px;
    }
  }

  &.size--sm.text-input--icon-right-size-ant .icon-right {
    top: 10px;
  }

  &.size--md.text-input--icon-right-size-ant .icon-right {
    top: 13px;
  }
}
</style>
