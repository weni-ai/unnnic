<template>
  <div :class="{
      'unnnic-card-account': true,
      'unnnic-card-account__disabled': !enabled,
    }">
    <div :class="[
        'unnnic-card-account__icon',
        `unnnic-card-scheme--${scheme}`,
        enabled ? '' : 'unnnic-card-account__icon__disabled',
      ]">
      <UICon
        :icon="icon"
        size="xs"/>
    </div>
    <div class="unnnic-card-account__content">
      <div class="unnnic-card-account__title">{{ title }}</div>
      <div class="unnnic-card-account__description">{{ description }}</div>
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
    enabled: {
      type: Boolean,
      default: true,
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

.unnnic-card-account {
  display: flex;
  background-color: $unnnic-color-background-sky;
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-squish-xs;

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
    border-radius: $unnnic-border-radius-sm;
    padding: 2px 4px;
    margin-right: $unnnic-inline-xs;
    align-self: flex-start;

    &__disabled {
      color: $unnnic-color-neutral-cloudy !important;
      background-color: $unnnic-color-background-grass !important;
    }
  }

  &__title {
    font-family: $unnnic-font-family-primary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
  }

  &__description {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-md;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-cloudy;
    line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
  }
}
</style>
