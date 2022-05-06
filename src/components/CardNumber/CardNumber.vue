<template>
  <div :class="['unnnic-card-number', { 'v-full': fullSize }]">
    <h4>{{ description }}</h4>
    <span>{{ number }}</span>
  </div>
</template>

<script>
export default {
  props: {
    description: {
      type: String,
      default: '',
    },

    number: {
      type: String,
      default: '',
    },

    fullSize: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-card-number {
  background-color: $unnnic-color-background-carpet;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-inset-sm;
  font-family: $unnnic-font-family-secondary;

  width: 100%;
  max-width: 179px;

  &.v-full {
    max-width: unset;
  }

  h4 {
    margin: 0 0 $unnnic-spacing-stack-xs 0;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;

    color: $unnnic-color-neutral-cloudy;
  }

  span {
    font-weight: $unnnic-font-weight-black;
    font-size: $unnnic-font-size-title-lg;
    color: $unnnic-color-neutral-black;
    line-height: $unnnic-font-size-title-lg + $unnnic-line-height-md;
  }
}
</style>
