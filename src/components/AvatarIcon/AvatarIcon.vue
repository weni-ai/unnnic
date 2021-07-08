<template>
  <div :class="['unnnic-avatar-icon', scheme, size, { disabled: !enabled }]">
    <unnnic-icon :icon="icon" :scheme="enabled ? scheme : 'neutral-cloudy'" :size="iconSize" />
  </div>
</template>

<script>
import UnnnicIcon from '../Icon-svg.vue';

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

$scheme-colors:
  'feedback-red' $unnnic-color-feedback-red,
  'feedback-green' $unnnic-color-feedback-green,
  'feedback-yellow' $unnnic-color-feedback-yellow,
  'feedback-blue' $unnnic-color-feedback-blue,
  'feedback-grey' $unnnic-color-feedback-grey,
   'aux-blue' $unnnic-color-aux-blue,
   'aux-purple' $unnnic-color-aux-purple,
   'aux-orange' $unnnic-color-aux-orange,
   'aux-lemon' $unnnic-color-aux-lemon,
   'aux-pink' $unnnic-color-aux-pink;

@each $name, $color in $scheme-colors {
  .unnnic-avatar-icon {
    &.#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-extra-light);
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

  &.nano, &.xs {
    padding: $unnnic-spacing-stack-nano $unnnic-spacing-inline-nano;
  }
}
</style>
