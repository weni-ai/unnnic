<template>
    <div :class="[gridClass, 'grid-example-container']">
        <div v-for="i in gridNumber" :key="i" :class="[gridItemClass,'grid-example']" />
    </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    size: {
      type: String,
      default: 'sm',
    },
  },
  computed: {
    gridClass() {
      return `unnnic-grid-${this.size}`;
    },
    gridItemClass() {
      return 'unnnic-grid-span-1';
    },
    gridNumber() {
      if (this.size === 'xs' || this.size === 'sm') return 4;
      if (this.size === 'md') return 6;
      if (this.size === 'lg' || this.size === 'xl') return 12;
      return 12;
    },
  },
};
</script>

<style lang="scss" scoped>
  @import '../../assets/scss/unnnic.scss';

  .grid-example {
    background-color: $unnnic-color-brand-weni;

    &-container {
      background-color: $unnnic-color-neutral-dark ;
      width: 100%;
      height: 100vh;
    }
  }
</style>
