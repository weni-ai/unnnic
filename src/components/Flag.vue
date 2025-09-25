<template>
  <UnnnicIcon
    :icon="name"
    :size="size"
  />
</template>

<script>
/* eslint-disable vue/multi-word-component-names */
import UnnnicIcon from './Icon.vue';

export default {
  name: 'Flag',
  components: {
    UnnnicIcon,
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
