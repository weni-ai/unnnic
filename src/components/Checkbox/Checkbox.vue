<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <section class="unnnic-checkbox-wrapper">
    <label>
      <input
        :class="[
          'unnnic-checkbox',
          { 'unnnic-checkbox--less': modelValue === 'less' },
        ]"
        type="checkbox"
        :disabled="disabled"
        :checked="modelValue === 'less' || modelValue"
        @change="click"
        v-bind="pick($attrs, ['id', 'name'])"
      />

      <p
        v-if="label || textRight"
        :class="[
          'unnnic-checkbox__label',
          { 'unnnic-checkbox__label--disabled': disabled },
        ]"
        data-testid="checkbox-text-right"
      >
        {{ label || textRight }}
      </p>
    </label>

    <p
      v-if="helper"
      class="unnnic-checkbox__helper"
    >
      {{ helper }}
    </p>
  </section>
</template>

<script>
import { pick } from 'lodash';

export default {
  model: {
    event: 'change',
  },

  props: {
    modelValue: {
      type: [Boolean, String],
      default: false,
      validator(value) {
        return [true, false, 'less'].includes(value);
      },
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },

    helper: {
      type: String,
      default: '',
    },

    textRight: {
      type: String,
      default: '',
    },
  },
  emits: ['change', 'update:model-value'],

  computed: {
    valueName() {
      if (this.modelValue === true) {
        return 'checked';
      }
      if (this.modelValue === false) {
        return 'default';
      }

      return 'less';
    },
  },

  methods: {
    pick,

    click() {
      const isChecked = ['checked', 'less'].includes(this.valueName);
      this.$emit('change', !isChecked);
      this.$emit('update:model-value', !isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

$checkbox-size: 21px;

.unnnic-checkbox-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

label {
  display: flex;
  align-items: center;
  column-gap: $unnnic-space-2;
}

.unnnic-checkbox {
  appearance: none;
  width: $checkbox-size;
  height: $checkbox-size;
  margin: 0;
  background-color: $unnnic-color-bg-base;
  border: 1px solid $unnnic-color-border-base;
  border-radius: $unnnic-radius-1;
  box-sizing: border-box;

  outline: none;

  &:checked {
    border-width: 0;
    background-color: $unnnic-color-bg-active;
    background-image: url('../../assets/icons/checkbox-checked.svg');
    background-repeat: no-repeat;
    background-position: center;

    &.unnnic-checkbox--less {
      background-image: url('../../assets/icons/checkbox-less.svg');
    }
  }

  &:disabled, &:disabled:checked {
    background-color: $unnnic-color-bg-muted;
    border: 1px solid $unnnic-color-border-muted;
  }

  &:disabled:checked {
    background-image: url('../../assets/icons/checkbox-checked-disabled.svg');

    &.unnnic-checkbox--less {
      background-image: url('../../assets/icons/checkbox-less-disabled.svg');
    }
  }
}

.unnnic-checkbox__label {
  margin: 0;
  font: $unnnic-font-body;
  color: $unnnic-color-fg-emphasized;

  &--disabled {
    color: $unnnic-color-fg-muted;
  }
}

.unnnic-checkbox__helper {
  margin: 0;
  margin-left: $checkbox-size + $unnnic-space-2;
  font: $unnnic-font-caption-2;
  color: $unnnic-color-fg-base;
}
</style>
