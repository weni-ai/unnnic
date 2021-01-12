<template>
  <div class="unnic-card-dash">
    <div :class="['unnic-card-dash__icon', `unnic-card-scheme--${scheme}` ]">
      <UICon
        :icon="icon"
        class="icon-left"
        size="xs"
      />
    </div>
    <div class="unnic-card-dash__content">
      <div class="unnic-card-dash__title">{{ title }}</div>
      <div class="unnic-card-dash__data">
        <div class="unnic-card-dash__value">{{ value }}</div>

        <div :class="['unnic-card-dash__percent',
        `unnic-card-scheme--feedback-${percent < 0 ? 'red' : 'green'}`]">
          <UICon
            icon="graph-stats-ascend-2"
            class="icon-left' 'unnic-card-dash__percent_icon'"
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
import UICon from '../Icon.vue';

export default {
  name: 'unnic-card',
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
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
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

    border-radius: $unnic-border-radius-sm;
    padding: 8px 4px;
  }

  &__icon {
    border-radius: $unnic-border-radius-sm;
    padding: 2px 4px;
    align-self: flex-start;
  }

  &__title {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-dark;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
  }

  &__value {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-title-md;
    font-weight: $unnic-font-weight-bold;
    color: $unnic-color-neutral-darkest;
    padding-top: $unnic-spacing-stack-nano;
    padding-right: $unnic-inline-nano;
    line-height: $unnic-font-size-title-md + $unnic-line-height-medium;
  }

  &__percent_value {
    border-radius: $unnic-border-radius-sm;
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-bold;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
  }

  &__percent_icon {
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
