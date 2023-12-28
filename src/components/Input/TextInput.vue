<template>
  <div
    :class="['text-input', `size--${size}`, {
      'has-icon-left': !!iconLeft,
      'has-icon-right': !!iconRight || allowTogglePassword,
    }]"
  >
    <base-input
      v-bind="attributes"
      :size="size"
      ref="base-input"
      :model-value="modelValue"
      :native-type="nativeType === 'password' && showPassword ? 'text' : nativeType"
      :type="type"
      @focus="onFocus"
      @blur="onBlur"
      class="input-itself"
    />

    <unnnic-icon
      v-if="iconLeft"
      :scheme="iconScheme"
      :icon="iconLeft"
      size="sm"
      :clickable="iconLeftClickable"
      @click="onIconLeftClick"
      :class="['icon-left', { 'clickable': iconLeftClickable }]"
    />

    <unnnic-icon
      v-if="iconRightSvg"
      :scheme="iconScheme"
      :icon="iconRightSvg"
      size="sm"
      :clickable="iconRightClickable || allowTogglePassword"
      @click="onIconRightClick"
      :class="[
        'icon-right',
        { 'clickable': iconRightClickable || allowTogglePassword }
      ]"
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
  data() {
    return {
      isFocused: false,
      isDisabled: false,
      showPassword: false,
    };
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
    allowTogglePassword: {
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
  },
  computed: {
    iconRightSvg() {
      if (this.allowTogglePassword) {
        return this.showPassword ? 'view-off-1' : 'view-1-1';
      }

      return this.iconRight;
    },

    iconScheme() {
      if (this.type === 'error') {
        return 'feedback-red';
      }

      if (this.isDisabled) {
        return 'neutral-cleanest';
      }

      if (this.modelValue || this.isFocused) {
        return 'neutral-dark';
      }

      if (this.hasCloudyColor) {
        return 'neutral-cloudy';
      }

      return 'neutral-cloudy';
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
  mounted() {
    this.isDisabled = !!this.$refs['base-input'].$el.disabled;
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.icon {
  &-left, &-right {
    &:not(.clickable) {
      pointer-events: none;
    }
  }

  &-left {
    position: absolute;
    top: $unnnic-spacing-ant + 0.1875 * $unnnic-font-size;
    left: $unnnic-inline-sm;
  }

  &-right {
    position: absolute;
    top: $unnnic-spacing-ant + 0.1875 * $unnnic-font-size;
    right: $unnnic-inline-sm;
  }
}
.text-input {
  position: relative;

  &.size--md, &.size--sm {
    &.has-icon-left .input-itself {
      padding-left: $unnnic-spacing-sm + $unnnic-icon-size-sm + $unnnic-spacing-xs;
    }

    &.has-icon-right .input-itself {
      padding-right: $unnnic-spacing-sm + $unnnic-icon-size-sm + $unnnic-spacing-xs;
    }
  }

  &.size--sm {
    .icon-left, .icon-right {
      top: $unnnic-spacing-xs + 0.125 * $unnnic-font-size;
    }
  }
}
</style>
