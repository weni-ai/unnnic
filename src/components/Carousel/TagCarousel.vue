<template>
  <div class="unnnic-card-tag-carousel">
    <unnnic-icon icon="arrow-left-1-1" size="sm" @click.native="previous" clickable />
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
    <unnnic-icon icon="arrow-right-1-1" @click.native="next" size="sm" clickable />
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
.unnnic-card-tag-carousel {
  display: flex;
  align-items: center;

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
}
</style>
