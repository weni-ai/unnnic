<template>
  <div class="unnnic-card-title">
    <UICon
      :icon="icon"
      :class="['unnnic-card-title__icon', `unnnic-card-scheme--${scheme}`]"
      size="md" />
    <div class="unnnic-card-title__content">
      <div class="unnnic-card-title__content_title">{{ title }}</div>
      <tool-tip :side="infoPosition" :text="info" v-if="hasInformationIcon">
        <UICon
        icon="information-circle-4"
        class="unnnic-card-title__content_info"
        size="sm" />
      </tool-tip>
    </div>
  </div>
</template>

<script>
import UICon from '../Icon.vue';
import ToolTip from '../ToolTip/ToolTip.vue';

export default {
  name: 'unnnic-card',
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
    infoPosition: {
      type: String,
      default: 'right',
    },
    scheme: {
      type: String,
      default: null,
    },
    hasInformationIcon: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.unnnic-card-title {
  display: flex;
  flex-direction: row;
  align-items: center;

  &__content {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding-top: $unnnic-spacing-stack-xs;
    padding-bottom: $unnnic-spacing-stack-xs;
  }

  &__content_title {
    font-family: $unnnic-font-family-primary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    flex: 1;
  }

  &__icon {
    position: relative;
    left: 0;

    border-radius: $unnnic-border-radius-sm;
    padding: $unnnic-inset-nano;
    margin-right: $unnnic-inline-sm;
  }

  &__content_info {
    position: relative;
    color: $unnnic-color-neutral-soft;

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
