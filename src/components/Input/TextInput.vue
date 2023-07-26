<template>
  <div :style="{ position: 'relative' }">
    <base-input
      ref="base-input"
      :value="value"
      v-bind="attributes"
      :hasIconLeft="!!iconLeft"
      :hasIconRight="!!iconRight"
      :native-type="nativeType === 'password' && showPassword ? 'text' : nativeType"
      :type="type"
      :size="size"
      v-on="inputListeners"
      @focus="onFocus"
      @blur="onBlur"
    />

    <unnnic-icon
      v-if="iconLeft"
      :scheme="iconScheme"
      :icon="iconLeft"
      :size="iconSize"
      :clickable="iconLeftClickable"
      @click="onIconLeftClick"
      class="icon-left"
    />

    <unnnic-icon
      v-if="iconRightSvg"
      :scheme="iconScheme"
      :icon="iconRightSvg"
      :size="iconSize"
      :clickable="iconRightClickable || allowTogglePassword"
      @click="onIconRightClick"
      class="icon-right"
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
    value: {
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

      if (this.value || this.isFocused) {
        return 'neutral-dark';
      }

      if (this.isDisabled) {
        return 'neutral-cleanest';
      }

      if (this.hasCloudyColor) {
        return 'neutral-cloudy';
      }

      return 'neutral-cloudy';
    },

    inputListeners() {
      return {
        ...this.$listeners,
        input: (event) => {
          this.$emit('input', event);
        },
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'], ...this.$props };
    },
    iconSize() {
      if (this.size === 'md') return 'sm';
      if (this.size === 'sm') return 'xs';
      return 'sm';
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
  &-left {
    position: absolute;
    transform: translateY(100%);
    left: $unnnic-inline-sm;
  }

  &-right {
    position: absolute;
    transform: translateY(100%);
    right: $unnnic-inline-sm;
  }
}
</style>
