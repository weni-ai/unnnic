<template>
  <component
    :is="currentComponent"
    class="unnnic-carousel-component"
    v-bind="$attrs"
    :name="name"
    :clickable="clickable"
    :tagItems="tagItems"
    :modelValue="modelValue"
    @selected="$emit('update:model-value', $event)"
  />
</template>

<script>
import TagCarousel from './TagCarousel.vue';

export default {
  name: 'UnnnicCarousel',
  model: {
    event: 'update:model-value',
  },
  props: {
    modelValue: {
      type: Array,
      default() {
        return [];
      },
    },
    type: {
      type: String,
      default: 'brand',
      validator(value) {
        return ['brand'].indexOf(value) !== -1;
      },
    },
    tagItems: {
      type: Array,
      default: () => [],
    },
    name: {
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
