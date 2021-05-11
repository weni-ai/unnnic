<template>
  <div
    :class="{
      'unnnic-card-content': true,
      'unnnic-card-content--disabled': !enabled,
      'unnnic-card-content__clickable': clickable,
    }"
  >
    <div :class="['unnnic-card-content__icon',
    enabled && 'unnnic-card-content__icon--disabled']">
      <UICon :icon="icon" size="xs" />
    </div>
    <div class="unnnic-card-content__content">
      <h5 class="unnnic-card-content__title title">{{ title }}</h5>
      <p class="unnnic-card-content__description description">{{ description }}</p>
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
      default: false,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-card-content {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-squish-xs;
  background-color: rgba($unnnic-color-brand-weni, $unnnic-opacity-level-light);
  border: 1px solid $unnnic-color-brand-weni;
  transition: 0.2s;

  &--disabled {
    background-color: $unnnic-color-background-carpet;
    border: 1px solid $unnnic-color-neutral-soft;

    &:hover {
      background-color: $unnnic-color-background-snow;
      border: 1px solid $unnnic-color-neutral-clean;
    }
  }

  &:hover {
      .title{
        font-weight: $unnnic-font-weight-bold;
      }
      .description {
        color: $unnnic-color-neutral-dark;
      }
    }

  &__clickable {
    cursor: pointer;
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
    padding: 0.125rem $unnnic-inline-nano;
    margin-right: $unnnic-inline-xs;
    color: $unnnic-color-neutral-cloudy;
    background-color: $unnnic-color-neutral-lightest;

    &--disabled {
      background-color: $unnnic-color-background-solo;
    }
  }

  &__title {
    font-family: $unnnic-font-family-primary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-darkest;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    margin: 0;
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
