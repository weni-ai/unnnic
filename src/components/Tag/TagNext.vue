<template>
  <section 
    :class="[
      'unnnic-tag-next',
      `unnnic-tag-next--${scheme}`
    ]"
  >
    <p class="unnnic-tag-next__text">
      {{ text }}
    </p>
  </section>
</template>

<script>
export default {
  name: 'TagNext',
  props: {
    text: {
      type: String,
      default: null,
    },
    scheme: {
      type: String,
      default: 'weni',
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

.unnnic-tag-next {
  display: flex;
  align-items: center;
  justify-content: center;
  width: auto;

  border-radius: $unnnic-border-radius-pill;
  padding: 0 $unnnic-spacing-xs;

  font-family: $unnnic-font-family-secondary;
  font-size: $unnnic-font-size-body-md;
  font-weight: $unnnic-font-weight-regular;
  line-height: ($unnnic-font-size-body-md + $unnnic-line-height-medium);

  &__text {
    margin: 0;

    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  &--aux-purple {
    background-color: $unnnic-color-aux-purple-100;
    color: $unnnic-color-aux-purple-500;
  }

  &--weni {
    background-color: $unnnic-color-weni-100;
    color: $unnnic-color-weni-600;
  }

}
</style> 