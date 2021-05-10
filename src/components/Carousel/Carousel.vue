<template>
    <component
      class="unnnic-carousel-component"
      :is="currentComponent"
      :v-bind="$attrs"
      :title="title"
      :clickable="clickable"
      :tagItems="tagItems"
      @selected="$emit('change-selected', $event)"
    />
</template>

<script>
import UICon from '../Icon.vue';
import TagCarousel from './TagCarousel.vue';

export default {
  name: 'unnnic-carousel',
  components: { UICon },
  props: {
    type: {
      type: String,
      default: 'brand',
      validator(value) {
        return (
          ['brand'].indexOf(value) !== -1
        );
      },
    },
    tagItems: {
      type: Array,
      default: () => [],
    },
    title: {
      type: String,
      default: null,
    },
    icon: {
      type: String,
      default: null,
    },
    clickable: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    currentComponent() {
      return TagCarousel;
    },
  },
};
</script>
