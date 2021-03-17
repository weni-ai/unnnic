<template>
  <unnnic-icon-svg
    class="unnnic-checkbox"
    :icon="icon"
    :scheme="color"
    :disabled="disabled"
    :clickable="!disabled"
    :size="size"
    @click="click"
  />
</template>

<script>
import unnnicIconSvg from '../Icon-svg.vue';

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
  },

  components: {
    unnnicIconSvg,
  },

  computed: {
    valueName() {
      if (this.value === true) {
        return 'checked';
      } if (this.value === false) {
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
@import "../../assets/scss/unnnic.scss";

.unnnic-checkbox {
  &[disabled] {
    ::v-deep .primary {
      fill: $unnnic-color-brand-sec;
    }
  }
}
</style>
