<template>
  <div class="unnic-card-dash">
    <div class="unnic-card-dash__icon">
      <UICon
        :icon="icon"
        :class="{
          'icon-left': true,
        }"
        size="xs"
      />
    </div>
    <div class="unnic-card-dash__content">
      <div class="unnic-card-dash__title">{{ title }}</div>
      <div class="unnic-card-dash__data">
        <div class="unnic-card-dash__value">{{ value }}</div>

        <div class="unnic-card-dash__percent">
          <UICon
            icon="graph-stats-ascend-2"
            :class="{
              'icon-left': true,
              'unnic-card-dash__percent_icon': true,
            }"
            size="sm"
          />
          <div class="unnic-card-dash__percent_value">
            {{ percent >= 0 ? `+${percent}%` : `${percent}%` }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UICon from "../Icon.vue";

export default {
  name: "unnic-card",
  components: { UICon },
  props: {
    title: {
      type: String,
      default: null,
    },
    value: {
      type: Number,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    percent: {
      type: Number,
      default: 0,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnic.scss";

.unnic-card-dash {
  display: flex;
  background-color: $unnic-color-background-snow;
  border-radius: $unnic-border-radius-sm;
  padding: $unnic-inset-sm;
  box-shadow: $unnic-shadow-level-far;

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
    margin-left: $unnic-inline-xs;
  }

  &__data {
    display: flex;
    flex-direction: row;
  }

  &__percent {
    display: flex;
    flex-direction: row;
    margin-left: auto;

    color: $unnic-color-feedback-green;
    background-color: rgba($unnic-color-feedback-green, 0.08);
    border-radius: $unnic-border-radius-sm;
    padding: 8px 4px;
  }

  &__icon {
    border-radius: $unnic-border-radius-sm;
    padding: 2px 4px;
    align-self: flex-start;

    // TODO: MAKE COLORS VARIABLE FOR ICONS
    color: $unnic-color-aux-blue;
    background-color: rgba($unnic-color-aux-blue, 0.2);
  }

  &__title {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-dark;
    line-height: $unnic-line-height-medium;
  }

  &__value {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-title-md;
    font-weight: $unnic-font-weight-bold;
    color: $unnic-color-neutral-darkest;
    padding-top: $unnic-spacing-stack-nano;
    padding-right: $unnic-inline-nano;
    line-height: $unnic-line-height-medium;
  }

  &__percent_value {
    color: $unnic-color-feedback-green;
    border-radius: $unnic-border-radius-sm;
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-bold;
    line-height: $unnic-line-height-medium;
  }

  &__percent_icon {
    // TODO: MAKE COLORS VARIABLE FOR POSITIVE AND NEGATIVE
    color: $unnic-color-feedback-green;
    border-radius: $unnic-border-radius-sm;
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
