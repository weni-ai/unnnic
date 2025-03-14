<template>
  <div class="unnnic-switch">
    <div
      v-if="textLeft"
      data-test-id="switch-text-left"
      :class="[
        'unnnic-switch__label',
        'unnnic-switch__label__left',
        `unnnic-switch__label__${size}`,
      ]"
    >
      {{ textLeft }}
    </div>

    <UnnnicIcon
      :class="{ 'unnnic-switch__icon': true, active: isActive }"
      :icon="currentIcon"
      :size="iconSize"
      :scheme="iconScheme"
      :lineHeight="iconLineHeight"
      :disabled="disabled"
      :clickable="!disabled"
      data-test-id="switch-icon"
      @click="toggleState"
    />

    <div
      v-if="textRight"
      data-test-id="switch-text-right"
      :class="[
        'unnnic-switch__label',
        'unnnic-switch__label__right',
        `unnnic-switch__label__${size}`,
      ]"
    >
      {{ textRight }}
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicSwitch',
  components: { UnnnicIcon },
  props: {
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium'].indexOf(value) !== -1;
      },
    },
    textLeft: {
      type: String,
      default: '',
    },
    textRight: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: Boolean,
      default: false,
    },
    useVModel: {
      type: Boolean,
    },
  },
  emits: ['update:model-value'],
  data() {
    return {
      isActive: false,
    };
  },
  computed: {
    currentIcon() {
      if (this.disabled) {
        return this.isActive
          ? 'switch-selected-disabled'
          : 'switch-default-disabled';
      }

      return 'switch-default';
    },

    iconSize() {
      return this.size === 'small' ? 'sm' : 'md';
    },

    iconScheme() {
      if (this.disabled) {
        return 'neutral-soft';
      }

      return this.isActive === false ? 'neutral-soft' : 'brand-weni';
    },

    iconLineHeight() {
      return this.size === 'small' ? 'sm' : '';
    },
  },

  watch: {
    modelValue: {
      immediate: true,
      handler() {
        this.isActive = this.modelValue;
      },
    },
  },

  methods: {
    toggleState() {
      if (!this.disabled) {
        if (this.useVModel) {
          this.$emit('update:model-value', !this.isActive);
        } else {
          this.isActive = !this.isActive;
          this.$emit('update:model-value', this.isActive);
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-switch {
  display: flex;
  flex-direction: row;

  &__label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;

    margin: $unnnic-spacing-stack-nano 0;
    margin-right: $unnnic-inline-nano;

    &__small {
      font-size: $unnnic-font-size-body-md;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
    }

    &__medium {
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    }
  }

  &__icon {
    align-self: center;
    margin: $unnnic-spacing-stack-nano $unnnic-inline-nano;

    :deep(#default-circle) {
      transition: 0.2s linear transform;
    }

    &.active {
      :deep(#default-circle) {
        transform: translateX(45%);
      }
    }
  }
}

.unnnic-icon__size {
  &--md {
    width: 3 * $unnnic-font-size;
  }
  &--sm {
    width: 2 * $unnnic-font-size;
  }
}
</style>
