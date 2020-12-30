<template>
  <div :class="['unnic-card-status', `unnic-card-scheme--${scheme}--border`]">
    <div class="unnic-card-status__header">
      <div class="unnic-card-status__icon">
        <UICon
          :icon="icon"
          class="icon-left"
          size="sm"
        />
      </div>
      <div class="unnic-card-status__title">{{ title }}</div>
    </div>
    <div class="unnic-card-status__data">
      <!-- TODO: Modify icon to status one -->
      <UICon
        icon="information-circle-4"
        :class="[
          'icon-left',
          `unnic-card-scheme--${scheme}--icon`,
          'unnic-card-status__icon_indicator',
        ]"
        size="xs"
      />
      <div class="unnic-card-status__data_content">
        <div class="unnic-card-status__data_content_status">
          {{ status }}
        </div>
        <div class="unnic-card-status__data_content_description">
          {{ description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UICon from '../Icon.vue';

export default {
  name: 'unnic-card',
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
@import "../../assets/scss/unnic.scss";

.unnic-card-status {
  display: flex;
  flex-direction: column;
  background-color: $unnic-color-background-sky;
  border-radius: $unnic-border-radius-sm;
  padding: $unnic-inset-sm;

  // TODO: MAKE COLORS VARIABLE FROM STATUS
  border-left: 4px solid $unnic-color-feedback-green;

  &__header {
    display: flex;
    flex-direction: row;
  }

  &__data {
    display: flex;
    flex-direction: row;
    padding-top: $unnic-spacing-stack-xs;
  }

  &__data_content {
    margin-left: 4px;
  }

  &__data_content_status {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
    color: $unnic-color-neutral-darkest;
  }

  &__data_content_description {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-sm;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-dark;
    line-height: $unnic-font-size-body-sm + $unnic-line-height-medium;
  }

  &__icon {
    color: $unnic-color-neutral-dark;
  }

  &__title {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
    color: $unnic-color-neutral-dark;
    margin-left: $unnic-inline-nano;
  }

  &__value {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-title-md;
    font-weight: $unnic-font-weight-bold;
    color: $unnic-color-neutral-darkest;
    padding-top: $unnic-spacing-stack-nano;
    padding-right: $unnic-inline-nano;
  }

  &__percent_value {
    color: $unnic-color-feedback-green;
    border-radius: $unnic-border-radius-sm;
  }

  &__icon_indicator {
    line-height: $unnic-line-height-medium;
  }
}

.icon-right {
  position: relative;
  right: 0;
  color: $unnic-color-neutral-soft;
}

.icon-left {
  position: relative;
  left: 0;
}
</style>
