<template>
  <section
    :class="`unnnic-tag unnnic-tag-scheme--${scheme} unnnic-tag--${size}`"
  >
    <section
      v-if="leftIcon"
      class="unnnic-tag__icon"
    >
      <UnnnicIcon
        :icon="leftIcon"
        :scheme="scheme"
        size="sm"
      />
    </section>
    <span
      :class="`unnnic-tag__label`"
      >{{ text }}</span
    >
  </section>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  name: 'UnnnicTag',
  components: {
    UnnnicIcon,
  },
  props: {
    text: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'medium',
      validator(value) {
        return ['small', 'medium'].includes(value);
      },
    },
    scheme: {
      type: String,
      default: 'aux-purple',
    },
    leftIcon: {
      type: String,
      default: null,
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

@each $name, $color in $scheme-colors {
  .unnnic-tag-scheme--#{$name} {
    background-color: rgba($color, $unnnic-opacity-level-light);
    outline-style: solid;
    outline-color: rgba($color, $unnnic-opacity-level-extra-light);
    outline-width: $unnnic-border-width-thinner;
    outline-offset: -$unnnic-border-width-thinner;
  }
}

.unnnic-tag {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: $unnnic-space-1;
  border-radius: $unnnic-border-radius-pill;
  padding: calc($unnnic-space-1 * 1.5) $unnnic-space-3;

  &--small {
    padding: calc($unnnic-space-1 * 0.5) $unnnic-space-3;
  }

  &__label {
    font: $unnnic-font-caption-1;
    color: $unnnic-color-fg-emphasized;
  }

  &__icon {
    display: flex;
  }
}
</style>
