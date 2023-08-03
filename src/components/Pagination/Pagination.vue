<template>
  <div class="pagination">
    <unnnic-button
      type="terciary"
      size="small"
      icon-center="arrow-left-1-1"
      :disabled="!canPrevious || disabled"
      @click="previousPage"
    />

    <unnnic-button
      v-for="(page, index) in pages"
      :key="index"
      :type="page === value ? 'secondary' : 'terciary'"
      size="small"
      :text="['left-hidden', 'right-hidden'].includes(page) ? '...' : String(page)"
      @click="selectPage(page)"
      :disabled="disabled"
    />

    <unnnic-button
      type="terciary"
      size="small"
      icon-center="arrow-right-1-1"
      :disabled="!canNext || disabled"
      @click="nextPage"
    />
  </div>
</template>

<script>
import unnnicButton from '../Button/Button.vue';

export default {
  components: {
    unnnicButton,
  },

  props: {
    value: {
      type: Number,
      default: 1,
    },

    max: {
      type: Number,
      default: 1,
    },

    show: {
      type: Number,
      default: 5,
    },

    disabled: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      reference: 3,
    };
  },

  computed: {
    pages() {
      const pages = [];

      for (let i = 1; i <= this.max; i += 1) {
        pages.push(i);
      }

      const plus = this.show - 4;
      const maxToRemove = this.max - plus - 3;

      if (this.reference > 3) {
        const toRemove = (this.reference - 2);
        const maxRemove = toRemove > maxToRemove ? maxToRemove : toRemove;
        pages.splice(1, maxRemove, 'left-hidden');
      }

      if (this.reference < this.max - plus - 1) {
        const toRemove = (this.max - plus - this.reference);
        const maxRemove = toRemove > maxToRemove ? maxToRemove : toRemove;
        pages.splice(-(maxRemove + 1), maxRemove, 'right-hidden');
      }

      return pages;
    },

    canPrevious() {
      return this.value > 1;
    },

    canNext() {
      return this.value < this.max;
    },
  },

  methods: {
    selectPage(page) {
      if (page === 'left-hidden') {
        const pageNumber = this.pages[this.pages.indexOf('left-hidden') + 1] - 1;

        this.$emit('input', pageNumber);
        this.setReference(pageNumber);
      } else if (page === 'right-hidden') {
        const pageNumber = this.pages[this.pages.indexOf('right-hidden') - 1] + 1;

        this.$emit('input', pageNumber);

        if (this.pages.includes('left-hidden')) {
          this.setReference(this.pages[this.pages.indexOf('left-hidden') + 1] + 1);
        } else {
          this.setReference(4);
        }
      } else {
        this.$emit('input', page);
      }
    },

    previousPage() {
      if (this.canPrevious) {
        const pageNumber = this.value - 1;

        this.selectPage(pageNumber);

        if (!this.pages.includes(pageNumber)) {
          this.setReference(pageNumber);
        }
      }
    },

    nextPage() {
      if (this.canNext) {
        const pageNumber = this.value + 1;

        this.selectPage(pageNumber);

        if (!this.pages.includes(pageNumber)) {
          this.setReference(pageNumber);
        }
      }
    },

    setReference(reference) {
      this.reference = reference;
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../../assets/scss/unnnic.scss";

.pagination {
  display: flex;
  align-items: center;
  column-gap: $unnnic-spacing-inline-xs;
  user-select: none;
}
</style>
