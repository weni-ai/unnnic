<template>
  <div
    :class="{
      'unnnic-card-default': true,
      'unnnic-card-default__clickable': clickable,
    }"
  >
    <div class="unnnic-card-default__content">
      <div class="unnnic-card-default__title">{{ title }}</div>
      <p
        class="unnnic-card-default__description"
        :title="description"
      >
        {{ description }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unnnic-card',
  props: {
    title: {
      type: String,
      default: null,
    },
    description: {
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
@import '../../assets/scss/unnnic.scss';

.unnnic-card-default {
  display: flex;
  background-color: $unnnic-color-background-snow;
  border-radius: $unnnic-border-radius-md;
  padding: $unnnic-inset-md;
  border: $unnnic-border-width-thinner solid $unnnic-color-neutral-soft;

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

  &__title {
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-lg;
    font-weight: $unnnic-font-weight-bold;
    color: $unnnic-color-neutral-darkest;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-medium;
    padding-bottom: $unnnic-spacing-stack-nano;
  }

  &__description {
    margin: 0;
    font-family: $unnnic-font-family-secondary;
    font-size: $unnnic-font-size-body-gt;
    font-weight: $unnnic-font-weight-regular;
    color: $unnnic-color-neutral-cloudy;
    line-height: $unnnic-font-size-body-gt + $unnnic-line-height-medium;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-width: 17.875 * $unnnic-font-size;
  }
}
</style>
