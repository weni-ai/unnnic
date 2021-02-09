<template>
    <span
      @click="onClick"
      :class="`icon icon-${icon} icon-${size} ${ clickable ? 'unnnic--clickable' : '' }`"> </span>
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
@import '../assets/scss/unnnic.scss';
@import '../assets/fonts/icons.css';

.icon {

  &-xs {
    font-size: $unnnic-icon-size-xs;
  }

  &-sm {
    font-size: $unnnic-icon-size-sm;
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
