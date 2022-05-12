<template>
  <button
    :class="['button-icon', size]"
    v-on="$listeners"
  >
    <unnnic-icon
      :icon="icon"
      scheme="neutral-darkest"
      size="ant"
    ></unnnic-icon>
  </button>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    size: {
      type: String,
      required: true,
      validator(value) {
        return ['small', 'large'].includes(value);
      },
    },

    icon: {
      type: String,
      required: true,
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.button-icon {
  background-color: rgba($unnnic-color-neutral-soft, $unnnic-opacity-level-light);
  border-radius: $unnnic-border-radius-sm;
  position: relative;
  border: 0;
  cursor: pointer;

  &:before {
    content: " ";
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
    border-radius: inherit;
    pointer-events: none;
  }

  &.small {
    padding: $unnnic-spacing-inset-nano;
  }

  &.large {
    padding: $unnnic-spacing-inset-xs;
  }

  &:hover {
    background-color: rgba($unnnic-color-neutral-soft, $unnnic-opacity-level-overlay);

    &:before {
      border: 0;
    }
  }
}
</style>
