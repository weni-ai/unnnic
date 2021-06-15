<template>
  <div class="unnnic-banner-info">
    <section class="unnnic-banner-info__section">
      <div class="unnnic-banner-info__title">{{ firstTitle }}</div>
      <div class="unnnic-banner-info__description">{{ firstDescription }}</div>
    </section>
    <div class="unnnic-banner-info__divider" />
    <section class="unnnic-banner-info__section">
      <div class="unnnic-banner-info__title">{{ secondTitle }}</div>
      <div class="unnnic-banner-info__description">{{ secondDescription }}</div>
      <div class="unnnic-banner-info__subtitle">{{ subtitle }}</div>
    </section>
    <div class="unnnic-banner-info__divider" />
    <section class="unnnic-banner-info__section">
      <div class="unnnic-banner-info__title">{{ thirdTitle }}</div>
      <div class="unnnic-banner-info__description">{{ thirdDescription }}</div>
      <div class="unnnic-banner-info__rating">
        <unnnic-icon-svg
          :key="index"
          v-for="index in 5"
          @click.native="emitRatingAction(index)"
          @mouseover.native="starOver(index)"
          @mouseout.native="starOut"
          :class="{
            'unnnic-banner-info__rating__star': true,
            'unnnic-banner-info__rating__star__active': index <= baseRating,
          }"
          :scheme="starScheme(index)"
          icon="rating-star-1"
          size="ant"
        />
      </div>
    </section>
  </div>
</template>

<script>
import UnnnicIconSvg from '../Icon-svg.vue';

export default {
  name: 'unnnic-banner',
  components: { UnnnicIconSvg },
  props: {
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
  data() {
    return {
      tempRating: null,
      baseRating: this.rating,
    };
  },
  methods: {
    emitRatingAction(star) {
      this.$emit('ratingAction', star);
    },
    starScheme(star) {
      return star <= this.baseRating ? 'feedback-yellow' : 'neutral-clean';
    },
    starOver(star) {
      this.tempRating = this.baseRating;
      this.baseRating = star;
    },
    starOut() {
      this.baseRating = this.tempRating;
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-banner-info {
  display: flex;
  flex-direction: row;

  border-radius: $unnnic-border-radius-sm;
  padding: $unnnic-squish-md;
  background-color: $unnnic-color-background-carpet;
  text-align: center;
  justify-content: center;

  &__section {
    flex: 1;
  }

  &__title {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
    margin-bottom: $unnnic-spacing-stack-nano;
  }

  &__description {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-title-md;
    line-height: $unnnic-font-size-title-md + $unnnic-line-height-md;
    color: $unnnic-color-neutral-dark;
  }

  &__subtitle {
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-regular;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cloudy;
    margin-top: $unnnic-spacing-stack-nano;
  }

  &__divider {
    align-self: center;

    border-left: $unnnic-border-width-thinner solid $unnnic-color-neutral-clean;
    height: 36px;
    margin: 0 $unnnic-inline-md;
  }

  &__rating {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
}
</style>
