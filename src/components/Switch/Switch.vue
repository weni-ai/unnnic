<template>
  <div class="unnnic-switch-wrapper">
    <label>
      <input
        class="unnnic-switch"
        type="checkbox"
        :disabled="disabled"
        :checked="modelValue"
        @change="toggleState"
        v-bind="pick($attrs, ['id', 'name'])"
      />

      <p
        v-if="label || textLeft || textRight"
        :class="[
          'unnnic-switch__label',
          { 'unnnic-switch__label--disabled': disabled },
        ]"
        data-testid="switch-label"
      >
        {{ label }}
        {{ textLeft }}
        {{ textRight }}
      </p>
    </label>

    <p
      v-if="helper"
      class="unnnic-switch__helper"
    >
      {{ helper }}
    </p>
  </div>
</template>

<script>
import { pick } from 'lodash';

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

    label: {
      type: String,
      default: '',
    },

    helper: {
      type: String,
      default: '',
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

  watch: {
    modelValue: {
      immediate: true,
      handler() {
        this.isActive = this.modelValue;
      },
    },
  },

  methods: {
    pick,

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

$switch-width: 38px;
$switch-height: 21px;

.unnnic-switch-wrapper {
  display: flex;
  flex-direction: column;

  label {
    display: flex;
    align-items: center;
    column-gap: $unnnic-space-2;
  }
}

.unnnic-switch {
  appearance: none;
  width: $switch-width;
  height: $switch-height;
  margin: 0;
  background-color: $unnnic-color-bg-muted;
  border-radius: $unnnic-radius-3;
  box-sizing: border-box;
  outline: none;

  background-image: url('@/assets/icons/switch-checked.svg');
  background-repeat: no-repeat;
  background-position: 2px center;

  transition: 200ms linear background-position, 200ms linear background-color;

  &:checked {
    background-color: $unnnic-color-bg-active;
    background-position: 20px center;
  }

  &:disabled {
    background-color: $unnnic-color-bg-muted;
    background-image: url('@/assets/icons/switch-checked-disabled.svg');
  }

  &__label {
    margin: 0;
    font: $unnnic-font-body;
    color: $unnnic-color-fg-emphasized;

    &--disabled {
      color: $unnnic-color-fg-muted;
    }
  }

  &__helper {
    margin: 0;
    margin-left: $switch-width + $unnnic-space-2;
    font: $unnnic-font-caption-2;
    color: $unnnic-color-fg-base;
  }
}
</style>
