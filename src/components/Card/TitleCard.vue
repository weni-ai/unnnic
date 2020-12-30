<template>
  <div class="unnic-card-title">
    <UICon
      :icon="icon"
      class="unnic-card-title__icon"
      size="md" />
    <div class="unnic-card-title__content">
      <div class="unnic-card-title__content_title">{{ title }}</div>
      <tool-tip :text="info">
        <UICon
        icon="information-circle-4"
        class="unnic-card-title__content_info"
        size="sm" />
      </tool-tip>
    </div>
  </div>
</template>

<script>
import UICon from '../Icon.vue';
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'unnic-card',
  components: { UICon, ToolTip },
  props: {
    title: {
      type: String,
      default: null,
    },
    info: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnic.scss";

.unnic-card-title {
  display: flex;
  flex-direction: row;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: $unnic-spacing-stack-xs;
    padding-bottom: $unnic-spacing-stack-xs;
  }

  &__content_title {
    font-family: $unnic-font-family-primary;
    font-size: $unnic-font-size-body-lg;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-darkest;
    line-height: $unnic-line-height-medium;
  }

  &__icon {
    position: relative;
    left: 0;

    border-radius: $unnic-border-radius-sm;
    padding: $unnic-inset-nano;
    margin-right: $unnic-inline-sm;

    // TODO: MAKE COLORS VARIABLE FOR ICONS
    color: $unnic-color-aux-purple;
    background-color: rgba($unnic-color-aux-purple, 0.2);
  }

  &__content_info {
    position: relative;
    color: $unnic-color-neutral-soft;

    // align to full right
    right: 0;
    margin-left: auto;

    // center vertically
    align-items: center;
    justify-content: center;
    display: flex;
  }
}
</style>
