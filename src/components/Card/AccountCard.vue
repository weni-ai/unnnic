<template>
  <div :class="{
      'unnic-card-account': true,
      'unnic-card-account__disabled': !enabled,
    }">
    <div :class="[
        'unnic-card-account__icon',
        `unnic-card-scheme--${scheme}`,
        enabled ? '' : 'unnic-card-account__icon__disabled',
      ]">
      <UICon
        :icon="icon"
        line-height="md"
        size="xs"/>
    </div>
    <div class="unnic-card-account__content">
      <div class="unnic-card-account__title">{{ title }}</div>
      <div class="unnic-card-account__description">{{ description }}</div>
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
    scheme: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnic.scss";

.unnic-card-account {
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
}
</style>
