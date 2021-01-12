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
      return require(`../assets/img/flag/${this.code}.svg`);
    },
  },
};
</script>

<style lang="scss">
@import '../assets/scss/unnic.scss';

.flag {

  &-xs {
    height: $unnic-icon-size-xs;
  }

  &-sm {
    height: $unnic-icon-size-sm;
  }

  &-md {
    height: $unnic-icon-size-md;
  }

  &-lg {
    height: $unnic-icon-size-lg;
  }

  &-xl {
    height: $unnic-icon-size-xl;
  }
}

</style>
