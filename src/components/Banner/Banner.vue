<template>
  <component
    :is="currentComponent"
    class="unnnic-banner-component"
    v-bind="$attrs"
    :firstTitle="sanitizedFirstTitle"
    :secondTitle="sanitizedSecondTitle"
    :thirdTitle="sanitizedThirdTitle"
    :firstDescription="sanitizedFirstDescription"
    :secondDescription="sanitizedSecondDescription"
    :thirdDescription="sanitizedThirdDescription"
    :subtitle="sanitizedSubtitle"
    :rating="sanitizedRating"
  />
</template>

<script>
import InfoBanner from './InfoBanner.vue';
import { sanitizeHtml } from '../../utils/sanitize';

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
    sanitizedFirstTitle() {
      return sanitizeHtml(this.firstTitle, [], 100);
    },
    sanitizedSecondTitle() {
      return sanitizeHtml(this.secondTitle, [], 100);
    },
    sanitizedThirdTitle() {
      return sanitizeHtml(this.thirdTitle, [], 100);
    },
    sanitizedFirstDescription() {
      return sanitizeHtml(this.firstDescription, [], 200);
    },
    sanitizedSecondDescription() {
      return sanitizeHtml(this.secondDescription, [], 200);
    },
    sanitizedThirdDescription() {
      return sanitizeHtml(this.thirdDescription, [], 200);
    },
    sanitizedSubtitle() {
      return sanitizeHtml(this.subtitle, [], 150);
    },
    sanitizedRating() {
      return Math.max(0, Math.min(this.rating, 5));
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
@import '../../assets/scss/unnnic.scss';
</style>