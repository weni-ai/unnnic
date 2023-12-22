<template>
  <span
    v-if="materialSymbolsName"
    @click="onClick"
    @mousedown="$emit('mousedown')"
    @mouseup="$emit('mouseup')"
    :class="[
      'material-symbols-rounded',
      `unnnic-icon-scheme--${scheme}`,
      `unnnic-icon-size--${size}`,
      {
        'unnnic--clickable': clickable,
        'material-symbols-rounded--filled': filled,
      },
    ]"
  >
    {{ materialSymbolsName }}
  </span>

  <component
    v-else
    @click="onClick"
    @mousedown="$emit('mousedown')"
    @mouseup="$emit('mouseup')"
    :class="[
      'unnnic-icon',
      `unnnic-icon__size--${size}`,
      clickable ? 'unnnic--clickable' : '',
      lineHeight ? `unnnic-icon__line-height--${lineHeight}` : '',
      scheme ? `unnnic-icon-scheme--${scheme}` : '',
    ]"
    :is="svg"
  />
</template>

<script>
import icons from '../utils/icons';
import OldIconsMap from './Icon/OldIconsMap.json';

export default {
  name: 'uIcon',
  props: {
    filled: {
      type: Boolean,
    },
    next: {
      type: Boolean,
    },
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
        return (
          [
            'nano',
            'xs',
            'sm',
            'ant',
            'md',
            'lg',
            'xl',
            'avatar-lg',
            'avatar-md',
            'avatar-sm',
            'avatar-xs',
            'avatar-nano',
          ].indexOf(value) !== -1
        );
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
      default: 'neutral-darkest',
    },
  },
  mounted() {},
  computed: {
    svg() {
      return icons[this.icon];
    },

    materialSymbolsName() {
      if (Object.keys(icons).includes(this.icon) && !this.next) {
        return null;
      }

      return OldIconsMap[this.icon] || this.icon;
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
@import '../assets/scss/unnnic.scss';

.unnnic-icon :deep(svg) {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<style lang="scss">
@import '../assets/scss/unnnic.scss';

$scheme-colors: 'background-solo' $unnnic-color-background-solo,
  'background-sky' $unnnic-color-background-sky, 'background-grass' $unnnic-color-background-grass,
  'background-carpet' $unnnic-color-background-carpet,
  'background-snow' $unnnic-color-background-snow,
  'background-lightest' $unnnic-color-background-lightest,
  'background-white' $unnnic-color-background-white, 'neutral-black' $unnnic-color-neutral-black,
  'neutral-darkest' $unnnic-color-neutral-darkest, 'neutral-dark' $unnnic-color-neutral-dark,
  'neutral-cloudy' $unnnic-color-neutral-cloudy, 'neutral-cleanest' $unnnic-color-neutral-cleanest,
  'neutral-clean' $unnnic-color-neutral-clean, 'neutral-soft' $unnnic-color-neutral-soft,
  'neutral-lightest' $unnnic-color-neutral-lightest, 'neutral-light' $unnnic-color-neutral-light,
  'neutral-white' $unnnic-color-neutral-white, 'neutral-snow' $unnnic-color-neutral-snow,
  'feedback-red' $unnnic-color-feedback-red, 'feedback-green' $unnnic-color-feedback-green,
  'feedback-yellow' $unnnic-color-feedback-yellow, 'feedback-blue' $unnnic-color-feedback-blue,
  'feedback-grey' $unnnic-color-feedback-grey, 'aux-blue' $unnnic-color-aux-blue,
  'aux-purple' $unnnic-color-aux-purple, 'aux-orange' $unnnic-color-aux-orange,
  'aux-lemon' $unnnic-color-aux-lemon, 'aux-pink' $unnnic-color-aux-pink,
  'aux-baby-blue' $unnnic-color-aux-baby-blue, 'aux-baby-yellow' $unnnic-color-aux-baby-yellow,
  'aux-baby-red' $unnnic-color-aux-baby-red, 'aux-baby-green' $unnnic-color-aux-baby-green,
  'aux-baby-pink' $unnnic-color-aux-baby-pink, 'aux-green-100' $unnnic-color-aux-green-100,
  'aux-green-300' $unnnic-color-aux-green-300, 'aux-green-500' $unnnic-color-aux-green-500,
  'aux-green-700' $unnnic-color-aux-green-700, 'aux-green-900' $unnnic-color-aux-green-900,
  'aux-blue-100' $unnnic-color-aux-blue-100, 'aux-blue-300' $unnnic-color-aux-blue-300,
  'aux-blue-500' $unnnic-color-aux-blue-500, 'aux-blue-700' $unnnic-color-aux-blue-700,
  'aux-blue-900' $unnnic-color-aux-blue-900, 'aux-purple-100' $unnnic-color-aux-purple-100,
  'aux-purple-300' $unnnic-color-aux-purple-300, 'aux-purple-500' $unnnic-color-aux-purple-500,
  'aux-purple-700' $unnnic-color-aux-purple-700, 'aux-purple-900' $unnnic-color-aux-purple-900,
  'aux-red-100' $unnnic-color-aux-red-100, 'aux-red-300' $unnnic-color-aux-red-300,
  'aux-red-500' $unnnic-color-aux-red-500, 'aux-red-700' $unnnic-color-aux-red-700,
  'aux-red-900' $unnnic-color-aux-red-900, 'aux-orange-100' $unnnic-color-aux-orange-100,
  'aux-orange-300' $unnnic-color-aux-orange-300, 'aux-orange-500' $unnnic-color-aux-orange-500,
  'aux-orange-700' $unnnic-color-aux-orange-700, 'aux-orange-900' $unnnic-color-aux-orange-900,
  'aux-yellow-100' $unnnic-color-aux-yellow-100, 'aux-yellow-300' $unnnic-color-aux-yellow-300,
  'aux-yellow-500' $unnnic-color-aux-yellow-500, 'aux-yellow-700' $unnnic-color-aux-yellow-700,
  'aux-yellow-900' $unnnic-color-aux-yellow-900, 'floweditor-blue' $unnnic-color-floweditor-blue,
  'floweditor-purple' $unnnic-color-floweditor-purple,
  'floweditor-wine' $unnnic-color-floweditor-wine,
  'floweditor-orange' $unnnic-color-floweditor-orange,
  'floweditor-pink' $unnnic-color-floweditor-pink,
  'floweditor-turquoise' $unnnic-color-floweditor-turquoise,
  'floweditor-green' $unnnic-color-floweditor-green, 'weni-50' $unnnic-color-weni-50,
  'weni-100' $unnnic-color-weni-100, 'weni-200' $unnnic-color-weni-200,
  'weni-300' $unnnic-color-weni-300, 'weni-400' $unnnic-color-weni-400,
  'weni-500' $unnnic-color-weni-500, 'weni-600' $unnnic-color-weni-600,
  'weni-700' $unnnic-color-weni-700, 'weni-800' $unnnic-color-weni-800,
  'weni-900' $unnnic-color-weni-900, 'weni-950' $unnnic-color-weni-950,
  'brand-weni' $unnnic-color-brand-weni, 'brand-weni-dark' $unnnic-color-brand-weni-dark,
  'brand-weni-soft' $unnnic-color-brand-weni-soft, 'brand-sec-dark' $unnnic-color-brand-sec-dark,
  'brand-sec-soft' $unnnic-color-brand-sec-soft, 'brand-sec' $unnnic-color-brand-sec;

$icon-sizes: 'xl' $unnnic-icon-size-xl, 'lg' $unnnic-icon-size-lg, 'md' $unnnic-icon-size-md,
  'ant' $unnnic-icon-size-ant, 'sm' $unnnic-icon-size-sm, 'xs' $unnnic-icon-size-xs,
  'avatar-lg' $unnnic-avatar-size-lg, 'avatar-md' $unnnic-avatar-size-md,
  'avatar-sm' $unnnic-avatar-size-sm, 'avatar-xs' $unnnic-avatar-size-xs,
  'avatar-nano' $unnnic-avatar-size-nano;

@font-face {
  font-family: 'Material Symbols Rounded';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/Material Symbols Rounded.woff2') format('woff2');
}

@font-face {
  font-family: 'Material Symbols Rounded Filled';
  font-style: normal;
  font-weight: 300;
  src: url('../assets/fonts/Material Symbols Rounded Filled.woff2') format('woff2');
}

.material-symbols-rounded {
  font-family: 'Material Symbols Rounded';
  font-weight: normal;
  font-style: normal;
  width: 1em;
  height: 1em;
  line-height: 1;
  letter-spacing: normal;
  text-transform: none;
  display: inline-block;
  white-space: nowrap;
  word-wrap: normal;
  direction: ltr;
  -webkit-font-feature-settings: 'liga';
  -webkit-font-smoothing: antialiased;

  &--filled {
    font-family: 'Material Symbols Rounded Filled';
  }

  @each $name, $color in $scheme-colors {
    &.unnnic-icon-scheme--#{$name} {
      color: $color;
    }
  }

  @each $name, $size in $icon-sizes {
    &.unnnic-icon-size--#{$name} {
      font-size: $size;
    }
  }
}

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

$line-heights: 'sm' $unnnic-line-height-small, 'md' $unnnic-line-height-medium,
  'lg' $unnnic-line-height-large;

.unnnic-icon {
  position: relative;
  display: inline-block;
  vertical-align: middle;

  @each $name, $size in $icon-sizes {
    &__size--#{$name} {
      width: $size;
      height: $size;
      min-width: $size;
      min-height: $size;

      @each $line-name, $line-size in $line-heights {
        &.unnnic-icon__line-height--#{$line-name} svg {
          position: relative;
          top: calc(($size + $line-size) - ($size * 1.2)) / 1.2;
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
