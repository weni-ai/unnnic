<template>
    <span
      @click="onClick"
      :class="`icon icon-${icon} icon-${size} ${ clickable ? 'unnic--clickable' : '' }`"> </span>
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
@import '../assets/fonts/fonts.css';

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
