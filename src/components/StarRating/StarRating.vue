<template>
  <div class="unnnic-star-rating">
    <UnnnicIcon
      v-for="index in 5"
      :key="index"
      :scheme="starScheme(index)"
      icon="rating-star-1"
      size="ant"
    />

    <div
      v-if="showValue"
      class="rating-title"
    >
      <span class="highlight"> {{ modelValue.toFixed(1) }} </span>
      /5.0
    </div>
  </div>
</template>

<script>
import UnnnicIcon from '../Icon.vue';

export default {
  components: {
    UnnnicIcon,
  },

  props: {
    modelValue: {
      type: Number,
    },

    showValue: {
      type: Boolean,
    },

    readonly: {
      type: Boolean,
    },
  },

  data() {
    return {};
  },

  methods: {
    starScheme(star) {
      return star <= this.modelValue ? 'feedback-yellow' : 'neutral-clean';
    },
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/scss/unnnic.scss';

.unnnic-star-rating {
  display: flex;
  align-items: center;

  .rating-title {
    margin-left: $unnnic-spacing-inline-xs;
    font-family: $unnnic-font-family-secondary;
    font-weight: $unnnic-font-weight-bold;
    font-size: $unnnic-font-size-body-lg;
    line-height: $unnnic-font-size-body-lg + $unnnic-line-height-md;
    color: $unnnic-color-neutral-cleanest;

    .highlight {
      color: $unnnic-color-neutral-darkest;
    }
  }
}
</style>
