<template>
  <div :class="{
    'unnnic-form': true,
    'unnnic-form--error': type === 'error'
    }">
    <base-input
        v-bind="attributes"
        :key="true"
        :hasIconLeft="iconLeft != null"
        :hasIconRight="hasIconRight"
        :type="type"
        :nativeType="showPassword ? 'text' : 'password'"
        :size="size"
        v-model="val"
      />
      <UIcon
        v-if="iconLeft"
        :icon="iconLeft"
        class="icon-left"
        :size="iconSize"
        @click="onIconLeftClick" />
      <UIcon
        v-if="hasIconRight"
        :icon="iconToShowRight"
        class="icon-right"
        :size="iconSize"
        :clickable="iconRightClickable || allowTogglePassword"
        @click="onIconRightClick" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import BaseInput from './BaseInput.vue';

export default {
  name: 'unnnic-input',
  components: { UIcon, BaseInput },
  data() {
    return {
      showPassword: false,
      val: null,
    };
  },
  props: {
    type: {
      type: String,
      default: 'normal',
      validator(value) {
        return ['normal', 'error'].indexOf(value) !== -1;
      },
    },
    value: {
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
    size: {
      type: String,
      default: 'md',
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
      this.$emit('input', this.val);
    },
  },
  mounted() {
    this.val = this.value;
  },
  methods: {
    onIconLeftClick() {
      if (this.attributes.disabled || !this.iconLeftClickable) return;
      this.$emit('icon-leftt-click');
    },
    onIconRightClick() {
      if (this.attributes.disabled) return;
      if (this.allowTogglePassword) this.showPassword = !this.showPassword;
      else if (this.iconRightClickable) this.$emit('icon-right-click');
    },
  },
  computed: {
    iconSize() {
      if (this.size === 'md') return 'sm';
      if (this.size === 'sm') return 'xs';
      return 'sm';
    },
    hasIconRight() {
      return this.allowTogglePassword || this.iconRight != null;
    },
    iconToShowRight() {
      if (this.allowTogglePassword) {
        return this.showPassword ? 'view-off-1' : 'view-1-1';
      }

      return this.iconRight;
    },
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form {

    &:focus-within .icon{
    color: $unnnic-color-brand-weni;
  }

    &--error {
      color: $unnnic-color-feedback-red !important;

      .unnnic-icon {
        color: $unnnic-color-feedback-red !important;
      }
    }
}

.unnnic-icon {
  color: $unnnic-color-neutral-clean;
}

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
    top: 0;
  }
}

</style>
