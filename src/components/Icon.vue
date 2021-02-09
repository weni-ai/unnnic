<template>
    <span
      @click="onClick"
      :class="`icon icon-${icon}
        ${scheme ? `background-scheme--${scheme}` : ''}
        icon-${size} ${ clickable ? 'unnic--clickable' : '' }`">
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
        return ['nano', 'xs', 'sm', 'md', 'lg'].indexOf(value) !== -1;
      },
    },
    scheme: {
      type: String,
      default: '',
      validator(value) {
        return ['feedback-red', 'feedback-green', 'feedback-yellow', 'feedback-blue', 'feedback-grey',
          'aux-blue', 'aux-purple', 'aux-orange', 'aux-lemon', 'aux-pink'].indexOf(value) !== -1;
      },
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
@import '../assets/scss/unnic.scss';
@import '../assets/fonts/icons.css';

$scheme-colors:
  'feedback-red' $unnic-color-feedback-red,
  'feedback-green' $unnic-color-feedback-green,
  'feedback-yellow' $unnic-color-feedback-yellow,
  'feedback-blue' $unnic-color-feedback-blue,
  'feedback-grey' $unnic-color-feedback-grey,
   'aux-blue' $unnic-color-aux-blue,
   'aux-purple' $unnic-color-aux-purple,
   'aux-orange' $unnic-color-aux-orange,
   'aux-lemon' $unnic-color-aux-lemon,
   'aux-pink' $unnic-color-aux-pink;

@each $name, $color in $scheme-colors {
  .background-scheme {
    &--#{$name} {
      background-color: rgba($color, $unnic-opacity-level-lighter);
      color: $color;
      position: relative;
      left: 0;

      border-radius: $unnic-border-radius-sm;
      padding: $unnic-inset-nano;
      margin-right: $unnic-inline-sm;
      &--icon {
        color: $color;
      }
      &--border {
        border-left: 4px solid $color;
      }
    }
  }
}

.icon {
  &-xs {
    font-size: $unnic-icon-size-xs;
  }

  &-sm {
    font-size: $unnic-icon-size-sm;
  }

  &-md {
    font-size: $unnic-icon-size-md;
  }

  &-lg {
    font-size: $unnic-icon-size-lg;
  }

  &-xl {
    font-size: $unnic-icon-size-xl;
  }
}

</style>
