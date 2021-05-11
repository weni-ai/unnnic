<template>
  <div>
    <div class="unnnic-card-tag-carousel">
      <span class="unnnic-card-tag-carousel__button__left">
         <div class="unnnic-card-tag-carousel__button__icon">
        <unnnic-icon icon="arrow-left-1-1" size="sm" @click.native="previous" clickable />
        </div>
        <span class="unnnic-card-tag-carousel__button__left__blur" />
      </span>
      <transition-group class="unnnic-card-tag-carousel__transition" tag="div">
        <div v-for="tag in slides" class="unnnic-card-tag-carousel__transition__tags" :key="tag.id">
          <unnnic-tag
            :text="tag.name"
            clickable
            type="brand"
            :disabled="checkIsInclude(tag)"
            @click.native="save(tag)"
          />
        </div>
      </transition-group>

      <div class="unnnic-card-tag-carousel__button__right">
        <span class="unnnic-card-tag-carousel__button__right__blur" />
        <div class="unnnic-card-tag-carousel__button__icon">
          <unnnic-icon icon="arrow-right-1-1" @click.native="next" size="sm" clickable />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import UnnnicTag from '../Tag/Tag.vue';
import UnnnicIcon from '../Icon.vue';

export default {
  data() {
    return {
      slides: [],
      selected: [],
    };
  },
  components: {
    UnnnicTag,
    UnnnicIcon,
  },
  props: {
    tagItems: {
      type: Array,
      default: () => [],
    },
  },
  mounted() {
    this.slides = this.tagItems;
  },
  watch: {
    selected() {
      this.$emit('selected', this.selected);
    },
  },
  methods: {
    save(tagItem) {
      if (this.selected.includes(tagItem)) {
        this.selected = this.selected.filter((tag) => tag.id !== tagItem.id);
        return;
      }
      this.selected = [...this.selected, tagItem];
    },
    checkIsInclude(tagItem) {
      return this.selected.includes(tagItem);
    },
    next() {
      const first = this.slides.shift();
      this.slides = this.slides.concat(first);
    },
    previous() {
      const last = this.slides.pop();
      this.slides = [last].concat(this.slides);
    },
  },
};
</script>

<style lang="scss">
@import "../../assets/scss/unnnic.scss";

.unnnic-card-tag-carousel {
  display: flex;
  align-items: center;
  position: relative;

  &__transition {
    display: flex;
    justify-content: center;
    align-items: center;
    overflow: hidden;
    width: 100%;

    &__tags {
      flex: 0 0 8.5em;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: transform 0.2s ease-in-out;

      &:first-of-type {
        opacity: 0;
      }
      &:last-of-type {
        opacity: 0;
      }
    }
  }

  &__button {
    &__icon {
      height: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: $unnnic-color-background-snow;
    }
    &__left {
      z-index: 9999;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      left: 0;

      &__blur {
        background-image: linear-gradient(to right, rgb(255, 255, 255), rgba(255, 255, 255, 0.219));
        width: 3rem;
        height: 2rem;
      }
    }

    &__right {
      z-index: 9999;
      position: absolute;
      display: flex;
      justify-content: center;
      align-items: center;
      right: 0;

      &__blur {
        background-image: linear-gradient(to right, rgba(252, 255, 255, 0.219), rgb(255, 255, 255));
        filter: blur(0.0625rem);
        width: 3rem;
        height: 2rem;
      }
    }
  }
}
</style>
