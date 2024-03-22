<template>
  <div
    @click="click"
    :class="[
      'unnnic-radio-container',
      `unnnic-radio-container--${size}`,
      disabled ? 'disabled' : null,
    ]"
  >
    <unnnic-icon-svg
      class="unnnic-radio"
      :icon="icon"
      :scheme="color"
      :size="size"
    />

    <span class="label">
      <slot/>
    </span>
  </div>
</template>

<script>
import unnnicIconSvg from '../Icon.vue';

export default {
  model: {
    prop: 'globalValue',
    event: 'change',
  },

  props: {
    value: {
      type: [String, Number],
    },

    globalValue: {
      type: [String, Number],
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
      return this.globalValue === this.value
        ? 'selected'
        : 'default';
    },

    icon() {
      return {
        selected: 'radio-selected',
        default: this.disabled ? 'radio-disable' : 'radio-default',
      }[this.valueName];
    },

    color() {
      if (this.disabled) {
        return 'brand-sec';
      }

      return this.valueName === 'selected'
        ? 'brand-weni'
        : 'neutral-cleanest';
    },
  },

  methods: {
    click() {
      if (!this.disabled) {
        this.$emit('change', this.value);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-radio-container {
  display: inline-flex;
  align-items: center;

  &:not(.disabled) {
    cursor: pointer;
  }

  &--sm .unnnic-radio {
    margin: $unnnic-spacing-stack-nano $unnnic-spacing-inline-nano;
  }

  &--md .unnnic-radio {
    margin: $unnnic-spacing-stack-nano 0;
    margin-left: $unnnic-spacing-inline-nano;
    margin-right: $unnnic-spacing-inline-xs;
  }

  .label {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;
    margin: $unnnic-spacing-stack-nano 0;
    margin-right: $unnnic-spacing-inline-nano;
  }

  &--sm .label {
    font-size: $unnnic-font-size-body-md;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-md;
  }

  &--md .label {
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
  }
}
</style>
