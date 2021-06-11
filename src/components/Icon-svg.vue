<template>
<span
    @click="onClick"
    :class="[
      'unnnic-icon',
      `unnnic-icon__size--${size}`,
      clickable ? 'unnnic--clickable' : '',
      lineHeight ? `unnnic-icon__line-height--${lineHeight}` : '',
      scheme ? `unnnic-icon-scheme--${scheme}` : '',
    ]"
    v-html="svg" />
</template>

<script>
import icons from '../utils/icons';

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
        return ['nano', 'xs', 'sm', 'ant', 'md', 'lg', 'xl'].indexOf(value) !== -1;
      },
    },
    lineHeight: {
      type: String,
      default: null,
      validator(value) {
        return !value || ['sm', 'md', 'lg'].indexOf(value) !== -1;
      },
    },
    scheme: {
      type: String,
      default: '',
    },
  },
  mounted() {},
  computed: {
    svg() {
      return icons[this.icon];
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

<style lang="scss" scoped>
@import "../assets/scss/unnnic.scss";

.unnnic-icon ::v-deep svg {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style lang="scss">
@import "../assets/scss/unnnic.scss";

$scheme-colors: "feedback-red" $unnnic-color-feedback-red,
  "feedback-green" $unnnic-color-feedback-green, "feedback-yellow" $unnnic-color-feedback-yellow,
  "feedback-blue" $unnnic-color-feedback-blue, "feedback-grey" $unnnic-color-feedback-grey,
  "aux-blue" $unnnic-color-aux-blue, "aux-purple" $unnnic-color-aux-purple,
  "aux-orange" $unnnic-color-aux-orange, "aux-lemon" $unnnic-color-aux-lemon,
  "aux-pink" $unnnic-color-aux-pink,
  "brand-weni" $unnnic-color-brand-weni,
  "brand-sec" $unnnic-color-brand-sec,
  "neutral-clean" $unnnic-color-neutral-clean,
  "neutral-cleanest" $unnnic-color-neutral-cleanest,
  "neutral-dark" $unnnic-color-neutral-dark,
  "neutral-soft" $unnnic-color-neutral-soft,
  "neutral-darkest" $unnnic-color-neutral-darkest,
  "neutral-cloudy" $unnnic-color-neutral-cloudy;

@each $name, $color in $scheme-colors {
  .unnnic-icon-scheme {
    &--#{$name} {
      & .primary {
        fill: $color;
      }

      & .primary-stroke {
        stroke: $color;
      }
    }
  }
}

$icon-sizes:
    'xl' $unnnic-icon-size-xl,
    'lg' $unnnic-icon-size-lg,
    'md' $unnnic-icon-size-md,
    'ant' $unnnic-icon-size-ant,
    'sm' $unnnic-icon-size-sm,
    'xs' $unnnic-icon-size-xs;

$line-heights:
  'sm' $unnnic-line-height-small,
  'md' $unnnic-line-height-medium,
  'lg' $unnnic-line-height-large;

    .unnnic-icon {
      position: relative;
      display: inline-block;
      vertical-align: middle;

        @each $name, $size in $icon-sizes {
            &__size--#{$name} {
                width: $size;
                height: $size;

                @each $line-name, $line-size in $line-heights {
                  &.unnnic-icon__line-height--#{$line-name} svg {
                    position: relative;
                    top: (($size + $line-size) - ($size*1.2))/1.2;
                  }
              }
            }
        }

        svg {
            width: 100%;
            height: 100%;
        }
    }
</style>
