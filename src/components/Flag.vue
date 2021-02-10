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
@import '../assets/scss/unnnic.scss';

.flag {

  &-xs {
    width: $unnnic-icon-size-xs;
    height: $unnnic-icon-size-xs;
  }

  &-sm {
    width: $unnnic-icon-size-sm;
    height: $unnnic-icon-size-sm;
  }

  &-md {
    width: $unnnic-icon-size-md;
    height: $unnnic-icon-size-md;
  }

  &-lg {
    width: $unnnic-icon-size-lg;
    height: $unnnic-icon-size-lg;
  }

  &-xl {
    width: $unnnic-icon-size-xl;
    height: $unnnic-icon-size-xl;
  }
}

</style>
