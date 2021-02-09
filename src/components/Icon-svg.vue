<template>
<span
    @click="onClick"
    :class="[
      'unnnic-icon',
      `unnnic-icon__size--${size}`,
      clickable ? 'unnnic--clickable' : '',
      lineHeight ? `unnnic-icon__line-height--${lineHeight}` : '']"
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
@import '../assets/scss/unnnic.scss';

$icon-sizes:
    'xl' $unnnic-icon-size-xl,
    'lg' $unnnic-icon-size-lg,
    'md' $unnnic-icon-size-md,
    'sm' $unnnic-icon-size-sm,
    'xs' $unnnic-icon-size-xs;

$line-heights:
  'sm' $unnnic-line-height-small,
  'md' $unnnic-line-height-medium,
  'lg' $unnnic-line-height-large;

    .unnnic-icon {
      position: relative;
      display: inline-block;
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
            path {
                fill: currentColor!important;
            }
        }
    }
</style>
