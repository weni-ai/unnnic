<template>
    <img :class="`flag-${size}`" :src="source" />
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
export default {
  name: 'Flag',
  props: {
    code: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: 'md',
      validator(value) {
        return ['nano', 'xs', 'sm', 'md', 'lg'].indexOf(value) !== -1;
      },
    },
  },
  computed: {
    source() {
      if (!this.code) return '';
      try {
        return require(`../assets/img/flag/${this.code}.svg`);
      } catch (e) {
        return null;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/unnic.scss';

.flag {

  &-xs {
    width: $unnic-icon-size-xs;
    height: $unnic-icon-size-xs;
  }

  &-sm {
    width: $unnic-icon-size-sm;
    height: $unnic-icon-size-sm;
  }

  &-md {
    width: $unnic-icon-size-md;
    height: $unnic-icon-size-md;
  }

  &-lg {
    width: $unnic-icon-size-lg;
    height: $unnic-icon-size-lg;
  }

  &-xl {
    width: $unnic-icon-size-xl;
    height: $unnic-icon-size-xl;
  }
}

</style>
