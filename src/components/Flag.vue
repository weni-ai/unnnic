<template>
  <unnnic-icon-svg
    :icon="name"
    :size="size"
  />
</template>

<script>
/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import UnnnicIconSvg from './Icon-svg.vue';

export default {
  name: 'Flag',
  components: {
    UnnnicIconSvg,
  },
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
    name() {
      return {
        'pt-br': 'Brazil',
        en: 'USA',
        es: 'Spain',
      }[this.code];
    },
  },
};
</script>
