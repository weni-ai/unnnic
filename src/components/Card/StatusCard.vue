<template>
  <div :class="['unnnic-card-status', `unnnic-card-scheme--${scheme}--border`]">
    <div class="unnnic-card-status__header">
        <UICon
          class="unnnic-card-status__icon"
          :icon="icon"
          size="sm"
        />
      <div class="unnnic-card-status__title">{{ title }}</div>
    </div>
    <div class="unnnic-card-status__data">
        <span :class="[
          `unnnic-card-scheme--${scheme}--icon`,
          'unnnic-card-status__icon_indicator',
        ]"> &#11044; </span>
      <div class="unnnic-card-status__data_content">
        <div class="unnnic-card-status__data_content_status">
          {{ status }}
        </div>
        <div class="unnnic-card-status__data_content_description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'unnnic-card',
  components: { UICon },
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    status: {
      type: String,
      default: null,
    },
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-card-status {
  display: flex;
  flex-direction: column;
  background-color: $unnnic-color-background-sky;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-inset-sm;

  // TODO: MAKE COLORS VARIABLE FROM STATUS
  border-left: 4px solid $unnnic-color-feedback-green;

  &__header {
    display: flex;
    flex-direction: row;
  }

  &__data {
    display: flex;
    flex-direction: row;
    padding-top: $unnnic-spacing-stack-xs;
  }

  &__data_content {
    margin-left: 4px;
  }

  &__data_content_status {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    color: $unnnic-color-neutral-darkest;
  }

  &__data_content_description {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-dark;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  }

  &__icon {
    color: $unnnic-color-neutral-dark;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
  }

  &__title {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-regular;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    color: $unnnic-color-neutral-dark;
    margin-left: $unnnic-inline-nano;
  }

  &__value {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-title-md;
    font-weight: $unnnic-font-weight-bold;
    color: $unnnic-color-neutral-darkest;
    padding-top: $unnnic-spacing-stack-nano;
    padding-right: $unnnic-inline-nano;
  }

  &__percent_value {
    color: $unnnic-color-feedback-green;
    border-radius: $unnnic-border-radius-sm;
  }

  &__icon_indicator {
    line-height: $unnnic-line-height-medium;
    font-size: 4px;
    border-radius: 50%;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  }
}
</style>
