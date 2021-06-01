<template>
    <span
      @click="onClick"
      :class="`unnnic-icon icon-${icon} unnnic-icon-${size || 'md'}
        ${scheme ? `unnnic-icon-scheme--${scheme}` : ''}
        ${scheme && hasBackground ? `unnnic-icon-background-scheme--${scheme}` : ''}
        icon-${size} ${ clickable ? 'unnnic--clickable' : '' }`">
    </span>
</template>

<script>
export default {
  name: 'uIcon',
  props: {
    icon: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        if (!value) return true;
        return ['nano', 'xs', 'sm', 'ant', 'md', 'lg', 'xl'].indexOf(value) !== -1;
      },
    },
    scheme: {
      type: String,
      default: '',
    },
    hasBackground: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    onClick() {
      if (!this.clickable) return;
      this.$emit('click');
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/unnnic.scss';
@import '../assets/fonts/icons.css';

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
   'aux-pink' $unnnic-color-aux-pink,
   'neutral-soft' $unnnic-color-neutral-soft;

@each $name, $color in $scheme-colors {
  .unnnic-icon-scheme {
    &--#{$name} {
      color: $color;

      &--icon {
        color: $color;
      }
    }
  }

  .unnnic-icon-background-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnnic-opacity-level-extra-light);
      border-radius: $unnnic-border-radius-sm;
      padding: $unnnic-inset-nano;
    }

    &--border {
      border-left: 4px solid $color;
    }
  }
}

.unnnic-icon {
  &-xs {
    font-size: $unnnic-icon-size-xs;
  }

  &-sm {
    font-size: $unnnic-icon-size-sm;
  }

  &-ant {
    font-size: $unnnic-icon-size-ant;
  }

  &-md {
    font-size: $unnnic-icon-size-md;
  }

  &-lg {
    font-size: $unnnic-icon-size-lg;
  }

  &-xl {
    font-size: $unnnic-icon-size-xl;
  }
}

</style>
