<template>
  <div
    :class="[
      'unnnic-avatar-icon',
      sanitizedScheme,
      sanitizedSize,
      { disabled: !enabled },
      filled,
      { opacity: !opacity },
    ]"
  >
    <UnnnicIcon
      :icon="sanitizedIcon"
      :scheme="enabled ? sanitizedScheme : 'neutral-cloudy'"
      :size="iconSize"
      :filled="filled"
    />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';
import { sanitizeHtml } from '../../utils/sanitize';

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
        return ['nano', 'xs', 'sm', 'lg', 'xl'].includes(value);
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
      }[this.sanitizedSize];
    },
    sanitizedIcon() {
      return sanitizeHtml(this.icon, [], 50);
    },
    sanitizedScheme() {
      return sanitizeHtml(this.scheme, [], 50);
    },
    sanitizedSize() {
      return ['nano', 'xs', 'sm', 'lg', 'xl'].includes(this.size) ? this.size : 'sm';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic';

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
