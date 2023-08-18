<template>
  <button
    :class="['button-icon', size, type]"
    v-on="$listeners"
  >
    <unnnic-icon
      :icon="icon"
      :scheme="iconScheme"
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
    type: {
      type: String,
      default: 'secondary',
    },

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

  computed: {
    iconScheme() {
      if (this.type === 'primary') {
        return 'neutral-snow';
      }

      return 'neutral-darkest';
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.button-icon {
  border: 0;
  cursor: pointer;
  border-radius: $unnnic-border-radius-sm;

  &.small {
    padding: $unnnic-spacing-inset-nano;
  }

  &.large {
    padding: $unnnic-spacing-inset-xs;
  }

  &.primary {
    background-color: $unnnic-color-neutral-darkest;

    &:hover {
      opacity: $unnnic-opacity-level-clear;
    }
  }

  &.secondary {
    background-color: rgba($unnnic-color-neutral-soft, $unnnic-opacity-level-light);
    position: relative;

    &:before {
      content: " ";
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: $unnnic-border-width-thinner solid $unnnic-color-neutral-cleanest;
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      background-color: rgba($unnnic-color-neutral-soft, $unnnic-opacity-level-overlay);

      &:before {
        border: 0;
      }
    }
  }
}
</style>
