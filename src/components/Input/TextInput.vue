<template>
  <div :class="{
    'unnnic-form': true,
    'unnnic-form--error': type === 'error',
    'has-icon': iconLeft || iconRight,
    }">
      <base-input
        v-model="val"
        v-bind="attributes"
        :hasIconLeft="iconLeft != null"
        :hasIconRight="iconRight != null"
        :type="type"
        :size="size"
        v-on="inputListeners"
      />
      <u-icon
        v-if="iconLeft"
        :icon="iconLeft"
        :clickable="iconLeftClickable"
        class="icon-left"
        :size="iconSize"
        @click="iconRightClicked" />
      <u-icon
        v-if="iconRight"
        :icon="iconRight"
        :clickable="iconRightClickable"
        class="icon-right"
        :size="iconSize"
        @click="iconRightClicked" />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';
import BaseInput from './BaseInput.vue';

export default {
  name: 'unnnic-input',
  components: {
    UIcon,
    BaseInput,
  },
  data() {
    return {
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
    size: {
      type: String,
      default: 'md',
    },
  },
  mounted() {
    this.val = this.value;
  },
  computed: {
    inputListeners() {
      return {
        ...this.$listeners,
        input: () => {},
      };
    },
    attributes() {
      return { ...this.$attrs, ...this.$attrs['v-bind'] };
    },
    iconSize() {
      if (this.size === 'md') return 'sm';
      if (this.size === 'sm') return 'xs';
      return 'sm';
    },
  },
  methods: {
    iconRightClicked() {
      if (!this.iconRightClickable) return;
      this.$emit('icon-right-click');
    },
    iconLeftClicked() {
      if (!this.iconLeftClickable) return;
      this.$emit('icon-left-click');
    },
  },
  watch: {
    val() {
      this.$emit('input', this.val);
    },
    value() {
      this.val = this.value;
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-form {

  &:focus-within .icon, &:focus-within .unnnic-icon {
    color: $unnnic-color-brand-weni;
  }

  &--error {
    color: $unnnic-color-feedback-red;

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
