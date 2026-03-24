<template>
  <div
    :class="{
      'unnnic-card-content': true,
      'unnnic-card-content--disabled': !enabled,
      'unnnic-card-content__clickable': clickable,
    }"
  >
    <div
      :class="[
        'unnnic-card-content__icon',
        enabled && 'unnnic-card-content__icon--disabled',
      ]"
    >
      <UnnnicIcon
        :icon="icon"
        scheme="fg-base"
        size="sm"
      />
    </div>
    <div class="unnnic-card-content__content">
      <div class="unnnic-card-content__content__title">{{ title }}</div>
      <div class="unnnic-card-content__content__description">
        {{ description }}
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicCard',
  components: {
    UnnnicIcon,
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
@use '@/assets/scss/unnnic' as *;

.unnnic-card-content {
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-squish-xs;
  background-color: rgba($unnnic-color-teal-8, $unnnic-opacity-level-light);
  border: 1px solid $unnnic-color-teal-8;
  transition: 0.2s;

  &--disabled {
    background-color: $unnnic-color-bg-base-soft;
    border: 1px solid $unnnic-color-border-base;

    &:hover {
      background-color: $unnnic-color-bg-base;
      border: 1px solid $unnnic-color-border-emphasized;
    }
  }

  &:hover {
    .unnnic-card-content {
      &__content {
        &__title {
          font-weight: $unnnic-font-weight-bold;
        }
        &__description {
          color: $unnnic-color-fg-base;
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
      color: $unnnic-color-fg-emphasized;
      line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    }

    &__description {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-md;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-fg-base;
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
    background-color: $unnnic-color-bg-base-soft;

    &--disabled {
      background-color: rgba(
        $unnnic-color-teal-12,
        $unnnic-opacity-level-extra-light
      );
    }
  }
}
</style>
