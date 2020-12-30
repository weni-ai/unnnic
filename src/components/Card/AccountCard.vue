<template>
  <div :class="{
      'unnic-card-dash': true,
      'unnic-card-dash__disabled': !enabled,
    }">
    <div :class="{
        'unnic-card-dash__icon': true,
        'unnic-card-dash__icon__disabled': !enabled,
      }">
      <UICon
        :icon="icon"
        class="icon-left"
        size="xs"/>
    </div>
    <div class="unnic-card-dash__content">
      <div class="unnic-card-dash__title">{{ title }}</div>
      <div class="unnic-card-dash__description">{{ description }}</div>
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
    enabled: {
      type: Boolean,
      default: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnic.scss";

.unnic-card-dash {
  display: flex;
  background-color: $unnic-color-background-sky;
  border-radius: $unnic-border-radius-sm;
  padding: $unnic-squish-xs;

  &__disabled {
    background-color: inherit;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__data {
    display: flex;
    flex-direction: row;
  }

  &__icon {
    border-radius: $unnic-border-radius-sm;
    padding: 2px 4px;
    margin-right: $unnic-inline-xs;
    align-self: flex-start;

    // TODO: MAKE COLORS VARIABLE FOR ICONS
    color: $unnic-color-aux-blue;
    background-color: rgba($unnic-color-aux-blue, 0.08);

    &__disabled {
      color: $unnic-color-neutral-cloudy !important;
      background-color: $unnic-color-background-grass !important;
    }
  }

  &__title {
    font-family: $unnic-font-family-primary;
    font-size: $unnic-font-size-body-lg;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-darkest;
    line-height: $unnic-font-size-body-lg + $unnic-line-height-medium;
  }

  &__description {
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-regular;
    color: $unnic-color-neutral-cloudy;
    line-height: $unnic-font-size-body-md + $unnic-line-height-medium;
  }

  &__percent_value {
    color: $unnic-color-feedback-green;
    border-radius: $unnic-border-radius-sm;
    font-family: $unnic-font-family-secondary;
    font-size: $unnic-font-size-body-md;
    font-weight: $unnic-font-weight-bold;
    // line-height: $unnic-line-height-medium;
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
