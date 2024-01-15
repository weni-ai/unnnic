<template>
  <div
    :class="[
      'unnnic-avatar-icon',
      scheme,
      size,
      { disabled: !enabled },
      filled,
      { opacity: !opacity },
    ]"
  >
    <unnnic-icon
      :icon="icon"
      :scheme="enabled ? scheme : 'neutral-cloudy'"
      :size="iconSize"
      :filled="filled"
    />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    enabled: {
      type: Boolean,
      default: true,
    },

    icon: {
      type: String,
      default: 'graph-stats-1',
    },

    size: {
      type: String,
      default: 'sm',
      validator(value) {
        return ['nano', 'xs', 'sm', 'lg', 'xl'].indexOf(value) !== -1;
      },
    },

    scheme: {
      type: String,
      default: 'aux-blue',
    },

    filled: {
      type: Boolean,
      default: false,
    },
    opacity: {
      type: Boolean,
      default: true,
    },
  },

  computed: {
    iconSize() {
      return {
        nano: 'xs',
        xs: 'sm',
        sm: 'md',
        lg: 'lg',
        xl: 'xl',
      }[this.size];
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

@each $name, $color in $scheme-colors {
  .unnnic-avatar-icon {
    &.#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-extra-light);
    }
  }

  .unnnic-avatar-icon.opacity {
    &.#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-light);
    }
  }
}

.unnnic-avatar-icon.disabled {
  background-color: $unnnic-color-background-grass;
}

.unnnic-avatar-icon {
  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-spacing-inset-nano;
  display: inline-flex;

  &.nano,
  &.xs {
    padding: $unnnic-spacing-stack-nano $unnnic-spacing-inline-nano;
  }
}
</style>
