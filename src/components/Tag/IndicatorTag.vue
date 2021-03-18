<template>
  <div
    :class="`unnnic-tag
        ${clickable ? 'unnnic-tag--clickable' : ''}`"
  >
    <span class="unnnic-tag__count">{{ count }}</span>
    <span class="unnnic-tag__label">{{ text }}</span>
    <u-icon
      icon="arrow-right-1-1"
      class="unnnic-tag__icon"
      size="xs"
    />
  </div>
</template>

<script>
import UIcon from '../Icon.vue';

export default {
  name: 'unnnic-tag',
  components: { UIcon },
  props: {
    text: {
      type: String,
      default: null,
    },
    count: {
      type: Number,
      default: 0,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: $unnnic-border-radius-sm;
  background-color: $unnnic-color-background-sky;
  padding: $unnnic-inset-nano;
  border: $unnnic-border-width-thinner solid $unnnic-color-background-sky;

  &:hover {
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
  }

  &--clickable {
    cursor: pointer;
  }

  &__count {
    background-color: $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-sm;
    padding: 0 $unnnic-inline-nano;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
    color: $unnnic-color-neutral-darkest;
  }

  &__label {
    padding: 0 $unnnic-inline-xs;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);
    color: $unnnic-color-neutral-darkest;
  }

  &__icon {
    color: $unnnic-color-neutral-darkest;
    padding-right: $unnnic-inline-ant;
  }
}
</style>
