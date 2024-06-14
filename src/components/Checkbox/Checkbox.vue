<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="unnnic-checkbox-wrapper">
    <UnnnicIcon
      class="unnnic-checkbox"
      :class="{ disabled }"
      :icon="icon"
      :scheme="color"
      :clickable="!disabled"
      :size="size"
      @click="click"
    />

    <div
      v-if="textRight"
      :class="[
        'unnnic-checkbox__label',
        'unnnic-checkbox__label__right',
        `unnnic-checkbox__label__${size}`,
      ]"
    >
      {{ textRight }}
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },
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

    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['md', 'sm'].includes(value);
      },
    },
    textRight: {
      type: String,
      default: null,
    },
  },

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

    icon() {
      return {
        checked: 'checkbox-select',
        default: this.disabled ? 'checkbox-disable' : 'checkbox-default',
        less: 'checkbox-less',
      }[this.valueName];
    },

    color() {
      if (this.valueName === 'default') {
        return 'neutral-clean';
      }

      return 'brand-weni';
    },
  },

  methods: {
    click() {
      const isChecked = ['checked', 'less'].includes(this.valueName);
      this.$emit('change', !isChecked);
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-checkbox-wrapper {
  display: flex;
  align-items: flex-start;
  cursor: pointer;
}

.unnnic-checkbox {
  &.disabled {
    :deep(.primary) {
      fill: $unnnic-color-neutral-cleanest;
    }
  }
}

.unnnic-checkbox__label {
  font-family: $unnnic-font-family-secondary;
  font-weight: $unnnic-font-weight-regular;
  color: $unnnic-color-neutral-darkest;

  &__sm {
    margin-left: $unnnic-inline-nano;
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
  }

  &__md {
    margin-left: $unnnic-inline-xs;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }
}
</style>
