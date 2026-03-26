<template>
  <button
    :class="['button-icon', size, type]"
    v-bind="$attrs"
  >
    <UnnnicIcon
      :icon="icon"
      :scheme="iconScheme"
      size="ant"
    ></UnnnicIcon>
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
        return 'fg-inverted';
      }

      return 'fg-emphasized';
    },
  },
};
</script>

<style lang="scss" scoped>
@use '@/assets/scss/unnnic' as *;

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
    background-color: $unnnic-color-fg-emphasized;

    &:hover {
      opacity: $unnnic-opacity-level-clear;
    }
  }

  &.secondary {
    background-color: rgba(
      $unnnic-color-bg-muted,
      $unnnic-opacity-level-light
    );
    position: relative;

    &:before {
      content: ' ';
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border: 1px solid $unnnic-color-border-emphasized;
      border-radius: inherit;
      pointer-events: none;
    }

    &:hover {
      background-color: rgba(
        $unnnic-color-bg-muted,
        $unnnic-opacity-level-overlay
      );

      &:before {
        border: 0;
      }
    }
  }
}
</style>
