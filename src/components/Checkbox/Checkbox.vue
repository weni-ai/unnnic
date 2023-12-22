<template>
  <div class="unnnic-checkbox-wrapper">
    <unnnic-icon-svg
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
import unnnicIconSvg from '../Icon.vue';

export default {
  model: {
    event: 'change',
  },

  props: {
    value: {
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

  components: {
    unnnicIconSvg,
  },

  computed: {
    valueName() {
      if (this.value === true) {
        return 'checked';
      }
      if (this.value === false) {
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
      if (this.valueName === 'checked') {
        this.$emit('change', false);
      } else {
        this.$emit('change', true);
      }
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
      fill: $unnnic-color-neutral-soft;
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
