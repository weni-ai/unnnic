<template>
  <component
    :is="currentComponent"
    class="unnnic-banner-component"
    v-bind="$attrs"
    :firstTitle="firstTitle"
    :secondTitle="secondTitle"
    :thirdTitle="thirdTitle"
    :firstDescription="firstDescription"
    :secondDescription="secondDescription"
    :thirdDescription="thirdDescription"
    :subtitle="subtitle"
    :rating="rating"
  />
</template>

<script>
import InfoBanner from './InfoBanner.vue';

export default {
  name: 'UnnnicBanner',
  props: {
    type: {
      type: String,
      default: 'info',
      validator(value) {
        return ['info'].indexOf(value) !== -1;
      },
    },
    firstTitle: {
      type: String,
      default: null,
    },
    secondTitle: {
      type: String,
      default: null,
    },
    thirdTitle: {
      type: String,
      default: null,
    },
    firstDescription: {
      type: String,
      default: null,
    },
    secondDescription: {
      type: String,
      default: null,
    },
    thirdDescription: {
      type: String,
      default: null,
    },
    subtitle: {
      type: String,
      default: null,
    },
    rating: {
      type: Number,
      default: 0,
    },
  },
  computed: {
    currentComponent() {
      if (this.type === 'info') return InfoBanner;
      return InfoBanner;
    },
  },
  methods: {
    emitRatingAction(star) {
      this.$emit('ratingAction', star);
    },
  },
};
</script>

<style lang="scss">
@use '@/assets/scss/unnnic' as *;
</style>
