<template>
  <section class="unnnic-switch">
    <UnnnicLabel
      v-if="label"
      :label="label"
      :tooltip="labelTooltip"
      :useHtmlTooltip="labelUseHtmlTooltip"
      class="unnnic-switch__label"
    />

    <label
      :class="[
        'unnnic-switch__input-wrapper',
        { 'unnnic-switch__input-wrapper--disabled': disabled },
      ]"
    >
      <input
        class="unnnic-switch__input"
        type="checkbox"
        :disabled="disabled"
        :checked="modelValue"
        v-bind="pick($attrs, ['id', 'name'])"
        @change="toggleState"
      />

      <p
        v-if="option || textLeft || textRight"
        :class="[
          'unnnic-switch__option',
          { 'unnnic-switch__option--disabled': disabled },
        ]"
        data-testid="switch-option"
      >
        {{ option }}
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
  </section>
</template>

<script>
import { pick } from 'lodash';
import UnnnicLabel from '../Label/Label.vue';

export default {
  name: 'UnnnicSwitch',
  components: {
    UnnnicLabel,
  },
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

    labelTooltip: {
      type: String,
      default: '',
    },

    labelUseHtmlTooltip: {
      type: Boolean,
      default: false,
    },

    option: {
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
$switch-height: 20px;

.unnnic-switch {
  display: flex;
  flex-direction: column;

  &__input-wrapper {
    width: fit-content;

    display: flex;
    align-items: center;
    column-gap: $unnnic-space-2;

    cursor: pointer;

    &--disabled {
      cursor: not-allowed;
    }
  }

  &__input {
    appearance: none;
    width: $switch-width;
    min-width: $switch-width;
    height: $switch-height;
    margin: 0;
    background-color: $unnnic-color-bg-muted;
    border-radius: $unnnic-radius-3;
    box-sizing: border-box;
    outline: none;

    background-image: url('@/assets/icons/switch-checked.svg');
    background-repeat: no-repeat;
    background-position: 4px center;

    transition:
      120ms linear background-position,
      120ms linear background-color;

    cursor: pointer;

    &:checked {
      background-color: $unnnic-color-bg-active;
      background-position: 20px center;
    }

    &:disabled {
      background-color: $unnnic-color-bg-muted;
      background-image: url('@/assets/icons/switch-checked-disabled.svg');

      cursor: not-allowed;
    }
  }

  &__label {
    margin-bottom: $unnnic-space-3;
  }

  &__option {
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
