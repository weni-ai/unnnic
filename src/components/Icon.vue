<template>
    <span
      @click="onClick"
      :class="`icon-${size}`"> </span>
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

<style lang="scss" scoped>
@import '../assets/scss/unnic.scss';

$sizes: 'nano', 'xs', 'sm', 'md', 'lg';

@each $size in $sizes {
  .icon-#{$size} {
    height: $unnic-avatar-size-xs;
    width: $unnic-avatar-size-xs;
  }
}

</style>
