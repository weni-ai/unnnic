<template>
  <div class="unnnic-card-tag-carousel">
    <div
      class="unnnic-card-tag-carousel__button unnnic-card-tag-carousel__button--left"
    >
      <div class="unnnic-card-tag-carousel__button__icon">
        <UnnnicIconSvg
          icon="arrow-left-1-1"
          size="sm"
          @click="previous()"
          :scheme="hasPrev ? 'neutral-black' : 'neutral-cleanest'"
          clickable
        />
      </div>
      <span
        v-show="hasPrev"
        class="unnnic-card-tag-carousel__button__blur unnnic-card-tag-carousel__button__blur--left"
      />
    </div>

    <div
      class="unnnic-card-tag-carousel__container"
      id="scroll"
    >
      <div
        v-for="tag in slides"
        :key="tag.id"
        class="unnnic-card-tag-carousel__container__slide"
      >
        <UnnnicTag
          :text="tag.name"
          clickable
          type="brand"
          :disabled="checkIsInclude(tag)"
          @click="save(tag)"
          class="unnnic-card-tag-carousel__container__slide__item"
        />
      </div>
    </div>

    <div
      class="unnnic-card-tag-carousel__button unnnic-card-tag-carousel__button--right"
    >
      <span
        class="unnnic-card-tag-carousel__button__blur unnnic-card-tag-carousel__button__blur--right"
        v-show="hasNext"
      />
      <div class="unnnic-card-tag-carousel__button__icon">
        <UnnnicIconSvg
          icon="arrow-right-1-1"
          @click="next()"
          size="sm"
          :scheme="hasNext ? 'neutral-black' : 'neutral-cleanest'"
          clickable
        />
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicTag from '../Tag/Tag.vue';
import UnnnicIconSvg from '../Icon.vue';

export default {
  name: 'unnnic-tag-carousel',
  data() {
    return {
      hasNext: true,
      hasPrev: false,
      slides: [],
    };
  },
  components: {
    UnnnicTag,
    UnnnicIconSvg,
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    tagItems: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.slides = this.tagItems;
  },
  methods: {
    save(tagItem) {
      let valueLocal = this.modelValue;
      if (this.checkIsInclude(tagItem)) {
        valueLocal = valueLocal.filter((id) => id !== tagItem.id);
      } else {
        valueLocal = [...valueLocal, tagItem.id];
      }
      this.$emit('selected', valueLocal);
    },
    checkIsInclude(tagItem) {
      return this.modelValue.some((id) => id === tagItem.id);
    },
    next() {
      const element = document.querySelector('#scroll');
      const scrollCalc = element.scrollWidth - element.clientWidth;
      element.scrollLeft += 200;
      if (scrollCalc !== element.scrollLeft) {
        if (!this.hasNext) {
          this.hasNext = true;
        }
        this.hasPrev = true;
      } else {
        this.hasNext = false;
      }
    },
    previous() {
      const element = document.querySelector('#scroll');
      element.scrollLeft -= 200;
      if (element.scrollLeft !== 0) {
        if (!this.hasPrev) {
          this.hasPrev = true;
        }
        this.hasNext = true;
      } else {
        this.hasPrev = false;
      }
    },
  },
};
</script>

<style lang="scss">
@import '../../assets/scss/unnnic.scss';

.unnnic-card-tag-carousel {
  display: flex;
  align-items: center;
  position: relative;

  &__container {
    width: 100%;
    display: flex;
    overflow: hidden;
    scroll-behavior: smooth;

    &__slide {
      &:first-of-type {
        margin-left: $unnnic-inline-lg;
      }
      &:last-of-type {
        margin-right: $unnnic-inline-awesome;
      }
      &__item {
        margin-right: 2 * $unnnic-font-size;
      }
    }
  }

  &__button {
    &__icon {
      height: $unnnic-inline-lg;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $unnnic-color-background-snow;
    }
    z-index: 1;
    position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    &__blur {
      width: $unnnic-inline-giant;
      height: $unnnic-inline-lg;
      &--left {
        background-image: linear-gradient(
          to right,
          $unnnic-color-background-snow,
          rgba($unnnic-color-neutral-snow, $unnnic-opacity-level-overlay)
        );
      }
      &--right {
        background-image: linear-gradient(
          to right,
          rgba($unnnic-color-neutral-snow, $unnnic-opacity-level-overlay),
          $unnnic-color-background-snow
        );
      }
    }
    &--left {
      left: 0;
    }
    &--right {
      right: 0;
    }
  }
}
</style>
