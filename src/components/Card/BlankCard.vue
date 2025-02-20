<template>
  <div
    :class="{
      'unnnic-card-blank': true,
      'unnnic-card-blank__clickable': clickable,
    }"
  >
    <div class="unnnic-card-blank__content">
      <UnnnicIcon
        :icon="icon"
        scheme="neutral-clean"
        class="unnnic-card-blank__content__icon"
        size="xl"
      />

      <div class="unnnic-card-blank__content__text">{{ text }}</div>
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
    text: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
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

.unnnic-card-blank {
  display: flex;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-inset-md;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;
  cursor: pointer;

  &:hover {
    box-shadow: $unnnic-shadow-level-near;
  }

  &__clickable {
    cursor: pointer;
  }

  &__content {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    width: 100%;

    &__icon {
      padding-bottom: $unnnic-spacing-stack-xs;
    }

    &__text {
      font-family: $unnnic-font-family-secondary;
      font-size: $unnnic-font-size-body-lg;
      font-weight: $unnnic-font-weight-regular;
      color: $unnnic-color-neutral-cloudy;
      line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    }
  }
}
</style>
