<template>
  <div
    :class="{
      'unnnic-card-content': true,
      'unnnic-card-content--disabled': !enabled,
      'unnnic-card-content__clickable': clickable,
    }"
  >
    <div :class="['unnnic-card-content__icon', enabled && 'unnnic-card-content__icon--disabled']">
      <unnnic-icon-svg
        :icon="icon"
        scheme="neutral-cloudy"
        size="sm"
      />
    </div>
    <div class="unnnic-card-content__content">
      <div class="unnnic-card-content__content__title">{{ title }}</div>
      <div class="unnnic-card-content__content__description">{{ description }}</div>
    </div>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon.vue';

export default {
  name: 'unnnic-card',
  components: {
    UnnnicIconSvg,
  },
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
      border: 1px solid $unnnic-color-neutral-cleanest;
    }
  }

  &:hover {
    .unnnic-card-content {
      &__content {
        &__title {
          font-weight: $unnnic-font-weight-bold;
        }
        &__description {
          color: $unnnic-color-neutral-dark;
        }
      }
    }
  }

  &__clickable {
    cursor: pointer;
  }

  &__content {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__title {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-gt;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-darkest;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }

    &__description {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-cloudy;
      line-height: $unnnic-font-size-body-md + $unnnic-line-height-medium;
    }
  }

  &__data {
    display: flex;
    flex-direction: row;
  }

  &__icon {
    border-radius: $unnnic-border-radius-sm;
    padding: 0.125 * $unnnic-font-size $unnnic-inline-nano;
    margin-right: $unnnic-inline-xs;
    background-color: $unnnic-color-neutral-lightest;

    &--disabled {
      background-color: rgba($unnnic-color-brand-weni-dark, $unnnic-opacity-level-extra-light);
    }
  }
}
</style>
