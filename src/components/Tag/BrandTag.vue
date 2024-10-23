<template>
  <div
    :class="{
      'unnnic-brand-tag': true,
      'unnnic-brand-tag--disabled': !disabled,
      'unnnic-brand-tag--clickable': clickable,
    }"
  >
    <span class="unnnic-brand-tag__label">{{ text }}</span>
    <UnnnicIcon
      :icon="disabled ? 'close-1' : 'add-1'"
      :scheme="disabled ? 'neutral-snow' : 'brand-weni-dark'"
      class="unnnic-brand-tag__icon"
      size="xs"
    />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicBrandTag',
  components: {
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    closeClicked() {
      if (!this.closeClicked) return;
      this.$emit('close-click');
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-brand-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-border-radius-pill;
  border: 1px solid $unnnic-color-brand-weni-soft;
  height: 1.875 * $unnnic-font-size;
  white-space: nowrap;
  transition: 0.2s;

  color: $unnnic-color-neutral-snow;
  background-color: $unnnic-color-brand-weni-dark;
  &:hover {
    background-color: $unnnic-color-brand-weni-soft;
  }

  &--disabled {
    color: $unnnic-color-brand-weni-dark;
    background-color: $unnnic-color-background-snow;
    &:hover {
      background-color: rgba(
        $unnnic-color-brand-weni,
        $unnnic-opacity-level-extra-light
      );
    }
  }
  &--clickable {
    cursor: pointer;
  }

  &__label {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
    padding: $unnnic-spacing-stack-nano $unnnic-inline-ant;
  }

  &__icon {
    margin-right: $unnnic-inline-ant;
    cursor: pointer;
  }
}
</style>
