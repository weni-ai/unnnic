<template>
<span
    @click="onClick"
    :class="[
      'unnic-icon',
      `unnic-icon__size--${size}`,
      clickable ? 'unnic--clickable' : '',
      lineHeight ? `unnic-icon__line-height--${lineHeight}` : '']"
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
        return ['nano', 'xs', 'sm', 'md', 'lg'].indexOf(value) !== -1;
      },
    },
    lineHeight: {
        type: String,
        default: null,
        validator(value) {
          return !value || ['sm', 'md', 'lg'].indexOf(value) !== -1;
        },
      },
  },
  mounted() {
    console.log({ icons });
  },
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

<style lang="scss">
@import '../assets/scss/unnic.scss';

$icon-sizes:
    'xl' $unnic-icon-size-xl,
    'lg' $unnic-icon-size-lg,
    'md' $unnic-icon-size-md,
    'sm' $unnic-icon-size-sm,
    'xs' $unnic-icon-size-xs;

$line-heights:
  'sm' $unnic-line-height-small,
  'md' $unnic-line-height-medium,
  'lg' $unnic-line-height-large;

    .unnic-icon {
      position: relative;
      display: inline-block;
        @each $name, $size in $icon-sizes {
            &__size--#{$name} {
                width: $size;
                height: $size;

                @each $line-name, $line-size in $line-heights {
                  &.unnic-icon__line-height--#{$line-name} svg {
                    position: relative;
                    top: (($size + $line-size) - ($size*1.2))/1.2;
                  }
              }
            }
        }

        svg {
            width: 100%;
            height: 100%;
            path {
                fill: currentColor!important;
            }
        }
    }
</style>
