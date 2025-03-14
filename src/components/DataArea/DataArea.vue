<template>
  <div class="data-area-container">
    <div class="data-area-container__header">
      <div class="data-area-container__header__title">{{ title }}</div>

      <div class="data-area-container__header__links-slot">
        <slot name="links"></slot>
      </div>
    </div>

    <div class="data-area-container__content">
      <ToolTip
        :enabled="enableHover"
        :text="hoverText"
      >
        <div class="data-area-container__content__text">{{ text }}</div>
      </ToolTip>

      <div class="data-area-container__content__buttons-slot">
        <slot name="buttons"></slot>
      </div>
    </div>
  </div>
</template>

<script>
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'UnnnicDataArea',
  components: {
    ToolTip,
  },
  props: {
    title: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    enableHover: {
      type: Boolean,
      default: false,
    },
    hoverText: {
      type: String,
      default: '',
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.data-area-container {
  &__header {
    display: flex;
    gap: $unnnic-spacing-inline-xs;
    justify-content: space-between;

    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-gt;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
    margin-bottom: $unnnic-spacing-stack-xs;

    &__title {
      color: $unnnic-color-neutral-darkest;
    }
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: $unnnic-spacing-inline-sm;

    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-spacing-inset-sm;
    background-color: $unnnic-color-background-snow;

    &__text {
      flex: 1;
      white-space: pre-wrap;
      word-break: break-all;

      font-family: $unnnic-font-family-secondary;
      font-weight: $unnnic-font-weight-regular;
      font-size: $unnnic-font-size-body-gt;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-md;
      color: $unnnic-color-neutral-dark;
    }
  }
}
</style>
